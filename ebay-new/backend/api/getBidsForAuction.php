<?php

require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$postVariable = filter_input_array($_POST);

if(isset($postVariable) && !empty($postVariable)) {

    $bids = [];

    $auctionId = htmlspecialchars($postVariable['id']);

    if($auctionId > 0) {

        $sql = "SELECT u.username, b.amount_of_money, b.time_of_bid
                FROM user AS u
                INNER JOIN bid AS b ON u.id = b.user_id
                WHERE b.bids_id = (SELECT id
                                    FROM bids
                                    WHERE auction_id = ?);";

        if($stmt = mysqli_prepare($con, $sql)) {
            mysqli_stmt_bind_param($stmt, "i", $param_id);
            $param_id = $auctionId;

            if(mysqli_stmt_execute($stmt)) {

                if($result = mysqli_stmt_get_result($stmt)) {
                    
                    $cr = 0;
                    while($row = mysqli_fetch_assoc($result))
                    {
                        $bids['data'][$cr]['username'] = $row['username'];
                        $bids['data'][$cr]['money'] = $row['amount_of_money'];
                        $bids['data'][$cr]['time'] = $row['time_of_bid'];

                        $cr++;
                    }

                    echo json_encode($bids);
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
        echo json_encode($bids);
    }
} else {
    // http_response_code("NO ONE REQUESTED THIS! WHY DO YOU ASK FOR IT?!");
    http_response_code(404);
}
?>