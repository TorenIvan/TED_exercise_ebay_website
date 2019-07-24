<?php

#summer zodiac
#// TODO:
  #$_POST for everything on html file
  #check for XSS
  #...etc comming soon
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {

    //xss protection and of the user of post method(at the same time 2 things)
    $username = htmlspecialchars($_POST['Username']);
    $tpassword = htmlspecialchars($_POST['Password']);//temporary password. It is gonna be encoded
    $name = htmlspecialchars($_POST['Name']);
    $surname = htmlspecialchars($_POST['Surname']);
    $email = htmlspecialchars($_POST['Email']);
    $phone_number = htmlspecialchars($_POST['Phone Number']);
    $country = htmlspecialchars($_POST['Country']);
    $state = htmlspecialchars($_POST['State']);
    $town = htmlspecialchars($_POST['Town']);
    $address = htmlspecialchars($_POST['Address']);
    $postcode = htmlspecialchars($_POST['Postcode']);
    $afm = htmlspecialchars($_POST['TIN / ΑΦΜ']);

    //do not check password maching, we have a master front end dev

    //now we are gonna prepare the first statement to see if there is already a user like him
    


    echo json_encode("Let's say that i did that");
} else {
    // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
    http_response_code(404);
}
?>
