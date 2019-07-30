<?php

$sql = "INSERT INTO user (username, password, name, surname, email, phone_number, country, state, town, address, postcode, afm) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
if($stmt = mysqli_prepare($con, $sql)) {
  mysqli_stmt_bind_param($stmt, "sssssssssssi", $uusername, $ppassword, $nname, $ssurname, $eemail, $pphone_number, $ccountry, $sstate, $ttown, $aaddress, $ppostcode, $aafm);
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
  mysqli_stmt_execute($stmt);
  print_r("executed\n");


}else {
  json_encode("10");
}

?>
