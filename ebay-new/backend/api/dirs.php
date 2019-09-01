<?php

//$images = "Images";
$id = 4;
$e = "/";

$get_path = realpath('../../src/assets').PHP_EOL;

//$folder = $get_path.$e.$images.$id;
$folder = $get_path.$e.$id;

$foldy = preg_replace('/\s/', '', $folder);

echo $foldy;
if (!is_dir($foldy)) {
  mkdir($foldy, 0777, true);
}

?>
