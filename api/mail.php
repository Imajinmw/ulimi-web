<?php
function curl_post($url, array $post = NULL, array $options = array()) { 
	$defaults = array( 
		CURLOPT_POST => 1, 
		CURLOPT_HEADER => 0, 
		CURLOPT_URL => $url, 
		CURLOPT_FRESH_CONNECT => 1, 
		CURLOPT_RETURNTRANSFER => 1, 
		CURLOPT_FORBID_REUSE => 1, 
		CURLOPT_TIMEOUT => 4, 
		CURLOPT_POSTFIELDS => http_build_query($post) 
	); 

	$ch = curl_init(); 
	curl_setopt_array($ch, ($options + $defaults)); 
	if( ! $result = curl_exec($ch)) { 
		//trigger_error(curl_error($ch)); 
		return false;
	} 
	else{
		return $result;
	}
	curl_close($ch);
}

function sendEmail($to, $subject, $message)
{
	global $db;
	$to = $db->real_escape_string($to);
	$subject = $db->real_escape_string($subject);
	$message = $db->real_escape_string($message);

	$from = "ellentaniaphiri@gmail.com";
	
	// $ins = $db->query("INSERT INTO `emails`(`id`, `receiver`, `subject`, `message`) VALUES (NULL, '$to', '$subject', '$message')");
	// if (!$ins) {
	// 	file_put_contents('email_log.txt', file_get_contents('email_log.txt')."||".$db->error);
	// }
	return curl_post("https://adimo-shopping.com/saved/mail.php", ['from' => $from, 'email' => $to, 'subject' => $subject, 'message' => $message], []);
}

function sendMessage($to, $message)
{
	global $db;
	$to = $db->real_escape_string($to);
	//$subject = $db->real_escape_string($subject);
	$message = $db->real_escape_string($message);
	$time = time();

	//$from = "ellentaniaphiri@gmail.com";
	
	$ins = $db->query("INSERT INTO `messages`(`id`, `receiver`, `message`, `date`) VALUES (NULL, '$to', '$message', '$time')");
	if (!$ins) {
		file_put_contents('email_log.txt', file_get_contents('email_log.txt')."||".$db->error);
	}
	return curl_post("http://localhost/sms/", ['phone' => $to, 'message' => $message], []);
}
?>