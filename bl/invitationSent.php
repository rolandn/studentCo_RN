<?php
require_once 'bl.php';

/**
 * charge les invitations envoyées et en cours qui concerne l'utilisateur
 * @param string id du codisciple
 * @return Json affiche les invitations dans $(#wall)
 */

session_start();
if(!isset($_SESSION['uid'])) return;
$id=$_SESSION['uid'];

$ret=invitationSent($id);

echo $ret;