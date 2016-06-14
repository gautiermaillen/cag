$(function(){
	$("ul.lTshirt").on("click","input#modifier",modifierTshirt);
	$("ul.lTshirt").on("click","li[name=modifier]",afficheModifierTshirt);

	function modifierTshirt(){
		$leLIparent = $(this).parent().parent().attr("data-id");
		$.getJSON(
			"dispatcher.php",
			{
				operation : "modification",
				id : 		$leLIparent,
				nom : 		$("li[data-id="+$leLIparent+"] input[name=nom]").val(),
				prix : 		$("li[data-id="+$leLIparent+"] input[name=prix]").val(),
				date : 		$("li[data-id="+$leLIparent+"] input[name=date]").val(),
				desc : 		$("li[data-id="+$leLIparent+"] input[name=desc]").val(),
				createur : 	$("li[data-id="+$leLIparent+"] select[name=createur] option:selected").text(),
				matiere : 	$("li[data-id="+$leLIparent+"] select[name=matiere] option:selected").text(),
				categorie : $("li[data-id="+$leLIparent+"] select[name=categorie] option:selected").text()
			}
		);
	}

	function afficheModifierTshirt(ev){
		$leLI = $(this).parent().parent();
		if (!$leLI.has("form").length){
			$("ul.lTshirt li form").remove();
			$.getJSON(
				"dispatcher.php",
				{
					operation : "affichage",
					id : 		$leLI.attr("data-id")
				},
				function(data){
					// Voir dans fonctionUtile.js
					formulaireModif(data[0],$leLI);
					for (var i = 0; i < data.length; i++){
						formulaireModif(data[i],$leLI,"tailles");
					}

					// grandTableau est le tableau regroupant tous les t-shirts. Voir scriptJSON.js
					boucleFor(grandTableau["tabCreateurs"],"option",$("ul.lTshirt li select[name=createur]"),"cre_nom","cre_id");
					boucleFor(grandTableau["tabMatieres"],"option",$("ul.lTshirt li select[name=matiere]"),"mat_nom","mat_id");
					boucleFor(grandTableau["tabCategories"],"option",$("ul.lTshirt li select[name=categorie]"),"cat_nom","cat_id");
				}
			);
		}
		else{
			$($leLI).children('form').remove();
		}
	}
});