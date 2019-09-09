<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if(isset($_POST) && !empty($_POST)) {

    $id = htmlspecialchars($_POST['id']);

    $sql = "SELECT username FROM user WHERE id=?";

    if($stmt = mysqli_prepare($con, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $param_id);
        $param_id = $id;

        if(mysqli_stmt_execute($stmt)) {
            
            mysqli_stmt_bind_result($stmt, $data_username);
            if(mysqli_stmt_fetch($stmt) == 1) {
                echo json_encode($data_username);
            } else {
                echo json_encode("No user with that id");
            }
        } else {
            echo json_encode("problem while executing query");
        }
    } else {
        echo json_encode("problem while preparing query");
    }

}else {
    http_response_code("No one requested this!");
}
?>