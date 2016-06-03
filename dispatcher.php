<?php
	header("Content-type:application/json;charset=utf8");
	
	require_once("./m/DBConnexion.php");
	require_once("./c/BoutiqueControler.php");

	$operation_permise=[
		"liste" => "index.html",
		"tri" => "index.html"
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
	}

	echo json_encode($tabTshirt);


?>
