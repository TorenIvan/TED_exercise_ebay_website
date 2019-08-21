<?php

// require 'connect.php';

class Cat {
  public $id;
  public $description;

  public function __construct($i, $d) {
    $this->id = $i;
    $this->description = $d;
  }
}

$products = [];
// $sql = "SELECT * FROM auction";
// $sql = "select product.id as id, product.name as name, product.description as description, product.country as country, product.state as state, product.town as town, product.address as address, product.postcode as postcode, product.latitude as latitude, product.longitude as longitude, product_is_category.product_category_id as category_id, product_category.description as category_description
// from product
// inner join product_is_category on product.id = product_is_category.product_id
// inner join product_category on product_is_category.product_category_id = product_category.id
// order by product.id";

$sql = "SELECT a.product_id as id, a.product_category_id as category_id, b.description as category_description FROM product_is_category as a inner join product_category as b on a.product_category_id = b.id order by product_id;";

if($result = mysqli_query($con,$sql))
{
  $crr = 0;
  if($row = mysqli_fetch_assoc($result)) {
    $currentid = $row['id'];
    $products[$crr]['id']    = $row['id'];
    // $products[$crr]['name'] = $row['name'];
    // $products[$crr]['description'] = $row['description'];
    // $products[$crr]['country'] = $row['country'];
    // $products[$crr]['state'] = $row['state'];
    // $products[$crr]['town'] = $row['town'];
    // $products[$crr]['address'] = $row['address'];
    // $products[$crr]['postcode'] = $row['postcode'];
    // $products[$crr]['latitude'] = $row['latitude'];
    // $products[$crr]['longitude'] = $row['longitude'];
    // $products[$crr]['category_id'] = $row['category_id'];
    // $products[$crr]['category_description'] = $row['category_description'];
    $products[$crr]['categories'][0] = new Cat($row['category_id'], $row['category_description']);
    $counterCat = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      if($row['id'] == $currentid) {
        $counterCat++;
        $products[$crr]['categories'][$counterCat] = new Cat($row['category_id'], $row['category_description']);
      } else {
        $crr++;
        $currentid = $row['id'];
        $counterCat = 0;
        $products[$crr]['id'] = $row['id'];
        $products[$crr]['categories'][$counterCat] = new Cat($row['category_id'], $row['category_description']);
        // $products[$crr]['name'] = $row['name'];
        // $products[$crr]['description'] = $row['description'];
        // $products[$crr]['country'] = $row['country'];
        // $products[$crr]['state'] = $row['state'];
        // $products[$crr]['town'] = $row['town'];
        // $products[$crr]['address'] = $row['address'];
        // $products[$crr]['postcode'] = $row['postcode'];
        // $products[$crr]['latitude'] = $row['latitude'];
        // $products[$crr]['longitude'] = $row['longitude'];
        // $products[$crr]['category_id'] = $row['category_id'];
        // $products[$crr]['category_description'] = $row['category_description'];
      }
    }

  }

  // echo json_encode($products);
}
else
{
  http_response_code(404);
}

?>
