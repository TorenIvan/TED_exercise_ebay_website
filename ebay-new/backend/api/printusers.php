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
    $users['data'][$count]['id'] = $row['id'];
    $users['data'][$count]['username'] = $row['username'];
    $users['data'][$count]['name'] = $row['name'];
    $users['data'][$count]['surname'] = $row['surname'];
    $users['data'][$count]['email'] = $row['email'];
    $users['data'][$count]['phone_number'] = $row['phone_number'];
    $users['data'][$count]['country'] = $row['country'];
    $users['data'][$count]['state'] = $row['state'];
    $users['data'][$count]['town'] = $row['town'];
    $users['data'][$count]['address'] = $row['address'];
    $users['data'][$count]['postcode'] = $row['postcode'];
    $users['data'][$count]['afm'] = $row['afm'];
    $users['data'][$count]['rating_bidder'] = $row['rating_bidder'];
    $users['data'][$count]['rating_seller'] = $row['rating_seller'];
    $count++;
  }
  echo json_encode($users);
  // print_r($users);
}else{
  http_response_code(404);

}

?>
