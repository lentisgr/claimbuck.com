<?php
use \ParagonIE\Halite\KeyFactory;
use \ParagonIE\Halite\Symmetric\Crypto as SymmetricCrypto;

// Generate a new random symmetric-key encryption key. You're going to want to store this:
$key = KeyFactory::generateEncryptionKey();
// To save your encryption key:
KeyFactory::save($key, './keyfile.txt');
// To load it again:
$loadedkey = KeyFactory::loadEncryptionKey('./keyfile.txt');

$message = 'We are all living in a yellow submarine';
$ciphertext = SymmetricCrypto::encrypt($message, $key);
$plaintext = SymmetricCrypto::decrypt($ciphertext, $key);

var_dump($ciphertext);
var_dump($plaintext);