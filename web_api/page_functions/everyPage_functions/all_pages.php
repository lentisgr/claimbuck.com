<?php

function verifyAuth($username,$authToken) {
    //Check if authentication token matches.
    return false;
}

function returnUserdata($user) {
    //data = Get bla bla bla from $user
    $obj = (object) [
        'balance' => 500,
        'total_earnings' => 2000,
        'surveys_completed' => 12
    ];
    return json_encode($obj);
}

function returnAllUserData() {
    //Check if token is admin/bot level. if so -> return all user data
    return json_encode(false);
}

function userSessionCheck($user) {
    //Check if user is in session or not.
    return json_encode(true);
}

?>
