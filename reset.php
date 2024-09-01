<?php
require 'db.php';

if (isset($_GET['code'], $_GET['ref'])) {
	$id = (int)trim($_GET['ref']);

	$upd = $db->query("UPDATE users SET password = MD5('1234') WHERE id = '$id' ");
}
else{
	header("location: index.php");
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Success</title>
</head>
<body>
	<h1>&nbsp;</h1>
	<center>
		<h3>Successfully resetted paswword</h3>
		<h5>Your new password is <font style="color:blue;">1234</font></h5>
	</center>
</body>
</html>