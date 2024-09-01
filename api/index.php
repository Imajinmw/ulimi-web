<?php 
session_start();
require ('../db.php');
require '../functions.php';
require 'imageClass.php';
$time = time();

$values = new Values($db);

// $values->set("require_coordinates", "false");
// $values->set("max_distance", "100");
// $values->set("start_time", "7:30 am");
// $values->set("end_time", "5:30 pm");

if (isset($_GET['checkActivated'])) {
	$uniq = $db->real_escape_string($_GET['checkActivated']);
	header('Content-Type: application/json; charset=utf-8');

	$r = $db->query("SELECT * FROM clerks WHERE id = '$uniq' ");
	if ($r->num_rows > 0) {
		$data = $r->fetch_assoc();
		if ($data['status'] == "active") {
			echo json_encode(['status' => true]);
		}
		else{
			echo json_encode(['status' => false]);
		}
	}
	else{
		echo json_encode(['status' => false]);
	}
}
elseif (isset($_POST['name-register'], $_POST['dob'], $_POST['gender'], $_POST['district'])) {
	$name = $db->real_escape_string($_POST['name-register']);
	$dob = $db->real_escape_string($_POST['dob']);
	$gender = $db->real_escape_string($_POST['gender']);
	$district = $db->real_escape_string($_POST['district']);

	$ins = $db->query("INSERT INTO `farmers`(`id`, `name`, `dob`, `gender`, `district`, `status`) VALUES (NULL, '$name', '$dob', '$gender', '$district', 'active')");
	$id = $db->insert_id;
	$data = $db->query("SELECT * FROM farmers WHERE id = '$id' ")->fetch_assoc();
	$data['status'] = true;
	echo json_encode($data);
}
elseif(isset($_POST['login_email_app'], $_POST['password'])){
	$email = $db->real_escape_string($_POST['login_email_app']);
	$password = md5($_POST['password']);

	$read = $db->query("SELECT * FROM clerks WHERE email = '$email' AND password = '$password' ");
	if ($read->num_rows > 0) {
		$data = $read->fetch_assoc();
		if ($data['status'] == "active") {
			$data['warehouse_data'] = $db->query("SELECT * FROM warehouses WHERE id = '{$data['warehouse']}' ")->fetch_assoc();
			$data['status'] = true;
            $data['distance'] = 10.0;
            $data['type'] = "clerk";
            echo json_encode($data);

			/*//calculate distance
			$p2 = explode(",", $data['warehouse_data']['coordinates']);
			file_put_contents("coords.tx", trim($parts[1])."\n".$data['warehouse_data']['coordinates']);

			if (count($p1) > 1) {
				// code...
				$d = sqrt(
					pow(
						((double)trim($p2[0]) - (double)trim($p1[0])),
						2
					) +
					pow(
						((double)trim($p2[1]) - (double)trim($p1[1])),
						2
					)
				);
				$data['distance'] = round($d, 2) * 111139;
				if($data['distance'] <= (int)$values->get("max_distance")){
					echo json_encode($data);
				}
				else{
					echo json_encode(['status' => false, 'message' => "You are far from warehouse. ".$data['distance']."meters"]);
				}
			}
			else{
				if ($values->get("require_coordinates") == "true") {
					echo json_encode(['status' => false, 'message' => "Please wait for the coordinates"]);
				}
				else{
					$data['distance'] = 10.0;
					if($data['distance'] <= 100.00){
						echo json_encode($data);
					}
				}
			} */
		}
		else{
			echo json_encode(['status' => false, 'message' => "You cannot login now! Contact administrator"]);
		}
	}
	else{
        //check supervisor login
        $sql= $db->query("SELECT * FROM users WHERE email = '$email' AND password = '$password' ");
        if ($sql->num_rows > 0){
            $data = $sql->fetch_assoc();
            if ($data['status'] == "active"){
                $data['status'] = true;
                $data['distance'] = 10.0;
                $data['type'] = "supervisor";
                $data['phone'] = "";
                echo json_encode($data);
            }
            else{
                echo json_encode(['status' => false, 'message' => "You cannot login now! Contact administrator"]);
            }
        }
        else {
            echo json_encode(['status' => false, 'message' => "Email or password is incorrect"]);
        }
	}
}
elseif (isset($_POST['acceptRequest'])){
    $id = (int)trim($_POST['acceptRequest']);

    $upd = $db->query("UPDATE travel SET status = 'accepted' WHERE id = '$id' ");
    if ($upd){
        echo json_encode(['status' => true, 'message' => "Success"]);
    }
    else{
        echo json_encode(['status' => false, 'message' => $db->error]);
    }
}
elseif (isset($_POST['declineRequest'])){
    $id = (int)trim($_POST['declineRequest']);
    $reason = $db->real_escape_string($_POST['reason']);

    $data = $db->query("SELECT * FROM travel WHERE id = '$id' ")->fetch_assoc();
    $user= $data['clerk'];
    $stmt = "Your travel expense request amount MWK{$data['amount']}, you had sent on ".date('d M Y H:i A', $data['date']).", was declined. Reason: ".$reason;
    $stmt = $db->real_escape_string($stmt);
    $ins = $db->query("INSERT INTO `notifications`(`id`, `user`, `type`, `content`, `date`, `status`, `ref`) VALUES (NULL, '$user', 'clerk', '$stmt', '$time', 'sent', '')");

    $upd = $db->query("UPDATE travel SET status = 'declined' WHERE id = '$id' ");
    if ($upd){
        echo json_encode(['status' => true, 'message' => "Success"]);
    }
    else{
        echo json_encode(['status' => false, 'message' => $db->error]);
    }
}
elseif (isset($_POST['getMyHouses'])){
    $id = (int)$_POST['getMyHouses'];
    $today = strtotime("today");

    $data = [];

    $read = $db->query("SELECT * FROM warehouses WHERE status != 'deleted' AND supervisor = '$id' ");
    while($row = $read->fetch_assoc()){
        $row['clerk'] = $db->query("SELECT * FROM clerks WHERE warehouse = '{$row['id']}' ")->fetch_assoc();
        if ($row['parent'] != 0) {
            $row['group'] = $db->query("SELECT * FROM warehouse_groups WHERE id = '{$row['parent']}' ")->fetch_assoc();
        }
        else{
            $row['group'] = ['name' => ""];
        }
        $row['checkedin'] = $db->query("SELECT * FROM days WHERE warehouse = '{$row['id']}' AND `date` > '$today' ")->num_rows > 0 ? "Yes" : "No";
        array_push($data, $row);
    }

    //echo "Id was: ".$id;
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}
elseif(isset($_POST['getData'])){
	$activities = [];
	$read = $db->query("SELECT * FROM activities ");
	while ($row = $read->fetch_assoc()) {
		array_push($activities, $row);
	}

	$environment = [];
	$read = $db->query("SELECT * FROM environment ");
	while ($row = $read->fetch_assoc()) {
		array_push($environment, $row);
	}

    $plantsanimals = [];
    $read = $db->query("SELECT * FROM plantsanimals ");
    while ($row = $read->fetch_assoc()) {
        array_push($plantsanimals, $row);
    }

    $users = [];
    $read = $db->query("SELECT * FROM `users` ");
    while ($row = $read->fetch_assoc()) {
    	array_push($users, $row);
    }

    header('Content-Type: application/json; charset=utf-8');
	echo json_encode([
		'activities' => $activities, 
		'environment' => $environment, 
		'plantsanimals' => $plantsanimals, 
		'users' => $users
	]);
}

