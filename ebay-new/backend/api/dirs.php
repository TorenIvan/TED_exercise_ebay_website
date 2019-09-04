<?php

//$images = "Images";
$idltlt = date('Format String', time());
$e = "/";

$get_path = realpath('../../src/assets').PHP_EOL;

//$folder = $get_path.$e.$images.$id;
$folder = $get_path.$e.$idltlt;

$foldy = preg_replace('/\s/', '', $folder);

//echo $foldy;
if (!is_dir($foldy)) {
  mkdir($foldy, 0777, true);
}

?>
