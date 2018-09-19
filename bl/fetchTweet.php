<?php
require_once 'bl.php';

/**
 * charge les tweets écrits sur un mur
 * @param string id du codisciple
 * @return Json affiche le mur du codisciple concerné dans $(#wall)
 */

session_start();
$idReceiver=$_REQUEST['id'];


if($idReceiver=="-1")
	$idReceiver=$_SESSION['uid'];


$ret = fetchTweet($idReceiver);
if($ret=="[]")
{
	$ret=$idReceiver;
}

echo $ret;