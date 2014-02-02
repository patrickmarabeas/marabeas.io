<?php

//$getUrl = 'https://api.github.com/repos/patrickmarabeas/ng-FitText.js';
$getUrl = $_GET['url'];
$url = $getUrl . '?client_id=xxxxxxxxxxxxxx&client_secret=xxxxxxxxxxxxxx';
$safeUrl = sanitize($getUrl);
$file = '_'.$safeUrl.'.data';

if (file_exists( $file )) {
    $data = unserialize(file_get_contents( $file ));

    if ($data['timestamp'] > time() - 10 * 60) {
       header('Content-Type: application/json; charset=utf-8');
       echo $data['result'];
    }
    else {
    	APICall( $url, $file );
    }
}
else {
	APICall( $url, $file );
}


function APICall( $url, $file) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Keep-Alive')); //not speeding it up
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5); //not speeding it up
	curl_setopt($ch, CURLOPT_FORBID_REUSE, false); //not speeding it up
	curl_setopt($ch, CURLOPT_ENCODING, 'gzip'); //not speeding it up
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
	$result = curl_exec($ch);
	curl_close($ch);

	$data = array ('result' => $result, 'timestamp' => time());
	file_put_contents( $file, serialize($data));

	header('Content-Type: application/json; charset=utf-8');
	echo $result;
}



function sanitize($string, $force_lowercase = true, $anal = false) {
    $strip = array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "=", "+", "[", "{", "]",
                   "}", "\\", "|", ";", ":", "\"", "'", "&#8216;", "&#8217;", "&#8220;", "&#8221;", "&#8211;", "&#8212;",
                   "â€”", "â€“", ",", "<", ".", ">", "/", "?");
    $clean = trim(str_replace($strip, "", strip_tags($string)));
    $clean = preg_replace('/\s+/', "-", $clean);
    $clean = ($anal) ? preg_replace("/[^a-zA-Z0-9]/", "", $clean) : $clean ;
    return ($force_lowercase) ?
        (function_exists('mb_strtolower')) ?
            mb_strtolower($clean, 'UTF-8') :
            strtolower($clean) :
        $clean;
}

?>
