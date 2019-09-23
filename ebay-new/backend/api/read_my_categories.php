<?php
set_time_limit(1200);

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

$sql = "SELECT a.product_id AS id, a.product_category_id AS category_id
        FROM product_is_category AS a
        INNER JOIN auction AS b ON a.product_id = b.product_id AND b.user_id = $id
        ORDER BY a.product_id;";

if($result = mysqli_query($con,$sql))
{
  $crr = 0;
  if($row = mysqli_fetch_assoc($result)) {
    $currentid = $row['id'];
    $ids[$crr] = $row['id'];
    $products[$crr]['id'] = $row['id'];
    $ci = $row['category_id'];
    $sql0 = "SELECT description FROM product_category WHERE id = $ci;";
    $res0 = mysqli_query($con, $sql0);
    $r0 = mysqli_fetch_assoc($res0);
    $products[$crr]['categories'][0] = new Cat($ci, $r0['description']);
    $counterCat = 0;
    while($row = mysqli_fetch_assoc($result))
    {
      $ci = $row['category_id'];
      if($row['id'] == $currentid) {
        $counterCat++;
        $sqli = "SELECT description FROM SubCategoriesLevel".$counterCat." WHERE id = $ci;";
        $resi = mysqli_query($con, $sqli);
        $ri = mysqli_fetch_assoc($resi);
        $products[$crr]['categories'][$counterCat] = new Cat($ci, $ri['description']);
      } else {
        $crr++;
        $currentid = $row['id'];
        $ids[$crr] = $row['id'];
        $counterCat = 0;
        $products[$crr]['id'] = $row['id'];
        $sql01 = "SELECT description FROM product_category WHERE id = $ci;";
        $res01 = mysqli_query($con, $sql01);
        $r01 = mysqli_fetch_assoc($res01);
        $products[$crr]['categories'][$counterCat] = new Cat($ci, $r01['description']);
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
