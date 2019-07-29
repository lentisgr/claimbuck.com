<?php
use Defuse\Crypto\Crypto;
use Defuse\Crypto\Key;


function addCard($type,$value,$points,$code,$expdate) {

    $exists = false;
    $code2 = Crypto::encrypt($code, loadKey(__DIR__."/keyfile.txt"));
    $query = QB::table('giftcards');
    $result = $query->get();
    foreach ($result as $giftcard) {
        $codeCheck = Crypto::decrypt($giftcard->code, loadKey(__DIR__."/keyfile.txt"));
        if($codeCheck==$code) {
            $exists = true;
            break;
        }
    }
    if($exists) {
        $json = array('succeed'=>'false','message'=>'ALREADY EXISTS');
    } else {
        $data = array(
            'type' => $type,
            'value' => $value,
            'points' => $points,
            'code' => $code2,
            'expdate' => $expdate
        );
        QB::table('giftcards')->insert($data);
        $json = array('succeed'=>'true','message'=>'INSERTED');
    }
return json_encode($json,JSON_FORCE_OBJECT);
}


