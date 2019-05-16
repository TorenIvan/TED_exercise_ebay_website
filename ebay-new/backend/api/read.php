<?php

require 'connect.php';

$auctions = [];
$sql = "SELECT * FROM auction";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $auctions[$cr]['id']    = $row['id'];
    $auctions[$cr]['user_id'] = $row['user_id'];
    $auctions[$cr]['product_id'] = $row['product_id'];
    $auctions[$cr]['buy_price'] = $row['buy_price'];
    $auctions[$cr]['currently'] = $row['currently'];
    $auctions[$cr]['first_bid'] = $row['first_bid'];
    $auctions[$cr]['number_of_bids'] = $row['number_of_bids'];
    $auctions[$cr]['start_date'] = $row['start_date'];
    $auctions[$cr]['end_date'] = $row['end_date'];
    $cr++;
  }

  echo json_encode($auctions);
}
else
{
  http_response_code(404);
}

?>