elseif (isset($_POST['updateClerk'], $_POST['name'], $_POST['email'], $_POST['password'])){
	$user_id = (int)trim($_POST['updateClerk']);
	$name = $db->real_escape_string($_POST['name']);
	$email = $db->real_escape_string($_POST['email']);
	$password = md5($_POST['password']);

	$upd = $db->query("UPDATE clerks SET name = '$name', email = '$email', password = '$password' WHERE id = '$user_id' ");
	if ($upd) {
		echo json_encode(['status' => true, 'message' => "Successfully updated user details"]);
	}
	else{
		echo json_encode(['status' => false, 'message' => $db->error]);
	}
}
elseif (isset($_POST['user_id'], $_POST['change_password'])) {
	$user_id = (int)trim($_POST['user_id']);
	$password = md5($_POST['change_password']);

	$upd = $db->query("UPDATE clerks SET password = '$password' WHERE id = '$user_id' ");
	if ($upd) {
		echo json_encode(['status' => true, 'message' => "Successfully updated password"]);
	}
	else{
		echo json_encode(['status' => false, 'message' => $db->error]);
	}
}
elseif (isset($_POST['forgotPassword'], $_POST['code'], $_POST['stage'])) {
	$email = $db->real_escape_string($_POST['forgotPassword']);
	$code = $db->real_escape_string($_POST['code']);
	$stage = trim($_POST['stage']);
	require 'mail.php';

	if ($stage == "email") {
		$check = $db->query("SELECT * FROM clerks WHERE email = '$email' ");
		if ($check->num_rows > 0) {
			$random = rand(1001,9009);
			$db->query("UPDATE clerks SET code = '$random' WHERE email = '$email' ");

			//send email
			sendEmail($email, "Confirmation code", "Your password reset code at CSL Timesheet app is <h3>$random</h3>");
			file_put_contents('email.html', "Your password reset code at CSL Timesheet app is <h3>$random</h3>");
			echo json_encode(['status' => true, 'message' => "Code was sent"]);
		}
		else{
			echo json_encode(['status' => false, 'message' => $email." is not registered"]);
		}
	}
	else{
		//confirm the code
		$check = $db->query("SELECT * FROM clerks WHERE email = '$email' AND code = '$code' ");
		if ($check->num_rows > 0) {
			$data = $check->fetch_assoc();
			$data['status'] = true;
			echo json_encode($data);
		}
		else{
			echo json_encode(['status' => false, 'message' => $email." is not registered"]);
		}
	}
}
elseif(isset($_POST['change_profile_photo'], $_POST['file_picture'], $_POST['filename'])){
	$user_id = (int)trim($_POST['change_profile_photo']);
	$file = $filename = $db->real_escape_string($_POST['filename']);

	file_put_contents("../uploads/".$filename, base64_decode($_POST['file_picture']));

	if (file_exists("../uploads/".$file)) {
		$image = getMeImage("../uploads/".$file);

		if($image != null){
			$ratio = imagesx($image) / imagesy($image);
			imagedestroy($image);

			if ($ratio > 1.1 OR $ratio < .9) {
				// crop and resample the image...
				$img = new rodzImage("../uploads/".$file);
				$img->cropImage("../uploads/".$file);

				//echo base64_encode(file_get_contents("../uploads/".$file));
			}
			else{
				//echo base64_encode(file_get_contents("../uploads/".$file));
			}
		}
		else{
			//echo "empty";
		}
	}

	//check if user had a previous picture
	$user_data = $db->query("SELECT * FROM clerks WHERE id = '$user_id' ")->fetch_assoc();
	if ($user_data['picture'] != "default_avatar.png") {
		try{
			//unlink("../uploads/".$user_data['picture']);
		}
		catch(Exception $e){
			//do nothind
		}
	}

	//$db->query("DELETE FROM p")
	$upd = $db->query("UPDATE clerks SET picture = '$file' WHERE id = '$user_id' ");
	if ($upd) {
		echo json_encode(['status' => true, 'picture' => $filename]);
	}
	else{
		echo json_encode(['status' => false, 'message'=> $db->error]);
	}
}
elseif (isset($_GET['redirectProfilePhoto'])) {
	$user_id = (int)trim($_GET['redirectProfilePhoto']);
	$user_data = $db->query("SELECT * FROM clerks WHERE id = '$user_id' ")->fetch_assoc();
	header("location: ../uploads/".$user_data['picture']);
	//echo $user_data['picture'];
}
elseif (isset($_POST['getNotifications'], $_POST['type'])){
    $user_id = (int)trim($_POST['getNotifications']);
    $type = $db->real_escape_string($_POST['type']);

    $data = [];
    $ids = [];
    $read = $db->query("SELECT * FROM notifications WHERE user = '$user_id' AND type = '$type' ");
    while($row = $read->fetch_assoc()){
    	$row['date'] = date('d M Y, H:i A', $row['date']);
        array_push($data, $row);
        array_push($ids, $row['id']);
    }

    if (count($ids) > 0) {
    	$db->query("UPDATE notifications SET status = 'read' WHERE id IN (".implode(",", $ids).")");
    }

    echo json_encode($data);
}
elseif (isset($_POST['changePassword'], $_POST['password'])) {
	$password = md5($_POST['password']);
	$user_id = (int)trim($_POST['changePassword']);

	$upd = $db->query("UPDATE users SET password = '$password' WHERE id = '$user_id' ");
	if ($upd) {
		echo json_encode(['status' => true, 'message' => "Success"]);
	}
	else{
		echo json_encode(['status' => false, 'message' => $db->error]);
	}
}
elseif (isset($_POST['getAllValues'])) {
	$data = [];

	$read = $db->query("SELECT * FROM `values` ");
	while ($row = $read->fetch_assoc()) {
		array_push($data, $row);
	}

	echo json_encode($data);
}
elseif (isset($_POST['openRooms'])) {
	$user_id = (int)trim($_POST['openRooms']);
	$clerk_data = $db->query("SELECT * FROM clerks WHERE id = '$user_id' ")->fetch_assoc();
	$warehouse = $clerk_data['warehouse'];

	$today = strtotime("today");
	$limit = $today + (3600*23.5);
	$dayz = date('z');

	$rooms = [];
	$read = $db->query("SELECT * FROM rooms WHERE warehouse = '$warehouse' AND status = 'active' ");
	while ($row = $read->fetch_assoc()) {
		$room_id = $row['id'];

		if ($row['opens'] == 0) {
			// first time ...
			$ins = $db->query("INSERT INTO `rooms_progress`(`id`, `warehouse`, `room`, `user`, `starttime`, `endtime`, `dayz`, `seal`, `breaker`) VALUES (NULL, '$warehouse', '$room_id', '$user_id', '$time', '0', '$dayz', '0000', '0')");
			$db->query("UPDATE rooms SET opens = opens + 1 WHERE id = '$room_id' ");
		}

		$check = $db->query("SELECT * FROM rooms_progress WHERE room = '$room_id' ORDER BY id DESC LIMIT 0,1 ");
		if ($check->num_rows > 0) {
			$d = $check->fetch_assoc();
			$row['opened'] = date('H:i A', $d['starttime']);
			if ((int)$d['endtime'] != 0) {
				$row['closed'] = date('H:i A', $d['starttime']);
				$row['done'] = "close";
			}
			else{
				$row['done'] = "open";
			}
		}
		else{
			$row['done'] = "open1";
		}
		array_push($rooms, $row);
	}

	echo json_encode($rooms);
}
elseif(isset($_POST['seal_number'], $_POST['closeRoom'], $_POST['user_id'])){
	//
	$seal = $db->real_escape_string($_POST['seal_number']);
	$room_id = $db->real_escape_string($_POST['closeRoom']);
	$user_id = (int)trim($_POST['user_id']);
	$dayz = date('z');

	//check seal number
	$check = $db->query("SELECT * FROM rooms_progress WHERE seal = '$seal' ");
	if ($check->num_rows == 0) {
		// code...
		

		$room_data = $db->query("SELECT * FROM rooms WHERE id = '$room_id' ")->fetch_assoc();
		$warehouse = $room_data['warehouse'];

		$ins = $db->query("INSERT INTO `rooms_progress`(`id`, `warehouse`, `room`, `user`, `starttime`, `endtime`, `dayz`, `seal`, `breaker`) VALUES (NULL, '$warehouse', '$room_id', '$user_id', '$time', '0', '$dayz', '$seal', '0')");
		if ($ins) {
			$db->query("UPDATE rooms SET opens = opens + 1 WHERE id = '$room_id' ");
			echo json_encode(['status' => true, 'message' => "Success"]);
		}
		else{
			echo json_encode(['status' => false, 'message' => $db->error]);
		}
	}
	else{
		echo json_encode(['status' => false,'message' => "Seal number is already registered"]);
	}
}
elseif(isset($_POST['seal_number'], $_POST['openRoom'], $_POST['user_id'])){
	//
	$seal = $db->real_escape_string($_POST['seal_number']);
	$room_id = $db->real_escape_string($_POST['openRoom']);
	$user_id = (int)trim($_POST['user_id']);

	//check seal number
	$check = $db->query("SELECT * FROM rooms_progress WHERE seal = '$seal' AND room = '$room_id' ");
	if ($check->num_rows > 0) {
		// code...
		$data = $check->fetch_assoc();
		$id = $data['id'];
		$upd = $db->query("UPDATE rooms_progress SET endtime = '$time', breaker = '$user_id' WHERE id = '$id' ");
		echo json_encode(['status' => true, 'message' => "Success"]);
	}
	else{
		echo json_encode(['status' => false,'message'=>"Seal number is not available $seal"]);
	}
}
elseif (isset($_POST['getSupervisorStatus'])) {
	$supervisor_id = (int)trim($_POST['getSupervisorStatus']);
	$check = $db->query("SELECT * FROM check_in WHERE supervisor = '$supervisor_id' AND endtime = '0' ");
	if ($check->num_rows > 0) {
		echo json_encode(['status' => true, 'message' => "Success", 'open' => true]);
	}
	else{
		echo json_encode(['status' => false, 'message' => "Success", 'open' => false]);
	}
}
elseif (isset($_POST['checkIn'])) {
	$supervisor_id = (int)trim($_POST['checkIn']);
	$dayz = date('z');

	$ins = $db->query("INSERT INTO `check_in`(`id`, `supervisor`, `starttime`, `endtime`, `dayz`) VALUES (NULL, '$supervisor_id', '$time', '0', '$dayz')");

	echo "Success";
}
elseif (isset($_POST['checkOut'])) {
	$supervisor_id = (int)trim($_POST['checkOut']);
	$check = $db->query("SELECT * FROM check_in WHERE supervisor = '$supervisor_id' AND endtime = '0' ");
	if ($check->num_rows > 0) {
		$data = $check->fetch_assoc();
		$id = $data['id'];

		$db->query("UPDATE check_in SET endtime = '$time' WHERE id = '$id' ");

		echo "Success";
	}
	else{
		echo "Could not find session to check out";
	}
}
elseif (isset($_POST['warehouseDetailsClerk'])) {
	$clerk_id = (int)trim($_POST['warehouseDetailsClerk']);

	$warehouse_id = $db->query("SELECT * FROM clerks WHERE id = '$clerk_id' ")->fetch_assoc()['warehouse'];

	$data = $db->query("SELECT * FROM warehouses WHERE id = '$warehouse_id' ")->fetch_assoc();

	$data['supervisor_data'] = $db->query("SELECT * FROM users WHERE id = '{$data['supervisor']}' ")->fetch_assoc();
	$data['group'] = $db->query("SELECT * FROM warehouse_groups WHERE id = '{$data['parent']}' ")->fetch_assoc();
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_POST['getCrops'])) {
	$data = [];

	$read = $db->query("SELECT * FROM plantsanimals WHERE type = 'crop' ");
	while ($row = $read->fetch_assoc()) {
		array_push($data, $row);
	}

	echo json_encode($data);
}
elseif (isset($_POST['getAnimals'])) {
	$data = [];

	$read = $db->query("SELECT * FROM plantsanimals WHERE type = 'animal' ");
	while ($row = $read->fetch_assoc()) {
		array_push($data, $row);
	}

	echo json_encode($data);
}
elseif (isset($_POST['phone_login'], $_POST['code'], $_POST['stage'])) {
	$phone = $db->real_escape_string($_POST['phone_login']);
	$code = $db->real_escape_string($_POST['code']);
	$stage = $db->real_escape_string($_POST['stage']);

	if ($stage == "phone") {
		$check = $db->query("SELECT * FROM farmers WHERE phone = '$phone' ");
		if ($check->num_rows > 0) {
			$data = $check->fetch_assoc();
			echo json_encode([...$data, 'status' => true]);
		}
		else{
			echo json_encode(['status' => false, 'message' => "Number not registered"]);
		}
	}
	else{
		$check = $db->query("SELECT * FROM farmers WHERE phone = '$phone' ");
		if ($check->num_rows > 0) {
			$data = $check->fetch_assoc();
			echo json_encode([...$data, 'status' => true]);
		}
		else{
			echo json_encode(['status' => false, 'message' => "Number not registered"]);
		}
	}
}
?>