<?php

//require 'connect.php';

$products = [];
// $sql = "SELECT * FROM auction";
$sql = "select product.id as id, product.name as name, product.description as description, product.country as country, product.state as state, product.town as town, product.address as address, product.postcode as postcode, product.latitude as latitude, product.longitude as longitude, product_is_category.product_category_id as category_id, product_category.description as category_description
from product
inner join product_is_category on product.id = product_is_category.product_id
inner join product_category on product_is_category.product_category_id = product_category.id";

if($result = mysqli_query($con,$sql))
{
  $crr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $products[$crr]['id']    = $row['id'];
    $products[$crr]['name'] = $row['name'];
    $products[$crr]['description'] = $row['description'];
    $products[$crr]['country'] = $row['country'];
    $products[$crr]['state'] = $row['state'];
    $products[$crr]['town'] = $row['town'];
    $products[$crr]['address'] = $row['address'];
    $products[$crr]['postcode'] = $row['postcode'];
    $products[$crr]['latitude'] = $row['latitude'];
    $products[$crr]['longitude'] = $row['longitude'];
    $products[$crr]['category_id'] = $row['category_id'];
    $products[$crr]['category_description'] = $row['category_description'];
    $crr++;
  }

  //echo json_encode($products);
}
else
{
  http_response_code(404);
}

?>
