// JQUERY
var grandTableau;
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
			grandTableau = data;
			// Donnée reçue
			// fonction créée dans le fichier JS "fonctionUtile.js"
			boucleFor(data["tabNomsTshirt"],"li",$("section#tshirt ul.lTshirt"),"prod_nom","prod_id");
			boucleFor(data["tabCreateurs"],"option",$($selectCreateurs),"cre_nom","cre_id");
			boucleFor(data["tabMatieres"],"option",$($selectMatieres),"mat_nom","mat_id");
			boucleFor(data["tabCategories"],"option",$($selectCategories),"cat_nom","cat_id");
			boucleFor(data["tabCreateurs"],"option",$("form.ajouterLTshirt select[name=createur]"),"cre_nom","cre_id");
			boucleFor(data["tabMatieres"],"option",$("form.ajouterLTshirt select[name=matiere]"),"mat_nom","mat_id");
			boucleFor(data["tabCategories"],"option",$("form.ajouterLTshirt select[name=categorie]"),"cat_nom","cat_id");
			
			// "fonctionUtile.js", crée les icones sur chaque li
			setTimeout(lesIcones,10,$("section#tshirt ul.lTshirt li"));
		}

	);

	// Les options change en fonction de la selection
	$("form#recherche select").on("change",gereChangeSelect);
	// Renvoie les données des options sélectionnés dans l'HTML au DISPATCHER
		// nouvelle création des options par rapport au donnée renvoyé par DISPATCHER
	function gereChangeSelect(){
		$.getJSON(
			"dispatcher.php",
			{
				operation : "tri",
				createur : 	$($selectCreateurs+" option:selected").attr('name'),
				matiere : 	$($selectMatieres+" option:selected").attr('name'),
				categorie : $($selectCategories+" option:selected").attr('name')
			},
			function(data){
				// fonction créée dans le fichier JS "fonctionUtile.js"
				supprimerEnfant("section#tshirt ul.lTshirt");
				$($selectMatieres+">option:nth-child(n+2)").remove();
				$($selectCategories+">option:nth-child(n+2)").remove();
				
				if (data["tabNomsTshirt"].length != 0){
					boucleFor(data["tabNomsTshirt"],"li",$("section#tshirt ul.lTshirt"),"prod_nom","prod_id");
					for (var i = 0; i < data["tabNomsTshirt"].length; i++){
						$("<option name='"+data["tabNomsTshirt"][i]["mat_nom"]+"'>"+data["tabNomsTshirt"][i]["mat_nom"]+"</option>").appendTo($($selectMatieres));
						$("<option name='"+data["tabNomsTshirt"][i]["cat_nom"]+"'>"+data["tabNomsTshirt"][i]["cat_nom"]+"</option>").appendTo($($selectCategories));
					}
					setTimeout(lesIcones,10,$("section#tshirt ul.lTshirt li"));
				}
				else{
					$("<li>Aucun t-shirt disponible</option>").appendTo($("section#tshirt ul.lTshirt"));
					// boucleFor(grandTableau["tabMatieres"],"option",$($selectMatieres),"mat_nom","mat_id");
					// boucleFor(grandTableau["tabCategories"],"option",$($selectCategories),"cat_nom","cat_id");
				}
			}
		);
	}

	// Au clique les t-shirts s'affiche en fonction de la recherche
	//$("form#recherche input#afficheTshirt").on("click",affichageTshirt);

	function affichageTshirt(){
		$.getJSON(
			"dispatcher.php",
			{
				// Je veux que DISPATCHER me donne une info spécifique
				operation : "tri",
				createur : 	$($selectCreateurs+" option:selected").text(),
				matiere : 	$($selectMatieres+" option:selected").text(),
				categorie : $($selectCategories+" option:selected").text()

			},
			function(data){
				// fonction créée dans le fichier JS "fonctionUtile.js"
				supprimerEnfant("section#tshirt ul.lTshirt");
				boucleFor(data["tabNomsTshirt"],"li",$("section#tshirt ul.lTshirt"),"prod_nom","prod_id");
				setTimeout(lesIcones,10,$("section#tshirt ul.lTshirt li"));
			}
		);
	}
});