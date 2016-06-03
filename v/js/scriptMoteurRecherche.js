$(function(){
	$("header>section>form#moteurDeRecherche input[type=button]").on("click",recherche);

	function recherche(){
		console.log($(this).prev().val());
		$.getJSON(
			"dispatcher.php",
			{
				recherche : $(this).prev().val()
			},
			function(data){}
		);
	}
});