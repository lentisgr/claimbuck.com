<?php

function userLogin($email,$password) {
    //Set cookie auth in user's pc.
    $query = QB::table('users')->where('email', '=', $email);
    $result = $query->first();
    if($result==null){
        $json = array('succeed'=>'false','message'=>'4');
    } else {
        if($result->verified=='yes') {
            if(password_verify($password,$result->password)) {
                $json = array('succeed'=>'true','message'=>'OK');
                ob_start();
                setcookie('auth',$result->auth_token,time() + 1200,'/','claimbuck.com', TRUE);
                setcookie('username',$result->name,time() + 1200,'/','claimbuck.com', TRUE);
                ob_end_flush();
            } else {
                $json = array('succeed'=>'false','message'=>'5');
            }
        } else {
            $json = array('succeed'=>'false','message'=>'6');
        }
    }
    return json_encode($json,JSON_FORCE_OBJECT);
}

?>