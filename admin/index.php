<?php 
session_start();
require '../db.php';

if(isset($_SESSION['user_id'], $_SESSION['data'])){
	$user_id = $_SESSION['user_id'];
}
else{
	header("location: ../logout.php");
}
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
		.bcenter{
	        display: inline-flex;
	        flex-flow: column nowrap;
	        justify-content: center;
	        align-items: center;
	    }
	</style>
</head>
<body>
<div id="root"></div>
</body>
<?php

$files = [
	"index.jsx",
	'forms.jsx'
];

foreach ($files as $file) {
	echo "<script type='text/babel'>".file_get_contents($file)."</script>";
}
?>
</html>