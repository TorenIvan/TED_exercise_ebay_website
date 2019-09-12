<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {

  $email = htmlspecialchars($_POST['email']);
  $pass = htmlspecialchars($_POST['pass']);

  $sql = "UPDATE user
  SET password = ?
  WHERE email = ?;";

  if($stmt = mysqli_prepare($con, $sql)) {
    mysqli_stmt_bind_param($stmt, "ss", $param_pass, $param_email);
    $param_email = $email;
    $param_pass = password_hash($pass,PASSWORD_DEFAULT);

    if(mysqli_stmt_execute($stmt)) {
      echo json_encode("1");
    } else {
      echo json_encode("Couldn't execute.");
    }

  } else {
    echo json_encode("Couldn't prepare.");
  }

} else {
  http_response_code(404);
}

?>
