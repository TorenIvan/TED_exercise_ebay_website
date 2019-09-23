<?php

  require 'connect.php';

  $_POST = json_decode(file_get_contents('php://input'), true);

  if(isset($_POST) && !empty($_POST)) {
    $lid = $_POST['id'];

    //pairnei ena username tetoio oste na 8elei na ginei accept
    // $lid = 16;
    $param = [];
    //print_r("flag is 1\n"); //ara 8a mpei
    $sqll = "SELECT * from userlist WHERE id = $lid;"; //pare ta kai bale ta se metablites oste na ta steilei sto xwstavasi(en to metaksu den xreiazetai sqlinjection check, gt exoun ginei idi check gia na mpoun sti lista. ALLA YOLO!!!)
    //print_r($sqll);
    if($resultl=mysqli_query($con,$sqll)){
      // Process all rows
      //echo "a";
      //$count=0;
      while($row = mysqli_fetch_assoc($resultl)){
        //  echo "mpikes";
        #//print_r($row);
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
        $sqld = "DELETE from userlist where id = $lid;";
        if($resultd = mysqli_query($con,$sqld)){
          //print_r("Deleted from userlist\n");
          echo json_encode("User accepted. He could sigin now");
          //print_r("User accepted. He could sigin now\n");
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
        $sqld = "DELETE from userlist where id = $lid;";
        if($resultd = mysqli_query($con,$sqld)){
          //print_r("Deleted from userlist\n");
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
      }elseif ($flag == 2) {
        // accept all
      }elseif ($flag == 3) {
        //  reject all
        $sqlt = "TRUNCATE TABLE userlist;";
        if($resultd = mysqli_query($con,$sqlt)){
          //print_r("Deleted from userlist\n");
          echo json_encode("ALL users rejected.");
        }else {
          echo json_encode("Something is wrong with sqlt, front_end send");
        }
      }else{
        //"aa";
        //print_r("aa");
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
