<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {
  $username = $_POST['username'];
  $password = $_POST['password'];

    // $username = "diva";
    //     $password = "diva";

    $username = htmlspecialchars($username);
    $password = htmlspecialchars($password);

    // echo $username;
    // echo $password;
    $user = [];

    $sql = "SELECT id, user_category_id, username, password, name, surname, phone_number, email, country, state, town, address, postcode, afm, rating_bidder, rating_seller  FROM user WHERE username=? AND password=?;";
    // echo $username;

    if($stmt = mysqli_prepare($con, $sql)) {
        // echo $username;

        mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_password);
        $param_username = $username;
        $param_password = $password;

        if(mysqli_stmt_execute($stmt)) {
            // echo $username;

            mysqli_stmt_store_result($stmt);
            // echo $username;

            mysqli_stmt_bind_result($stmt, $id, $user_category_id, $username, $password, $name, $surname, $phone_number, $email, $country, $state, $town, $address, $postcode, $afm, $rating_bidder, $rating_seller);
            if(mysqli_stmt_fetch($stmt) == 1) {
                // echo $username;

                $user['id'] = $id;
                $user['user_category_id'] = $user_category_id;
                $user['username'] = $username;
                $user['password'] = $password;
                $user['name'] = $name;
                $user['surname'] = $surname;
                $user['phone_number'] = $phone_number;
                $user['email'] = $email;
                $user['country'] = $country;
                $user['state'] = $state;
                $user['town'] = $town;
                $user['address'] = $address;
                $user['postcode'] = $postcode;
                $user['afm'] = $afm;
                $user['rating_bidder'] = $rating_bidder;
                $user['rating_seller'] = $rating_seller;


                echo json_encode($user);
            } else {
                http_response_code(404);
            }
        }
        else {
            http_response_code(404);
        }
        mysqli_stmt_close($stmt);
    } else {
        http_response_code(404);
    }
} else {
    // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
    http_response_code(404);
}
?>