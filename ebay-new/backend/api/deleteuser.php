<?php

require 'connect.php';

$auctions = [];

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {
    $idd = $_POST['id'];
//kapos prepei na pairno to user.id edo
//esto oti einai to 11
// $idd = 11; //einai tou user, min mperdeuteis me to deleteauction

$sqll = "SELECT auction.id from auction inner join user ON user.id = auction.user_id and user.id = $idd;";

if($resultl = mysqli_query($con,$sqll)){
  $cr = 0;
  while($row = mysqli_fetch_assoc($resultl)){
    $auctions[$cr] = $row['id'];
    $cr++;
  }
  $pli8os = $cr;
  //print_r($auctions);

  //delete every auction of user
  for ($i=0; $i < $pli8os; $i++) {
    $sql[$i] ="DELETE a,p from product as p inner join auction as a ON p.id=a.product_id WHERE a.id = $auctions[$i];" ;
    if($result[$i] = mysqli_query($con,$sql[$i])){
      //print_r("OLA KALA\n");
    }else {
      json_encode("Something is wrong with mysqli_query");
      //print_r("Something is wrong with mysqli_query");
    }
  }

  //now we can delete the user
  $sql = "DELETE from user where id = $idd;";
  if($result = mysqli_query($con,$sql)){
    // //print_r("OLA KALA, efuges userako\n");
    $users = [];

    $sql = "SELECT * FROM user";

    if($result=mysqli_query($con,$sql)){
      // Process all rows
      // echo "a";
      $count=0;
      while($row = mysqli_fetch_assoc($result))
      {
        // echo "mpikes";
        #//print_r($row);
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
      // //print_r($users);
    }else{
      // "aa";
      http_response_code(404);

    }
  }else {
    json_encode("Something is wrong with mysqli_query");
    //print_r("Something is wrong with mysqli_query");
  }

  }else{
    json_encode("Something new");
    //print_r("Something new");
  }
} else {
  // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
  http_response_code(404);
}

?>
