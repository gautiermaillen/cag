$(function(){
	$("ul.lTshirt").on("click","li[name=supprimer]",supprimeTshirt);

	function supprimeTshirt(){
		// $(this).parent().parent().remove();
		$.getJSON(
			"dispatcher.php",
			{
				operation : "suppression",
				id : 		$(this).parent().parent().attr("data-id")
			},
			function(){
				alert('Supprimer');
			}
		);
	}
});