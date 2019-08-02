<?php

require 'connect.php';

$users = [];

$count = 0;
$sql = "SELECT * FROM userlist";
if($result=mysqli_query($con,$sql)){
  // Process all rows
  //echo "a";
  while($row = mysqli_fetch_assoc($result))
  {
    //echo "mpikes";
    #print_r($row);
    $users[$count]['id'] = $row['id'];
    $users[$count]['username'] = $row['username'];
    $users[$count]['password'] = $row['password'];
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
    //$count--;
    $count++;
  }
  json_encode($users);
  print_r($users);
}else{
  "aa";
  http_response_code(404);

}
echo($result);

 ?>
