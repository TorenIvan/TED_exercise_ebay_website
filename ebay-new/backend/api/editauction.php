<?php

require 'connect.php';

//$_POST = json_decode(file_get_contents('php://input'), true);

// if(isset($_POST) && !empty($_POST)) {

//xss protection and of the user of post method(at the same time 2 things)
// $user_id = htmlspecialchars($_POST['user_id']);
// $buy_price = htmlspecialchars($_POST['buy_price']);
// $currently = htmlspecialchars($_POST['$currently']);
// $first_bid = htmlspecialchars($_POST['first_bid']);
// $number_of_bids = htmlspecialchars($_POST['number_of_bids']);
// $start_date = htmlspecialchars($_POST['start_date']);
// $end_date = htmlspecialchars($_POST['end_date']);
// $pname = htmlspecialchars($_POST['product_name']);
// $pdescription = htmlspecialchars($_POST['product_description']);
// $ptown = htmlspecialchars($_POST['product_town']);
// $pstate = htmlspecialchars($_POST['product_state']);
// $pcountry = htmlspecialchars($_POST['product_country']);
// $paddress = htmlspecialchars($_POST['product_address']);
// $ppostcode = htmlspecialchars($_POST['product_postcode']);
// $platitude = htmlspecialchars($_POST['product_latitude']);
// $plongitude = htmlspecialchars($_POST['product_longitude']);

//example
//// IDEA: pou 8a boi8isei i symela
//pairnoume dedomeno to id tou auction
$idd = 9;
$user_id = 11;
$buy_price = 4000;
$currently = 0.3;
$first_bid = 0.6;
$number_of_bids = 7;
$start_date = new DateTime('2019-07-01 12:30:11');
$result_date = $start_date->format('Y-m-d H:i:s');

$pname = 'lava';
$pdescription = 'exo prama na se xtupo';
$ptown = 'northville';
$pstate = 'huhue';
$pcountry = 'Gkana';
$paddress = '3ion ierarxon';
$ppostcode = 'mouahaha';
$platitude = 0;
$plongitude = 1;
//edo prepei na mas balei to end_date. An den mas to balei pernoume to torino gia ton elegxo kai bazoume NULL sti basi
//to product_id den allazei, ;i mallon den mporei na to allaksei

$sql1 = "UPDATE auction SET buy_price = ?, currently = ?, first_bid = ?, number_of_bids = ?, start_date = ? where id = $idd;";
$sql2 = "UPDATE auction as a inner join product as p SET p.name = ?, p.description = ?, p.country = ?, p.state = ?, p.town = ?, p.address = ?, p.postcode = ?, p.latitude = ?, p.longitude = ?
where (a.product_id = p.id AND a.id = $idd);";

if($stmt1 = mysqli_prepare($con, $sql1)) {
  print_r($sql1);
  #check for start_date
  if ((new DateTime())->format('Y-m-d H:i:s') < $result_date) {
    json_encode("Datetime is wrong\n");
    exit("Datetime is wrong\n");
  }
  mysqli_stmt_bind_param($stmt1, dddis , $param_buy_price, $param_currently, $param_first_bid, $param_number_of_bids, $param_start_date);
  $param_buy_price = $buy_price;
  $param_currently = $currently;
  $param_first_bid = $first_bid;
  $param_number_of_bids = $number_of_bids;
  $param_start_date = $result_date;

  print_r($result_date);
  mysqli_stmt_execute($stmt1);  #ta balame sto auction
  mysqli_stmt_close($stmt1);
  print_r($sql1);
}else {
  print_r("Something is wrong with prepare\n");
  json_encode("Something is wrong with prepare\n");
}

  //proxorame

if ($stmt2 = mysqli_prepare($con, $sql2)) {
  print_r($sql2);
  mysqli_stmt_bind_param($stmt2, sssssssdd, $param_name, $param_description, $param_country, $param_state, $param_town, $param_address, $param_postcode, $param_latitude, $patam_longitude);
  $param_name = $pname;
  $param_description = $pdescription;
  $param_country = $pcountry;
  $param_state = $pstate;
  $param_town = $ptown;
  $param_address = $paddress;
  $param_postcode = $ppostcode;
  $param_latitude = $platitude;
  $patam_longitude = $plongitude;
  mysqli_stmt_execute($stmt2);
  print_r("OLA POPA\n");
  json_encode('OLA POPA');
  mysqli_stmt_close($stmt2);
}else {
  print_r("Something is wrong with second prepare\n");
  json_encode("Something is wrong with second prepare\n");
}


// }else {
//   http_response_code("No one requested this!\n");
// }

?>
