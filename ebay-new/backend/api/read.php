<?php
set_time_limit(1200);

require 'connect.php';

require 'read_product.php';

$auctions = [];
$files = [];
$idcount = 0;

$sql = "SELECT a.id, u.surname, p.name, p.description, p.country, p.state, p.town, p.address, p.postcode, p.latitude, p.longitude, a.buy_price, a.currently, a.first_bid, a.number_of_bids, a.start_date, a.end_date, a.user_id, a.path, p.id as product_id
from auction as a
inner join user as u on a.user_id = u.id
inner join product as p on a.product_id = p.id
order by p.id;";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $auctions['data'][$cr]['id']    = $row['id'];
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
    $auctions['data'][$cr]['start_date'] = $row['start_date'];
    $auctions['data'][$cr]['end_date'] = $row['end_date'];
    $auctions['data'][$cr]['id_creator'] = $row['user_id'];
    $ic = 0;
    if($row['path'] != null) {
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
    while($row['product_id']>$ids[$idcount]) $idcount++;
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
    $cr++;
  }

  ob_start("ob_gzhandler");
  echo json_encode($auctions);
  ob_end_flush();
}
else
{
  http_response_code(404);
}
?>
