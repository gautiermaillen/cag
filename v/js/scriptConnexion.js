$(function(){
	$("input[type=button]").on("click",verifOk);

	function verifOk(){
		$.ajax(
			"dispatcher.php",{
				method:"POST",
				data:{
					operation : "inscription",
					login : 	$("input[name=login]").val(),
					mdp : 		$("input[name=mdp]").val()
				},
				success:function(doc,status,xhr){
					location.replace("connexion.html");
				},
				error:function(){
					alert("Login déjà existant");
				}
			}
		);
	}
});