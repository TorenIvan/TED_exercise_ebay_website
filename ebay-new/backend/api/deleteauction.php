<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {

  $idd = htmlspecialchars($_POST['id']);

  $sqltlt = "SELECT path from auction WHERE id = $idd;";
  $resultlt = mysqli_query($con, $sqltlt);
  $rowltlt = mysqli_fetch_assoc($resultlt);
  $idltlt = $rowltlt['path'];

  $sql="DELETE c FROM product_is_category AS c WHERE c.product_id = (SELECT a.product_id FROM product AS p INNER JOIN auction AS a ON p.id=a.product_id WHERE a.id = $idd);";
  $sql1="DELETE a,p FROM product AS p INNER JOIN auction AS a ON p.id=a.product_id WHERE a.id = $idd;" ;

  if($result = mysqli_query($con,$sql)){
    if($result1 = mysqli_query($con,$sql1)){
      // print_r("OLA KALA");
      echo json_encode(1);
    } else {
      echo json_encode(-1);
    }
  }else {
    echo json_encode(-2);
    // print_r("Something is wrong with mysqli_query");
  }
  require 'deldirs.php';

  mysqli_free_result($resultlt);
  mysqli_close($con);

}else {
  http_response_code("No one requested this!");
}

 ?>
