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
		$ajout_nom = $("form.ajouterLTshirt input[name=nom]");
		$ajout_prix = $("form.ajouterLTshirt input[name=prix]");
		$ajout_date = $("form.ajouterLTshirt input[name=date]");
		$ajout_desc = $("form.ajouterLTshirt textarea[name=desc]");
		$ajout_img_gd = $("form.ajouterLTshirt input[name=img_gd]");
		$ajout_img_pt = $("form.ajouterLTshirt input[name=img_pt]");
		$ajout_createur = $("form.ajouterLTshirt select[name=createur] option:selected").text();
		$ajout_matiere = $("form.ajouterLTshirt select[name=matiere] option:selected").text();
		$ajout_categorie = $("form.ajouterLTshirt select[name=categorie] option:selected").text();
		

		// MESSAGES D'ERREURS

		$tabChampsObligatoires = [$ajout_nom, $ajout_prix, $ajout_date, $ajout_img_gd, $ajout_img_pt];
		if($ajout_nom.val() == "" || $ajout_prix.val() == "" || $ajout_date.val() == "" || $ajout_img_gd.val() == "" || $ajout_img_pt.val() == "")
		{
			for (var i = 0; i <= $tabChampsObligatoires.length ; i++)
			{
				if($tabChampsObligatoires[i].val() == "")
				{
					$("<span>").text(" Ce champ est obligatoire")
		            .attr("class", "error")
		            .css({color:"red"})
		            .insertAfter($tabChampsObligatoires[i]);
				}
			}
		}

		// FIN MESSAGES D'ERREURS

		else
		{
			$.getJSON(
				"dispatcher.php",
				{
					operation : "ajout",
					nom : 		$ajout_nom,
					prix : 		$ajout_prix,
					date : 		$ajout_date,
					desc : 		$ajout_desc,
					img_gd : 	$ajout_img_gd,
					img_pt : 	$ajout_img_pt,
					createur: 	$ajout_createur,
					matiere : 	$ajout_matiere,
					categorie : $ajout_categorie
				},
				function(data){}
			);
		}
	}
});