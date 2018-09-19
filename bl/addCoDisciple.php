<?php
require_once 'bl.php';

/**
 * l'utilisateur reçoit la liste des co'disciples qu'il pourrait ajouter
 * @param id: id du codisciple
 * @return la liste des co'disciples qu'il pourrait ajouter, "aucun à ajouter" sinon
 */

session_start();
if(!isset($_SESSION['uid'])) return;
$id=$_SESSION['uid'];
$ret=addCoDisciples($id);

echo $ret;