<?php
//connexion à la DB StudentCo
define("PILOTE", "mysql");
define("SERVERIP", "localhost");
define("BASEDB", "studentco");
define("USERDB", "roland");
define("PSWDB","0000");
//Data source name
define("DSN", PILOTE.":host=".SERVERIP.";dbname=".BASEDB);
//
/**
 * utilise les parmètres de connexion pour instancier un objet PDO
 * @return objet PDO initialisé pour la DB Studentco
 */

function getPDO(){
	$arrExtraParam=array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
	$pdo = new PDO(DSN,USERDB,PSWDB,$arrExtraParam);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $pdo;
}