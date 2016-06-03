<?php
	header("Content-type:application/json;charset=utf8");
	
	require_once("./m/DBConnexion.php");
	require_once("./c/BoutiqueControler.php");

	$operation_permise=[
		"liste"
	];
	
	//Récupérer l'opération 
	$op = (isset($_GET['operation']))?$_GET['operation']:1;
	if(!isset($operation_permise[$op]))
	{
		$op = "tri"; // par défaut
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
			// echo json_encode($tabTshirt);
			break;

		case "tri":
			$TabTriTshirt = $Tc->listeTriee($_GET['createurs'], $_GET['matieres'], $_GET['categories']);
			echo json_encode($tabTriTshirt);
			break;
	}

	var_dump($tabTshirt);
	


?>
