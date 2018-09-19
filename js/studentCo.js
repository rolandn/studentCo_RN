/**
 * studentCo.v2
 */
//s
//login autorisé

const txtConnect="Se connecter";
const txtDisconnect="Se deconnecter";
const txtLegendConnect="Connecté";
const txtLegendDisconnect="Deconnecté";

//var global
var g_username;
var g_password;
var g_isConnected;



/**
 * Réinitialise les variables globales
 * Appelé à la fin du chargement de la page et quand nécessaire
 *  --> logUsername = "" --> logUsername est maintenant vide
 */
function initApp() {
	window.console.log("initApp() -start");
	g_isConnected=false;
	g_username="";
	g_password="";
	$('#logUsername').val("");
	$('#logPassword').val("");
	$("#boutonLogin").val(txtConnect);
	$("#connectBox").html(txtLegendDisconnect);

	pubs();
	//
	
	window.console.log("initApp() -end");
	
}
		
/**
 * Appelé quand click le bouton de la boîte de connexion
 * si g_isConnected = true : on est déjà connecté et l'utilisateur doit être déconnecté
 *     --> puis il appelle alors fetchCoDisciple pour charger les CoDisciples
 * si g_isConnected = false : authenticate(username, password) décide si connection ou non
 */
function doConnect() {
	window.console.log("doConnect() -start");
	
	authenticate($("#logUsername").val(),$("#logPassword").val());  /** Appelle la fct° authenticate  **/
	if(g_isConnected==true){										/** le résultat d'authenticate nous renvoie via authenticatecallback "g_isConnected" qui peut être True/False  **/
		fetchCoDisciples();
		$('#connectBox').html(txtLegendConnect);
		$('#boutonLogin').val(txtDisconnect);
		$('#logUsername').val("");
		$('#logPassword').val("");
	}
	else{
		initApp();
	}
	pubs();


	window.console.log("doConnect() -end");
}
			
/**
 * authentifie un login = (username, password) par une requête Ajax vers le serveur
 * @param username : nom d'utilisateur
 * @param password : mot de passe
 * @returns authenticateCallback (response)
*/


function authenticate(username, password){
	window.console.log("authenticate-start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/authenticate.php',
		async: false,
		data: "username="+username+"&password="+password,
		dataType:'text',
		success: authenticateCallback
	});
	window.console.log("authenticate-end");
}

function authenticateCallback(ret){
    window.console.log("authenticateCallback-start");
    if(ret=='1'){
        g_isConnected=true;
    }
    else
    {
        initApp();
    }
    window.console.log("authenticateCallback-end");
}

function fetchCoDisciples(){
	window.console.log("fetchCoDisciples-start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/fetchCoDisciples.php',
		async: false,
		success: fetchCoDisciplesCallback
	});
	window.console.log("fetchCoDisciples-end");
}


function fetchCoDisciplesCallback(ret){
	window.console.log("fetchCoDisciplesCallback-start");
	
	try
	{
		var affiche = "Liste des co'disciples<hr>";
		var jarray=$.parseJSON(ret);
		for(var i = 0; i<jarray.length; i++ ){
			var row=jarray[i];
			var id = row['id'];
			var username = row['UserName'];
			var ligne="<span id='co"+id + "' onclick='wallCoDisciple(this.id.substring(2),this.innerHTML);'" +
					" onmousemove='overElement(this);' onmouseout='outElement(this);'>";
			ligne = ligne + username + "</span><br/>";
			affiche = affiche + ligne;
		}
		$('#page').html(affiche);
		
	}
	catch(err){
		window.console.log("fetchcodiscipleCallBack -err = " + err);
	}
	window.console.log("fetchCoDisciplesCallback-end");
}

function overElement(e){
	window.console.log("overElement-start");
	e.style.cursor="pointer";
	window.console.log("overElement-end");
}

function outElement(e){
	window.console.log("outElement-start");
	e.style.cursor="pointer";
	window.console.log("outElement-end");

}

function wallCoDisciple(id, alias){
	window.console.log("wallCoDisciple-start");
	fetchTweet(id);
	window.console.log("wallCoDisciple-end");
}


function fetchTweet(id){
	window.console.log("fetchTweet-start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/fetchTweet.php',
		async: false,
		data: "id="+id,
		dataType:'text',
		success: fetchTweetCallBack
	});
	window.console.log("fetchTweet-end");
}

