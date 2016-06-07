$(function(){
	$("section#tshirt ul.lTshirt").on("click","li[name=afficher]",afficheDetail);

	function afficheDetail(ev){
		$("ul.lTshirt li form").remove();
		$leLI = $(this).parent().parent();
		if (!$leLI.has("form").length){
			$.getJSON(
				"dispatcher.php",
				{
					operation : "affichage",
					id : 		$leLI.attr("data-id")
				},
				function(data){
					// Voir dans fonctionUtile.js
					formulaire(data[0],$leLI);
				}
			);
		}
		else{
			$($leLI).children('form').remove();
		}
	}
});