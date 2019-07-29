<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Defuse\Crypto\Crypto;
use Defuse\Crypto\Key;

// Load Composer's autoloader
include(__DIR__.'/../../vendor/autoload.php');


function getGiftcards() {
    $query = QB::table('giftcardtypes')->groupBy(array('giftcardtypes.type', 'giftcardtypes.value'));
    $result = $query->get();
    foreach ($result as $object) {
        unset($object->code);
        unset($object->expdate);
        filter_var($object->instock, FILTER_VALIDATE_BOOLEAN);
    }
    return json_encode($result,JSON_FORCE_OBJECT);
}

function sendGiftcard($user,$type,$value,$points) {
    $query = QB::table('giftcards')
        ->where('type', '=', $type)
        ->where('value', '=', $value)
        ->where('points', '=', $points)
        ->where('used', '=', 'false');
    if($query->count()>0) {
        $pointThing = checkPoints($user,$points);
        if($pointThing!=false) {
            $row = $query->first();
            sendMail($user,$row);
            deductPoints($user,$pointThing);
            $json = array('succeed'=>'true','message'=>'OK');
        } else {
            $json = array('succeed'=>'false','message'=>'7_1');
        }
    } else {
        $json = array('succeed'=>'false','message'=>'7_2');
    }
    return json_encode($json,JSON_FORCE_OBJECT);
}

function deductPoints($user,$points) {
    $data = array('points' => $points);
    QB::table('users')->where('name', $user)->update($data);
}

function checkPoints($user,$points) {
    $userPoints = QB::table('users')->find($user, 'name');
    $resultPoints = $userPoints->points - $points;
    if($resultPoints>=0) {
        return $resultPoints;
    } else {
        return false;
    }
}

function decryptCard($card) {
    $data = array('used' => 'true');
    QB::table('giftcards')->where('id', $card->id)->update($data);
    $row = QB::table('statistics')->where('id', '=', 1);
    $cards = $row->first()->cards_redeemed+1;
    QB::table('statistics')->update(array('cards_redeemed'=>$cards));
    $card->code = Crypto::decrypt($card->code, loadKey("../admin_functions/keyfile.txt"));
    return $card;
}

function loadKey($myFile) {
    $myFileLink = fopen($myFile, 'r');
    $myFileContents = fread($myFileLink, filesize($myFile));
    rtrim($myFileContents);
    fclose($myFileLink);
    return Key::loadFromAsciiSafeString($myFileContents);
}

function sendMail($user,$giftcard) {
    $giftcard = decryptCard($giftcard);
    giftcardWebhook($user,$giftcard);
    $userInfo = QB::table('users')->find($user, 'name');
    $email = $userInfo->email;
    $mail = new PHPMailer(true);
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
        $mail->Subject = 'Claimbuck giftcard!';
        $mail->Body    = emailHTML($user,$giftcard);
        $mail->AltBody = 'Hi there '.$user.',You received this email because redeemed a giftcard on Claimbuck.com. 
        Giftcard vendor: '.$giftcard->type.' $'.$giftcard->value.' Points deducted: '.$giftcard->points.' Giftcard code (Keep this code safe!): '.$giftcard->code.' Giftcard expiry date: '.$giftcard->expdate.
            'If you have any questions or need support, please visit our Discord: https://discord.gg/nN4MHCT or visit out website at https://claimbuck.com 
            Copyright © Claimbuck, All rights reserved';

        $mail->send();
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

function emailHTML($username,$giftcard) {
    ob_start();
    ?>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Claimbuck giftcard!</title>
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
                                        You received this email because you redeemed a giftcard on <a href="https://claimbuck.com">Claimbuck.com</a>.
                                        <br><br>
                                        Giftcard vendor: <?php echo $giftcard->type." $".$giftcard->value ?>
                                        <br>
                                        Points deducted: <?php echo $giftcard->points ?>
                                        <br>
                                        Giftcard code (Keep this code safe!): <?php echo $giftcard->code ?>
                                        <br>
                                        Giftcard expiry date: <?php echo $giftcard->expdate ?>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0 0 0; font-family: sans-serif; font-size: 1.1em;">

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

function giftcardWebhook($username,$giftcard) {
    $url = "https://discordapp.com/api/webhooks/600307211776032768/T1BHhpUoslsCW3BVWmjTvbqz8ovC8qsEy_IQ4hGlQg1YMJdhdrmH1-8hMs9eq_0GnZmg";

    $hookObject = json_encode([
        /*
         * The username shown in the message
         */
        "username" => "Claimbuck Withdrawals ",
        /*
         * The image location for the senders image
         */
        "avatar_url" => "https://pbs.twimg.com/profile_images/972154872261853184/RnOg6UyU_400x400.jpg",
        /*
         * Whether or not to read the message in Text-to-speech
         */
        "tts" => false,

        "embeds" => [
            /*
             * Our first embed
             */
            [
                // Set the title for your embed
                "title" => $giftcard->type,

                // The type of your embed, will ALWAYS be "rich"
                "type" => "rich",

                // A description for your embed
                "description" => "",

                /* A timestamp to be displayed below the embed, IE for when an an article was posted
                 * This must be formatted as ISO8601
                 */
                "timestamp" => date_format(date_create(), 'c'),

                // The integer color to be used on the left side of the embed
                "color" => hexdec( "FFFFFF" ),

                // Footer object
                "footer" => [
                    "text" => "Claimbuck withdrawals"
                ],

                // Thumbnail object
                "thumbnail" => [
                    "url" => "https://pbs.twimg.com/profile_images/972154872261853184/RnOg6UyU_400x400.jpg"
                ],

                // Field array of objects
                "fields" => [
                    // Field 1
                    // Field 2
                    [
                        "name" => "Username",
                        "value" => $username,
                        "inline" => false
                    ],

                    [
                        "name" => "Card",
                        "value" => $giftcard->type,
                        "inline" => false
                    ],
                    // Field 3
                    [
                        "name" => "Worth",
                        "value" => "$".$giftcard->value,
                        "inline" => false
                    ],
                    [
                        "name" => "Point cost",
                        "value" => $giftcard->points,
                        "inline" => false
                    ]
                ]
            ]
        ]
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );

    $ch = curl_init();

    curl_setopt_array( $ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $hookObject,
        CURLOPT_HTTPHEADER => [
            "Length" => strlen( $hookObject ),
            "Content-Type" => "application/json"
        ]
    ]);

    $response = curl_exec( $ch );
    curl_close( $ch );
}