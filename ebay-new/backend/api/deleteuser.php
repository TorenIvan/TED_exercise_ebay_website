<?php

require 'connect.php';

$auctions = [];

//kapos prepei na pairno to user.id edo
//esto oti einai to 11
$idd = 11; //einai tou user, min mperdeuteis me to deleteauction

$sqll = "SELECT auction.id from auction inner join user ON user.id = auction.user_id and user.id = $idd;";

if($resultl = mysqli_query($con,$sqll)){
  $cr = 0;
  while($row = mysqli_fetch_assoc($resultl)){
    $auctions[$cr] = $row['id'];
    $cr++;
  }
  $pli8os = $cr;
  print_r($auctions);

  //delete every auction of user
  for ($i=0; $i < $pli8os; $i++) {
    $sql[$i] ="DELETE a,p from product as p inner join auction as a ON p.id=a.product_id WHERE a.id = $auctions[$i];" ;
    if($result[$i] = mysqli_query($con,$sql[$i])){
      print_r("OLA KALA\n");
    }else {
      json_encode("Something is wrong with mysqli_query");
      print_r("Something is wrong with mysqli_query");
    }
  }

  //now we can delete the user
  $sql = " DELETE from user where id = $idd;";
  if($result = mysqli_query($con,$sql)){
    print_r("OLA KALA, efuges userako\n");
  }else {
    json_encode("Something is wrong with mysqli_query");
    print_r("Something is wrong with mysqli_query");
  }

  }else{
    json_encode("Something new");
    print_r("Something new");
  }

?>
