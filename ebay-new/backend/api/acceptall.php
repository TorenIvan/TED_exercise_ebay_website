<?php

  require 'connect.php';

  $_POST = json_decode(file_get_contents('php://input'), true);

  $postVariable = filter_input_array($_POST);

  if(isset($postVariable) && !empty($postVariable)) {

    $param = [];

    $flag = $postVariable['flag'];  //esto oti den 8elei na ton balei
    if ($flag == 2) {
    // accept all
    $sqlall = "SELECT * FROM userlist;";
    if($resultall=mysqli_query($con,$sqlall)){
    
        while($rowall = mysqli_fetch_assoc($resultall)){
        $param['id'] = $rowall['id'];
        $param['username'] = $rowall['username'];
        $param['password'] = $rowall['password'];
        $param['name'] = $rowall['name'];
        $param['surname'] = $rowall['surname'];
        $param['email'] = $rowall['email'];
        $param['phone_number'] = $rowall['phone_number'];
        $param['country'] = $rowall['country'];
        $param['state'] = $rowall['state'];
        $param['town'] = $rowall['town'];
        $param['address'] = $rowall['address'];
        $param['postcode'] = $rowall['postcode'];
        $param['afm'] = $rowall['afm'];

        require 'xwstavasi.php';
        }
        $sqlt = "TRUNCATE TABLE userlist;";
        if($resultd = mysqli_query($con,$sqlt)){
        echo json_encode("ALL users accepted.");
        }else {
        echo json_encode("Couldn't delete data.");
        }
    } else {
        echo json_encode("Something is wrong with executing query.");
    }
    }elseif ($flag == 3) {
    //  reject all
    $sqlt = "TRUNCATE TABLE userlist;";
    if($resultd = mysqli_query($con,$sqlt)){
        
        echo json_encode("ALL users rejected.");
    }else {
        echo json_encode("Couldn't delete data.");
    }
    }else{
    http_response_code(404);
    }
  } else {
      // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
      http_response_code(404);
  }

 ?>
