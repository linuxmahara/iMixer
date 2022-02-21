<?php
	ini_set('display_errors', 1);
    $image = $_POST['image'];
    $time = round(microtime(true) * 1000);

    $image = str_replace('data:image/png;base64,', '', $image);
    $decoded = base64_decode($image);

    file_put_contents("../captures/" . $time . ".png", $decoded, LOCK_EX);
	echo $time;
?>