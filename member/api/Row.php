<?php

class Row {
	public function __construct()
	{
		$this->doc = new DOMDocument();
		$this->doc->loadHTML('<table style="width:512px"><thead><tr></tr></thead></table>');
	}

	public function addCol($width, $content, $attr = []){
		$child = new DOMDocument();
		$child->loadHTML($content);
		$node = $this->doc->importNode($child->getElementsByTagName("body")->item(0)->childNodes->item(0), true);

		$th = $this->doc->createElement("th");
		$th->setAttribute("width", $width."%");
		$th->appendChild($node);

		foreach ($attr as $key => $value) {
			$th->setAttribute($key, $value);
		}

		$this->doc->getElementsByTagName("tr")->item(0)->appendChild($th);
	}

	public function getHTML(){
		return $this->doc->saveXML($this->doc->getElementsByTagName("table")->item(0));
	}
}

function Sorround($html, $color){
	$code = '<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Document</title>
		<style type="text/css">
			.hundred{
				width: 100%;
			}
			.lighter{font-weight:lighter}
			.main-table{'."margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px;width:512px;max-width:512px;background-color:#ffffff;padding:0px;".'}
		</style>
	</head>
	<body style="background-color:$color">
	<table class="main-table">
		
		<tbody>
			<tr>
				<td style="padding:0" class="w3-white">'.$html.'</td>
			</tr>
		</tbody>
	</table>
	</body>
	</html>';

	return $code;
}

/*
$result = $conn->query("SELECT * FROM staff WHERE email = '$email' AND password = '$password' ");
if ($result->num_rows > 0) { 
	$user_row = $result->fetch_assoc(); //now we have the users all data

	if ($user_row['role'] == "admin") { //we are assuming staff table has a column "role"
		// redirect to admin...
		header("location: admin.php");
	}
	elseif ($user_row['role'] == "supervisor") {
		// redirect to supervisor...
		header("location: supervisor.php");
	}
}
else{
	//login failed
}
*/