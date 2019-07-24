<?php

#summer zodiac
#// TODO:
  #$_POST for everything on html file -done
  #check for XSS  -done
  #...etc comming soon  -done
  #check if someone is already in db with that username or password or email or phone_number or afm (query using prepared statements)
  #check if email is realistic
  #encode password before inserting on db
  #insert everything on db using prepared statements
require 'connect.php';

//$_POST = json_decode(file_get_contents('php://input'), true);

//if(isset($_POST) && !empty($_POST)) {

    $username = "diva";
    $tpassword = "filou";
    $name = "filos";
    $surname = "filou";
    $email = "filos@gmail.com";
    $phone_number=6945454545;
    $country="gr";
    $state="elasona";
    $town="zouliani";
    $address="edo29";
    $postcode="123456789";
    $afm = 123456789;

    //xss protection and of the user of post method(at the same time 2 things)
    // $username = htmlspecialchars($_POST['Username']);
    // $tpassword = htmlspecialchars($_POST['Password']);//temporary password. It is gonna be encoded
    // $name = htmlspecialchars($_POST['Name']);
    // $surname = htmlspecialchars($_POST['Surname']);
    // $email = htmlspecialchars($_POST['Email']);
    // $phone_number = htmlspecialchars($_POST['Phone Number']);
    // $country = htmlspecialchars($_POST['Country']);
    // $state = htmlspecialchars($_POST['State']);
    // $town = htmlspecialchars($_POST['Town']);
    // $address = htmlspecialchars($_POST['Address']);
    // $postcode = htmlspecialchars($_POST['Postcode']);
    // $afm = htmlspecialchars($_POST['TIN / ΑΦΜ']);



    //do not check password maching, we have a master front end dev

    //now we are gonna prepare the first statement to see if there is already a user like him
    $sqltemp = "SELECT * FROM user WHERE email=? OR username=? OR password=? OR phone_number=? OR afm=? LIMIT 1;";
    if($stmttemp = mysqli_prepare($con, $sqltemp)) {

      //bind parameters
      mysqli_stmt_bind_param($stmttemp, "ssssi", $param_email, $param_username, $param_password, $param_phone_number, $param_afm);

      //set parameters and execute
      $param_email=$email;
      $param_username=$username;
      $param_password=$tpassword;
      $param_phone_number=$phone_number;
      $param_afm=$afm;
      if (mysqli_stmt_execute($stmttemp)) {

        if (mysqli_stmt_fetch($stmttemp) > 0) {
          mysqli_stmt_close($stmttemp);

          $sql1="SELECT * FROM user WHERE email= '".$param_email."' OR username= '".$param_username."' OR password= '".$param_password."' OR phone_number= '".$param_phone_number."' OR afm= '".$param_afm."' LIMIT 1;";
          $result = mysqli_query($con, $sql1);
          //userk is the user on db with at least one same attribute as the one doing sign up
          $userk = mysqli_fetch_assoc($result);

          //if he exists
          if ($userk) {
            //let's find the attribute that is the same
            if ($userk['username'] === $param_username) {
              print_r("found same username\n");
              json_encode("4");
            }elseif ($userk['password'] === $param_password) {
              print_r("found same password\n");
              json_encode("5");
            }elseif ($userk['email'] === $param_email) {
              print_r("found same email\n");
              json_encode("6");
            }elseif ($userk['phone_number'] === $param_phone_number) {
              print_r("found same phone number\n");
              json_encode("7");
            }else {
              //same afm
              print_r("found same afm\n");
              json_encode('8');
            }

          }else {
            json_encode("3");

          }

        }else {

          print_r("Ola kala\n");
          //edo sunexizoume, den bre8ike user with the same username or password or email or phone_number or afm
          //check for email now, if it's realistic
        }

      }else {
        json_encode("2");
        print_r("something is off with execution\n");
      }

    }else {
      json_encode("1");
    }


//    echo json_encode("Let's say that i did that");
// } else {
//     // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
//     http_response_code(404);
//}
?>
