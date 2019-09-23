<?php
set_time_limit(1200);

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
$ids = [];

$sql = "SELECT a.product_id AS id, a.product_category_id AS category_id, b.description AS category_description
        FROM product_is_category AS a
        INNER JOIN product_category AS b ON a.product_category_id = b.id
        ORDER BY id;";

if($result = mysqli_query($con,$sql))
{
  $crr = 0;
  if($row = mysqli_fetch_assoc($result)) {
    $currentid = $row['id'];
    $ids[$crr] = $row['id'];
    $products[$crr]['id']    = $row['id'];
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
        $ids[$crr] = $row['id'];
        $counterCat = 0;
        $products[$crr]['id'] = $row['id'];
        $products[$crr]['categories'][$counterCat] = new Cat($row['category_id'], $row['category_description']);
      }
    }
  }
  // echo json_encode($ids);
}
else
{
  http_response_code(404);
}

?>
