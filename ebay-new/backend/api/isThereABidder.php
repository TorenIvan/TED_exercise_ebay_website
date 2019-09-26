<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$username = '';

if(isset($_POST) && !empty($_POST)) {

    $id = htmlspecialchars($_POST['id']);

    $sql = "SELECT u.username, MAX(b.amount_of_money)
            FROM user AS u
            INNER JOIN bid AS b ON u.id = b.user_id
            WHERE b.bids_id = (SELECT id
                                FROM bids
                                WHERE auction_id = ?)
            GROUP BY u.username;";

    if($stmt = mysqli_prepare($con, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $param_id);
        $param_id = $id;

        if(mysqli_stmt_execute($stmt)) {

            if($result = mysqli_stmt_get_result($stmt)) {

                while($row = mysqli_fetch_assoc($result))
                {
                    $username = $row['username'];
                }

                echo json_encode($username);
            } else {
                echo json_encode("Couldn't get results");
            }
        } else {
            echo json_encode("Couldn't execute");
        }
    } else {
        echo json_encode("Couldn't prepare");
    }

} else {
    http_response_code("No one requested this!");
}
?>