<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// db credentials
 define('DB_HOST', 'localhost');
 define('DB_USER', 'root');
 define('DB_PASS', 'toor');
 define('DB_NAME', 'ted_ebay');


//define('DB_HOST', 'localhost');
//define('DB_USER', 'ted_admin');
//define('DB_PASS', 'Adm1n!01');
//define('DB_NAME', 'ted_ebay');

// Connect with the database.
function connect()
{
//  echo "string";
  $connect =mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);
//  echo "string";
  if (mysqli_connect_errno($connect)) {
    print_r('not connected');
    die("Failed to connect:" . mysqli_connect_error());
  }else {
  //  echo 'connected';
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}


$con = connect();

?>
