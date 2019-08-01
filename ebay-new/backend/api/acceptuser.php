<?php

print_r("Mpikes acceptuser");

$sqluserlist = "INSERT INTO userlist (username, password, name, surname, email, phone_number, country, state, town, address, postcode, afm) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
if($stmtuserlist = mysqli_prepare($con, $sqluserlist)) {
  mysqli_stmt_bind_param($stmtuserlist, "sssssssssssi", $uusername, $ppassword, $nname, $ssurname, $eemail, $pphone_number, $ccountry, $sstate, $ttown, $aaddress, $ppostcode, $aafm);
  $uusername=$param_username;
  $ppassword=$new_pass;
  $nname=$name;
  $ssurname=$surname;
  $eemail=$param_email;
  $pphone_number=$param_phone_number;
  $ccountry=$country;
  $sstate=$state;
  $ttown=$town;
  $aaddress=$address;
  $ppostcode=$postcode;
  $aafm=$param_afm;


  //execute and insert into the db
  mysqli_stmt_execute($stmtuserlist);
  print_r("Mpikan sto temporary table (lista)\n");


}else {
  json_encode("13");
  print_r("Den mpikan sto userlist\n");
}

require 'printuserlist.php';
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
