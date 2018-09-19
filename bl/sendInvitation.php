<?php
require_once 'bl.php';

/**
 * utilisé lorsque l'utilisateur envoie une invitation
 * @param string idwriter: id de l'utilisateur
 * @param string idO: id de celui qui recevra l'invitation
 * @return true si tt s'est bien passé, false sinon */

session_start();

$idWriter=$_SESSION['uid'];

$id=$_REQUEST['id'];

$ret=sendInvitation($idWriter, $id);

echo $ret;