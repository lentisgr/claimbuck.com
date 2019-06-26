<?php
header("Access-Control-Allow-Origin: *");
error_reporting(E_ALL);
ini_set('display_errors', 'on');
include ('page_functions/everyPage_functions/all_pages.php');
include ('page_functions/login_functions/login_page.php');
include ('page_functions/register_functions/register.php');

/*
 * This file acts as a router for all incoming API calls.
 * Firstly the request method gets detected and if there isn't a valid one, it throws a 'Method Not Allowed' code.
 * Then the auth token, username and type of request are verified to be filled in or a 'Forbidden' code will be thrown.
 * After that, the auth token is verified and then the user can access the methods.
 */
/*
 * GET = 'I need some data, can you GET it for me?'
 * POST = 'I am sending some POST with information to the server.'
 */

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        if(!empty($_POST['request'])&&!empty($_POST['username'])) {
            $request = $_POST['request'];
            $username = filter_var($_POST['username'],FILTER_SANITIZE_STRING);
            //TODO switch request router

            if($request=='authVerify') {
                if(!empty($_POST['auth_token'])) {
                    $authtoken = $_POST['auth_token'];
                    if(verifyAuth($username,$authtoken)) {

                        switch ($request) {
                            case 'addPoints':
                                break;
                        }
                    } else {
                        BadAuthToken();
                    }
                } else {
                    BadHttpHeader(array('auth token'));
                }

            } elseif($request=='login') {
                if(!empty($_POST['email'])&&!empty($_POST['password'])) {
                    $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);
                    echo userLogin($username,$_POST['email'],$password);
                } else {
                    BadHttpHeader(array('email','password'));
                }

            } elseif($request=='register') {
                if(!empty($_POST['password'])&&!empty($_POST['email'])) {
                    $password = filter_var($_POST['password'],FILTER_SANITIZE_STRING);
                    echo (userRegister($username,$password,$_POST['email']));
                } else {
                    BadHttpHeader(array('password','email'));
                }

            } elseif($request=='registerLoginGoogle') {
                if(!empty($_POST['email'])) {
                    $email = filter_var($_POST['email'],FILTER_SANITIZE_STRING);
                    echo (userRegisterGoogle($username,$email));
                } else {
                    BadHttpHeader(array('email'));
                }

            } else if($request=='processVerification') {
                if (!empty($_POST['ver_token'])) {
                    echo (processVerification($_POST['ver_token']));
                } else {
                    BadHttpHeader(array('verification token'));
                }
            } else {
                BadRouterRequest();
            }
        } else {
            BadHttpHeader(array('request','username'));
        }
    } else {
        BadRequestMethod();
    }

    function BadAuthToken() {
        echo "API call error: Authentication token invalid!";
        http_response_code(403);
    }
    function BadHttpHeader($values) {
        echo "API call error: http header not filled in: ";
        foreach ($values as $value){echo ("'".$value."' ");}
        http_response_code(403);
    }
    function BadRequestMethod() {
        echo "API call error: Request method not allowed. Use GET or POST instead!";
        http_response_code(405);
    }
    function BadRouterRequest() {
        echo "API call error: router request not found!";
        http_response_code(404);
    }

    function BadEmail() {
        echo "1";
        http_response_code(403);
    }

?>
