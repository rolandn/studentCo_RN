<?php
require_once 'bl.php';

/**
 * l'utilisateur supprime un co'disciple
 * @param string id: id du codisciple qui supprime
 * @param string idToDelete: id du co'disciple à supprimer
 * @return boolean true si tout s'estbien passé, false sinon
 */

session_start();
if(!isset($_SESSION['uid'])) return;
$id=$_SESSION['uid'];

$idToDelete=$_REQUEST['id'];
if ($idToDelete=="undefined"){
	$ret="0";
}
else $ret=deleteCoDisciple($id, $idToDelete);

echo $ret;