$(function(){
	$("ul.lTshirt").on("click","input#modifier",modifierTshirt);
	$("ul.lTshirt").on("click","li[name=modifier]",afficheModifierTshirt);

	function modifierTshirt(){
		$.getJSON(
			"dispatcher.php",
			{
				operation : "modification",
				id : 		$(this).parent().parent().attr("data-id")
			}
		);
	}

	function afficheModifierTshirt(ev){
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
					formulaireModif(data[0],$leLI);
				}
			);
		}
		else{
			$($leLI).children('form').remove();
		}
	}
});