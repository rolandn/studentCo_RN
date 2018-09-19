<?php
require_once 'connect.php';

/**Pour les commentaires, voir page php relative**/

/**
 * dbReadLogin : Lire un login de la DB
 * @param string $username
 * @param string $password
 * @return null si Exceception ou pas trouvé | id si ok
 */

function dbReadLogin($username, $password){
	//query
	$sql="SELECT id FROM Login WHERE username='$username' AND password='$password'";
	try {
		$pdo=getPDO();
		$row=$pdo->query($sql)->fetch();
		//fermer la connexion
		$pdo=null;
		//return
		if(!$row) return null;
		$id = $row['id'];
		return $id;
	}
	catch(Exception $error){
		return null;
	}
}

function dbListOfCoDisciples($id){
	
	
	$sql="SELECT login.id, login.UserName, new_table.status FROM login
	INNER JOIN 
		(select * FROM approval WHERE approval.owner_id='$id') as new_table
			on login.Id=new_table.guest_id
where status=1
UNION
SELECT login.id, login.UserName, new_table.status FROM login
	INNER JOIN 
		(select * FROM approval WHERE approval.guest_id='$id') as new_table
			on login.Id=new_table.owner_id where status=1";

	try{
		$pdo=getPDO();
		$rows=$pdo->query($sql)->fetchAll();
		return $rows;
	}
	catch(PDOException $erreur){
		return null;
	}
}

function dbListOfCoTweets($id){

	$sql="select table1.* from (
select login.UserName, tweet.* from tweet inner join login
 on login.Id=tweet.id_writer) as table1
 where table1.id_receiver='$id'";
	
	try{
		$pdo=getPDO();
		$rows=$pdo->query($sql)->fetchAll();
		return $rows;
	}
	catch(PDOException $erreur){
		return null;
	}

}

function dbwriteTweet($idReceiver, $idWriter, $text){
	$retVal=false;
	
	$sql="INSERT INTO `tweet`(`id_writer`, `id_receiver`, `text`) VALUES ('$idWriter','$idReceiver','$text')";
	
	try{
		$pdo=getPDO();
		$pdo->query($sql);
		//fermer la connexion
		$pdo=null;
		$retVal=true;
	}
	catch (PDOException $erreur)
	{
		echo $erreur;
	}
	return $retVal;
}

function dbfetchTweetToDelete($id){
	$sql="select * from
	(select table1.*, (login.UserName) as Name_Receiver from 
	(select tweet.*, (login.UserName) as Name_Writer from tweet inner join login on tweet.id_writer=login.Id) as table1 inner join login on table1.id_receiver=login.Id) as table2
	where id_writer='$id' or id_receiver='$id'";
	
	try{
		$pdo=getPDO();
		$rows=$pdo->query($sql)->fetchAll();
		return $rows;
	}
	catch(PDOException $erreur){
		echo $erreur;
	}
}

function dbDeleteTweet($id){
	$retVal=false;
	$sql="DELETE FROM `tweet` WHERE id='$id'";
	
	try{
		$pdo=getPDO();
		$pdo->query($sql);
		//fermer la connexion
		$pdo=null;
		$retVal=true;
	}
	catch (PDOException $erreur)
	{
		echo $erreur;
	}
	return $retVal;
}

function dbAddCoDisciples($id)
{
	$sql="select login.Id, login.UserName from login where login.Id NOT IN (

			select table1.id from(
			
			SELECT login.id, login.UserName, new_table1.status FROM login
				INNER JOIN 
					(select * FROM approval WHERE approval.owner_id='$id') as new_table1
						on login.Id=new_table1.guest_id
			where status=0 or status=1 or status=2 or status=3
			UNION
			SELECT login.id, login.UserName, new_table2.status FROM login
				INNER JOIN 
					(select * FROM approval WHERE approval.guest_id='$id') as new_table2
						on login.Id=new_table2.owner_id where status=0 or status=1 or status=2 or status=3
			    )
			as table1) and login.Id!='$id'";
	try{
		$pdo=getPDO();
		$rows=$pdo->query($sql)->fetchAll();
		return $rows;
	}
	catch(PDOException $erreur){
		echo $erreur;
	}
	
}

function dbsendInvitation($idWriter, $id){
	$retVal=false;
	$sql="INSERT INTO `approval`(`owner_id`, `guest_id`, `status`) VALUES ('$idWriter','$id',0)";
	
	try{
		$pdo=getPDO();
		$pdo->query($sql);
		//fermer la connexion
		$pdo=null;
		$retVal=true;
	}
	catch (PDOException $erreur)
	{
		echo $erreur;
	}
	return $retVal;
}

function dbinvitationSent($id){
	$sql="select login.Id, login.UserName from 
	(select * from approval where owner_id='$id' and status=0) as table1 inner join login 
	on table1.guest_id=login.Id";
	try{
		$pdo=getPDO();
		$rows=$pdo->query($sql)->fetchAll();
		return $rows;
	}
	catch(PDOException $erreur){
		echo $erreur;
	}
	
}

function dbinvitationReceived($id){
	$sql="select login.Id, login.UserName from
	(select * from approval where guest_id='$id' and status=0) as table1 inner join login
	on table1.owner_id=login.Id";
	try{
		$pdo=getPDO();
		$rows=$pdo->query($sql)->fetchAll();
		return $rows;
	}
	catch(PDOException $erreur){
		echo $erreur;
	}

}

function dbAcceptInvitation($idOwner, $id){
	$retVal=false;
	$sql="UPDATE `approval` SET `status`=1 WHERE owner_id='$idOwner' and guest_id='$id'";
	
	try{
		$pdo=getPDO();
		$pdo->query($sql);
		//fermer la connexion
		$pdo=null;
		$retVal=true;
	}
	catch (PDOException $erreur)
	{
		echo $erreur;
	}
	return $retVal;
}

function dbRefuseInvitation($idOwner, $id){
	$retVal=false;
	$sql="UPDATE `approval` SET `status`=2 WHERE owner_id='$idOwner' and guest_id='$id'";

	try{
		$pdo=getPDO();
		$pdo->query($sql);
		//fermer la connexion
		$pdo=null;
		$retVal=true;
	}
	catch (PDOException $erreur)
	{
		echo $erreur;
	}
	return $retVal;
}

function dbDeleteCoDisciple($id, $idToDelete){
	$retVal=false;
	$sql="UPDATE `approval` SET status=NULL WHERE (owner_id='$id' and guest_id='$idToDelete') or (owner_id='$idToDelete' and guest_id='$id')";

	try{
		$pdo=getPDO();
		$pdo->query($sql);
		//fermer la connexion
		$pdo=null;
		$retVal=true;
	}
	catch (PDOException $erreur)
	{
		echo $erreur;
	}
	return $retVal;
}
