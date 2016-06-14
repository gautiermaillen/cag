$(function(){

	$("#formInscription input[name=login]").on("keyup", validationLogin);
	$("#formInscription input[name=mdp]").on("keyup", validationMdp);

	function validationLogin()
	{
		$login = $("[name='login']").val();
		$regLogin = /^[a-z0-9\u00C0-\u00FD\+\$\/\%\-\_\!\?].{4,20}$/gim;

		// login
		$("input+span.message").remove();
		if($regLogin.test($login))
		{
			$("<span>").text(" Login valide")
            .attr("class", "message")
            .css({color:"green"})
            .insertAfter("input[name='login']");
		}

		else
		{
			$("<span>").text(" Le login n'est pas au bon format.")
            .attr("class", "message")
            .css({color:"red"})
            .insertAfter("input[name='login']");
		}
	}

	function validationMdp()
	{
		$mdp = $("[name='mdp']").val();
		$regMdp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\u00C0-\u00FD\+\$\/\%\-\_\!\?]).{8,20}$/gim;

		// mdp
		$("input+span.message").remove();
		if($regMdp.test($mdp))
		{
			$("<span>").text(" Mot de passe valide")
            .attr("class", "message")
            .css({color:"green"})
            .insertAfter("input[name='mdp']");
		}

		else
		{
			$("<span>").text(" Le mot de passe n'est pas assez compliqué.")
            .attr("class", "message")
            .css({color:"red"})
            .insertAfter("input[name='mdp']");
		}
	}



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
					$("input[name=login]").after("<span class='error'>Login déjà existant</span>");
				}
			}
		);
	}
});