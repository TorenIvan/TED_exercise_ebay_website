<?php

require 'connect.php';

$data =[];

$sql = "SELECT product.description as description, auction.user_id as user_id, product.name as name from product, auction where product.id = auction.product_id AND auction.user_id <> 14923 ORDER BY RAND() LIMIT 5;";
if($result = mysqli_query($con,$sql)) {
  $cr = 0;
  while($row = mysqli_fetch_assoc($result)){
    echo $data[$cr]['description'] = $row['description'];
    echo $data[$cr]['name'] = $row['name'];
    echo $data[$cr]['user_id'] = $row['user_id'];
    $cr++;
  }
}

 ?>
