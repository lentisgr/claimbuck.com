<?php
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

    if ($_SERVER['REQUEST_METHOD'] == "GET") {
        if(!empty($_GET['auth_token'])&&!empty($_GET['username'])&&!empty($_GET['request'])) {
            $authtoken = $_GET['auth_token'];
            $username = $_GET['username'];
            $request = $_GET['request'];
            if(verifyAuth($username,$authtoken)) {
                //This switch checks what the request is that the API call gives (get user data, login, etc..)
                switch ($request) {
                    case 'userdata':
                        //This case gets the userdata from specific user and sends it back in a json object.
                        echo returnUserdata($username);
                        break;
                    case 'allUserdata':
                        //This case gets the userdata from all users and sends it back in a json object.
                        echo returnAllUserdata($authtoken);
                        break;
                    case 'sessionCheck':
                        //Session logic
                        echo userSessionCheck($username);
                        break;
                    default:
                        //Specified request not found
                        echo "API call error: router request not found!";
                        http_response_code(404);
                        break;
                }
            } else {
                echo "API call error: Authentication token invalid!";
                http_response_code(403);
            }
        } else {
            echo "API call error: http header not filled in properly!";
            http_response_code(403);
        }

    } elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
        if(!empty($_POST['auth_token'])&&!empty($_POST['username'])&&!empty($_POST['request'])) {
            $authtoken = $_POST['auth_token'];
            $username = $_POST['username'];
            $request = $_POST['request'];

            //login
            if(!empty($_POST['password'])) {
                $password = $_POST['password'];
            } else $password = '';

            //lost password
            if(!empty($_POST['lost_pass_email'])) {
                $lost_pass_email = $_POST['lost_pass_email'];
            } else $lost_pass_email = '';

            if(verifyAuth($username,$authtoken)) {
                switch ($request) {
                    case 'login':
                        //This route tries to log the user in and returns false/true based on the result.
                        echo (userLogin($username,$password));
                        break;
                }
                //POST methods
            } elseif ($request=='register'&&!empty($_POST['email'])) {
                //This route registers the user and sends a verification email
                echo (userRegister($username,$password,$_POST['email']));
            } else {
                echo "API call error: Authentication token invalid!";
                http_response_code(403);
            }
        } else {
            echo "API call error: http header not filled in properly!";
            http_response_code(403);
        }
    } else {
        echo "API call error: Request method not allowed. Use GET or POST instead!";
        http_response_code(405);
    }
?>
