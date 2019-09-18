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

    $sql1 = "select * from SubCategoriesLevel1 where id_Father=".$row['id'].";";
    $result1 = mysqli_query($con,$sql1);
    $cr1 = 0;
    while($row1 = mysqli_fetch_assoc($result1)) {
      $categories[$cr]['items'][$cr1]['context'] = $row1['id'].' 1';
      $categories[$cr]['items'][$cr1]['label'] = $row1['description'];

      $sql2 = "select * from SubCategoriesLevel2 where id_Father=".$row1['id'].";";
      $result2 = mysqli_query($con,$sql2);
      $cr2 = 0;
      while($row2 = mysqli_fetch_assoc($result2)) {
        $categories[$cr]['items'][$cr1]['items'][$cr2]['context'] = $row2['id'].' 2';
        $categories[$cr]['items'][$cr1]['items'][$cr2]['label'] = $row2['description'];

        $sql3 = "select * from SubCategoriesLevel3 where id_Father=".$row2['id'].";";
        $result3 = mysqli_query($con,$sql3);
        $cr3 = 0;
        while($row3 = mysqli_fetch_assoc($result3)) {
          $categories[$cr]['items'][$cr1]['items'][$cr2]['items'][$cr3]['context'] = $row3['id'].' 3';
          $categories[$cr]['items'][$cr1]['items'][$cr2]['items'][$cr3]['label'] = $row3['description'];

          $sql4 = "select * from SubCategoriesLevel4 where id_Father=".$row3['id'].";";
          $result4 = mysqli_query($con,$sql4);
          $cr4 = 0;
          while($row4 = mysqli_fetch_assoc($result4)) {
            $categories[$cr]['items'][$cr1]['items'][$cr2]['items'][$cr3]['items'][$cr4]['context'] = $row4['id'].' 4';
            $categories[$cr]['items'][$cr1]['items'][$cr2]['items'][$cr3]['items'][$cr4]['label'] = $row4['description'];
            $cr4++;
          }
          $cr3++;
        }
        $cr2++;
      }
      $cr1++;
    }
    $cr++;
  }

  echo json_encode($categories);
}
else
{
  http_response_code(404);
}

?>
