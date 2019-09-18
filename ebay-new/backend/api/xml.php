<?php

require 'connect.php';

$xml = simplexml_load_file("items-0.xml") or die("Error: Cannot create object");
$d=0;

//we have to add a random user for every bid if he does not exist


//Take all the important data
foreach ($xml->children() as $row) {
  echo $item = (string) $row['ItemID']; //id of product
  $item = (int) $item;
  echo "\n";
  foreach ($row->Location as $Location) {
    echo "latitude = ";
    if($latitude = (string)$Location['Latitude']){
      echo $latitude ;
    }else {
      echo $latitude = 0;
    }
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
    $product_statetown = mysqli_real_escape_string($product_statetown);
    echo "\n";
  }
  foreach ($row->Name as $product_name) {
    echo $product_name = (string) $product_name;
    $product_name = mysqli_real_escape_string($con,$product_name);
    $product_name = addslashes($product_name);
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
    echo $first_bid = (double)str_replace('$', '', $first_bid);
    echo "\n";
  }
  foreach ($row->Number_of_Bids as $number_of_bids) {
    echo $number_of_bids = (int) $number_of_bids;
    echo "\n";
  }
  foreach ($row->Country as $country) {
    echo $country = (string) mysqli_real_escape_string($country);

    echo "\n";
  }
  foreach ($row->Started as $started) {
    echo $started ;
    echo "\n";
  }foreach ($row->Ends as $ends) {
    echo $ends;
    echo "\n";
  }
  foreach ($row->Seller as $Seller) {
    $seller_rating = (string) $Seller['Rating'];
    $seller_rating = (string) mysqli_real_escape_string($con, $seller_rating);
    echo "\n";
    $seller_name = (string) $Seller['UserID'];
    $seller_name = mysqli_real_escape_string($con,$seller_name);
    $seller_name = str_replace('"','', $seller_name);
    echo "\n";
  }
  foreach ($row->Description as $description) {
    $description = mysqli_real_escape_string($con,$description);
    $description = addslashes($description);
    echo "\n";
  }
  //Add product
  $town = "town";
  $address = "address";
  $postcode = "postcode";
  echo "prin";
  $sqlp = "INSERT INTO product (id, name, description, country, state, town, address, postcode, latitude, longitude) VALUES ($item, '$product_name', '$description', '$country', '$product_statetown', '$product_statetown', '$product_statetown', '$product_statetown', $latitude, $longitude);";
  if($result = mysqli_query($con,$sqlp)){
    echo "eeeeeeee";
  }else {
    echo "aaaaaaaaaaa";
    echo("Error : " . mysqli_error($con));
    exit();
  }
  //Add category product_is_category and subcategories
  $i=0; //for categories and subcategories
  foreach ($row->Category as $category) {
    $category = mysqli_real_escape_string($con, $category);
    //if $i==0, check if category exists on product category, if not put it there and take the id. Put to product_is_category the item_id(see above), the id,  and 0
    if ($i==0) {
      echo "mpike";
      $sqlc = "SELECT * from product_category WHERE description = '".$category."' LIMIT 1;";
      if($result = mysqli_query($con, $sqlc)){
        echo 'sqlc good';
      }else {
        echo ('sqlc not good : ' . mysqli_error($con));
      }
      $cat = mysqli_fetch_assoc($result);
      //echo "cat = ";
      // echo $cat;
      // echo $category;
      // echo $item;
      // echo $i;
      if ($cat) {
        //it's already exists
      }else {
        //it is not
        $sqlcat = "INSERT INTO product_category (description) VALUES ('$category');";
        if($result = mysqli_query($con, $sqlcat)){
          echo 'sqlcat insert good';
        }else{
          echo ('sqlcat insert not good : ' . mysqli_error($con));
        }
      }
      //take the id
      $sqlcat = "SELECT * from product_category WHERE description = '".$category."';";
      if($result = mysqli_query($con, $sqlcat)){
        echo 'sqlcat select good';
      }else {
        echo ('sqlcat select not good : ' . mysqli_error($con));
      }
      $pr = mysqli_fetch_assoc($result);
      $product_category_id = $pr['id'];
      $sqlinsert = "INSERT INTO product_is_category (product_id, product_category_id, category_list) VALUES ($item, $product_category_id, $i);";
      if($result = mysqli_query($con, $sqlinsert)){
        echo 'sqlinsert good';
      }else {
        echo ('sql insert not good : ' . mysqli_error($con));
      }
      $i++;
    } else {  //an eisai se kapoia upokatigoria
      echo "kai edo";
      //for every other i, create a table if not exists, category-i, and/or then put it there if id father not the same, with its fathers id, and keep his(child) id for the next one. Put to product_is_category the item_id(see above), the id,  and father's id
    //  echo $category;

      $string_i = (string) ($i);
      $base_string = "SubCategoriesLevel";
      $table_name =  $base_string.$string_i;
      echo "\n";
      //create table
      $sqlcreate = "CREATE TABLE IF NOT EXISTS $table_name (id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, id_Father INT(10) UNSIGNED NOT NULL, description varchar(200) NOT NULL)";
      if($result = mysqli_query($con, $sqlcreate)){
        echo 'sqlcreate good';
        echo ' i = ' . $i;
      }else {
        echo ('sqlcreate not good : '. mysqli_error($con));
      }
      //put category or not
      //an yparxei category me idio id patera min to baleis. An einai me allo bale ton
      $sqlfind = "SELECT * from $table_name where id_Father = $product_category_id AND description = '".$category."' LIMIT 1;";
      if($result = mysqli_query($con,$sqlfind)){
        echo " sql find good ";
      }else{
        echo " sql find not good " . mysqli_error($con);
        exit();
      }
      $find = mysqli_fetch_assoc($result);
      if ($find) {  //does nothing here
        // id_Father already exists in this table
      } else {
        // we must insert this value
        $sqlputit = "INSERT INTO $table_name (id_Father, description) VALUES ($product_category_id, '$category');";
        if($result = mysqli_query($con, $sqlputit)){
          echo 'sqlputit good';
        }else {
          echo ('sqlputit not good : ' . mysqli_error($con));
          exit();
        }
      }
      //keep the id
      echo $category;
      echo $product_category_id;
      $sqlcat = "SELECT * from $table_name WHERE description = '".$category."' AND id_Father = '".$product_category_id."' LIMIT 1;";
      if($result = mysqli_query($con, $sqlcat)){
        echo 'sqlcat select2 good';
        while($pr = mysqli_fetch_assoc($result)){
          $product_category_id = $pr['id']; //new product_category_id, cause we have a new father xD!!!!
        }
        echo ('pr = ' . $pr);

        echo 'product_category_id : ' . $product_category_id;
      }else{
        echo ('sqlcat select2 not good : ' . mysqli_error($con));
        exit();
      }
      echo $item;
      echo $i;

      //put it in product_is_category
      $sqlinsert = "INSERT INTO product_is_category (product_id, product_category_id, category_list) VALUES ($item, $product_category_id, $i);";
      if($result = mysqli_query($con, $sqlinsert)){
        echo 'sqlinsert2 good';
      }else {
        echo ('sql insert2 not good : ' . mysqli_error($con));
        exit();
      }
      $i=$i+1;
      //and it goes on...
    }
  }
  //Add user
  $sqlexist = "SELECT * FROM user WHERE username = '".$seller_name."';";
  if($result = mysqli_query($con, $sqlexist)){
    echo 'sqlexist good';
  }else {
    echo ('sql exist not good : ' . mysqli_error($con));
    exit();
  }
  $ex = mysqli_fetch_assoc($result);
  if ($ex) {
    $sqluser = "UPDATE user SET rating_seller = '".$seller_rating."' WHERE username = '".$seller_name."';";
  } else {
    $password = "215be75c49eba06a0b711c687024449c";
    $name = "o";
    $surname = "i";
    $email = "i@mail.com";
    $phone_number = 6999999999;
    $afm = 192837465;
    $sqluser = "INSERT INTO user (username, password , name , surname, email, phone_number, country, state, town, address, postcode, afm, rating_seller)
    VALUES ('$seller_name', '$password', '$name', '$surname', '$email', $phone_number, '$country', '$town', '$town', '$town', '$town', $afm, $seller_rating);";
  }
  if($result = mysqli_query($con, $sqluser)){
    echo 'sqluser good';
  }else {
    echo ('sql user not good : ' . mysqli_error($con));
    exit();
  }
  //take the id of user
  $sqltake = "SELECT * FROM user where username = '".$seller_name."' LIMIT 1;";
  if($result = mysqli_query($con, $sqltake)){
    echo 'sqltake good';
  }else {
    echo ('sql take not good : ' . mysqli_error($con));
    exit();
  }
  $pr = mysqli_fetch_assoc($result);
  $user_id = $pr['id'];
  //Add auction
  //buy_price mporei na to fas
  if ($buy_price_index == 0) {
    $sqlauction = "INSERT INTO auction (user_id, product_id, currently, first_bid, number_of_bids, start_date, end_date) VALUES ($user_id, $item, $currently, $first_bid, $number_of_bids, '$started', '$ends');";
  } else {
    $sqlauction = "INSERT INTO auction (user_id, product_id, buy_price, currently, first_bid, number_of_bids, start_date, end_date) VALUES ($user_id, $item, $buy_price, $currently, $first_bid, $number_of_bids, '$started', '$ends');";
  }
  if($result = mysqli_query($con, $sqlauction)){
    echo ' sqlauction good';
  }else {
    echo (' sql auction not good : ' . mysqli_error($con));
    exit();
  }
  $sqltake = "SELECT * FROM auction where product_id = '".$item."' LIMIT 1;";
  if($result = mysqli_query($con, $sqltake)){
    echo 'sqltake good';
  }else {
    echo ('sql take not good : ' . mysqli_error($con));
    exit();
  }
  $pr = mysqli_fetch_assoc($result);
  $auction_id = $pr['id'];
  //Add bids
  $sqlbids = "INSERT INTO bids (auction_id) VALUES ($auction_id);";
  if($result = mysqli_query($con, $sqlbids)){
    echo 'sqlbids good';
  }else {
    echo ('sql bids not good : ' . mysqli_error($con));
    exit();
  }
  $sqltake = "SELECT * FROM bids where auction_id = '".$auction_id."' LIMIT 1;";
  if($result = mysqli_query($con, $sqltake)){
    echo 'sqltake good';
  }else {
    echo ('sql take not good : ' . mysqli_error($con));
  }
  $pr = mysqli_fetch_assoc($result);
  $bids_id = $pr['id'];
  //Add bid
  $n_bids = 0;
  foreach ($row->Bids->Bid as $bid) {
    $n_bid++;
    echo $bid_time = $bid->Time;
    foreach ($bid->Amount as $bid_amounts) {
      echo $bid_amount = (double)str_replace('$','' , $bid_amounts);
    }
    foreach ($bid->Bidder as $bidder) {
      echo $bidder_rating = $bidder['Rating'];
      echo "\n";
      echo $bidder_name = $bidder['UserID'];
      $bidder_name = mysqli_real_escape_string($con,$bidder_name);
      echo "\n";
      echo $bidder_location = $bidder->Location;
      $bidder_location = mysqli_real_escape_string($con,$bidder_location);
      echo "\n";
      echo $bidder_country = $bidder->Country;
      $bidder_country = mysqli_real_escape_string($con,$bidder_country);
      echo "\n";
      //Update or add user of bid
      $sqlexist = "SELECT * FROM user WHERE username = '".$bidder_name."';";
      if($result = mysqli_query($con, $sqlexist)){
        echo 'sqlexist good';
      }else {
        echo ('sql exist not good : ' . mysqli_error($con));
        exit();
      }
      $ex = mysqli_fetch_assoc($result);
      if ($ex) {
        $sqluser = "UPDATE user SET rating_bidder = '".$bidder_rating."' WHERE username = '".$bidder_name."';";
        echo ' Updating... ';
      } else {
        $password = "215be75c49eba06a0b711c687024449c";
        $name = "o";
        $surname = "i";
        $email = "i@mail.com";
        $phone_number = 6999999999;
        $sqluser = "INSERT INTO user (username, password , name , surname, email, phone_number, country, state, town, address, postcode, afm, rating_bidder)
        VALUES ('$bidder_name', '$password', '$name', '$surname', '$email', $phone_number, '$bidder_country', '$bidder_location', '$town', '$town', '$town', 192837465, $bidder_rating);";
        echo ' Inserting... ';
      }
      if($result = mysqli_query($con, $sqluser)){
        echo 'sqluser good';
      }else {
        echo ('sql user not good : ' . mysqli_error($con));
        exit();
      }
      //take the id of user
      $sqltake = "SELECT * FROM user where username = '".$bidder_name."' LIMIT 1;";
      if($result = mysqli_query($con, $sqltake)){
        echo 'sqltake good';
      }else {
        echo ('sql take not good : ' . mysqli_error($con));
        exit();
      }
      $pr = mysqli_fetch_assoc($result);
      $new_user_id = $pr['id'];
      //$bid_amount = (double) $bid_amount;
      //continue

      //Add bid
      $sqlbid = "INSERT INTO bid (bids_id, user_id, time_of_bid, amount_of_money) VALUES ($bids_id, $new_user_id, '$bid_time', $bid_amount);";
      if($result = mysqli_query($con, $sqlbid)){
        echo 'sqlbid good';
      }else {
        echo (' sql bid not good : ' . mysqli_error($con));
        exit();
      }
    }
  }
  if ($n_bids == 0) {
    $sqldelete = "DELETE FROM bids where id = $bids_id;";
    $result = mysqli_query($con, $sqldelete);
  }

  $d++;
  // if ($d==5) {
  //   break;
  // }
}

?>
