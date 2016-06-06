$(function(){
	$("ul.lTshirt").on("click","li[name=supprimer]",supprimeTshirt);

	function supprimeTshirt(){
		if (confirm("Souhaitez-vous supprimer ce t-shirt : '"+$(this).parent().parent().text()+"' ?")){
			$.getJSON(
				"dispatcher.php",
				{
					operation : "suppression",
					id : 		$(this).parent().parent().attr("data-id")
				}
			);
		}
	}
});