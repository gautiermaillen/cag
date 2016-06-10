$(function(){
	$("input[type=text]").on("keyup",verifOk);

	function verifOk(){
		$.ajax(
			"dispatcher.php",{
				method:"POST",
				data:{
					operation : "inscription",
					login : 	$("input[name=login]"),
					mdp : 		$("input[name=mdp")
				},
				success:function(doc,status,xhr){
					alert(data);
				},
				error:function(){
					alert("Erreur AJAX verifOk");
				}
			}
		);
	}
});