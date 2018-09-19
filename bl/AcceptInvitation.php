<?php
require_once 'bl.php';

/**
 * l'utilisateur accepte l'invitation qui lui a été envoyée
 * @param String id: id du codisciple qui accepte
 * @param String idOwner: id du codisciple qui a envoyé l'invitation
 * @return boolean true si tout s'est bien passé, false sinon
 */


session_start();
if(!isset($_SESSION['uid'])) return;
$id=$_SESSION['uid'];
$idOwner=$_REQUEST['id'];
$ret=AcceptInvitation($idOwner, $id);

echo $ret;