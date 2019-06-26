<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
include(__DIR__.'/../../vendor/autoload.php');

// Instantiation and passing `true` enables exceptions
$token = '';
function userVerifyEmail($username,$email) {
    $mail = new PHPMailer(true);
    $token = emailLink($username);
    try {
        //Server settings
        $mail->SMTPDebug = 0;                                       // Enable verbose debug output
        $mail->isSMTP();                                            // Set mailer to use SMTP
        $mail->Host       = 'mail.mintrexo.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'no-reply@claimbuck.com';                     // SMTP username
        $mail->Password   = '-ZJzNq1@P4E-F,q';                               // SMTP password
        $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
        $mail->Port       = 587;                                    // TCP port to connect to

        //Recipients
        $mail->setFrom('no-reply@claimbuck.com', 'Claimbuck');
        $mail->addAddress($email);     // Add a recipient
        $mail->addReplyTo('no-reply@claimbuck.com', 'Information');

        // Content

        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Claimbuck email verification';
        $mail->Body    = emailContent($username,$token);
        $mail->AltBody = 'Hi there '.$username.',You received this email because you created an account on Claimbuck.com.
                                        In order to verify your e-mail address, you have to click on the link below.
                                        You will want to do this as giftcards are sent to this e-mail address.'.$token.'If you have any questions or need support, please visit our Discord: https://discord.gg/nN4MHCT or visit out website at https://claimbuck.com 
                                        Copyright © Claimbuck, All rights reserved';

        $mail->send();
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

function emailContent($username,$token) {
    ob_start();
    ?>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Claimbuck verify account</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                        <td align="center" style="padding: 40px 0 15px 0;">
                            <img src="https://i.imgur.com/d9BDHTh.png" alt="Claimbuck logo" style="display: block; width: 500px; height: 100%; margin-left: -25px;" />
                        </td>
                    <tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="font-family: sans-serif; font-size: 1.1em;">
                                        Hi there <?php echo $username; ?>,
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 0 0; font-family: sans-serif; font-size: 1.1em;">
                                        You received this email because you created an account on <a href="https://claimbuck.com">Claimbuck.com</a>.
                                        In order to verify your e-mail address, you have to click on the link below.
                                        <br>You will want to do this as giftcards are sent to this e-mail address.
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 0 0; font-family: sans-serif; font-size: 1.1em;">
                                        Click <a href="<?php echo $token ?>">here</a> to verify your email.
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 20px 0; font-family: sans-serif; font-size: 1.1em;">
                                        If you have any questions or need support, please visit our Discord
                                        server at <a href="https://discord.gg/nN4MHCT" target="_blank">https://discord.gg/nN4MHCT</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; font-family: sans-serif; font-size: 1.1em;">
                            <a href="https://claimbuck.com" target="_blank">Visit our website</a> | <a href="https://discord.gg/nN4MHCT" target="_blank">Support</a>
                            <br>
                            Copyright &#x00A9; Claimbuck, All rights reserved
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </body>
    </html>
    <?php
    return (ob_get_clean());
}

function emailLink($username){
    $token = generateToken(64);
    $data = array(
        'user' => $username,
        'verification_token' => $token
    );
    QB::table('verification')->insert($data);
    return 'https://claimbuck.com/verify.php?request=processVerification&ver_token='.$token;
}

function generateToken($length) {
    $token = substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
    $query = QB::table('verification')
        ->where('verification_token', '=', $token)
    ;
    if($query->count()==0) {
        return $token;
    } else {
        return generateToken($length);
    }
}


?>
