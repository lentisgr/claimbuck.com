<?php
include ('page_functions/everyPage_functions/all_pages.php');
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
        $authtoken = $_GET['auth_token'];
        $username = $_GET['username'];
        $request = $_GET['request'];

        if(!empty($authtoken)&&!empty($username)&&!empty($request)) {
            if(verifyAuth($username,$authtoken)) {
                //This switch checks what the request is that the API call gives (get user data, login, etc..)
                switch ($request) {
                    case 'userdata':
                        //This case gets the userdata from specific user and sends it back in a json object.
                        echo json_encode(returnUserdata($username));
                        break;
                    case 'sessionCheck':
                        //Session logic
                        break;
                    default:
                        //Specified request not found
                        http_response_code(404);
                }
            } else {
                http_response_code(403);
            }
        } else {
            http_response_code(403);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
        $authtoken = $_POST['auth_token'];
        $username = $_POST['username'];
        $request = $_POST['request'];

        if(!empty($_POST['auth_token'])&&!empty($_POST['username'])&&!empty($_POST['request'])) {
            if(verifyAuth($_GET['username'],$_GET['auth_token'])) {

                //POST methods

            } else {
                http_response_code(403);
            }
        } else {
            http_response_code(403);
        }
    } else {
        http_response_code(405);
    }
?>
