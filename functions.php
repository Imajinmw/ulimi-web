<?php

function validatePhone($phone){
	if (strlen($phone) == 10 OR strlen($phone) == 13) {
		$allowed = [0,1,2,3,4,5,6,7,8,9];
		if (strlen($phone) == 10) {
			$caught = [];

			for ($i=0; $i < strlen($phone); $i++) { 
				if (!in_array($phone[$i], $allowed)) {
					array_push($caught, $phone[$i]);
				}
			}

			if (count($caught) > 0) {
				return [false, "Unsupported characters: ".implode(",", $caught)];
			}
			else{
				return [true, "Valid"];
			}
		}
		else{
			$start = substr($phone, 0, 4);
			if ($start == "+265") {
				// code...
				$left = substr($phone, 4);

				$caught = [];

				for ($i=0; $i < strlen($left); $i++) { 
					if (!in_array($left[$i], $allowed)) {
						array_push($caught, $left[$i]);
					}
				}

				if (count($caught) > 0) {
					return [false, "Unsupported characters: ".implode(",", $caught)];
				}
				else{
					return [true, "Valid"];
				}
			}
			else{
				return [false, "Start with +265"];
			}
		}
	}
	else{
		return [false, "Unsupported length"];
	}
}

function encrypt($plaintext, $key, $cipher = "aes-256-gcm") {
    if (!in_array($cipher, openssl_get_cipher_methods())) {
        return false;
    }

    $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($cipher));
    $tag = null;

    $ciphertext = openssl_encrypt(
        gzcompress($plaintext),
        $cipher,
        base64_decode($key),
        $options=0,
        $iv,
        $tag,
    );

    return json_encode(
        array(
            "ciphertext" => base64_encode($ciphertext),
            "cipher" => $cipher,
            "iv" => base64_encode($iv),
            "tag" => base64_encode($tag),
        )
    );
}

function decrypt($cipherjson, $key) {
    try {
        $json = json_decode($cipherjson, true, 2,  JSON_THROW_ON_ERROR);
    } catch (Exception $e) {
        return false;
    }
    return gzuncompress(
        openssl_decrypt(
            base64_decode($json['ciphertext']),
            $json['cipher'],
            base64_decode($key),
            $options=0,
            base64_decode($json['iv']),
            base64_decode($json['tag'])
        )
    );
}

function calculateOvertime($startTime,$endTime){
	global $values;

	$limit_start = strtotime(date('d M Y',$startTime)." ".$values->get("start_time"));
	$limit_end = strtotime(date('d M Y',$endTime)." ".$values->get("end_time"));

	$hours = 0;

	if ($startTime < $limit_start) {
		$dif = $limit_start - $startTime;

		$hours += (int) round($dif / 3600, 0);
	}

	if ($endTime > $limit_end) {
		$dif = $endTime - $limit_end;

		$hours += (int) round($dif / 3600, 0);
	}

	return $hours;
}