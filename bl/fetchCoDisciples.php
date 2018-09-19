<?php
require_once 'bl.php';

/**
 * l'utilisateur reçoit la liste de ses co'disciples
 * @param string id: id du codisciple
 * @return JSon la liste des co'disciples, rien sinon
 */

session_start();
if(!isset($_SESSION['uid'])) return;
$id=$_SESSION['uid'];
$ret = fetchCoDisciples($id);//dans bl.php

echo $ret;