<?php

require 'connect.php';

//assuming you giving me the id of auction
//delete product from auction and then auction
//den xreiazetai prepared statements ka8os o front end mas dinei apla to id kai den uparxei kapoio post
//esto id = 9;

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {

  $idd = htmlspecialchars($_POST['id']);

  $sql = "DELETE c FROM product_is_category AS c WHERE c.product_id = (SELECT a.product_id FROM product AS p INNER JOIN auction AS a ON p.id=a.product_id WHERE a.id = $idd);";
  $sql1 ="DELETE a,p FROM product AS p INNER JOIN auction AS a ON p.id=a.product_id WHERE a.id = $idd;" ;
  if($result = mysqli_query($con, $sql)) {
    if($result1 = mysqli_query($con,$sql1)){
      echo json_encode(1);
    }else {
      echo json_encode(-1);
      // print_r("Something is wrong with mysqli_query");
    }
  } else {
    echo json_encode(-2);
  }

}else {
  http_response_code("No one requested this!\n");
}

 ?>
