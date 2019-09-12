<?php

require 'connect.php';
require 'read_product.php';

$auctions = [];
$files = [];
// $sql = "SELECT * FROM auction";
$sql = "select a.id, u.surname, p.name, p.description, p.country, p.state, p.town, p.address, p.postcode, p.latitude, p.longitude, a.buy_price, a.currently, a.first_bid, a.number_of_bids, a.start_date, a.end_date, a.user_id, a.path
from auction as a
inner join user as u on a.user_id = u.id
inner join product as p on a.product_id = p.id
order by p.id;";

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
    $auctions[$cr]['id_creator'] = $row['user_id'];
    $ic = 0;
    if($row['path'] != null) {
      foreach(array_filter(glob('../../src/assets'.$row['path'].'/*.*')) as $file) {
        if(is_file($file) == true) {
          $files[$ic] = str_replace("/src", "", $file);
          $ic++;
        }
      }
      // echo $row['path'];
      // echo "\n\n";
      // print_r($files);
      $auctions[$cr]['images'] = $files;
    } else {
      $auctions[$cr]['images'] = [];
    }
    $c = null;
    foreach($products[$cr]['categories'] as $i) {
      if($c == null) {
        $c = $c . $i->description;
      } else {
        $c = $c . ", " . $i->description;
      }
    }
    $auctions[$cr]['categories'] = $c;
    $cr++;
  }

  echo json_encode($auctions);
}
else
{
  http_response_code(404);
}

?>
