<?php 
require 'db.php';
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Login</title>
	<?php require 'links.php';?>
</head>
<body style="background:#d3d3d4">
<div id="root"></div>
</body>
<?php 
$files = [
	"index.jsx"
];
foreach ($files as $file) {
	echo "<script type='text/babel'>".file_get_contents($file)."</script>";
}
?>
</html>