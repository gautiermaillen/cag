<?php

	require_once __DIR__."/Tshirt.php";

	class TshirtAdapter
	{
		private $liste=[];
		private $listeCreateurs=[];
		private $listeMatieres=[];
		private $listeCategories=[];
		private $listeTriee=[];
        private $listeRech=[];
		private $pdo;

		public function __construct(PDO $pdo)
		{
			$this->pdo = $pdo;
		}

		public function liste()
		{
			$sql = "SELECT
					prod_id,
					prod_nom

					FROM produits;";

			// préparation de la requête : 
			$stmt = $this->pdo->prepare($sql);
			$stmt->execute();
			$this->liste = $stmt->fetchAll(PDO::FETCH_CLASS, "Tshirt");
			return $this->liste;
		}

        public function listeCreateurs()
        {
            $sql = "SELECT 
                    cre_id,
                    cre_nom 
                FROM createurs";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $this->listeCreateurs = $stmt->fetchAll(PDO::FETCH_CLASS, "Tshirt");
			return $this->listeCreateurs;      
        }
        
        public function listeMatieres()
        {
            $sql = "SELECT 
                    mat_id,
                    mat_nom
                FROM matieres";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $this->listeMatieres = $stmt->fetchAll(PDO::FETCH_CLASS, "Tshirt");
			return $this->listeMatieres;  
        }

        public function listeCategories()
        {
            $sql = "SELECT
                    cat_id,
                    cat_nom
                FROM categories";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            $this->listeCategories = $stmt->fetchAll(PDO::FETCH_CLASS, "Tshirt");
			return $this->listeCategories;      
        }
        
		public function listeTriee($cre_nom, $mat_nom, $cat_nom)
		{
            $sql = "SELECT
            		DISTINCT
                    prod_id,
                    prod_nom,	
                    cre_nom,
                    cat_nom,
                    mat_nom
				FROM produits
				JOIN createurs ON prod_fk_createur = cre_id
				JOIN matieres ON mat_id = prod_fk_matiere
				JOIN categories ON cat_id = prod_fk_categorie
				JOIN exemplaires ON exem_fk_tee = prod_id
				JOIN tailles ON exem_fk_tail = tail_id
                WHERE cre_nom=:a AND mat_nom=:b AND cat_nom=:c";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':a'=>$cre_nom,':b'=>$mat_nom,':c'=>$cat_nom]);
            $this->listeTriee = $stmt->fetchAll(PDO::FETCH_CLASS, "Tshirt");
			return $this->listeTriee;  
        }
        
        public function listeRech($saisie)
        {
            $sql = "SELECT 
                DISTINCT
                prod_nom,
                prod_id
                FROM produits
                WHERE prod_nom
                LIKE :a";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":a"=>"%".$saisie."%"]);
            $this->listeRech = $stmt->fetchAll(PDO::FETCH_CLASS, "Tshirt");
			return $this->listeRech;          
        }
        
        public function creerTshirt($nom,$prix,$img_gd,$img_pt,$desc,$createur,$matiere,$date,$categorie)
        {
            $sql = "INSERT INTO 
            produits      
                (prod_id,
                prod_nom,
                prod_prix,
                prod_img_gd,
                prod_img_pt,
                prod_desc,
                prod_fk_createur,
                prod_fk_matiere,
                prod_date,
                prod_fk_categorie) 
            VALUES
                (NULL,:a,:b,:c,:d,:e,:f,:g,:h,:i)";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":a"=>$nom,":b"=>$prix,":c"=>$img_gd,":d"=>$img_pt,":e"=>$desc,":f"=>$createur,":g"=>$matiere,":h"=>$date,":i"=>$categorie]);
        }
        
        /*public function afficheTshirt($id) 
        {
            $sql = "SELECT
                prod_id
                prod_nom
            ";  
        }*/
        
        /*public function modifierTshirt() 
        {
            $sql = 
        }*/
	}