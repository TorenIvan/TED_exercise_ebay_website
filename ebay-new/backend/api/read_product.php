<?php

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

$sql = "SELECT a.product_id as id, a.product_category_id as category_id, b.description as category_description FROM product_is_category as a inner join product_category as b on a.product_category_id = b.id order by id;";

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
  // echo json_encode($products);
}
else
{
  http_response_code(404);
}

?>