function fetchTweetCallBack(ret){
	window.console.log("fetchTweetCallBack-start");
	try
	{
		if(ret.length<=2){
			var affiche = "Ecrire un tweet:<br> <p style=\"margin-bottom:10px\"><input type=\"text\" id=\"textBoxNewTweet\" style=\"width:300px; \"><br></p>"
				+"<input class=\"btn btn-warning\" id=\"boutonTweet\" type=\"button\" value=\"Tweeter\" onclick=\"writeTweet("+ret+");\" style=\"margin-bottom:10px; background-color:rgb(228,229,231); border:0px; font-size:12px\"><br><br>Liste des tweets<hr><br>";
			$('#wall').html(affiche + "Il n'y a aucun tweet sur ce mur.");
		}
		else{
			var jarray=$.parseJSON(ret);
			var idReceiver=jarray[0]['id_receiver'];
			var affiche = "Liste des tweets<hr>Ecrire un tweet:<br> <p style=\"margin-bottom:10px\"><input type=\"text\" id=\"textBoxNewTweet\" style=\"width:300px; \"><br></p>"
								+"<input class=\"btn btn-warning\" id=\"boutonTweet\" type=\"button\" value=\"Tweeter\" onclick=\"writeTweet("+idReceiver+");\" style=\"margin-bottom:10px; background-color:rgb(228,229,231); border:0px; font-size:12px\"><br><br>Liste des tweets<hr>";
			for(var i = 0; i<jarray.length; i++ ){
				var ligne="";
				var row=jarray[i];
				var WriterName = row['UserName'];
				var textTweet = row['text'];
				ligne = "Posté par " + WriterName + ": " + textTweet + "</span><br/>";
				affiche = affiche + ligne;
			}
			$('#wall').html(affiche);
		}
		
	}
	catch(err){
		window.console.log("fetchcodiscipleCallBack -err = " + err);
	}
	window.console.log("fetchTweetCallBack-end");
}
			

function pubs() {
	window.console.log("pubs() -start");
	//
	if(g_isConnected==false)
	{
		$.ajax({
			type:'GET',
			url:'http://localhost/studentCo_RN/bl/pubs.php',
			success: pubsCallback
		})
	}
	else
	{
		$('#wall').html("");
	}
	window.console.log("pubs() -end");
}

function pubsCallback(ret){
	window.console.log("pubsCallback() -start");
	$('#wall').html(ret);
	$('#page').html("");
	window.console.log("pubsCallback() -end");
}

function writeTweet(idReceiver){
	window.console.log("writeTweet() -start");	
	var text=$('#textBoxNewTweet').val();
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/writeTweet.php',
		data: "id="+idReceiver+"&text="+text,
		dataType:'text',
		success: writeTweetCallBack
	});	
	window.console.log("writeTweet() -end");	
}

function writeTweetCallBack(ret){
	window.console.log("writeTweetCallBack() -start");
	if(ret!="")
	{
		fetchTweet(ret);
	}
	window.console.log("writeTweetCallBack() -end");
}

function fetchTweetToDelete(){
	window.console.log("fetchTweetToDelete() -start");
	if(g_isConnected==true)
	{
		$.ajax({
			type:'GET',
			url:'http://localhost/studentCo_RN/bl/fetchTweetToDelete.php',
			success: fetchTweetToDeleteCallBack
		});	
	}
	window.console.log("fetchTweetToDelete() -end");
}

function fetchTweetToDeleteCallBack(ret)
{
	window.console.log("fetchTweetToDeleteCallBack() -start");
	try
	{
		var jarray=$.parseJSON(ret);
		var affiche = "Liste des tweets vous concernant<hr>"
			+"<input class=\"btn btn-warning\" id=\"boutonDelete\" type=\"button\" value=\"Supprimer\" style=\"margin-bottom:10px; background-color:rgb(228,229,231); border:0px; font-size:12px\"><br>";
		for(var i = 0; i<jarray.length; i++ ){
			var ligne="";
			var row=jarray[i];
			var WriterName = row['Name_Writer'];
			var ReceiverName = row['Name_Receiver'];
			var idTweet=row['id'];
			var textTweet = row['text'];
			ligne = "<span id="+idTweet+" onclick=updateDelButton("+idTweet+ 
					"); onmouse=overElement(this); onmouseout=outElement(this) style=\"border-width:2px; border-style:solid; border-color:black;\">Posté par " + WriterName + " à " + ReceiverName + ": " + textTweet + "</span><br/>";
			affiche = affiche + ligne;
		}
		$('#page').html(affiche);
		
	}
	catch(err){
		window.console.log("fetchcodiscipleCallBack -err = " + err);
	}
	window.console.log("fetchTweetToDeleteCallBack() -end");
}

function updateDelButton(id){
	window.console.log("updateDelButton() -start");
	$("#boutonDelete").attr("onclick","deleteTweet("+id+")");	
	window.console.log("updateDelButton() -end");
}

