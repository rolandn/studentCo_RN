<?php
require_once 'bl.php';

/**
 * utilisé lorsque l'utilisateur écrit un tweet sur un mur
 * @param string idwriter: id de l'utilisateur
 * @param string idreceiver: id de celui qui recevra le tweet
 * @return idReceiver si tt s'est bien passé, "erreurText" sinon */

session_start();
if(!isset($_SESSION['uid'])) return;
$idWriter=$_SESSION['uid'];
$idReceiver=$_REQUEST['id'];
$text=$_REQUEST['text'];
if($text=="")return;


$ret = writeTweet($idReceiver, $idWriter, $text);
if($ret!=true)
{
	echo "Problème lors de l'écriture du tweet";
}
else
{
	echo $idReceiver;
}
