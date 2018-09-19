<?php
require_once 'bl.php';


/**
 * charge les invitations en cours qui concerne l'utilisateur et qu'il pourrait choisir d'accepter
 * @param string id du codisciple
 * @return Json affiche les invitations dans $(#wall)
 */


session_start();
if(!isset($_SESSION['uid'])) return;
$id=$_SESSION['uid'];

$ret=invitationReceived($id);

echo $ret;