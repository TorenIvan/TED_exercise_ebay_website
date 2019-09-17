<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);
//
if(isset($_POST) && !empty($_POST)) {

  $auction_id = htmlspecialchars($_POST['aId']);
  $user_id = htmlspecialchars($_POST['uId']);
  $amount_of_money = htmlspecialchars($_POST['amount_of_money']);
  $buy_price = htmlspecialchars($_POST['buy_price']);

  // $auction_id = 11;
  // $user_id = 16;
  // $amount_of_money = 10000000;
  // $buy_price = 123456;

  if ($amount_of_money >= $buy_price AND $buy_price > 0) {
    $flag = 1;
    $sql99 = "UPDATE auction SET flag = 1 WHERE id = $auction_id";
    $result99 = mysqli_query($con,$sql99);
    //echo json_encode("Sfragisto");
  }
  $sql1 = "SELECT * from bids WHERE auction_id = $auction_id;";
  $result1=mysqli_query($con,$sql1);
  $assoc = mysqli_fetch_assoc($result1);
  if (!$assoc) { //den yparxoun bids gia to auction
    $sql = "INSERT INTO bids (auction_id) VALUES ($auction_id);";
    $sql2 = "UPDATE auction SET currently = $amount_of_money, first_bid = $amount_of_money, number_of_bids = 1 WHERE id = $auction_id;";
    $result = mysqli_query($con,$sql);
    $result2 = mysqli_query($con,$sql2);
  }else{
    $sql2 = "UPDATE auction SET currently = $amount_of_money, number_of_bids = number_of_bids+1 WHERE id = $auction_id;";
    $result2 = mysqli_query($con,$sql2);
  }
  $sql3 = "SELECT * FROM bids WHERE auction_id = $auction_id;";
  $result3 = mysqli_query($con,$sql3);
  while($row = mysqli_fetch_assoc($result3)){
    $bids_id = $row['id'];
  }
  $datetime = (new DateTime())->format('Y-m-d H:i:s');
  $datetime = (string) $datetime;
  $sql4 = "INSERT INTO bid (bids_id, user_id, time_of_bid, amount_of_money) VALUES ($bids_id, $user_id, '$datetime', $amount_of_money);";
  $result4 = mysqli_query($con,$sql4);

}else {
  http_response_code("No one requested this!\n");
}


 ?>
