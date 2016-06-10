$(function(){
	$("input[type=text]").on("keyup",verifOk);

	function verifOk(){
		$.ajax(
			"dispatcher.php",
			{
				operation : "inscription",
				login : 	$("input[name=login]"),
				mdp : 		$("input[name=mdp")
			},
			function(data){
				alert(data);
			}
		);
	}
});