<?php

require 'connect.php';

$categories = [];

$sql = "select * from product_category;";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $categories[$cr]['context'] = $row['id'].' 0';
    $categories[$cr]['label'] = $row['description'];
    $categories[$cr]['items'][0]['context'] = '10'.' 1';
    $categories[$cr]['items'][0]['label'] = 'Kiato';
    $categories[$cr]['items'][1]['context'] = '20'.' 1';
    $categories[$cr]['items'][1]['label'] = 'Maroko';
    $categories[$cr]['items'][1]['items'][0]['context'] = '30'.' 2';
    $categories[$cr]['items'][1]['items'][0]['label'] = 'Mama';
    $categories[$cr]['items'][1]['items'][1]['context'] = '40'.' 2';
    $categories[$cr]['items'][1]['items'][1]['label'] = 'moma';
    $cr++;
  }

  echo json_encode($categories);
}
else
{
  http_response_code(404);
}

?>
