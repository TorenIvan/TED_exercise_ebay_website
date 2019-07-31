<?php

require 'connect.php';

//$_POST = json_decode(file_get_contents('php://input'), true);

// if(isset($_POST) && !empty($_POST)) {

//xss protection and of the user of post method(at the same time 2 things)
// $user_id = htmlspecialchars($_POST['user_id']);
// $buy_price = htmlspecialchars($_POST['buy_price']);
// $currently = htmlspecialchars($_POST['$currently']);
// $first_bid = htmlspecialchars($_POST['first_bid']);
// $number_of_bids = htmlspecialchars($_POST['number_of_bids']);
// $start_date = htmlspecialchars($_POST['start_date']);
// $end_date = htmlspecialchars($_POST['end_date']);
// $pname = htmlspecialchars($_POST['product_name']);
// $pdescription = htmlspecialchars($_POST['product_description']);
// $ptown = htmlspecialchars($_POST['product_town']);
// $pstate = htmlspecialchars($_POST['product_state']);
// $pcountry = htmlspecialchars($_POST['product_country']);
// $paddress = htmlspecialchars($_POST['product_address']);
// $ppostcode = htmlspecialchars($_POST['product_postcode']);
// $platitude = htmlspecialchars($_POST['product_latitude']);
// $plongitude = htmlspecialchars($_POST['product_longitude']);

//example
//// IDEA: pou 8a boi8isei i symela
//pairnoume dedomeno to id tou auction
$user_id = 8;
$buy_price = 4000;
$currently = 0.3;
$first_bid = 0.6;
$number_of_bids = 7;
$start_date = new DateTime('2019-07-01 12:30:11');
$result_date = $start_date->format('Y-m-d H:i:s');

$pname = 'lava';
$pdescription = 'allou eidous';
$ptown = 'northville';
$pstate = 'huhue';
$pcountry = 'Gkana';
$paddress = '3ion ierarxon';
$ppostcode = 'mouahaha';
$platitude = 0;
$plongitude = 1;
//edo prepei na mas balei to end_date. An den mas to balei pernoume to torino gia ton elegxo kai bazoume NULL sti basi
//to product_id den allazei, ;i mallon den mporei na to allaksei

$sql_check = "SELECT * FROM product WHERE name = ? AND description = ? LIMIT 1;";
if ($stmt_check = mysqli_prepare($con, $sql_check)) {
  mysqli_stmt_bind_param($stmt_check, ss , $param_name, $param_description);
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
        print_r($auctiont);
        json_encode("Bre8ike idio auction m8\n");
      }else {
        json_encode("Den bre8ike idio auction, alla exoume kapoio 8ema afou mpike edo\n");
        print_r("Den bre8ike idio auction, alla exoume kapoio 8ema afou mpike edo");
      }
    }else {
      print_r("Ola kala\n");
      json_encode("Ola kala\n");
      //PROXORAME sta INSERTS
      $sqlp = "INSERT INTO product (name, description, country, state, town, address, postcode, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?);";
      if ($stmtp = mysqli_prepare($con, $sqlp)) {
        mysqli_stmt_bind_param($stmtp, sssssssdd, $param_param_name, $param_param_description, $param_country, $param_state, $param_town, $param_address, $param_postcode, $param_latitude, $param_longitude);
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
        print_r("product executed\n");

        //select product with that name tou get the id
        $sqlpid = "SELECT id FROM product WHERE name = ? AND description =? ;";
        if ($stmtpid = mysqli_prepare($con, $sqlpid)) {
          mysqli_stmt_bind_param($stmtpid, ss , $par_name, $par_description);
          $par_name = $param_param_name;
          $par_description = $param_param_description;

          if (mysqli_stmt_execute($stmtpid)) {

            if (mysqli_stmt_fetch($stmtpid) > 0) {
              mysqli_stmt_close($stmtpid);

              $sqlpid1="SELECT id FROM product WHERE name = '".$par_name."' AND description = '".$par_description."' ;";
              $result = mysqli_query($con, $sqlpid1);
              //auctiont is the auction on db with both same attributes as the one doing addauction
              $c=0;
              $productpid = [];
              while($row = mysqli_fetch_assoc($result)){
                echo "mpikes";
                $productpid[$c] = $row['id'];
                $c++;
              }
              print_r($productpid[0]);

              //if he exists
              if ($productpid[0]) {
                print_r($productpid[0]);
                //edo arizei to 2o insert
                $sql = "INSERT INTO auction (user_id, product_id, buy_price, currently, first_bid, number_of_bids, start_date) VALUES (?, ?, ?, ?, ?, ?, ?);";
                if($stmt = mysqli_prepare($con, $sql)) {
                  print_r($sql);
                  #check for start_date
                  if ((new DateTime())->format('Y-m-d H:i:s') < $result_date) {
                    json_encode("Datetime is wrong\n");
                    exit("Datetime is wrong\n");
                  }
                  mysqli_stmt_bind_param($stmt, iidddis , $param_user_id, $param_product_id, $param_buy_price, $param_currently, $param_first_bid, $param_number_of_bids, $param_start_date);
                  $param_user_id = $user_id;
                  $param_product_id = $productpid[0];
                  $param_buy_price = $buy_price;
                  $param_currently = $currently;
                  $param_first_bid = $first_bid;
                  $param_number_of_bids = $number_of_bids;
                  $param_start_date = $result_date;

                  print_r($result_date);
                  mysqli_stmt_execute($stmt);  #ta balame sto auction
                  mysqli_stmt_close($stmt);
                  //print_r($sql);
                }else {
                  print_r("Something is wrong with prepare\n");
                  json_encode("Something is wrong with prepare\n");
                }

              }else {
                json_encode("Den bre8ike idio product_id, exoume kapoio 8ema afou mpike edo\n");
                print_r("Den bre8ike idio product_id, exoume kapoio 8ema afou mpike edo");
              }
            }else {
              print_r("Ola kala\n");
              json_encode("Ola kala\n");
            }
          }
        }

      } else {
        json_encode("Something is wrong with insert1 prepare\n");
        print_r("Something is wrong with insert1 prepare\n");
      }


    }
  }else {
    print_r("Something is off with the execution\n");
    json_encode("Something is off with the execution\n");
  }
}

// }else {
//   http_response_code("No one requested this!\n");
// }

?>
