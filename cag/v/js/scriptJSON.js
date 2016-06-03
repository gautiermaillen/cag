// JQUERY
$(function(){
	// Création options des selects
	$.getJSON(
		"dispatcher.php",
		{
			// Je veux que DISPATCHER me donne toute la liste
			operation : "liste"
		},
		function(data){
			// Donnée reçue
			boucleFor(data["tabNomsTshirt"],"<li/>",$("ul.lTshirt"),"nom_produit");

			boucleFor(data["tabCreateurs"],"<option/>",$("form#recherche select[name=createurs]"),"cre_nom");
			boucleFor(data["tabMatieres"],"<option/>",$("form#recherche select[name=matieres]"),"mat_nom");
			boucleFor(data["tabCategories"],"<option/>",$("form#recherche select[name=categories]"),"cat_nom");
		}
	);

	// Les options change en fonction de la selection
	$("form#recherche select").on("change",gereChangeSelect);
	// Renvoie les données des options sélectionnés dans l'HTML au DISPATCHER
	// + nouvelle création des options par rapport au donnée renvoyé par DISPATCHER
	function gereChangeSelect(){
		$.getJSON(
			"dispatcher.php",
			{
				operation : "change",
				createur : $("form#recherche select[name=createurs] option:selected").text(),
				matiere : $("form#recherche select[name=matieres] option:selected").text(),
				categories : $("form#recherche select[name=categories] option:selected").text()
			},
			function(data){
				//console.log(data);
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
				createur : $("form#recherche select[name=createurs] option:selected").text(),
				matiere : $("form#recherche select[name=matieres] option:selected").text(),
				categories : $("form#recherche select[name=categories] option:selected").text()

			},
			function(data){
				//console.log(data);
				boucleFor(data,"<li/>",$("section#tshirt ul.lTshirt"),"nom_produit");
			}
		);
	}


	function boucleFor($tab,$quoi,$ou,$pourquoi){
		for (var i = 0; i < $tab.length; i++) {
			$($quoi).text($tab[i][$pourquoi]).appendTo($ou);
		}
	}
});