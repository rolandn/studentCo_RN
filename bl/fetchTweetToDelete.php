<?php
require_once 'bl.php';


/**
 * charge les tweets qui concerne l'utilisateur et qu'il pourrait choisir de supprimer
 * @param string id du codisciple
 * @return Json affiche les tweets concerné dans $(#wall)
 */

session_start();
if(!isset($_SESSION['uid'])) return;
$id=$_SESSION['uid'];
$ret=fetchTweetToDelete($id);
echo $ret;
