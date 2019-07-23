<?php

  require 'connect.php';
  $sql="select auction.id as auction_id, user.id as user_id, user.name as user_name from auction right join user on user.id=auction.user_id";

?>
