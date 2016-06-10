<?php

	require_once __DIR__.'/../m/TshirtAdapter.php';
	require_once __DIR__.'/../m/ConnexionAdapter.php';
	require_once __DIR__.'/../m/DBConnexion.php';

	class TshirtControler
	{
		// private $Cc;
		private $Connec;

		public function __construct()
		{
			
			// $this->Cc = new CategoriesControler($v);
			$this->Connec = DBConnexion::getInstance();
		}

		public function liste()
		{
			$Ta = new TshirtAdapter($this->Connec);
			$l = $Ta->liste();

			return $l;
		}

		public function listeCreateurs()
		{
			$Ta = new TshirtAdapter($this->Connec);
			$lcr = $Ta->listeCreateurs();

			return $lcr;
		}

		public function listeMatieres()
		{
			$Ta = new TshirtAdapter($this->Connec);
			$lm = $Ta->listeMatieres();

			return $lm;
		}

		public function listeCategories()
		{
			$Ta = new TshirtAdapter($this->Connec);
			$lca = $Ta->listeCategories();

			return $lca;
		}

		public function listeTriee($cre_nom, $mat_nom, $cat_nom)
		{
			$Ta = new TshirtAdapter($this->Connec);
			$lt = $Ta->listeTriee($cre_nom, $mat_nom, $cat_nom);

			return $lt;
		}

		public function listeRech($saisie)
		{
			$Ta = new TshirtAdapter($this->Connec);
			$lr = $Ta->listeRech($saisie);

			return $lr;
		}

		public function creerTshirt($nom, $prix, $img_gd, $img_pt, $desc, $createur, $matiere, $date, $categorie)
		{
			$Ta = new TshirtAdapter($this->Connec);
			$ct = $Ta->creerTshirt($nom, $prix, $img_gd, $img_pt, $desc, $createur, $matiere, $date, $categorie);

			return $ct;
		}

		public function afficherTshirt($id)
		{
			$Ta = new TshirtAdapter($this->Connec);
			$at = $Ta->afficherTshirt($id);

			return $at;
		}

		public function modifierTshirt($nom, $prix, $img_gd, $img_pt, $desc, $createur, $matiere, $date, $categorie)
		{
			$Ta = new TshirtAdapter($this->Connec);
			$mt = $Ta->modifierTshirt($nom, $prix, $img_gd, $img_pt, $desc, $createur, $matiere, $date, $categorie);

			return $mt;
		}

		public function supprimerTshirt($id)
		{
			$Ta = new TshirtAdapter($this->Connec);
			$st = $Ta->supprimerTshirt($id);

			return $st;
		}
	}


	class ConnexionControler
	{
		private $connect;

		public function __construct()
		{
			$this->Connec = DBConnexion::getInstance();
		}

	 	function inscription($login, $mdp)
	 	{
			$Ca = new ConnexionAdapter($this->Connec);
			$tabUsers = $Ca->verifierIdentite($login); // récupérer un tableau soit vide soit avec un utilisateur

			// Si le tableau renvoie un utilisateur, c'est que le nom est déjà pris
			// Sinon, on peut l'inscrire
			if((count($tabUsers))==0)
			{	
				$Ca->inscription($login, $mdp);
				
				header('location: connexion.html');
			}
	 	}

	 	function connexion($login, $mdp)
	 	{
			$Ca = new ConnexionAdapter($this->Connec);
			$tabUsers = $Ca->connexion($login, $mdp); // récupérer un tableau soit vide soit avec un utilisateur

			// Si le tableau renvoie un utilisateur, c'est qu'on peut se connecter
			// Sinon, les valeurs sont incorrectes
			if((count($tabUsers))==0)
			{
				echo "login ou mot de passe incorrect";
			}

			else
			{
				header('location: index.html');
			}
	 	}
	}

