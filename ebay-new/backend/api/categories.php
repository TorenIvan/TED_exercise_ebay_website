<?php

require 'connect.php';

$categories = [];

$sql = "select * from product_is_category;";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $categories[$cr]['id']    = $row['id'];
    $categories[$cr]['description'] = $row['description'];
    $categories[$cr]['selected'] = false;
    $cr++;
  }

  echo json_encode($categories);
}
else
{
  http_response_code(404);
}

?>
