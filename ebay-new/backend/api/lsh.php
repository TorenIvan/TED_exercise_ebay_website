<?php

require 'connect.php';

$data =[];

$sql = "SELECT product.description as description from product, bid ,bids, auction where bid.user_id = 14923 and bid.bids_id = bids.id and bids.auction_id = auction.id and auction.product_id = product.id;";
if($result = mysqli_query($con,$sql)) {
  $cr = 0;
  while($row = mysqli_fetch_assoc($result)){
    $data = $row['description'];
    //echo $data;
    echo shell_exec("python lsh.py $data");
    $cr++;
  }
}

 ?>
