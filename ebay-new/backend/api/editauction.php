<?php

require 'connect.php';

function _clean(&$value) {
  $value = htmlspecialchars($value);
}

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {

  //xss protection and of the user of post method(at the same time 2 things)
  $auction_id = htmlspecialchars($_POST['id']);
  $buy_price = htmlspecialchars($_POST['buy_price']);
  $start_date = htmlspecialchars($_POST['start_date']);
  $start_date = DateTime::createFromFormat('Y-m-d', $start_date)->format('Y-m-d');
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

//example
//// IDEA: pou 8a boi8isei i symela
//pairnoume dedomeno to id tou auction
// $idd = 9;
// $user_id = 11;
// $buy_price = 4000;
// $currently = 0.3;
// $first_bid = 0.6;
// $number_of_bids = 7;
// $start_date = new DateTime('2019-07-01 12:30:11');
// $result_date = $start_date->format('Y-m-d H:i:s');

// $pname = 'lava';
// $pdescription = 'exo prama na se xtupo';
// $ptown = 'northville';
// $pstate = 'huhue';
// $pcountry = 'Gkana';
// $paddress = '3ion ierarxon';
// $ppostcode = 'mouahaha';
// $platitude = 0;
// $plongitude = 1;
//edo prepei na mas balei to end_date. An den mas to balei pernoume to torino gia ton elegxo kai bazoume NULL sti basi
//to product_id den allazei, ;i mallon den mporei na to allaksei

  $sql1 = "UPDATE auction SET buy_price = ?, start_date = ?, end_date = ? where id = ?;";
  if($pcountry == '' && $pstate == '' && $ptown == '' && $paddress == '' && $ppostcode == '') {
    $sql2 = "UPDATE auction as a inner join product as p SET p.name = ?, p.description = ? where (a.product_id = p.id AND a.id = ?);";
  } else {
    $sql2 = "UPDATE auction as a inner join product as p SET p.name = ?, p.description = ?, p.country = ?, p.state = ?, p.town = ?, p.address = ?, p.postcode = ?, p.latitude = ?, p.longitude = ?
    where (a.product_id = p.id AND a.id = $idd);";
  }

  if($stmt1 = mysqli_prepare($con, $sql1)) {
    // print_r($sql1);
    #check for start_date
    if ((new DateTime())->format('Y-m-d') > $start_date) {
      echo json_encode("Datetime is wrong");
      // exit("Datetime is wrong\n");
    } else {
      mysqli_stmt_bind_param($stmt1, dssi , $param_buy_price, $param_start_date, $param_end_date, $param_id);
      $param_buy_price = $buy_price;
      $param_start_date = $start_date;
      $param_end_date = $end_date;
      $param_id = $auction_id;

      // print_r($result_date);
      mysqli_stmt_execute($stmt1);  #ta balame sto auction
      mysqli_stmt_close($stmt1);
      // print_r($sql1);

      //proxorame

      if ($stmt2 = mysqli_prepare($con, $sql2)) {
        // print_r($sql2);
        if($pcountry == '' && $pstate == '' && $ptown == '' && $paddress == '' && $ppostcode == '') {
          mysqli_stmt_bind_param($stmt2, ssi, $param_name, $param_description, $param_id);
          $param_name = $pname;
          $param_description = $pdescription;
          $param_id = $auction_id;
          
          mysqli_stmt_execute($stmt2);
          // print_r("OLA POPA\n");
          // echo json_encode('1');
          mysqli_stmt_close($stmt2);
        } else {
          
          mysqli_stmt_bind_param($stmt2, sssssssdd, $param_name, $param_description, $param_country, $param_state, $param_town, $param_address, $param_postcode, $param_latitude, $patam_longitude);
          $param_name = $pname;
          $param_description = $pdescription;
          $param_country = $pcountry;
          $param_state = $pstate;
          $param_town = $ptown;
          $param_address = $paddress;
          $param_postcode = $ppostcode;
          $param_latitude = $platitude;
          $patam_longitude = $plongitude;
          mysqli_stmt_execute($stmt2);
          // print_r("OLA POPA\n");
          // echo json_encode('1');
          mysqli_stmt_close($stmt2);
        }

        array_walk_recursive($categories, '_clean');
        $i = 0;
        $category_ids = [];
        foreach ($categories as $category) {
          $category_ids[$i] = $category['id'];
          $i++;
        }
        
        $krata = count($category_ids);
        if( $krata > 0) {

          $sql3 = "SELECT product_id FROM auction WHERE id = ?;";

          if ($stmt3 = mysqli_prepare($con, $sql3)) {
            mysqli_stmt_bind_param($stmt3, i, $param_id);
            $param_id = $auction_id;
            mysqli_stmt_execute($stmt3);
            mysqli_stmt_bind_result($stmt3, $data_id);

            if(mysqli_stmt_fetch($stmt3) == 1) {

              mysqli_stmt_close($stmt3);
              
              $sql4 = "DELETE FROM product_is_category WHERE product_id = $data_id;";

              if($stmt4 = mysqli_query($con, $sql4)) {
                
                mysqli_stmt_close($stmt4);

                for ($i = 0; $i < $krata; $i++) {

                  $sql5 = "INSERT INTO product_is_category (product_id, product_category_id) VALUES ($data_id, $category_ids[$i]);";

                  if($stmt5 = mysqli_query($con, $sql5)) {
                    mysqli_stmt_close($stmt5);
                    //OLA KALA
                    $flag = true;
                  }else {
                    $flag = false;
                    echo json_encode("Something is wrong with fifth prepare");
                    break;
                  }
                }
                if($flag == true) {
                  echo json_encode("1");
                }
              } else {
                echo json_encode("Something is wrong with forth prepare");
              }
            } else {
              echo json_encode("One id too many products!!!");
            }
          }else {
            // print_r("Something is wrong with third prepare\n");
            echo json_encode("Something is wrong with third prepare");
          }
        } else {
          echo json_encode("No categories");
        }
      }else {
        // print_r("Something is wrong with second prepare\n");
        echo json_encode("Something is wrong with second prepare");
      }
    }
  }else {
    // print_r("Something is wrong with prepare\n");
    echo json_encode("Something is wrong with prepare");
  }

}else {
  http_response_code("No one requested this!");
}

?>
