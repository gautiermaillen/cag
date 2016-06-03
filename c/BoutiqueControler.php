<?php

	require_once __DIR__.'/../m/TshirtAdapter.php';
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
	}
