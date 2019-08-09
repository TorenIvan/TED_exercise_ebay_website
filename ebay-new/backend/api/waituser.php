<?php

#//print_r("Mpikes acceptuser");
require 'signup.php';

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
  #//print_r("Mpikan sto temporary table (lista)\n");

  echo json_encode(99);


}else {
  json_encode("13");
  //print_r("Den mpikan sto userlist\n");
}

#require 'printuserlist.php';
//waits till json decode
//EDO SYMELA-------EDO
//APLA ASE TOUS NA PERINOUN




?>
//print_r
