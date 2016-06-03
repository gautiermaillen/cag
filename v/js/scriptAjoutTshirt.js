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
		$ajout_nom = $("form.ajouterLTshirt input[name=nom]").val();
		$ajout_prix = $("form.ajouterLTshirt input[name=prix]").val();
		$ajout_date = $("form.ajouterLTshirt input[name=date]").val();
		$ajout_desc = $("form.ajouterLTshirt textarea[name=desc]").val();
		$ajout_img_gd = $("form.ajouterLTshirt input[name=img_gd]").val();
		$ajout_img_pt = $("form.ajouterLTshirt input[name=img_pt]").val();
		$ajout_createur = $("form.ajouterLTshirt select[name=createur] option:selected").text();
		$ajout_matiere = $("form.ajouterLTshirt select[name=matiere] option:selected").text();
		$ajout_categorie = $("form.ajouterLTshirt select[name=categorie] option:selected").text();
		
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
});