<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$postVariable = filter_input_array($_POST);

if(isset($postVariable) && !empty($postVariable)) {

  $pname = htmlspecialchars($postVariable['name']);
  $user_id = htmlspecialchars($postVariable['id']);

  $idltlt = date('D-d-m-Y_', time());
  $e = "/";

  // $get_path = '../../../images';
  $get_path = '../../src/assets';

  $folder = $get_path.$e.$idltlt.$pname."_".$user_id;

  $foldy = preg_replace('/\s/', '', $folder);

  if (!is_dir($foldy)) {
    mkdir($foldy, 0777, true);
  } else {
    chmod($foldy, 0777);
  }
  echo $foldy;

  for($i = 0; $i < count($_FILES['imageToUpload']['tmp_name']); $i++) {
    $name = $_FILES['imageToUpload']['name'][$i];
    $tmp = $_FILES['imageToUpload']['tmp_name'][$i];
    move_uploaded_file($tmp, $foldy."/".$name);
  }

  http_response_code(200);
} else {
  http_response_code(404);
}
?>
