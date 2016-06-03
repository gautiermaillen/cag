// JQUERY
$(function(){
	// Variable globale
	$selectCreateurs = "form#recherche select[name=createurs]";
	$selectMatieres = "form#recherche select[name=matieres]";
	$selectCategories = "form#recherche select[name=categories]";

	// Création options des selects au chargement de la page
	$.getJSON(
		"dispatcher.php",
		{
			// Je veux que DISPATCHER me donne toute la liste
			operation : "liste"
		},
		function(data){
			// Donnée reçue
			boucleFor(data["tabNomsTshirt"],"<li/>",$("section#tshirt ul.lTshirt"),"prod_nom");
			boucleFor(data["tabCreateurs"],"<option/>",$($selectCreateurs),"cre_nom");
			boucleFor(data["tabMatieres"],"<option/>",$($selectMatieres),"mat_nom");
			boucleFor(data["tabCategories"],"<option/>",$($selectCategories),"cat_nom");
		}
	);

	// Les options change en fonction de la selection
	//$("form#recherche select").on("change",gereChangeSelect);
	// Renvoie les données des options sélectionnés dans l'HTML au DISPATCHER
	// + nouvelle création des options par rapport au donnée renvoyé par DISPATCHER
	function gereChangeSelect(){
		$.getJSON(
			"dispatcher.php",
			{
				operation : "change",
				createur : $($selectCreateurs+" option:selected").text(),
				matiere : $($selectMatieres+" option:selected").text(),
				categorie : $($selectCategories+" option:selected").text()
			},
			function(data){
				boucleFor(data["tabCreateurs"],"<option/>",$($selectCreateurs),"cre_nom");
				boucleFor(data["tabMatieres"],"<option/>",$($selectMatieres),"mat_nom");
				boucleFor(data["tabCategories"],"<option/>",$($selectCategories),"cat_nom");
			}
		);
	}

	// Au clique les t-shirts s'affiche en fonction de la recherche
	$("form#recherche input#afficheTshirt").on("click",affichageTshirt);

	function affichageTshirt(){
		$.getJSON(
			"dispatcher.php",
			{
				// Je veux que DISPATCHER me donne une info spécifique
				operation : "tri",
				createur : $($selectCreateurs+" option:selected").text(),
				matiere : $($selectMatieres+" option:selected").text(),
				categorie : $($selectCategories+" option:selected").text()

			},
			function(data){
				$("section#tshirt ul.lTshirt").children().remove();
				boucleFor(data["tabNomsTshirt"],"<li/>",$("section#tshirt ul.lTshirt"),"prod_nom");
				//console.log(data);
			}
		);
	}


	function boucleFor($tab,$quoi,$ou,$pourquoi){
		console.log($tab);
		console.log($tab.length);
		for (var i = 0; i < $tab.length; i++){
			$($quoi).text($tab[i][$pourquoi]).appendTo($ou);
		}
	}
});