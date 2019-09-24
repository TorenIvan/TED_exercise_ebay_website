<?php

  require 'connect.php';

  $_POST = json_decode(file_get_contents('php://input'), true);

  if(isset($_POST) && !empty($_POST)) {
    $lid = htmlspecialchars($_POST['id']);

    $param = [];

    $sqll = "SELECT * FROM userlist WHERE id = $lid;"; //pare ta kai bale ta se metablites oste na ta steilei sto xwstavasi(en to metaksu den xreiazetai sqlinjection check, gt exoun ginei idi check gia na mpoun sti lista. ALLA YOLO!!!)
    
    if($resultl=mysqli_query($con,$sqll)){
      
      while($row = mysqli_fetch_assoc($resultl)){
        $param['id'] = $row['id'];
        $param['username'] = $row['username'];
        $param['password'] = $row['password'];
        $param['name'] = $row['name'];
        $param['surname'] = $row['surname'];
        $param['email'] = $row['email'];
        $param['phone_number'] = $row['phone_number'];
        $param['country'] = $row['country'];
        $param['state'] = $row['state'];
        $param['town'] = $row['town'];
        $param['address'] = $row['address'];
        $param['postcode'] = $row['postcode'];
        $param['afm'] = $row['afm'];
      }
      $flag=$_POST['flag'];  //esto oti den 8elei na ton balei
      if ($flag==1) {
        require 'xwstavasi.php';
        $sqld = "DELETE FROM userlist WHERE id = $lid;";
        if($resultd = mysqli_query($con,$sqld)){
          
          echo json_encode("User accepted. He could sigin now");
          
          #parameters of mail
          $to = $param['email'];
          $subject = "Ted_ebay admin's decision";
          $txt = "You 've been accepted. You can sign in now";
          $headers = $headers=array(
            'From: "admin@ted_ebay.com',
            'Content-Type:text/html;charset=UTF-8',
            );
          $headers = implode("\r\n", $headers);

          #just send it
          //You should do localy sudo apt-get install sendmail
          mail($to,$subject,$txt,$headers);
        }else {
          echo json_encode("Something is wrong with mysqli_query");
          //print_r("Something is wrong with mysqli_query");
        }
      }elseif ($flag == 0) {
        // to reject the user
        $sqld = "DELETE FROM userlist WHERE id = $lid;";
        if($resultd = mysqli_query($con,$sqld)){
          
          echo json_encode("User rejected. He couldn't sign in, because administrator won't accept him");
          $to = $param['email'];
          $subject = "Ted_ebay admin's decision";
          $txt = "You 've been rejected. You can't sign in.";
          $headers = $headers=array(
            'From: "admin@ted_ebay.com',
          'Content-Type:text/html;charset=UTF-8',
        );
        $headers = implode("\r\n", $headers);
        }else {
          echo json_encode("Something is wrong with the id, front_end send");
        }
      }else{
        http_response_code(404);
      }
    }else {
      echo json_encode("Something is wrong with mysqli_query");
    }
  } else {
      // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
      http_response_code(404);
  }

 ?>
