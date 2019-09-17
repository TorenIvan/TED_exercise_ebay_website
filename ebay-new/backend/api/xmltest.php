<?php

require 'connect.php';

$xml = simplexml_load_file("items-0.xml") or die("Error: Cannot create object");
$d=0;

//we have to add a random user for every bid if he does not exist


//Take all the important data
foreach ($xml->children() as $row) {
  echo "id = ";
  echo $item = (int) $row['ItemID']; //id of product
  //echo $item = (int) $item;
  echo "\n";
  foreach ($row->Location as $Location) {
    echo "latitude = ";
    if($latitude = (string)$Location['Latitude']){
      echo $latitude ;

    }else {
      echo $latitude = 0;
    }
    //echo $latitude = (int) $latitude;
    //echo "Location =   ";
    //echo $Location;
    echo "\n";
    echo "longitude = ";
    if($longitude =  (string )$Location['Longitude']){
      echo $longitude;
    }else {
      echo $longitude = 0;
    }


    echo "\n";
    echo "statetown = ";
    echo $product_statetown = (string )$Location;
    echo "\n";
  }
  foreach ($row->Name as $product_name) {
    echo "product_name = ";
    echo $product_name = (string) $product_name;
    echo "\n";
  }
  foreach ($row->Currently as $currently) {
    echo "currently = ";
    echo $currently = (double)str_replace('$', '', $currently);
    echo "\n";
  }
  $buy_price_index = 0;
  foreach ($row->Buy_Price as $buy_price) {
    echo "buy_price = ";
    echo $buy_price = (int) $buy_price;
    $buy_price_index = $buy_price_index + 1;
    echo "\n";
  }
  foreach ($row->First_Bid as $first_bid) {
    echo "first_bid = ";
    echo $first_bid = (double)str_replace('$', '', $currently);
    echo "\n";
  }
  foreach ($row->Number_of_Bids as $number_of_bids) {
    echo "number_of_bids = ";
    echo $number_of_bids = (int) $number_of_bids;
    echo "\n";
  }
  foreach ($row->Country as $country) {
    echo "country = ";
    echo $country = (string) $country;
    echo "\n";
  }
  foreach ($row->Started as $started) {
    echo "started = ";
    echo $started ;
    echo "\n";
  }foreach ($row->Ends as $ends) {
    echo "ends = ";
    echo $ends;
    echo "\n";
  }
  foreach ($row->Seller as $Seller) {
    $seller_rating = (string) $Seller['Rating'];
    echo "\n";
    $seller_name = (string) $Seller['UserID'];
    echo "\n";
  }
  foreach ($row->Description as $description) {
    echo $description = mysqli_real_escape_string($con,$description);
    echo "\n";
  }
  //Add product
  $town = 'town';
  $address = (string)'address';
  $postcode = (string)'postcode';
  echo "prin";
  //$sqlp = "INSERT INTO product (id, name, description, country, state, town, address, postcode) VALUES ('".$item."', '".$product_name."', '".$description."', '".$country."', '".$product_statetown."', '".$product_statetown."', '".$product_statetown."', '".$product_statetown."');";
  //echo $sqlp;
  $id = (int)123432;
  // $sqlp = "INSERT INTO product (id, name, description, country, state) VALUES ($id, '$town', '$address', 'e', 'e');";
  $sqlp = "INSERT INTO product (id, name, description, country, state, town, address, postcode, latitude, longitude) VALUES (123432, '$product_name', '$description ', '$country', '$town', '$town', '$town', '$town', $latitude, $longitude);";
  if($result = mysqli_query($con,$sqlp)){
    echo "eeeeeeee";
  }else {
    echo "aaaaaaaaaaa";
    echo("Error description : " . mysqli_error($con));
  }
  $d++;
  if ($d==1) {
    break;
  }
}
// $sqlp = "INSERT INTO product (id, name, description, country, state, latitude, longitude) VALUES (123432, $town, $town, $town, $town, 0, 0);";
// echo $result = mysqli_query($con,$sqlp);

?>
