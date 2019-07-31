<?php

//require 'createlist.php';
require 'puttolist.php';  //ta bazei sti lista prin ta xosei basi

//waits till json decode
//EDO SYMELA-------EDO


$username = "kapoiona";
$flag=0;  //esto

if ($flag===1) {
  print_r("flag is 1\n");
  require 'getfromlist.php';    //kai xwstastivasi
  require 'xwstavasi.php';
}else {
  print_r("flag is NOT 1\n");
  json_decode("Can't access m8. Admin is not intrested in you yet\n.      SORRY!!!!\n");
  print_r("Can't access m8. Admin is not intrested in you yet\n.      SORRY!!!!\n");
}


?>
