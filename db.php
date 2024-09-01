<?php 
$db = new mysqli("localhost", "root", "", "ulimi");

$config = [
	'name' => "CSL App",
	'intro' => "CSL App",
	'base_url' => "http://192.168.43.128/ufanuzi/"
];

/**
 * VALUES CLASS
 */
class Values
{
	
	function __construct($db)
	{
		$this->db = $db;
	}

	public function get($name)
	{
		$read = $this->db->query("SELECT * FROM `values` WHERE name = '$name' ");
		if ($read->num_rows > 0) {
			return $read->fetch_assoc()['value'];
		}
		else{
			return null;
		}
	}

	public function set($name, $value)
	{
		$read = $this->db->query("SELECT * FROM `values` WHERE name = '$name' ");
		if ($read->num_rows > 0) {
			$this->db->query("UPDATE `values` SET value = '$value' WHERE name = '$name' ");
		}
		else{
			$this->db->query("INSERT INTO `values`(`id`, `name`, `value`) VALUES (NULL, '$name', '$value')");
		}
	}
}
?>