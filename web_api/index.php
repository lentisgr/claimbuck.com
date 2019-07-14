<?php
cors();
error_reporting(E_ALL);
ini_set('display_errors', 'on');
include ('page_functions/everyPage_functions/all_pages.php');
include ('page_functions/login_functions/login_page.php');
include ('page_functions/register_functions/register.php');
include ('page_functions/offerwall_functions/earn.php');
include ('page_functions/redeem_functions/redeem_page.php');

/*
 * This file acts as a router for all incoming API calls.
 * Firstly the request method gets detected and if there isn't a valid one, it throws a 'Method Not Allowed' code.
 * Then the auth token, username and type of request are verified to be filled in or a 'Forbidden' code will be thrown.
 * After that, the auth token is verified and then the user can access the methods.
 */

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        if(!empty($_POST['request'])) {
            $request = $_POST['request'];
            if(!empty($_POST['username'])) {

                $username = filter_var($_POST['username'],FILTER_SANITIZE_STRING);
                if($request=='login') {
                    if(!empty($_POST['email'])&&!empty($_POST['password'])) {
                        $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);
                        echo userLogin($_POST['email'],$password);
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

                } elseif($request=='userInfo') {
                    if(!empty($_POST['auth_token'])) {
                        $json = verifyAuth($username,$_POST['auth_token']);
                        $json2 = json_decode($json);
                        if($json2->message=='OK') {
                            echo (returnUserData($username));
                        } else {
                            echo $json;
                        }
                    } else {
                        BadHttpHeader(array('auth token'));
                    }
                } else {
                    BadRouterRequest();
                }
            } elseif($_POST['request']=='processVerification') {
                if (!empty($_POST['ver_token'])) {
                    echo (processVerification($_POST['ver_token']));
                } else {
                    BadHttpHeader(array('verification token'));
                }
            } elseif($_POST['request']=='authCheck') {
                if(!empty($_POST['auth_token'])) {
                    echo verifyAuth($username,$_POST['auth_token']);
                } else {
                    BadHttpHeader(array('auth token'));
                }
            } else {
                BadHttpHeader(array('request','username'));
            }
        } else {
            BadHttpHeader(array('request'));
        }
    } else if($_SERVER['REQUEST_METHOD']=='GET') {
      if(!empty($_GET['request'])) {
          //Postback requests dont need returning errors as they are automated processes. Errors are handled by the postback sender.
          if($_GET['request']=='postbackAdgate') {
              if(!empty($_GET['tx_id'])&&!empty($_GET['user_id'])&&!empty($_GET['points'])&&!empty($_GET['usd_value'])&&!empty($_GET['offer_title'])) {
                  addPoints($_GET['user_id'],$_GET['points']);
                  sendWebhook('Adgate',$_GET['user_id'],$_GET['points'],$_GET['tx_id'],$_GET['usd_value'],$_GET['offer_title']);
              }
          } else if($_GET['request']=='postbackOffertoro'){
              if(!empty($_GET['tx_id'])&&!empty($_GET['user_id'])&&!empty($_GET['points'])&&!empty($_GET['usd_value'])&&!empty($_GET['offer_title'])) {
                  addPoints($_GET['user_id'],$_GET['points']);
                  sendWebhook('Offertoro',$_GET['user_id'],$_GET['points'],$_GET['tx_id'],$_GET['usd_value'],$_GET['offer_title']);
              }
          } else if($_GET['request']=='giftcardData') {
              if(!empty($_GET['auth_token'])&&!empty($_GET['username'])) {
                  $json = verifyAuth($_GET['username'],$_GET['auth_token']);
                  $json2 = json_decode($json);
                  if($json2->message=='OK') {
                      echo (getGiftcards());
                  } else {
                      echo $json;
                  }
              } else {
                  BadHttpHeader(array('auth token','username'));
              }
          } else {
              BadRouterRequest();
          }
      }  else {
          BadHttpHeader(array('request'));
      }
    } else {
        BadRequestMethod();
    }

    function BadHttpHeader($values) {
        $json = "API call error: http header not filled in: ";
        foreach ($values as $value){$json = $json.("'".$value."' ");}
        echo json_encode($json,JSON_FORCE_OBJECT);
        http_response_code(403);
    }
    function BadRequestMethod() {
        $json = "API call error: Request method not allowed. Use GET or POST instead!";
        echo json_encode($json,JSON_FORCE_OBJECT);
        http_response_code(405);
    }
    function BadRouterRequest() {
        $json = "API call error: router request not found!";
        echo json_encode($json,JSON_FORCE_OBJECT);
        http_response_code(404);
    }
    function BadEmail() {
        $json = "1";
        echo json_encode($json,JSON_FORCE_OBJECT);
        http_response_code(403);
    }
function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        echo 'ss';
        exit(0);
    }
}

?>
