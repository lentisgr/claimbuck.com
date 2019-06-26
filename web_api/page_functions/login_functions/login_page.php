<?php

function userLogin($username,$email,$password) {
    //Set cookie auth in user's pc.
    setcookie('auth','testToken',time() + 60,'/','claimbuck.com', TRUE);
    $json = array('succeed'=>'true','message'=>'OK');
    return json_encode($json,JSON_FORCE_OBJECT);
}
?>