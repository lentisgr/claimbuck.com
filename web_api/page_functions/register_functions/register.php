<?php
include(__DIR__.'/../../config/db_functions.php');
include(__DIR__.'/email.php');
//Adds the user to the database
function userRegister($name,$password,$email) {
    $safe_password = password_hash($password,PASSWORD_ARGON2I);
    $auth_token = generateAuthToken(48);
    //Add all the input data to an array
    $ip = getAddress();
    function ip_visitor_country()
    {

        $client  = @$_SERVER['HTTP_CLIENT_IP'];
        $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
        $remote  = $_SERVER['REMOTE_ADDR'];
        $country  = "Unknown";

        if(filter_var($client, FILTER_VALIDATE_IP))
        {
            $ip = $client;
        }
        elseif(filter_var($forward, FILTER_VALIDATE_IP))
        {
            $ip = $forward;
        }
        else
        {
            $ip = $remote;
        }
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://www.geoplugin.net/json.gp?ip=".$ip);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $ip_data_in = curl_exec($ch); // string
        curl_close($ch);

        $ip_data = json_decode($ip_data_in,true);
        $ip_data = str_replace('&quot;', '"', $ip_data); // for PHP 5.2 see stackoverflow.com/questions/3110487/

        if($ip_data && $ip_data['geoplugin_countryCode'] != null) {
            $country = $ip_data['geoplugin_countryCode'];
        }

        return $country;
    }

    $data = array(
        'name' => $name,
        'email' => $email,
        'password' => $safe_password,
        'points' => 0,
        'address' => $ip,
        'countrycode' => ip_visitor_country(),
        'disid' => '',
        'linkid' => '',
        'auth_token' => $auth_token,
        'verified' => 'no'
    );

    //Check validity of email and insert data
    if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if(userExists($name,$email)) {
            try {
                QB::table('users')->insert($data);
                $json = array('succeed'=>'true','message'=>'OK');
                userVerifyEmail($name,$email);
            } catch(\Pixie\Exception $e) {
                $json = array('succeed'=>'false','message'=>'Error: '.$e);
            }
        } else {
            $json = array('succeed'=>'false','message'=>'3');
        }
    } else {
        $json = array('succeed'=>'false','message'=>'Error: Invalid email');
    }

    //Return response to router
    return json_encode($json,JSON_FORCE_OBJECT);
}

//Adds the user to the database
function userRegisterGoogle($name,$email) {
    $auth_token = generateAuthtoken(48);

    $data = array(
        'name' => $name,
        'email' => $email,
        'password' => '',
        'points' => 0,
        'address' => getAddress(),
        'disid' => '',
        'linkid' => '',
        'auth_token' => $auth_token,
        'verified' => 'google'
    );

    if(userExists($name,$email)) {
        try {
            QB::table('users')->insert($data);
            $json = array('succeed'=>'true','message'=>'OK');
        } catch(\Pixie\Exception $e) {
            $json = array('succeed'=>'false','message'=>'Error: '.$e);
        }
    } else {
        $json = array('succeed'=>'false','message'=>'3');
    }
    return json_encode($json,JSON_FORCE_OBJECT);
}

function userExists($name,$email) {
    $query = QB::table('users')
        ->where('email','=',$email)
        ->orWhere('name','=',$name)
    ;
    if($query->count()==0) {
        return true;
    } else {
        return false;
    }
}
//Get IP of user
function getAddress() {
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
    {
        $ip=$_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
    {
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

//Generate random auth token
function generateAuthtoken($length) {
    $token = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
    $query = QB::table('users')
        ->where('auth_token', '=', $token)
    ;
    if($query->count()==0) {
        return $token;
    } else {
        return generateAuthtoken($length);
    }
}

//Process verification
function processVerification($ver_token) {
    $query = QB::table('verification')
        ->where('verification_token', '=', $ver_token)
    ;
    if($query->count()>0){
        $row = $query->first();
        $data = array(
          'verified' => 'yes'
        );
        QB::table('users')->where('id', $row->id)->update($data);
        QB::table('verification')->where('id', '=', $row->id)->delete();
        $json = array('succeed'=>'true','message'=>'OK');
    } else {
        $json = array('succeed'=>'false','message'=>'2');
    }
    return json_encode($json,JSON_FORCE_OBJECT);
}
?>