<?php

  require 'connect.php';

  
  $auctions = [];
  $nextAuction = false;
  $pc = 0;
  $files = [];
  $idcount = 0;
  
  $_POST = json_decode(file_get_contents('php://input'), true);
  
  $postVariable = filter_input_array($_POST);
  
  if(isset($postVariable) && !empty($postVariable)) {
    $id = htmlspecialchars($postVariable['id']);

    require 'read_my_categories.php';

    $sql="SELECT a.id, u.surname, p.id AS product_id, p.name, p.description, p.country, p.state, p.town, p.address, p.postcode, p.latitude, p.longitude, a.buy_price, a.currently, a.first_bid, a.number_of_bids, a.start_date, a.end_date, a.path
          FROM auction AS a
          INNER JOIN user AS u ON a.user_id = u.id AND a.user_id = $id 
          INNER JOIN product AS p ON a.product_id = p.id
          ORDER BY p.id;";

    if($result = mysqli_query($con,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $auctions['data'][$cr]['id'] = $row['id'];
        $auctions['data'][$cr]['user_surname'] = $row['surname'];
        $auctions['data'][$cr]['product_name'] = $row['name'];
        $auctions['data'][$cr]['description'] = $row['description'];
        $auctions['data'][$cr]['country'] = $row['country'];
        $auctions['data'][$cr]['state'] = $row['state'];
        $auctions['data'][$cr]['town'] = $row['town'];
        $auctions['data'][$cr]['address'] = $row['address'];
        $auctions['data'][$cr]['postcode'] = $row['postcode'];
        $auctions['data'][$cr]['latitude'] = $row['latitude'];
        $auctions['data'][$cr]['longitude'] = $row['longitude'];
        $auctions['data'][$cr]['buy_price'] = $row['buy_price'];
        $auctions['data'][$cr]['currently'] = $row['currently'];
        $auctions['data'][$cr]['first_bid'] = $row['first_bid'];
        $auctions['data'][$cr]['number_of_bids'] = $row['number_of_bids'];
        $s = DateTime::createFromFormat('M-d-y H-i-s', $row['start_date']);
        $e = DateTime::createFromFormat('M-d-y H-i-s', $row['end_date']);
        $auctions['data'][$cr]['start_date'] = $s->format('Y-m-d H-i-s');
        $auctions['data'][$cr]['end_date'] = $e->format('Y-m-d H-i-s');
        $ic = 0;
        if($row['path'] != null) {
          $files = [];
          foreach(array_filter(glob('../../src/assets'.$row['path'].'/*.*')) as $file) {
            if(is_file($file) == true) {
              $files[$ic] = str_replace("/src", "", $file);
              $ic++;
            }
          }
          $auctions['data'][$cr]['images'] = $files;
        } else {
          $auctions['data'][$cr]['images'] = [];
        }
        $c = null;
        if(count($ids) > 0) {
          while($row['product_id']>$ids[$idcount] && $idcount < count($ids)) $idcount++;
          if($idcount == count($ids)) $idcount--;
          if($row['product_id'] == $ids[$idcount]) {
            foreach($products[$idcount]['categories'] as $i) {
              if($c == null) {
                $c = $c . $i->description;
              } else {
                $c = $c . ", " . $i->description;
              }
            }
            $auctions['data'][$cr]['categories'] = $c;
          }
        } else {
          $auctions['data'][$cr]['categories'] = '';
        }
        $cr++;
      }

      echo json_encode($auctions);
    }
    else
    {
      echo json_encode('aa');
    }

  } else {
      // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
      http_response_code(404);
  }


?>
