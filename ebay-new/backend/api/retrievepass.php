<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {
    // add user to database
    echo json_encode("Let's say that i did that");
} else {
    // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
    http_response_code(404);
}
?>