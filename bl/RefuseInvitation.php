<?php
require_once 'bl.php';

/**
 * utilisé lorsque l'utilisateur refus une invitation
 * @param string id de l'utilisateur
 * @param string idOwner: id de celui qui avait envoyé l'invitation
 * @return true si tt s'est bien passé, false sinon */

session_start();
if(!isset($_SESSION['uid'])) return;
$id=$_SESSION['uid'];
$idOwner=$_REQUEST['id'];
$ret=RefuseInvitation($idOwner, $id);

echo $ret;