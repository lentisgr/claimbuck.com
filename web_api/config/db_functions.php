<?php
// Make sure you have Composer's autoload file included
include(__DIR__.'/../vendor/autoload.php');

// Create a connection, once only.
$config = array(
    'driver'    => 'mysql', // Db driver
    'host'      => 'localhost',
    'database'  => 'claimbuck',
    'username'  => 'root',
    'password'  => '',
    'charset'   => 'utf8', // Optional
    'collation' => 'utf8_unicode_ci', // Optional
    'options'   => array( // PDO constructor options, optional
        PDO::ATTR_TIMEOUT => 5,
        PDO::ATTR_EMULATE_PREPARES => false,
    ),
);

new \Pixie\Connection('mysql', $config, 'QB');
?>