function deleteTweet(id){
	window.console.log("deleteTweet() -start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/deleteTweet.php',
		data: "id="+id,
		dataType:'text',
		success: deleteTweetCallBack
	});	
	
	window.console.log("deleteTweet() -end");	
}

function deleteTweetCallBack(ret)
{
	window.console.log("deleteTweetCallBack() -start");
	if(ret=="1"){
		alert("Le tweet a bien été supprimé.")
	}
	else{
		alert(ret);
	}
	fetchTweetToDelete();
	window.console.log("deleteTweetCallBack() -end");	
}

function addCoDisciple(){
	window.console.log("addCoDisciple() -start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/addCoDisciple.php',
		success: addCoDiscipleCallBack
	});		
	window.console.log("addCoDisciple() -end");	
}

function addCoDiscipleCallBack(ret){
	window.console.log("addCoDiscipleCallBack() -start");	
	try
	{
		var jarray=$.parseJSON(ret);
		var affiche = "Liste des co'disciples que vous pouvez inviter<hr>"
			+"<input class=\"btn btn-warning\" id=\"boutonInvitation\" type=\"button\" value=\"Inviter\" style=\"margin-bottom:10px; background-color:rgb(228,229,231); border:0px; font-size:12px\"><br>";
		for(var i = 0; i<jarray.length; i++ ){
			var ligne="";
			var row=jarray[i];
			var IdUser = row['Id'];
			var UserName = row['UserName'];
			ligne = "<span id="+IdUser+" onclick=updateInvitationButton("+IdUser+"); onmouse=overElement(this); onmouseout=outElement(this) style=\"border-width:2px; border-style:solid; border-color:black;\">"+UserName+"</span><br/>";
			affiche = affiche + ligne;
		}
		$('#page').html(affiche);
		
	}
	catch(err){
		window.console.log("fetchcodiscipleCallBack -err = " + err);
	}
	
	
	window.console.log("addCoDiscipleCallBack() -end");		
}


function updateInvitationButton(id){
	window.console.log("updateInvitationButton() -start");	
	$("#boutonInvitation").attr("onclick","sendInvitation("+id+")");		
	window.console.log("updateInvitationButton() -end");	
}

function sendInvitation(id){
	window.console.log("sendInvitation() -start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/sendInvitation.php',
		data: "id="+id,
		dataType:'text',
		success: sendInvitationCallBack
	});		
	
	window.console.log("sendInvitation() -end");	
}

function sendInvitationCallBack(ret){
	window.console.log("sendInvitation() -start");
	if(ret==1)
	{
		alert("L'invitation a bien été envoyée.");
	}
	else{
		alert(ret);
	}
	addCoDisciple();
	window.console.log("sendInvitation() -end");		
}

function invitationSent(){
	window.console.log("invitationSent() -start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/invitationSent.php',
		success: invitationSentCallBack
	});	
	
	window.console.log("invitationSent() -end");		
}

function invitationSentCallBack(ret){
	window.console.log("invitationSentCallBack() -start");
	try
	{
		var jarray=$.parseJSON(ret);
		var affiche = "Liste des co'disciples à qui vous avez envoyé une invitation<hr><br/>"
		for(var i = 0; i<jarray.length; i++ ){
			var ligne="";
			var row=jarray[i];
			var UserName = row['UserName'];
			ligne = UserName+": en attente d'une réponse de sa part<br/>";
			affiche = affiche + ligne;
		}
		$('#page').html(affiche);
		
	}
	catch(err){
		window.console.log("invitationSentCallBack -err = " + err);
	}
	
	window.console.log("invitationSentCallBack() -end");
}

function invitationReceived(){
	window.console.log("invitationReceived() -start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/invitationReceived.php',
		success: invitationReceivedCallBack
	});	
	
	window.console.log("invitationReceived() -end");	
}

function invitationReceivedCallBack(ret){
	window.console.log("invitationReceivedCallBack() -start");
	try
	{
		var jarray=$.parseJSON(ret);
		var affiche = "Co'disciples attendant une réponse à leur invitation<hr><br/>"+
			"<input class=\"btn btn-warning\" id=\"boutonAccept\" type=\"button\" value=\"Accepter\" style=\"margin-bottom:10px; margin-right:10px; background-color:rgb(228,229,231); border:0px; font-size:12px\">"
		+"<input class=\"btn btn-warning\" id=\"boutonRefuse\" type=\"button\" value=\"Refuser\" style=\"margin-bottom:10px; background-color:rgb(228,229,231); border:0px; font-size:12px\"><br>";
		for(var i = 0; i<jarray.length; i++ ){
			var ligne="";
			var row=jarray[i];
			var Id = row['Id'];
			var UserName = row['UserName'];
			ligne = "<span id="+Id+" onclick=choiceInvitationButtons("+Id+"); onmouse=overElement(this); onmouseout=outElement(this) style=\"border-width:2px; border-style:"+
			"solid; border-color:black;\">Invitation de: "+UserName+" en attente d'une réponse de votre part<br/>";
			affiche = affiche + ligne;
		}
		$('#page').html(affiche);
		
	}
	catch(err){
		window.console.log("invitationReceivedCallBack -err = " + err);
	}
	
	window.console.log("invitationReceivedCallBack() -end");
}

