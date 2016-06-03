<?php
	header("Content-type:application/json;charset=utf8");
	
	require_once("./m/DBConnexion.php");
	require_once("./c/BoutiqueControler.php");

	$operation_permise=[
		"liste" => "index.html",
		"tri" => "index.html",
		"recherche" => "index.html",
		"ajout" => "index.html",
		"affichage" => "index.html",
		"update" => "index.html",
		"delete" => "index.html"
	];
	
	//Récupérer l'opération 
	$op = (isset($_GET['operation']))?$_GET['operation']:1;
	if(!isset($operation_permise[$op]))
	{
		$op = "liste"; // par défaut
	}

	$Tc = new TshirtControler();

	switch ($op)
	{
		case "liste":
			$tabNomsTshirt = $Tc->liste();
			$tabCreateurs = $Tc->listeCreateurs();
			$tabMatieres = $Tc->listeMatieres();
			$tabCategories = $Tc->listeCategories();
			$tabTshirt=["tabNomsTshirt"=>$tabNomsTshirt,"tabCreateurs"=>$tabCreateurs,"tabMatieres"=>$tabMatieres,"tabCategories"=>$tabCategories];
			break;

		case "tri":
			$TabTriTshirt = $Tc->listeTriee($_GET['createur'], $_GET['matiere'], $_GET['categorie']);
			$tabTshirt = ["tabNomsTshirt"=>$TabTriTshirt];
			break;

		case "recherche":
			$TabRechTshirt = $Tc->listeRech($_GET['recherche']);
			$tabTshirt = ["tabNomsTshirt"=>$TabRechTshirt];
			break;

		case "ajout":
			$Tc->creerTshirt($_GET['nom'], $_GET['prix'], $_GET['img_gd'], $_GET['img_pt'], $_GET['desc'], $_GET['createur'], $_GET['matiere'], $_GET['date'], $_GET['categorie']);
			break;

		case "affichage":
			$Tc->afficherTshirt($_GET['id']);
			break;

		case "update":
			$Tc->modifierTshirt($_GET['nom'], $_GET['prix'], $_GET['img_gd'], $_GET['img_pt'], $_GET['desc'], $_GET['createur'], $_GET['matiere'], $_GET['date'], $_GET['categorie']);
			break;

		case "delete":
			$Tc->supprimerTshirt($_GET['id']);
			break;
	}

	if(isset($tabTshirt))
	{
		echo json_encode($tabTshirt);
	}
	

?>
