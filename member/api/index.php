<?php 
require "../../db.php";
require "../../functions.php";
require 'vendor/autoload.php';
require 'Row.php';

use \InlineStyle\InlineStyle;

$values = new Values($db);
if ($values->get("minimum") == null) {
	$values->set("minimum", 3000);
}

$time = time();

if (isset($_GET['getReferrals'])) {
	$id = (int)trim($_GET['getReferrals']);

	$data = [];

	$read = $db->query("SELECT * FROM members WHERE parent = '$id' ");
	while($row = $read->fetch_assoc()){
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_POST['update_profile'], $_POST['fullname'], $_POST['email'], $_POST['phone'])) {
	$user_id = (int)trim($_POST['update_profile']);
	$username = $db->real_escape_string($_POST['fullname']);
	$email = $db->real_escape_string($_POST['email']);
	$phone = $db->real_escape_string($_POST['phone']);

	$r = $db->query("SELECT * FROM members WHERE id = '$user_id' ");
	if ($r->num_rows > 0) {
		$data = $r->fetch_assoc();

		//validate
		if (strlen($username) > 2) {
			$n_chars = explode(" ", $username);
			if (count($n_chars) > 3) {
				echo json_encode(['status' => false, 'type' => 'username', 'message' => "Not more than 3 words"]);
			}
			else{
				if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
					$res = validatePhone($phone);
					if ($res[0]) {
						// code...
						//check if phone is used
						$check = $db->query("SELECT * FROM members WHERE phone = '$phone' AND id != '$user_id' OR email = '$email' AND id != '$user_id' ");
						if ($check->num_rows > 1) {
							echo json_encode(['status' => false, 'type' => 'general', 'message' => "Phone or email are already used"]);
						}
						else{
							//update
							$upd = $db->query("UPDATE members SET name = '$username', phone = '$phone', email = '$email' WHERE id = '$user_id' ");
							echo json_encode(['status' => true, 'type' => 'email', 'message' => "Success"]);
						}
					}
					else{
						echo json_encode(['status' => false, 'type' => 'phone', 'message' => $res[1]]);
					}
				}
				else{
					echo json_encode(['status' => false, 'type' => 'email', 'message' => "Invalid email"]);
				}
			}
		}
		else{
			echo json_encode(['status' => false, 'type' => 'username', 'message' => "Too short, atleast 3"]);
		}
	}
	else{
		echo json_encode(['status' => false, 'type' => 'general', 'message' => "Invalid data! Contact administrator"]);
	}
}
elseif (isset($_POST['update_profile'], $_POST['old_password'], $_POST['new_password'])) {
	$user_id = $db->real_escape_string($_POST['update_profile']);
	$old = md5($_POST['old_password']);
	$new = md5($_POST['new_password']);

	$check = $db->query("SELECT * FROM members WHERE id = '$user_id' AND password = '$old' ");
	if ($check->num_rows > 0) {
		$upd = $db->query("UPDATE members SET password = '$new' WHERE id = '$user_id' ");
		echo json_encode(['status' => true, 'type' => 'email', 'message' => "Success"]);
	}
	else{
		echo json_encode(['status' => false, 'type' => 'email', 'message' => "Old password is incorrect"]);
	}
}
elseif (isset($_GET['getVerified'])) {
	$user_id = (int)trim($_GET['getVerified']);

	header('Content-Type: application/json; charset=utf-8');

	$check = $db->query("SELECT * FROM members WHERE id = '$user_id' ");
	if ($check->num_rows >0) {
		$data = $check->fetch_assoc();
		echo json_encode(['status' => true, 'verified' => $data['status']=="registered"?false:true]);
	}
	else{
		echo json_encode(['status' => false]);
	}
}
elseif (isset($_GET['sendConfirmEmail'])) {
	error_reporting(0);
	$user_id = (int)trim($_GET['sendConfirmEmail']);
	$check = $db->query("SELECT * FROM members WHERE id = '$user_id' ");
	if ($check->num_rows >0) {
		$data = $check->fetch_assoc();
		//send


    $row = new Row();
    $row->addCol(50, "<h2 class='pl-15'>Khobidi Coin</h2>", ['align' => "left"]);
    $row->addCol(50, "<img src='https://adimo-shopping.com/images/ea.png' height='35'>", ['align' => "right", 'class' => "pr-15"]);

    $html = $row->getHTML();
    $html = '<div class="w3-center border w3-round-large pt-30 pb-30 pl-15 pr-15">
        <center><img src="https://adimo-shopping.com/images/ea.png" height="40">
        <br />
        <font class="w3-xlarge">Verify your email</w3-xlarge>
        <p class="w3-small">Hello <b>'.$data['name'].'</b>, In order to start using your '.$config['name'].' account, you need to confirm your email address by clicking on <b>Verify Email Address</b> below. '.rand(10001,90009).'</p>
        </center>
    </div>
    <div class="w3-center pt-20 pb-20 w3-center"><a href="'.$config['base_url'].'verify.php?ref='.base64_encode(encrypt($user_id, "Dunamis150@")).'" class="btn btn-color w3-round-large" style="text-decoration:none" target="_blank">Verify Email Address</a></div>
    <hr />
    <center>
    	<p>You\'ve received this confirmation email to update you about your availability on '.$config['name'].'</p>
    </center>
    <hr />
    <center>
    	<img src="https://adimo-shopping.com/images/ea_logo.png" height="32" class="w3-opacity"><br><br>
    </center>
    ';


    $html = Sorround($html, "white");

    
    $htmldoc = new InlineStyle($html);
    $htmldoc->applyStylesheet(file_get_contents("../../vendor/bootstrap/css/bootstrap.min.css"));
    //$htmldoc->applyStylesheet(file_get_contents("../../style.css"));
    $htmldoc->applyStylesheet(file_get_contents("../../w3css/default.css"));
    $htmldoc->applyStylesheet(file_get_contents("../../w3css/w3.css"));

    $html = $htmldoc->getHTML();
    file_put_contents("demo.php", $html);

    require 'mail.php';
    echo sendEmail($data['email'], $config['name'].": Verify your email address", $html);
	}
	else{
		//do nothing
	}
}
elseif (isset($_GET['getReferrers'])) {
	$user_id = (int)trim($_GET['getReferrers']);

	$people = [];
	$can =true; $level = 1;
	$percents = [
		1 => 12,
		2 => 6,
		3 => 4
	];

	while ($can && $level < 4) {
		$data = $db->query("SELECT * FROM members WHERE id = '$user_id' ")->fetch_assoc();
		if ($data['parent'] != 0) {
			$p = $db->query("SELECT * FROM members WHERE id = '{$data['parent']}' ")->fetch_assoc();
			$p['level'] = $level;
			$p['percent'] = $percents[$level];
			array_push($people, $p);
			$level += 1;
		}
		else{
			$can = false;
		}
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($people);
}
elseif (isset($_GET['getDashboardData'])) {
	$user_id = (int)trim($_GET['getDashboardData']);

	$data['crypto'] = (int)$db->query("SELECT SUM(amount) AS total FROM deposits WHERE member = '$user_id' ")->fetch_assoc()['total'];

	$data['withdraw'] = $data['crypto'] - (int)$values->get("minimum");

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_POST['user_id'], $_POST['state'], $_POST['withdraw_amount'], $_POST['withdraw_password'])) {
	$user_id = (int)trim($_POST['user_id']);
	$state = $db->real_escape_string($_POST['state']);
	$amount = (int)trim($_POST['withdraw_amount']);
	$password = md5($_POST['withdraw_password']);

	//header('Content-Type: application/json; charset=utf-8');
	$check = $db->query("SELECT * FROM members WHERE id = '$user_id' AND password = '$password' ");
	if ($check->num_rows > 0) {
		$balance = (int)$db->query("SELECT SUM(amount) AS total FROM deposits WHERE member = '$user_id' ")->fetch_assoc()['total'];
		if ($balance >= $amount + (int)$values->get("minimum")) {
			//save the withdraw request
			$ins = $db->query("INSERT INTO `withdraw_requests`(`id`, `member`, `amount`, `time`, `status`, `admin`) VALUES (NULL, '$user_id', '$amount', '$time', 'sent', '0')");
			if ($ins) {
				echo json_encode(['status' => true]);
			}
			else{
				echo json_encode(['status' => false, 'message' => $db->error]);
			}
		}
		else{
			echo json_encode(['status' => false, 'message' => "Residual balance does not meet the minimum amount."]);
		}
	}
	else{
		echo json_encode(['status' => false, 'message' => "Password is incorrect"]);
	}
}
elseif (isset($_POST['user_id'], $_POST['state'], $_POST['withdraw_amount'])) {
	$user_id = (int)trim($_POST['user_id']);
	$state = $db->real_escape_string($_POST['state']);
	$amount = (int)trim($_POST['withdraw_amount']);
	
	//header('Content-Type: application/json; charset=utf-8');
	$check = $db->query("SELECT * FROM members WHERE id = '$user_id' ");
	if ($check->num_rows > 0) {
		$balance = (int)$db->query("SELECT SUM(amount) AS total FROM deposits WHERE member = '$user_id' ")->fetch_assoc()['total'];
		if ($balance >= $amount + (int)$values->get("minimum")) {
			echo json_encode(['status' => true, 'balance' => $balance]);
		}
		else{
			echo json_encode(['status' => false, 'message' => "Residual balance does not meet the minimum amount. Try less than MWK".($balance-$values->get("minimum"))]);
		}
	}
	else{
		echo json_encode(['status' => false, 'message' => "Unknown user! Try logging out and login again"]);
	}
}
elseif (isset($_GET['getNotifications'])) {
	$user_id = (int)trim($_GET['getNotifications']);

	$data = [];
	$read = $db->query("SELECT * FROM notifications WHERE user = '$user_id' ");
	while ($row = $read->fetch_assoc()) {
		$row['time'] = date('D d-M-Y, H:i A', $row['time']);
		array_push($data, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($data);
}
elseif (isset($_GET['getReferralData'])) {
	$user_id = (int)trim($_GET['getReferralData']);

	$earnings = [];
	$total = 0;
	$read = $db->query("SELECT * FROM deposits JOIN members ON deposits.ref = members.id WHERE member = '$user_id' ");
	while ($row = $read->fetch_assoc()) {
		$row['time'] = date('D d-M-Y, H:i A', $row['time']);
		array_push($earnings, $row);
		$total += $row['amount'];
	}

	$registration = [];
	$read = $db->query("SELECT * FROM referrals JOIN members ON referrals.child = members.id WHERE referrals.parent = '$user_id' ");
	while ($row = $read->fetch_assoc()) {
		array_push($registration, $row);
	}

	echo json_encode(['earnings' => $earnings, 'registration' => $registration, 'amount' => $total]);
}
elseif (isset($_GET['getUser'])) {
	$id = (int)trim($_GET['getUser']);

	header('Content-Type: application/json; charset=utf-8');
	$read = $db->query("SELECT * FROM members WHERE id = '$id' ");
	if ($read) {
		$data = $read->fetch_assoc();
		$data['account_status'] = $data['status'];
		$data['status'] = true;
		echo json_encode($data);
	}
	else{
		echo json_encode(['status' => false, 'message' => "Unknown user! Try logging out and login again"]);
	}
}
elseif (isset($_GET['getConfig'])) {
	$read = $db->query("SELECT * FROM `values`");
	while ($row = $read->fetch_assoc()) {
		$config[$row['name']] = $row['value'];
	}
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($config);
}
?>