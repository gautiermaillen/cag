$(function(){
	$("a.ajouterLTshirt").on("click",afficheFormulaire);
	$("form.ajouterLTshirt input#ajouter").on("click",envoieInfoAjout);
	$("form.ajouterLTshirt input#annuler").on("click",annulerAjout);

	function afficheFormulaire(){
		$classFormulaire = $(this).attr("class");
		$("form."+$classFormulaire).css({display:"block"});
	}

	function annulerAjout(){
		$("form.ajouterLTshirt").css({display:"none"});
	}

	function envoieInfoAjout(){
		// Récupération des informations du formulaire d'ajout d'un T-shirt
		$ajout_nom = $("form.ajouterLTshirt input[name=nom]");
		$ajout_prix = $("form.ajouterLTshirt input[name=prix]");
		$ajout_date = $("form.ajouterLTshirt input[name=date]");
		$ajout_desc = $("form.ajouterLTshirt textarea[name=desc]");
		$ajout_img_gd = $("form.ajouterLTshirt input[name=img_gd]");
		$ajout_img_pt = $("form.ajouterLTshirt input[name=img_pt]");
		$ajout_createur = $("form.ajouterLTshirt select[name=createur] option:selected").attr("data-id");
		$ajout_matiere = $("form.ajouterLTshirt select[name=matiere] option:selected").attr("data-id");
		$ajout_categorie = $("form.ajouterLTshirt select[name=categorie] option:selected").attr("data-id");
		

		// MESSAGES D'ERREURS

		$tabChampsObligatoires = [$ajout_nom, $ajout_prix, $ajout_date, $ajout_img_gd, $ajout_img_pt];
		if($ajout_nom.val() == "" || $ajout_prix.val() == "" || $ajout_date.val() == "" || $ajout_img_gd.val() == "" || $ajout_img_pt.val() == "")
		{
			$("input+span.error").remove();
			for (var i = 0; i <= $tabChampsObligatoires.length ; i++)
			{
				if($tabChampsObligatoires[i].text() == "")
				{
					$("<span>").text(" Ce champ est obligatoire")
		            .attr("class", "error")
		            .css({color:"red"})
		            .insertAfter($tabChampsObligatoires[i].val());
				}
			}
		}

		// FIN MESSAGES D'ERREURS

		else
		{
			// Ferme le formulaire d'ajout au clique du bouton d'ajout
			$("form.ajouterLTshirt").css({display:"none"});

			// Crée le tableau de toutes les tailles et de leurs stocks respectifs
			$tabTailles = [];
			for (var i = 0; i < $("form.ajouterLTshirt section#stock p").length; i++){
				$tabTailles[$tabTailles.length] = 
					[
						// Valeur = Stock
						$("form.ajouterLTshirt section#stock p:nth-child("+(i+2)+") input").val(),
						// Attribute = Taille
						$("form.ajouterLTshirt section#stock p:nth-child("+(i+2)+") input").attr("name")
					];
			}

			// Envoi les données récupérées dans le formulaire d'ajout d'un T-shirt
			$.getJSON(
				"dispatcher.php",
				{
					operation : "ajout",
					nom : 		$ajout_nom.val(),
					prix : 		$ajout_prix.val(),
					date : 		$ajout_date.val(),
					desc : 		$ajout_desc.val(),
					img_gd : 	$ajout_img_gd.val(),
					img_pt : 	$ajout_img_pt.val(),
					createur: 	$ajout_createur,
					matiere : 	$ajout_matiere,
					categorie : $ajout_categorie,
					tailles : 	$tabTailles
				}
			);
		}
	}
});