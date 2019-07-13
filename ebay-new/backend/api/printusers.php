<?php

require 'connect.php';

$users = [];

$sql = "SELECT * FROM user";

if($result=mysqli_query($con,$sql)){
  // Process all rows
  echo "a";
  $count=0;
  while($row = mysqli_fetch_assoc($result))
  {
    echo "mpikes";
    #print_r($row);
    $users[$count]['id'] = $row['id'];
    $users[$count]['name'] = $row['name'];
    $users[$count]['surname'] = $row['surname'];
    $users[$count]['username'] = $row['username'];
    #$users[$count]['password'] = $row['password'];
    $count++;
  }
  echo json_encode($users);
  print_r($users);
}else{
  "aa";
  http_response_code(404);

}
echo($result);
?>
