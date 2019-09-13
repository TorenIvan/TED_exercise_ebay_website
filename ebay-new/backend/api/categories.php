<?php

require 'connect.php';

$categories = [];

$sql = "select * from product_category;";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $categories[$cr]['id'] = $row['id'];
    $categories[$cr]['label'] = $row['description'];
    $categories[$cr]['items'][0]['id'] = 10;
    $categories[$cr]['items'][0]['label'] = 'Kiato';
    $categories[$cr]['items'][0]['items'] = null;
    $categories[$cr]['items'][1]['id'] = 20;
    $categories[$cr]['items'][1]['label'] = 'Maroko';
    $categories[$cr]['items'][1]['items'][0]['id'] = 30;
    $categories[$cr]['items'][1]['items'][0]['label'] = 'Mama';
    $categories[$cr]['items'][1]['items'][0]['items'] = null;
    $categories[$cr]['items'][1]['items'][1]['id'] = 40;
    $categories[$cr]['items'][1]['items'][1]['label'] = 'moma';
    $categories[$cr]['items'][1]['items'][1]['items'] = null;
    $cr++;
  }

  echo json_encode($categories);
}
else
{
  http_response_code(404);
}

?>
