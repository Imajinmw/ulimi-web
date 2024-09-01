<?php 
session_start();
require '../db.php';
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Admin</title>
	<?php require 'links.php';?>
	<style type="text/css">
		.tlink{
			padding: 4px 12px;
			cursor: pointer;
			border-radius: 3px;
			color: black;
		}
		.tlink:hover, .tlink.active{
			background: #d4edda;
			color: #155724;
		}
		.tlink.mobile{
			padding: 8px 24px;
			width: 100%;
			display: block;
			font-size: 1.1rem;
			font-weight: bold;
		}
	</style>
</head>
<body>
<div id="root"></div>
</body>
<?php 

if (isset($_SESSION['admin_id'])) {
	$files = [
		"mobile.jsx"
	];
}
else{
	$files = [
		"login.jsx"
	];
}

foreach ($files as $file) {
	echo "<script type='text/babel'>".file_get_contents($file)."</script>";
}
?>
</html>