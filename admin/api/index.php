<?php 
session_start();
require '../../db.php';
require '../../mail.php';

$time = time();

$values = new Values($db);

// $values->set("require_coordinates", "false");
// $values->set("max_distance", "100");
// $values->set("start_time", "7:30 am");
// $values->set("end_time", "5:30 pm");

if (isset($_POST['email_login'], $_POST['password'])) {
	$email = $db->real_escape_string($_POST['email_login']);
	$password= md5($_POST['password']);

	$read = $db->query("SELECT * FROM admins WHERE email = '$email' ");

	if ($read->num_rows > 0) {
		$data = $read->fetch_assoc();
		if ($data['password'] == $password) {
			$_SESSION['admin_id'] = $data['id'];
			$_SESSION['data'] = $data;
			echo json_encode(['status' => true, 'type' => "email", 'message' => "Success"]);
		}
		else{
			echo json_encode(['status' => false, 'type' => "password", 'message' => "Password is incorrect"]);
		}
	}
	else{
		echo json_encode(['status' => false, 'type' => "email", 'message' => "Email is incorrect"]);
	}
}
elseif (isset($_GET['getNotifications'])) {
	$admin_id = $_SESSION['admin_id'];

	$data = [];
	$read = $db->query("SELECT * FROM notifications WHERE user = '$admin_id' AND type = 'admin' ");
	while ($row = $read->fetch_assoc()) {
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_GET['getAllUsers'])) {
	$data = [];

	$read = $db->query("SELECT * FROM users WHERE status != 'deleted' ");
	while($row = $read->fetch_assoc()){
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_GET['getYears'])) {
	$data = [];

	$read = $db->query("SELECT * FROM years ");
	while($row = $read->fetch_assoc()){
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_GET['getDashData'])) {
	$data['staff'] = $db->query("SELECT * FROM users ")->num_rows;
	$data['clerks'] = $db->query("SELECT * FROM clerks ")->num_rows;
	$data['warehouses'] = $db->query("SELECT * FROM warehouses ")->num_rows;

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_GET['getActiveAccidents'])){
    $data = [];

    $read = $db->query("SELECT * FROM accidents WHERE status = 'sent' ");
    while($row = $read->fetch_assoc()){
        $row['clerk_data'] = $db->query("SELECT * FROM clerks WHERE id = '{$row['clerk']}' ")->fetch_assoc();
        $row['warehouse_data'] = $db->query("SELECT * FROM warehouses WHERE id = '{$row['warehouse']}' ")->fetch_assoc();
        $row['date'] = date('d M Y', $row['date']);
        array_push($data, $row);
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}
elseif (isset($_GET['getHouses'])) {
	$data = [];

	$read = $db->query("SELECT * FROM clubs WHERE status != 'deleted' ");
	while($row = $read->fetch_assoc()){
		$row['clerks'] = 0; //$db->query("SELECT * FROM clerks WHERE warehouse = '{$row['id']}' ")->num_rows;
		if ($row['parent'] != 0) {
			$row['group'] = $db->query("SELECT * FROM districts WHERE id = '{$row['parent']}' ")->fetch_assoc();
		}
		else{
			$row['group'] = ['name' => ""];
		}
		$rooms = [];
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_GET['getGroups'])) {
	$data = [];

	$read = $db->query("SELECT * FROM districts ");
	while($row = $read->fetch_assoc()){
		$row['warehouses'] = $db->query("SELECT * FROM clubs WHERE parent = '{$row['id']}' ")->num_rows;
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_GET['getClerks'])) {
	$data = [];

	$read = $db->query("SELECT * FROM farmers WHERE status != 'deleted' ");
	while($row = $read->fetch_assoc()){
		//$row['warehouse_data'] = $db->query("SELECT * FROM warehouses WHERE id = '{$row['warehouse']}' ")->fetch_assoc();
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_POST['warehouse_name'], $_POST['location'], $_POST['coordinates'], $_POST['parent'])) {
	$name = $db->real_escape_string($_POST['warehouse_name']);
	$location = $db->real_escape_string($_POST['location']);
	$coordinates = $db->real_escape_string($_POST['coordinates']);
	$parent = (int)trim($_POST['parent']);

	header('Content-Type: application/json; charset=utf-8');
	$check = $db->query("SELECT * FROM warehouses WHERE name = '$name' ");
	if ($check->num_rows > 0) {
		echo json_encode(['status' => false, 'message' => $name." is already registered"]);
	}
	else{
		$ins = $db->query("INSERT INTO `warehouses`(`id`, `name`, `location`, `coordinates`, `status`, `parent`, `supervisor`) VALUES (NULL, '$name', '$location', '$coordinates','active', '$parent', '0')");
		if ($ins) {
			echo json_encode(['status' => true, 'message' => "Success"]);
		}
		else{
			echo json_encode(['status' => false, 'message' => $db->error]);
		}
	}
}
elseif (isset($_POST['clerk_name'], $_POST['phone'], $_POST['email'], $_POST['password'], $_POST['warehouse'])) {
	$name = $db->real_escape_string($_POST['clerk_name']);
	$phone = $db->real_escape_string($_POST['phone']);
	$email = $db->real_escape_string($_POST['email']);
	$password = md5($_POST['password']);
	$warehouse = $db->real_escape_string($_POST['warehouse']);

	//header('Content-Type: application/json; charset=utf-8');
	$check = $db->query("SELECT * FROM clerks WHERE email = '$email' ");
	if ($check->num_rows > 0) {
		echo json_encode(['status' => false, 'message' => $email." is already registered"]);
	}
	else{
		$ins = $db->query("INSERT INTO `clerks`(`id`, `name`, `email`, `phone`, `password`, `status`, `date`, `warehouse`) VALUES (NULL, '$name', '$email', '$phone', '$password', 'active', NOW(), '$warehouse')");
		if ($ins) {
			echo json_encode(['status' => true, 'message' => "Success"]);
		}
		else{
			echo json_encode(['status' => false, 'message' => $db->error]);
		}
	}
}
elseif (isset($_POST['staff_name'], $_POST['email'], $_POST['password'], $_POST['type'])) {
	$name = $db->real_escape_string($_POST['staff_name']);
	$email = $db->real_escape_string($_POST['email']);
	$password = md5($_POST['password']);
	$type = $db->real_escape_string($_POST['type']);

	//header('Content-Type: application/json; charset=utf-8');
	$check = $db->query("SELECT * FROM users WHERE email = '$email' ");
	if ($check->num_rows > 0) {
		echo json_encode(['status' => false, 'message' => $email." is already registered"]);
	}
	else{
		$ins = $db->query("INSERT INTO `users`(`id`, `name`, `email`, `password`, `status`, `type`) VALUES (NULL, '$name', '$email', '$password','active', '$type')");
		if ($ins) {
			echo json_encode(['status' => true, 'message' => "Success"]);
		}
		else{
			echo json_encode(['status' => false, 'message' => $db->error]);
		}
	}
}
elseif(isset($_POST['getSealQuestions'])){
	$data = [];

	header('Content-Type: application/json; charset=utf-8');
	$read = $db->query("SELECT * FROM questions WHERE status = 'active' ");
	while ($row = $read->fetch_assoc()) {
		array_push($data, $row);
	}

	echo json_encode($data);
}
elseif (isset($_POST['type'], $_POST['question'], $_POST['positive'], $_POST['negative'])) {
	$type = $db->real_escape_string($_POST['type']);
	$question = $db->real_escape_string($_POST['question']);
	$positive = $db->real_escape_string($_POST['positive']);
	$negative = $db->real_escape_string($_POST['negative']);
	
	$read = $db->query("SELECT * FROM questions WHERE question = '$question' ");
	if ($read->num_rows < 1) {
		$ins = $db->query("INSERT INTO `questions`(`id`, `type`, `question`, `positive`, `negative`, `status`) VALUES (NULL, '$type', '$question', '$positive', '$negative', 'active')");
		if ($ins) {
			echo json_encode(['status' => true, 'message' => "Success"]);
		}
		else{
			echo json_encode(['status' => false, 'message' => $db->error]);
		}
	}
	else{
		echo json_encode(['status' => false, 'message' => "The question is already added"]);
	}
}
elseif (isset($_POST['getAllDays'])) {
	$warehouses = [];
	$read = $db->query("SELECT * FROM warehouses");
	while ($row = $read->fetch_assoc()) {
		$warehouses[$row['id']] = $row;
	}

	$groups = [];
	$read = $db->query("SELECT * FROM districts");
	while ($row = $read->fetch_assoc()) {
		$groups[$row['id']] = $row;
	}

	$clerks = [];
	$read = $db->query("SELECT * FROM clerks");
	while ($row = $read->fetch_assoc()) {
		$clerks[$row['id']] = $row;
	}

	$data = [];

	$read = $db->query("SELECT * FROM days ORDER BY id DESC");
	while ($row = $read->fetch_assoc()) {
		$row['user_data'] = $clerks[$row['user']];
		$row['warehouse_data'] = $warehouses[$row['user_data']['warehouse']];
		$row['warehouse_data']['group_name'] = $groups[$row['warehouse_data']['parent']]['name'];

		$row['start'] = date('H:i A', $row['starttime']);
		$row['start_time'] = date('H:i', $row['starttime']);
		$row['end'] = date('H:i A', $row['endtime']);
		$row['end_time'] = date('H:i', $row['endtime']);
		$row['day'] = date('d', $row['starttime']);
		$row['month'] = date('M Y', $row['starttime']);
		$row['contract'] = date('N', $row['starttime']) > 5 ? "1":"0";
		$row['fulldate'] = date('D d-M-Y',$row['starttime']);

		if ($row['endtime'] != 0) {
			$dif = $row['endtime'] - $row['starttime'];
			$row['hours'] = (int)round($dif / 3600,0);
		}
		else{
			$row['hours'] = 0;
		}

		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_POST['filterDaysWarehouse'], $_POST['startDate'], $_POST['endDate'])) {
	$warehouse = (int)trim($_POST['filterDaysWarehouse']);
	$startTime = strtotime($_POST['startDate']);
	$endTime = strtotime($_POST['endDate']) + (23.8*3600);
	$clerk = (int)trim($_POST['clerk']);

	$warehouses = [];
	$read = $db->query("SELECT * FROM warehouses");
	while ($row = $read->fetch_assoc()) {
		$warehouses[$row['id']] = $row;
	}

	$clerks = [];
	$read = $db->query("SELECT * FROM clerks");
	while ($row = $read->fetch_assoc()) {
		$clerks[$row['id']] = $row;
	}

	$data = [];

	$clause = "";
	if ($clerk != 0) {
		$clause .= " AND user = '$clerk' ";
	}

	if ($warehouse != 0) {
		$clause .= " AND warehouse = '$warehouse' ";
	}

	$read = $db->query("SELECT * FROM days WHERE `date` BETWEEN '$startTime' AND '$endTime' $clause ORDER BY id DESC");
	while ($row = $read->fetch_assoc()) {
		$row['user_data'] = $clerks[$row['user']];
		
		$row['warehouse_data'] = $warehouses[$row['user_data']['warehouse']];

		$row['start'] = date('H:i A', $row['starttime']);
		$row['end'] = date('H:i A', $row['endtime']);
		$row['day'] = date('d', $row['starttime']);
		$row['month'] = date('M Y', $row['starttime']);

		if ($row['endtime'] == "0") {
			$row['hours'] = 0;
		}
		else{
			$dif = $row['endtime'] - $row['starttime'];
			$row['hours'] = (int)round($dif / 3600,0);
		}

		array_push($data, $row);
	}

	//header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_GET['getOvertime'])) {
	$warehouses = [];
	$read = $db->query("SELECT * FROM warehouses");
	while ($row = $read->fetch_assoc()) {
		$warehouses[$row['id']] = $row;
	}

	$clerks = [];
	$read = $db->query("SELECT * FROM clerks");
	while ($row = $read->fetch_assoc()) {
		$clerks[$row['id']] = $row;
	}

	$data = [];

	$read = $db->query("SELECT * FROM overtime WHERE status = 'saved' ");
	while ($row = $read->fetch_assoc()) {
		$row['user_data'] = $clerks[$row['user']];
		$row['warehouse_data'] = $warehouses[$row['user_data']['warehouse']];


		$row['date'] = date('D-d-M-Y', $row['date']);
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_POST['rewardOvertime'])) {
	$id = (int)trim($_POST['rewardOvertime']);

	$db->query("UPDATE overtime SET status = 'rewarded' WHERE id = '$id' ");
	echo "Successfully rewarded user";
}
elseif (isset($_POST['rewardOvertimes'])) {
	$ids = (int)trim($_POST['rewardOvertimes']);
	file_put_contents("hei.txt", $ids);

	$db->query("UPDATE overtime SET status = 'rewarded' WHERE id IN ($ids) ");
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode(['status' => true, 'message' => "Successfully rewardeds"]);
}
/*elseif (isset($_POST['getSeals'])) {
	$data = [];

	$warehouses = [];
	$read = $db->query("SELECT * FROM warehouses");
	while ($row = $read->fetch_assoc()) {
		$warehouses[$row['id']] = $row;
	}

	$clerks = [];
	$read = $db->query("SELECT * FROM clerks");
	while ($row = $read->fetch_assoc()) {
		$clerks[$row['id']] = $row;
	}

	$read = $db->query("SELECT * FROM seals ORDER BY id DESC");
	while ($row = $read->fetch_assoc()) {
		$row['user_data'] = $clerks[$row['user']];
		$row['warehouse_data'] = $warehouses[$row['warehouse']];

		$row['created'] = date('D-d-M-Y H:i A', $row['created']);
		$row['breaked'] = $row['breaked'] == 0 ? 0 : date('D-d-M-Y H:i A', $row['breaked']);
		array_push($data, $row);
	}

	//header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}*/
elseif (isset($_POST['getSeals'])) {
	$data = [];

	$warehouses = [];
	$read = $db->query("SELECT * FROM warehouses");
	while ($row = $read->fetch_assoc()) {
		$warehouses[$row['id']] = $row;
	}

	$clerks = [];
	$read = $db->query("SELECT * FROM clerks");
	while ($row = $read->fetch_assoc()) {
		$clerks[$row['id']] = $row;
	}

	$rooms = [];
	$read = $db->query("SELECT * FROM rooms");
	while ($row = $read->fetch_assoc()) {
		$rooms[$row['id']] = $row;
	}

	$read = $db->query("SELECT * FROM rooms_progress WHERE seal != '0000' ORDER BY id DESC");
	while ($row = $read->fetch_assoc()) {
		$row['user_data'] = $clerks[$row['user']];
		$row['warehouse_data'] = $warehouses[$row['warehouse']];
		$row['room_data'] = $rooms[$row['room']];

		$row['created'] = date('D-d-M-Y H:i A', $row['starttime']);
		$row['breaked'] = $row['endtime'] == 0 ? 0 : date('D-d-M-Y H:i A', $row['endtime']);
		array_push($data, $row);
	}

	//header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_POST['filterSeals'], $_POST['clerk'], $_POST['startDate'], $_POST['endDate'])) {
	$warehouse = (int)trim($_POST['filterSeals']);
	$clerk = (int)trim($_POST['clerk']);

	//echo "Clerk was ".$clerk;

	$startTime = $_POST['startDate'] != "" ? strtotime($_POST['startDate']) : 0;
	$endTime = $_POST['startDate'] != "" ? strtotime($_POST['endDate']) : time();

	$clause = " AND starttime BETWEEN $startTime AND $endTime ";

	if ($warehouse != 0) {
		$clause .= " AND warehouse = '$warehouse' ";
	}

	if ($clerk != 0) {
		$clause .= " AND user = '$clerk' ";
	}

	$data = [];

	$warehouses = [];
	$read = $db->query("SELECT * FROM warehouses");
	while ($row = $read->fetch_assoc()) {
		$warehouses[$row['id']] = $row;
	}

	$clerks = [];
	$read = $db->query("SELECT * FROM clerks");
	while ($row = $read->fetch_assoc()) {
		$clerks[$row['id']] = $row;
	}

	$rooms = [];
	$read = $db->query("SELECT * FROM rooms");
	while ($row = $read->fetch_assoc()) {
		$rooms[$row['id']] = $row;
	}

	$read = $db->query("SELECT * FROM rooms_progress WHERE seal != '0000' $clause ORDER BY id DESC");
	while ($row = $read->fetch_assoc()) {
		$row['user_data'] = $clerks[$row['user']];
		$row['warehouse_data'] = $warehouses[$row['warehouse']];
		$row['room_data'] = $rooms[$row['room']];

		$row['created'] = date('D-d-M-Y H:i A', $row['starttime']);
		$row['breaked'] = $row['endtime'] == 0 ? 0 : date('D-d-M-Y H:i A', $row['endtime']);
		array_push($data, $row);
	}

	//header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_GET['getOptionsData'])) {
	$data['distance'] = (int)$values->get("max_distance");
	$data['requireCoordinates'] = $values->get("require_coordinates") == "true";
	$data['startTime'] = $values->get("start_time");
	$data['endTime'] = $values->get("end_time");

	$chars = explode(":", $data['startTime']);
	$data['startTime'] = (strlen($chars[0]) == 1 ? "0".$chars[0] : $chars[0]).":".(strlen($chars[1]) == 1 ? "0".$chars[1] : $chars[1]);

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_POST['saveOptions'])) {
	$values->set("max_distance", $_POST['distance']);
	$values->set("require_coordinates", $_POST['requireCoordinates']);
	$values->set("start_time", $_POST['startTime']);
	$values->set("end_time", $_POST['endTime']);

	echo json_encode(['status' => true]);
}
elseif (isset($_POST['staff_id'], $_POST['staff_name_edit'], $_POST['email'], $_POST['type'])) {
	$staff_id = (int)trim($_POST['staff_id']);
	$name = $db->real_escape_string($_POST['staff_name_edit']);
	$email = $db->real_escape_string($_POST['email']);
	$type = $db->real_escape_string($_POST['type']);
	
	$upd = $db->query("UPDATE users SET name = '$name', email = '$email', type = '$type' WHERE id = '$staff_id' ");
	if ($upd) {
		echo json_encode(['status' => true, 'message' => "Successfully updated $type details"]);
	}
	else{
		echo json_encode(['status' => false, 'message' => $db->error]);
	}
}
elseif (isset($_GET['getCurrentUser'])){
    $admin_id = (int)$_SESSION['user_id'];
    $data = $db->query("SELECT * FROM users WHERE id = '$admin_id' ")->fetch_assoc();

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}
elseif (isset($_POST['updateEmail'])){
    $email = $db->real_escape_string($_POST['updateEmail']);
    $admin_id = (int)$_SESSION['user_id'];

    header('Content-Type: application/json; charset=utf-8');
    $upd = $db->query("UPDATE users SET email = '$email' WHERE id = '$admin_id' ");
    if ($upd){
        echo json_encode(['status' => true, 'message' => "Success"]);
    }
    else{
        echo json_encode(['status' => false, 'message' => $db->error]);
    }
}
elseif (isset($_POST['updateName'])){
    $name = $db->real_escape_string($_POST['updateName']);
    $admin_id = (int)$_SESSION['user_id'];

    header('Content-Type: application/json; charset=utf-8');
    $upd = $db->query("UPDATE users SET name = '$name' WHERE id = '$admin_id' ");
    if ($upd){
        echo json_encode(['status' => true, 'message' => "Success"]);
    }
    else{
        echo json_encode(['status' => false, 'message' => $db->error]);
    }
}
elseif (isset($_FILES['change_picture'])){
    $filename = $_FILES['change_picture']['name'];
    $admin_id = (int)$_SESSION['user_id'];

    header('Content-Type: application/json; charset=utf-8');
    if (move_uploaded_file($_FILES['change_picture']['tmp_name'], "../../uploads/".$filename)){
        $db->query("UPDATE users SET photo = '$filename' WHERE id = '$admin_id' ");
        $data = $db->query("SELECT * FROM users WHERE id = '$admin_id' ")->fetch_assoc();
        $data['status'] = true;
        echo json_encode($data);
    }
    else{
        echo json_encode(['status' => false, 'message' => "Failed to upload file"]);
    }
}
elseif (isset($_POST['changeUserStatus'], $_POST['status'])) {
	$user_id = (int)trim($_POST['changeUserStatus']);
	$status = $db->real_escape_string($_POST['status']);

	$db->query("UPDATE users SET status = '$status' WHERE id = '$user_id' ");
	echo "done";
}
elseif (isset($_POST['deleteStaff'])) {
	$id = (int)trim($_POST['deleteStaff']);

	$db->query("UPDATE users SET status = 'deleted' WHERE id = '$id' ");
	echo "User has been sent to archive";
}
elseif (isset($_POST['clerk_id'], $_POST['clerk_name_edit'], $_POST['phone'], $_POST['email'], $_POST['warehouse'])) {
	$clerk_id = (int)trim($_POST['clerk_id']);
	$name = $db->real_escape_string($_POST['clerk_name_edit']);
	$phone = $db->real_escape_string($_POST['phone']);
	$email = $db->real_escape_string($_POST['email']);
	$warehouse = $db->real_escape_string($_POST['warehouse']);

    $previous = $db->query("SELECT * FROM clerks WHERE  id = '$clerk_id' ")->fetch_assoc();

	$upd = $db->query("UPDATE clerks SET name = '$name', phone = '$phone', email = '$email', warehouse = '$warehouse' WHERE id = '$clerk_id' ");
	if ($upd) {
        if ($warehouse != $previous['warehouse']){
            //send notification
            $warehouse_data = $db->query("SELECT * FROM warehouses WHERE id =  '$warehouse'")->fetch_assoc();
            $message = "Dear $name, You have been assigned to monitor warehouse {$warehouse_data['name']} in/at {$warehouse_data['location']}. Please take note of that";
            $message = $db->real_escape_string($message);

            $ins = $db->query("INSERT INTO `notifications`(`id`, `user`, `type`, `content`, `date`, `status`, `ref`) VALUES (NULL, '$clerk_id', 'clerk', '$message', '$time', 'active', '')");
        }
		echo json_encode(['status' => true, 'message' => "Successfully updated clerk details"]);
	}
	else{
		echo json_encode(['status' => false, 'message' => $db->error]);
	}
}
elseif (isset($_POST['changeClerkStatus'], $_POST['status'])) {
	$user_id = (int)trim($_POST['changeClerkStatus']);
	$status = $db->real_escape_string($_POST['status']);

	$db->query("UPDATE clerks SET status = '$status' WHERE id = '$user_id' ");
	echo "done";
}
elseif (isset($_POST['deleteClerk'])) {
	$id = (int)trim($_POST['deleteClerk']);

	$db->query("UPDATE clerks SET status = 'deleted' WHERE id = '$id' ");
	echo "Clerk has been sent to archive";
}
elseif (isset($_POST['filterClerks'])) {
	$house = (int)trim($_POST['filterClerks']);

	if ($house == 0) {
		$read = $db->query("SELECT * FROM clerks WHERE status != 'deleted' ");
	}
	else{
		$read = $db->query("SELECT * FROM clerks WHERE warehouse = '$house' AND status != 'deleted' ");
	}

	$data = [];

	while($row = $read->fetch_assoc()){
		$row['warehouse_data'] = $db->query("SELECT * FROM warehouses WHERE id = '{$row['warehouse']}' ")->fetch_assoc();
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_POST['warehouse_group_name'])) {
	$name = $db->real_escape_string($_POST['warehouse_group_name']);
    $owner_email = $db->real_escape_string($_POST['owner_email']);

	header('Content-Type: application/json; charset=utf-8');
	$check = $db->query("SELECT * FROM districts WHERE name = '$name' ");
	if ($check->num_rows > 0) {
		echo json_encode(['status' => false, 'message' => "$name is already added"]);
	}
	else{
		$ins = $db->query("INSERT INTO `districts`(`id`, `name`, `status`, `owner_email`) VALUES (NULL, '$name', 'active', '$owner_email')");

		if ($ins) {
			echo json_encode(['status' => true, 'message' => "Successfully added warehouse group"]);
		}
		else{
			echo json_encode(['status' => false, 'message' => $db->error]);
		}
	}
}
elseif (isset($_POST['warehouse_id'], $_POST['parent'], $_POST['warehouse_name_edit'], $_POST['location'], $_POST['coordinates'])) {
	$id = (int)trim($_POST['warehouse_id']);
	$parent = (int)trim($_POST['parent']);
	$supervisor = (int)trim($_POST['supervisor']);
	$name = $db->real_escape_string($_POST['warehouse_name_edit']);
	$location = $db->real_escape_string($_POST['location']);
	$coordinates = $db->real_escape_string($_POST['coordinates']);

	header('Content-Type: application/json; charset=utf-8');
	$upd = $db->query("UPDATE warehouses SET name = '$name', location = '$location', coordinates = '$coordinates', parent = '$parent', supervisor = '$supervisor' WHERE id = '$id' ");
	if ($upd) {
		echo json_encode(['status' => true, 'message' => "Successfully updated warehouse details"]);
	}
	else{
		echo json_encode(['status' => false, 'message' => $db->error]);
	}
}
elseif (isset($_POST['updateWarehouseStatus'])) {
	$id = (int)$_POST['updateWarehouseStatus'];
	$status = $db->real_escape_string($_POST['status']);

	$db->query("UPDATE warehouses SET status = '$status' WHERE id = '$id' ");
	echo "done";
}
elseif (isset($_POST['day_id'], $_POST['edit_start_time'], $_POST['edit_end_time'])) {
	$id = (int)trim($_POST['day_id']);
	//$data = $db->query("SELECT * FROM days WHERE id = '$id' ")->fetch_assoc();
	$start_time = $_POST['edit_start_time'];
	$end_time = $_POST['edit_end_time'];

	$data = $db->query("SELECT * FROM days WHERE id = '$id' ")->fetch_assoc();
	$day = date('d M Y',$data['starttime']);

	$startTime = strtotime(date($day.' '.$start_time));
	$endTime = strtotime(date($day.' '.$end_time));

	$init = strtotime(date('d M Y',$endTime));
	$final = $init + (23.5 * 3600);

	//check the overtimes
	$hours = calculateOvertime($startTime,$endTime);

	if (date('N', $endTime) >= 6) {
		//weekend

		$dif = $endTime - $startTime;
		$hours = (int)round($dif / 3600,0);

		$hours = $hours <= 4 ? 5 : 10;
	}

	$db->query("UPDATE days SET starttime = '$startTime', endtime = '$endTime', overtime = '$hours' WHERE id = '$id' ");

	if ($hours > 0) {
		//overtime detected
		//check if already added
		$check = $db->query("SELECT * FROM overtime WHERE user = '{$data['user']}' AND `date` BETWEEN $init AND $final ");
		if ($check->num_rows > 0) {
			$db->query("UPDATE overtime SET amount = '$hours' WHERE user = '{$data['user']}' AND `date` BETWEEN $init AND $final ");
		}
		else{
			$ins = $db->query("INSERT INTO `overtime`(`id`, `user`, `warehouse`, `type`, `amount`, `date`, `status`, `reason`) VALUES (NULL, '{$data['user']}','{$data['warehouse']}', 'hours','$hours', '$endTime', 'saved', 'System generated')");
		}
	}
	else{
		//no overtime
		//delete if available
		$db->query("DELETE FROM overtime WHERE user = '{$data['user']}' AND `date` BETWEEN $init AND $final ");
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode(['status' => true, 'message' => "Success"]);
}
elseif (isset($_POST['question_id'], $_POST['question_edit'], $_POST['positive'], $_POST['negative'])) {
	$id = (int)trim($_POST['question_id']);
	$question = $db->real_escape_string($_POST['question_edit']);
	$positive = $db->real_escape_string($_POST['positive']);
	$negative = $db->real_escape_string($_POST['negative']);

	$upd = $db->query("UPDATE questions SET question = '$question', positive = '$positive', negative = '$negative' WHERE id = '$id' ");
	if ($upd) {
		echo json_encode(['status' => true, 'message' => "Successfully updated question details"]);
	}
	else{
		echo json_encode(['status' => false, 'message' => $db->error]);
	}
}
elseif (isset($_POST['admin_new_password'])) {
	$password = md5($_POST['admin_new_password']);
	$user_id = $_SESSION['user_id'];

	$db->query("UPDATE users SET password = '$password' WHERE id = '$user_id' ");

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode(['status' => true, 'message' => "Success"]);
}
elseif (isset($_POST['resetPassword'])) {
	$clerk_id = (int)trim($_POST['resetPassword']);

	$db->query("UPDATE clerks SET password = md5('1234') WHERE id = '$clerk_id' ");

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode(['status' => true, 'message' => "Success"]);
}
elseif (isset($_POST['resetPasswordStaff'])) {
	$user_id = (int)trim($_POST['resetPasswordStaff']);

	$db->query("UPDATE users SET password = md5('1234') WHERE id = '$user_id' ");

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode(['status' => true, 'message' => "Success"]);
}
elseif (isset($_POST['type'], $_POST['husbandry_name'], $_POST['description'], $_FILES['picture'])) {
	$type = $db->real_escape_string($_POST['type']);
	$name = $db->real_escape_string($_POST['husbandry_name']);
	$description = $db->real_escape_string($_POST['description']);
	
	$filename = $_FILES['picture']['name'];

	if (move_uploaded_file($_FILES['picture']['tmp_name'], "../../uploads/$filename")) {
		$ins = $db->query("INSERT INTO `plantsanimals`(`id`, `name`, `description`, `picture`, `type`) VALUES (NULL, '$name', '$description', '$filename', '$type')");
		echo json_encode(['status' => true]);
	}
	else{
		echo json_encode(['status' => false, 'message' => "Failed to upload file"]);
	}
}
elseif (isset($_GET['getCropAnimals'])) {
	$data = [];

	$read = $db->query("SELECT * FROM plantsanimals");
	while ($row = $read->fetch_assoc()) {
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_POST['activity_title'], $_POST['description'], $_POST['item'])) {
	$title = $db->real_escape_string($_POST['activity_title']);
	$description = $db->real_escape_string($_POST['description']);
	$item = $db->real_escape_string($_POST['item']);
	$picture = "";
	$user_id = $_SESSION['user_id'];

	if (isset($_FILES['picture'])) {
		$picture = $_FILES['picture']['name'];

		move_uploaded_file($_FILES['picture']['tmp_name'], "../../uploads/$picture");
	}

	$ins = $db->query("INSERT INTO `activities`(`id`, `item`, `title`, `description`, `user`, `time`, `status`, `picture`) VALUES (NULL, '$item', '$title', '$description', '$user_id', '$time', 'active', '$picture')");
	echo json_encode(['status' => true]);
}
elseif (isset($_POST['environment_title'], $_POST['description'], $_POST['item'])) {
	$title = $db->real_escape_string($_POST['environment_title']);
	$description = $db->real_escape_string($_POST['description']);
	$item = $db->real_escape_string($_POST['item']);
	$picture = "";
	$user_id = $_SESSION['user_id'];

	if (isset($_FILES['picture'])) {
		$picture = $_FILES['picture']['name'];

		move_uploaded_file($_FILES['picture']['tmp_name'], "../../uploads/$picture");
	}

	$ins = $db->query("INSERT INTO `environment`(`id`, `item`, `title`, `description`, `user`, `time`, `status`, `picture`) VALUES (NULL, '$item', '$title', '$description', '$user_id', '$time', 'active', '$picture')");
	echo json_encode(['status' => true]);
}
elseif (isset($_GET['getEnvironment'])) {
	$item = (int)$_GET['getEnvironment'];

	$data = [];

	$read = $db->query("SELECT * FROM environment WHERE item = '$item' ");
	while ($row = $read->fetch_assoc()) {
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_GET['getActivities'])) {
	$item = (int)$_GET['getActivities'];

	$data = [];

	$read = $db->query("SELECT * FROM activities WHERE item = '$item' ");
	while ($row = $read->fetch_assoc()) {
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_FILES['itemImage'], $_POST['item'])) {
	$filename = $_FILES['itemImage']['name'];
	$item = (int)$_POST['item'];

	if (move_uploaded_file($_FILES['itemImage']['tmp_name'], "../../uploads/".$filename)) {
		$db->query("UPDATE plantsanimals SET picture = '$filename' WHERE id = '$item' ");

		echo json_encode(['status' => true, 'picture' => $filename]);
	}
	else{
		echo json_encode(['status' => false, 'message' => "Failed to upload"]);
	}
}
else{
	//echo "no data";
	var_dump($_POST);
}