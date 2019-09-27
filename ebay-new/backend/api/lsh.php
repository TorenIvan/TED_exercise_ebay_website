<?php

require 'connect.php';

$data =[];

$_POST = json_decode(file_get_contents('php://input'), true);

  if(isset($_POST) && !empty($_POST)) {
    $lid = htmlspecialchars($_POST['id']);

    $sql = "SELECT product.description as description, user.username as username, product.name as name from product, auction, user where product.id = auction.product_id AND auction.user_id = user.id AND auction.user_id <> $lid ORDER BY RAND() LIMIT 5;";
    if($result = mysqli_query($con,$sql)) {
      $cr = 0;
      while($row = mysqli_fetch_assoc($result)){
        $data[$cr]['product'] = $row['name'];
        $data[$cr]['description'] = $row['description'];
        $data[$cr]['seller'] = $row['username'];
        $cr++;
      }

      echo json_encode($data);
    }
} else {
  // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
  http_response_code(404);
}
 ?>
