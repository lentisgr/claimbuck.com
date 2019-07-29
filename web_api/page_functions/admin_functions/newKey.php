<?php
use Defuse\Crypto\Key;
require_once(realpath(dirname(__FILE__) . '/../../vendor/autoload.php'));
try {
    $key = Key::createNewRandomKey();
} catch (\Defuse\Crypto\Exception\EnvironmentIsBrokenException $e) {
    return $e;
}
try {
    $safeCipher = $key->saveToAsciiSafeString();
    echo $safeCipher;
} catch (\Defuse\Crypto\Exception\EnvironmentIsBrokenException $e) {
    return $e;
}
$myFile2 = "keyfile.txt";
$myFileLink2 = fopen($myFile2, 'a+') or die("Can't open file.");
chmod("keyfile.txt", 0777);
fwrite($myFileLink2, $safeCipher);
fclose($myFileLink2);
return 'all ok';