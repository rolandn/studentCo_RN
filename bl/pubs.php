<?php
header('Access-Control-Allow-Origin: *'); //allow everybody
$ret=pubs();

/**
 * charge les pubs quand l'utilisateur n'est pas connecté
 * @return html dans $(#wall)
 */

function pubs()
{
	$publicite = "1|Concombre->Le meilleur#1|Tomate->La plus rouge#0|Carotte->La plus longue#1|salade->La plus légère#1|Choux->La fleur#1|Le radis->Le noir#";
	$pubs = explode("#",$publicite);
	$pubHTML='<div id="pubs">';
	for($i = 0; $i < count($pubs); $i++){
			$pubHTML = $pubHTML . substr($pubs[$i],2) . "<br>";
		}
	
	$pubHTML = $pubHTML . "</div>";
	echo $pubHTML;
}

echo $ret;