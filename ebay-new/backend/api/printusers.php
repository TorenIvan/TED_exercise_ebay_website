<?php

require 'connect.php';

$users = [];

$sql = "SELECT * FROM user";

if($result=mysqli_query($con,$sql)){
  // Process all rows
  $count=0;
  while($row = mysqli_fetch_assoc($result))
  {
    // echo "mpikes";
    $users[$count]['id'] = $row['id'];
    // $users[$count]['user_category_id'] = $row['user_category_id'];
    $users[$count]['username'] = $row['username'];
    // $users[$count]['password'] = $row['password']; 
    $users[$count]['name'] = $row['name'];
    $users[$count]['surname'] = $row['surname'];
    $users[$count]['email'] = $row['email'];
    $users[$count]['phone_number'] = $row['phone_number'];
    $users[$count]['country'] = $row['country'];
    $users[$count]['state'] = $row['state'];
    $users[$count]['town'] = $row['town'];
    $users[$count]['address'] = $row['address'];
    $users[$count]['postcode'] = $row['postcode'];
    $users[$count]['afm'] = $row['afm'];
    $users[$count]['rating_bidder'] = $row['rating_bidder'];
    $users[$count]['rating_seller'] = $row['rating_seller'];
    $count++;
  }
  echo json_encode($users);
  // print_r($users);
}else{
  http_response_code(404);

}

?>
