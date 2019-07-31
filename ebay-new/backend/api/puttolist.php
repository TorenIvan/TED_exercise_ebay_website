<?php


clearstatcache();
$my_file = 'anamoni.txt';
if(filesize($my_file)) {
    // file is not empty
    print_r('Mpike to epomeno');
    $fn = fopen($my_file, 'r') or die('Cannot open file:  '.$my_file);
    while(!feof($fn))  {
      $result = fgets($fn);
      $result = trim(preg_replace('/\s\s+/', '', $result));
      // print_r("result = ");
      // print_r($result);
      if ($result === $param_username) {
        print_r("Se brika\n");
        print_r("You are already waiting for Admin's approval!!!");
        json_encode("You are already waiting for Admin's approval!!!");
        fclose($fn);
        exit();
      }
    }
    fclose($fn);
    //This username is not on the list(file) yet
    $handle = fopen($my_file, 'a') or die('Cannot open file:  '.$my_file);
    $data = $param_username;
    fwrite($handle, $data);
    fwrite($handle, "\n");
    fclose($handle);
}else{
  //  file is empty
  print_r('Mpike to prwto');
  $handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
  $data = $param_username;
  fwrite($handle, $data);
  fwrite($handle, "\n");
  fclose($handle);
}

//allios balto mesa sto array
// print_r("Prin mpei sti lista : ");
// $lista = array();
// print_r("Create the list\n");
// print_r($lista);
// array_push($lista, $param_username);//bazo username cause username is pretty unique. 10Q\
// print_r("Puted to list : \n");
// //epistrefo array alla skopos einai na epistrepso lista...IMWATCHINGYOU
// json_encode($lista);  //steile ti lista sto front_end
// print_r($lista);


 ?>
