<?php
header('Access-Control-Allow-Origin: *'); //allow everybody
require_once 'bl.php';
/**
 * Authentifie un login = (username, password)
 * @param string username
 * @param string password
 * @return boolean true si authentifié, false sinon
 */

$username=$_REQUEST['username'];
$password=$_REQUEST['password'];

$ret = authenticate($username, $password);

echo $ret;
