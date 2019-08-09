<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {
    $lid = $_POST['id'];

    //pairnei ena username tetoio oste na 8elei na ginei accept
    // $lid = 16;
    $flag=$_POST['flag'];  //esto oti den 8elei na ton balei
    if ($flag==1) {
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
        require 'xwstavasi.php';
        $sqld = "DELETE from userlist where id = $lid;";
        if($resultd = mysqli_query($con,$sqld)){
          //print_r("Deleted from userlist\n");
          json_encode("User accepted. He could sigin now");
          //print_r("User accepted. He could sigin now\n");
        }else {
          json_encode("Something is wrong with mysqli_query");
          //print_r("Something is wrong with mysqli_query");
        }
      }else{
        //"aa";
        //print_r("aa");
        http_response_code(404);

      }


    }else {
      //print_r("flag is NOT 1\n");
      json_decode("Can't access m8. Admin is not intrested in you yet. SORRY!!!!");
      //print_r("Can't access m8. Admin is not intrested in you yet\n.      SORRY!!!!\n");
    }
} else {
    // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
    http_response_code(404);
}

 ?>
