<?php

  require 'connect.php';

  $auctions = [];

  $sql="select auction.id as auction_id, user.id as user_id, user.name as user_name from auction right join user on user.id=auction.user_id";

  if ($result=mysqli_query($con,$sql)) {
    $cr = 0;
    while($row = mysqli_fetch_assoc($result)){
      if (empty($row('auction_id'))) {
        continue;
      }
      $auctions[$cr]['id']    = $row['auction_id'];
      $auctions[$cr]['user_id'] = $row['user_id'];
      $auctions[$cr]['user_name'] = $row['user_name'];
      $cr++;
    }
    print_r($auctions);
    json_encode($auctions);
  } else {
    json_encode("1");
  }

?>
