<?php
//Temporary code
    $user_1 = 'Jan';
    $user_2 = 'Henk';
    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        $userRequest = $_GET['user'];
        if($userRequest == 1) {
            echo json_encode($user_1);
        }
        else {
            echo json_encode($user_2);
        }
    }
    elseif ($_SERVER['REQUEST_METHOD'] == "POST") {

    }
?>
