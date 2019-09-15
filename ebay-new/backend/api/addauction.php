<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

function _clean(&$value) {
  $value = htmlspecialchars($value);
}

if(isset($_POST) && !empty($_POST)) {
  
  //xss protection and of the user of post method(at the same time 2 things)
  $user_id = htmlspecialchars($_POST['user_id']);
  $buy_price = htmlspecialchars($_POST['buy_price']);
  $currently = 0;
  $first_bid = 0;
  $number_of_bids = 0;
  $start_date = htmlspecialchars($_POST['start_date']);
  $result_date = DateTime::createFromFormat('Y-m-d', $start_date)->format('Y-m-d');
  $end_date = htmlspecialchars($_POST['end_date']);
  $end_date = DateTime::createFromFormat('Y-m-d', $end_date)->format('Y-m-d');
  $pname = htmlspecialchars($_POST['product']);
  $pdescription = htmlspecialchars($_POST['description']);
  $ptown = htmlspecialchars($_POST['town']);
  $pstate = htmlspecialchars($_POST['state']);
  $pcountry = htmlspecialchars($_POST['country']);
  $paddress = htmlspecialchars($_POST['address']);
  $ppostcode = htmlspecialchars($_POST['postcode']);
  $platitude = htmlspecialchars($_POST['latitude']);
  $plongitude = htmlspecialchars($_POST['longitude']);
  $categories = $_POST['category'];

  
  array_walk_recursive($categories, '_clean');
  $i = 0;
  foreach ($categories as $category) {
    $category_ids[$i] = $category['id'];
    $i++;
  }


  //example
  //// IDEA: pou 8a boi8isei i symela
  //pairnoume dedomeno to id tou auction
  // $user_id = 8;
  // $buy_price = 4000;
  // $currently = 0.3;
  // $first_bid = 0.6;
  // $number_of_bids = 7;
  // $start_date = new DateTime('2019-07-01 12:30:11');
  // $result_date = $start_date->format('Y-m-d H:i:s');
  //
  // $pname = 'lava';
  // $pdescription = 'allou eidous';
  // $ptown = 'northville';
  // $pstate = 'huhue';
  // $pcountry = 'Gkana';
  // $paddress = '3ion ierarxon';
  // $ppostcode = 'mouahaha';
  // $platitude = 0;
  // $plongitude = 1;
  //edo prepei na mas balei to end_date. An den mas to balei pernoume to torino gia ton elegxo kai to vazoume sth bash
  //to product_id den allazei, ;i mallon den mporei na to allaksei

  $sql_check = "SELECT * FROM product WHERE name = ? AND description = ? LIMIT 1;";
  if ($stmt_check = mysqli_prepare($con, $sql_check)) {
    mysqli_stmt_bind_param($stmt_check, "ss" , $param_name, $param_description);
    $param_name = $pname;
    $param_description = $pdescription;

    if (mysqli_stmt_execute($stmt_check)) {

      if (mysqli_stmt_fetch($stmt_check) > 0) {
        mysqli_stmt_close($stmt_check);

        $sql1="SELECT * FROM product WHERE name = '".$param_name."' AND description = '".$param_description."' LIMIT 1;";
        $result = mysqli_query($con, $sql1);
        //auctiont is the auction on db with both same attributes as the one doing addauction
        $auctiont = mysqli_fetch_assoc($result);

        //if he exists
        if ($auctiont) {
          echo json_encode("Bre8ike idio product m8");
        }else {
          echo json_encode("Den bre8ike idio product, alla exoume kapoio 8ema afou mpike edo");
        }
      }else {
      //  echo json_encode("Ola kala");
        //PROXORAME sta INSERTS
        $sqlp = "INSERT INTO product (name, description, country, state, town, address, postcode, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?);";
        if ($stmtp = mysqli_prepare($con, $sqlp)) {
          mysqli_stmt_bind_param($stmtp, "sssssssdd", $param_param_name, $param_param_description, $param_country, $param_state, $param_town, $param_address, $param_postcode, $param_latitude, $param_longitude);
          $param_param_name = $param_name;
          $param_param_description = $param_description;
          $param_country = $pcountry;
          $param_state = $pstate;
          $param_town = $ptown;
          $param_address = $paddress;
          $param_postcode = $ppostcode;
          $param_latitude = $platitude;
          $param_longitude = $plongitude;

          mysqli_stmt_execute($stmtp);
          //print_r("product executed");

          //select product with that name tou get the id
          $sqlpid = "SELECT id FROM product WHERE name = ? AND description =? ;";
          if ($stmtpid = mysqli_prepare($con, $sqlpid)) {
            mysqli_stmt_bind_param($stmtpid, "ss" , $par_name, $par_description);
            $par_name = $param_param_name;
            $par_description = $param_param_description;

            if (mysqli_stmt_execute($stmtpid)) {

              if (mysqli_stmt_fetch($stmtpid) > 0) {
                mysqli_stmt_close($stmtpid);

                $sqlpid1="SELECT * FROM product WHERE name = '$par_name' AND description = '$par_description' ;";
                $result = mysqli_query($con, $sqlpid1);
                //auctiont is the auction on db with both same attributes as the one doing addauction
                $c=0;
                $productpid = [];
                while(($row = mysqli_fetch_assoc($result))){
                  //echo "mpikes";
                  $productpid[$c] = $row['id'];
                  $c++;
                }

                //if he exists
                // echo $productpid[0];
                if ($productpid[0]) {

                  //edo arizei to 2o insert
                  $sql = "INSERT INTO auction (user_id, product_id, buy_price, currently, first_bid, number_of_bids, start_date, end_date, path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

                  if($stmt = mysqli_prepare($con, $sql)) {

                    #check for start_date
                    if ((new DateTime())->format('Y-m-d') > $result_date) {
                      echo json_encode("Datetime is wrong");
                    } else {
                      
                      // require 'dirs.php';
                      $idltlt = date('D-d-m-Y_', time());
                      $e = "/";
                      // $get_path = '../../src/assets';
                      // $get_path = realpath('../../src/assets').PHP_EOL;
                      $folder = $e.$idltlt.$pname."_".$user_id;
                      $foldy = preg_replace('/\s/', '', $folder);


                      mysqli_stmt_bind_param($stmt, "iidddisss" , $param_user_id, $param_product_id, $param_buy_price, $param_currently, $param_first_bid, $param_number_of_bids, $param_start_date, $param_end_date, $fold);
                      $param_user_id = $user_id;
                      $param_product_id = $productpid[0];
                      $param_buy_price = $buy_price;
                      $param_currently = $currently;
                      $param_first_bid = $first_bid;
                      $param_number_of_bids = $number_of_bids;

                      $param_start_date = $start_date;
                      $param_end_date = $end_date;
                      $fold = $foldy;

                      //print_r($result_date);
                      mysqli_stmt_execute($stmt);  #ta balame sto auction
                      mysqli_stmt_close($stmt);

                      //require product_category ;i apla grapse to
                      $krata = count($category_ids);
                      for ($i = 0; $i < $krata; $i++) {
                        $sqlpic = "INSERT INTO product_is_category (product_id, product_category_id) VALUES ($param_product_id, $category_ids[$i]);";
                        if($resultpic = mysqli_query($con,$sqlpic)){
                          //OLA KALA
                          echo json_encode("1");
                        }else {
                          echo json_encode("Something is wrong with mysqli_query");
                          //print_r("Something is wrong with mysqli_query");
                          exit(100);
                        }
                      }
                    }



                  }else {
                    //print_r("Something is wrong with prepare");
                    echo json_encode("Something is wrong with prepare");
                  }

                }else {
                  echo json_encode("Den bre8ike idio product_id, exoume kapoio 8ema afou mpike edo");
                  //print_r("Den bre8ike idio product_id, exoume kapoio 8ema afou mpike edo");
                }
              }else {
                //print_r("Ola kala");
                echo json_encode("Ola kala");
              }
            }
          }

        } else {
          echo json_encode("Something is wrong with insert1 prepare");
          //print_r("Something is wrong with insert1 prepare");
        }


      }
    }else {
      //print_r("Something is off with the execution");
      echo json_encode("Something is off with the execution");
    }
  }

}else {
  http_response_code("No one requested this!");
}

?>
