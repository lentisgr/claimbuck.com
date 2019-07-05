<?php

function verifyAuth($username,$authToken) {
    $query = QB::table('users')->where('name', '=',$username);
    $result = $query->first();
    if($result==null){
        $json = array('succeed'=>'false','message'=>'4_1');
    } else {
        if($authToken==$result->auth_token) {
            $json = array('succeed'=>'true','message'=>'OK');
        } else {
            $json = array('succeed'=>'false','message'=>'4_2');
        }
    }
    return json_encode($json,JSON_FORCE_OBJECT);
}

function returnUserdata($user) {
    $query = QB::table('users')->where('name', '=',$user);
    $result = $query->first();
    $obj = array('points'=>$result->points,'total_points'=>$result->total_points,'completed_offers'=>$result->completed_offers);
    return json_encode($obj,JSON_FORCE_OBJECT);
}

?>
