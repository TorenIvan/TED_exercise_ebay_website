<?php

//prwta ta pairnoume apo to table userlist, vasi onomatos tou user

//kai twra ta bazoume sto swsto table(dld tou user)
$sql = "INSERT INTO user (username, password, name, surname, email, phone_number, country, state, town, address, postcode, afm) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
if($stmt = mysqli_prepare($con, $sql)) {
  mysqli_stmt_bind_param($stmt, "sssssssssssi", $uusername, $ppassword, $nname, $ssurname, $eemail, $pphone_number, $ccountry, $sstate, $ttown, $aaddress, $ppostcode, $aafm);
  $uusername=$param['username'];
  $ppassword=$param['password'];
  $nname=$param['name'];
  $ssurname=$param['surname'];
  $eemail=$param['email'];
  $pphone_number=$param['phone_number'];
  $ccountry=$param['country'];
  $sstate=$param['state'];
  $ttown=$param['town'];
  $aaddress=$param['address'];
  $ppostcode=$param['postcode'];
  $aafm=$param['afm'];

  //execute and insert into the db
  mysqli_stmt_execute($stmt);
  echo json_encode("executed");


}else {
  json_encode("10");
}

?>