function choiceInvitationButtons(id){
	window.console.log("choiceInvitationButtons() -start");
	$("#boutonAccept").attr("onclick","AcceptInvitation("+id+")");	
	$("#boutonRefuse").attr("onclick","RefuseInvitation("+id+")");	
	window.console.log("choiceInvitationButtons() -end");
}

function AcceptInvitation(id){
	window.console.log("AcceptInvitation() -start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo/bl/AcceptInvitation.php',
		data: "id="+id,
		dataType:'text',
		success: AcceptInvitationCallBack
	});	
	window.console.log("AcceptInvitation() -end");
}

function AcceptInvitationCallBack(ret){
	window.console.log("AcceptInvitationCallBack() -start");
	if(ret==1)
	{
		alert("L'invitation a bien été acceptée.");
	}
	else{
		alert(ret);
	}
	invitationReceived();
	window.console.log("AcceptInvitationCallBack() -end");
}

function RefuseInvitation(id){
	window.console.log("RefuseInvitation() -start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/RefuseInvitation.php',
		data: "id="+id,
		dataType:'text',
		success: RefuseInvitationCallBack
	});	
	window.console.log("RefuseInvitation() -end");
}

function RefuseInvitationCallBack(ret){
	window.console.log("RefuseInvitationCallBack() -start");
	if(ret==1)
	{
		alert("L'invitation a bien été refusée.");
	}
	else{
		alert(ret);
	}
	invitationReceived();
	window.console.log("RefuseInvitationCallBack() -end");
}

function fetchCoDisciplesToDelete(){
	window.console.log("fetchCoDisciplesToDelete() -start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/fetchCoDisciples.php',
		async: false,
		success: fetchCoDisciplesToDeleteCallBack
	});
	window.console.log("fetchCoDisciplesToDelete() -end");
}

function fetchCoDisciplesToDeleteCallBack(ret){
	window.console.log("fetchCoDisciplesToDeleteCallBack() -start");
	try
	{
		var affiche = "Liste des co'disciples<hr>"+
		"<input class=\"btn btn-warning\" id=\"boutonDeleteCoDisciple\" type=\"button\" value=\"Supprimer\" style=\"margin-bottom:10px; margin-right:10px; background-color:rgb(228,229,231); border:0px; font-size:12px\"><br/>";
		var jarray=$.parseJSON(ret);
		for(var i = 0; i<jarray.length; i++ ){
			var row=jarray[i];
			var id = row['id'];
			var username = row['UserName'];
			var ligne="<span id='co"+id + "' onclick='deleteCoDiscipleButton(this.id.substring(2),this.innerHTML);'" +
					" onmousemove='overElement(this);' onmouseout='outElement(this);'>";
			ligne = ligne + username + "</span><br/>";
			affiche = affiche + ligne;
		}
		$('#page').html(affiche);
		
	}
	catch(err){
		window.console.log("fetchCoDisciplesToDeleteCallBack -err = " + err);
	}
	window.console.log("fetchCoDisciplesToDeleteCallBack() -end");
}


function deleteCoDiscipleButton(id){
	window.console.log("deleteCoDiscipleButton() -start");
	$("#boutonDeleteCoDisciple").attr("onclick","deleteCoDisciples("+id+")");	
	window.console.log("deleteCoDiscipleButton() -end");
}

function deleteCoDisciples(id){
	window.console.log("deleteCoDisciples() -start");
	$.ajax({
		type:'GET',
		url:'http://localhost/studentCo_RN/bl/deleteCoDisciples.php',
		data: "id="+id,
		dataType:'text',
		success: deleteCoDisciplesCallBack
	});
	
	window.console.log("deleteCoDisciples() -end");

}

function deleteCoDisciplesCallBack(ret){
	window.console.log("deleteCoDisciples() -start");
	if(ret==1)
	{
		alert("Le codisciple a bien été supprimé.");
	}
	else{
		alert(ret);
	}
	fetchCoDisciplesToDelete();
	window.console.log("deleteCoDisciples() -end");
}
