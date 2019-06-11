<?php
include(__DIR__.'/../../config/db_functions.php');

function userRegister($name,$password,$email) {
    $safe_password = password_hash($password,PASSWORD_ARGON2I);
    $data = array(
        'name' => $name,
        'email' => $email,
        'password' => $safe_password,
        'points' => 0,
        'address' => getAddress(),
        'disid' => '',
        'linkid' => ''
    );
    QB::table('users')->insert($data);
    $json = array('succeed'=>'false','message'=>'Error: invalid email');
    return json_encode($json,JSON_FORCE_OBJECT);
}
function getAddress()
{
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
?>