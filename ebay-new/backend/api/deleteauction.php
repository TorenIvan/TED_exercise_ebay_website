<?php

require 'connect.php';

//assuming you giving me the id of auction
//delete product from auction and then auction
//den xreiazetai prepared statements ka8os o front end mas dinei apla to id kai den uparxei kapoio post
//esto id = 9;

$idd = 13;

$sql ="DELETE a,p from product as p inner join auction as a ON p.id=a.product_id WHERE a.id = $idd;" ;
if($result = mysqli_query($con,$sql)){
  print_r("OLA KALA");
}else {
  json_encode("Something is wrong with mysqli_query");
  print_r("Something is wrong with mysqli_query");
}


 ?>
