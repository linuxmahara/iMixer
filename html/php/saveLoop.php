<?php
	$data = file_get_contents($_FILES['audio']['tmp_name']);    
    $time = round(microtime(true) * 100);

	$fp = fopen("../loops/" . $time . ".mp3", "wb");

	fwrite($fp, $data);
	fclose($fp);
	echo $time;
?>