<?php 
require '../db.php';
require 'device.php';

$client = new client_info;
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Member</title>
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
<body style="background:#f1f1f1">
<div id="root"></div>
</body>
<?php 

if ($client->device == "desktop") {
	$files = [
		"desktop/index.jsx"
	];
}
else{
	$files = [
		"mobile/index.jsx"
	];
}
foreach ($files as $file) {
	echo "<script type='text/babel'>".file_get_contents($file)."</script>";
}
?>
</html>