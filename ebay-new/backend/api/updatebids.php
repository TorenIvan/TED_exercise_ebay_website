<?php

require 'connect.php';

// $_POST = json_decode(file_get_contents('php://input'), true);
//
// if(isset($_POST) && !empty($_POST)) {

//$auction_id = htmlspecialchars($_POST['auction_id']);
  $auction_id = 12;
  $sql1 = "SELECT * from bids WHERE auction_id = $auction_id;";
  $result1=mysqli_query($con,$sql1);
  if ($result1->num_rows === 0) { //den yparxoun bids gia to auction
    $sql = "INSERT INTO bids (auction_id) VALUES ($auction_id);";
    $sql2 = "SELECT * from bids where id = $auction_id;";
    $result = mysqli_query($con,$sql)
    $result2 = mysqli_query($con,$sql2)
    while ($row = mysqli_fetch_assoc($result2)){
      $idd = $row['id'];
    }
    $sql3 = "SELECT * from auction WHERE auction_id = $auction_id;";
    $result3 = mysqli_query($con,$sql3);
    while ($row = mysqli_fetch_assoc($result3)){
      $user_id = $row['user_id'];
      $buy_price = $row['buy_price']
    }
    $datetime = new DateTime())->format('Y-m-d H:i:s');
    $sql4 = "INSERT INTO bid (bids_id, user_id, time_of_bid, amount_of_money) VALUES ($idd, $user_id, $datetime, $buy_price);";
    $result4 = mysqli_query($con,$sql4);
  } else {// yparxoun bids gia to auction_id. Arkei na kanoume insert sto table bid to neo bid
    $datetime = new DateTime())->format('Y-m-d H:i:s');
    $sql = "UPDATE bid SET ;";
  }


// }else {
//   http_response_code("No one requested this!\n");
// }


 ?>
