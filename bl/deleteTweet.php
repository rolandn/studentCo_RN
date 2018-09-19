<?php
require_once 'bl.php';

/**
 * l'utilisateur supprime un co'disciple
 * @param string id: id du codisciple qui supprime
 * @param string idToDelete: id du co'disciple à supprimer
 * @return boolean true si tout s'estbien passé, false sinon
 */

$id=$_REQUEST['id'];
if ($id=="")return false;
else $ret=deleteTweet($id);

echo $ret;