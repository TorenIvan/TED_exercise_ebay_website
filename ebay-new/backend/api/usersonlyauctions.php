<?php

  require 'connect.php';

  $auctions = [];

  $_POST = json_decode(file_get_contents('php://input'), true);

  if(isset($_POST) && !empty($_POST)) {
      $id = $_POST['id'];

    $sql="select a.id, u.surname, p.name, p.description, p.country, p.state, p.town, p.address, p.postcode, p.latitude, p.longitude, a.buy_price, a.currently, a.first_bid, a.number_of_bids, a.start_date, a.end_date from auction as a inner join user as u on a.user_id = u.id and a.user_id = $id inner join product as p on a.product_id = p.id;";

    if($result = mysqli_query($con,$sql))
    {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $auctions[$cr]['id']    = $row['id'];
        $auctions[$cr]['user_surname'] = $row['surname'];
        $auctions[$cr]['product_name'] = $row['name'];
        $auctions[$cr]['description'] = $row['description'];
        $auctions[$cr]['country'] = $row['country'];
        $auctions[$cr]['state'] = $row['state'];
        $auctions[$cr]['town'] = $row['town'];
        $auctions[$cr]['address'] = $row['address'];
        $auctions[$cr]['postcode'] = $row['postcode'];
        $auctions[$cr]['latitude'] = $row['latitude'];
        $auctions[$cr]['longitude'] = $row['longitude'];
        $auctions[$cr]['buy_price'] = $row['buy_price'];
        $auctions[$cr]['currently'] = $row['currently'];
        $auctions[$cr]['first_bid'] = $row['first_bid'];
        $auctions[$cr]['number_of_bids'] = $row['number_of_bids'];
        $auctions[$cr]['start_date'] = $row['start_date'];
        $auctions[$cr]['end_date'] = $row['end_date'];
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
