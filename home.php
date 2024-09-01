<?php 
require 'db.php';
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Green House</title>
	<?php require 'links.php';?>
</head>
<body>
<div id="root">
</div>
</body>
<?php 
$files = [
    'home.jsx'
];
foreach($files as $file){
    echo "<script type=\"text/babel\">".file_get_contents($file)."</script>";
}
?>
</html>