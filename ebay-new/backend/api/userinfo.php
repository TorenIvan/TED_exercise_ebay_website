<?php

require 'connect.php';

$user = [];

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {
    $idd = $_POST['id'];

  $sql = "SELECT * FROM user where id = $idd";

  if($result=mysqli_query($con,$sql)){
    // Process all rows
    $count=0;
    while($row = mysqli_fetch_assoc($result))
    {
      // echo "mpikes";
      $user[$count]['id'] = $row['id'];
      $user[$count]['username'] = $row['username'];
      $user[$count]['name'] = $row['name'];
      $user[$count]['surname'] = $row['surname'];
      $user[$count]['email'] = $row['email'];
      $user[$count]['phone_number'] = $row['phone_number'];
      $user[$count]['country'] = $row['country'];
      $user[$count]['state'] = $row['state'];
      $user[$count]['town'] = $row['town'];
      $user[$count]['address'] = $row['address'];
      $user[$count]['postcode'] = $row['postcode'];
      $user[$count]['afm'] = $row['afm'];
      $user[$count]['rating_bidder'] = $row['rating_bidder'];
      $user[$count]['rating_seller'] = $row['rating_seller'];
      $count++;
    }
    echo json_encode($user);
    // print_r($user);
  }else{
    echo json_encode('aa');

  }
}else {
    // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
    http_response_code(404);
}

?>
