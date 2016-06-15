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
        private $ajouterTshirt=[];
        private $afficherTshirt=[];
		private $pdo;
        private $tshirtId;

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
                FROM createurs
                WHERE 0<
                    (SELECT COUNT(prod_nom) 
                    FROM produits
                    WHERE createurs.cre_id=prod_fk_createur)";
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
        
        public function creerTshirt($nom,$prix,$img_gd,$img_pt,$desc,$createur,$matiere,$date,$categorie,$taille,$stock,$id,$bool)
        {
            if ($bool) {
               $sql = "
                INSERT INTO 
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
                    (NULL,:a,:b,:c,:d,:e,:f,:g,:h,:i)
                ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":a"=>$nom,":b"=>$prix,":c"=>$img_gd,":d"=>$img_pt,":e"=>$desc,":f"=>$createur,":g"=>$matiere,":h"=>$date,":i"=>$categorie]); 
                
            return $this->pdo->lastInsertId();
                
            } else {
                
                $sql3 ="
                    SELECT 
                        tail_id
                    FROM
                        tailles
                    WHERE tail_nom = :j
                ";
                $stmt3 = $this->pdo->prepare($sql3);
                $stmt3->execute([":j"=>$taille]);
                //$stmt3->fetch();
                $selectTaille = $stmt3->fetchColumn();
                var_dump("Select : ".$selectTaille);
                var_dump("Stock : ".$stock);
                
                $sql2 ="
                    INSERT INTO 
                        exemplaires
                            (exem_id,
                            exem_fk_tee,
                            exem_stock,
                            exem_fk_tail)
                    VALUES
                        (NULL,:k,:l,:m)";
                $stmt2 = $this->pdo->prepare($sql2);
                $stmt2->execute([':k'=>$id, ':l'=>$stock,':m'=>$selectTaille]);
            }
            /* insertion dans les produits */
            
            
            /* ajout de la taille et du stock
                -> insertion du t-shirt dans les exemplaires (stock par taille)*/
            /*Pour relier les deux tables, et ainsi créer les exemplaire, on doit récuperer l'Id du t-shirt -> lastInsertId()*/
            /* lorsqu'on crée un t-shirt, on crée plusieurs exemplaires de celui-ci (1 par taille)*/
        }
        
        public function afficherTshirt($id) 
        {
            $sql = "
            SELECT
                prod_nom,
                prod_prix,
                prod_img_gd,
                prod_img_pt,
                prod_desc,
                prod_date,
                cre_nom,
                cat_nom,
                mat_nom,
                exem_stock,
                tail_nom
            FROM produits
            LEFT JOIN createurs 
                ON prod_fk_createur = cre_id
            LEFT JOIN matieres 
                ON mat_id = prod_fk_matiere
            LEFT JOIN categories 
                ON cat_id = prod_fk_categorie
            LEFT JOIN exemplaires 
                ON exem_fk_tee = prod_id 
            LEFT JOIN tailles 
                ON tail_id = exem_fk_tail 
            WHERE prod_id=:a   
            ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':a'=>$id]);
            $this->afficherTshirt = $stmt->fetchAll(PDO::FETCH_CLASS, "Tshirt");
			return $this->afficherTshirt;
        }
        
        public function modifierTshirt($nom,$prix,/*$img_gd,$img_pt,*/$desc,$createur,$matiere,$date,$categorie,$id)
        {
            /* modifications table produits*/
            $sql = "UPDATE
                produits
            SET
                prod_nom=:a,
                prod_prix=:b,
                prod_desc=:e,
                prod_fk_createur=:f,
                prod_fk_matiere=:g,
                prod_date=:h,
                prod_fk_categorie=:i
            WHERE
                prod_id=:j
            ";
            var_dump($createur);
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":a"=>$nom,":b"=>$prix,/*":c"=>$img_gd,":d"=>$img_pt,*/":e"=>$desc,":f"=>$createur,":g"=>$matiere,":h"=>$date,":i"=>$categorie,":j"=>$id]);
            
            /* modifications table exemplaires */
/*            $sql2 = "
                UPDATE
                    exemplaires
                SET 
                    exem_fk_tail=:k,
                    exem_stock=:l
                WHERE 
                    exem_fk_tee=:m        
            ";
            $stmt2 = $this->pdo->prepare($sql);
            $stmt2->execute([":k"=>$taille,":l"=>$stock,":m"=>$id]);*/
        }
        
        public function modifierTailles($id, $taille, $stock)
        {
            var_dump("taille : ".$taille);
            var_dump("stock : ".$stock);
             $sql = "
                UPDATE
                    exemplaires
                SET 
                    exem_fk_tail=:k,
                    exem_stock=:l
                WHERE 
                    exem_fk_tee=:m        
            ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":k"=>$taille,":l"=>$stock,":m"=>$id]);
        }
        
        public function supprimerTshirt($id) 
        {
            $sql = "
                DELETE 
                FROM produits 
                WHERE prod_id=:a
            ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":a"=>$id]);
            
            /*$sql2 = "
                DELETE 
                FROM exemplaires 
                WHERE exem_fk_tee=:b
            ";
            $stmt2 = $this->pdo->prepare($sql2);
            $stmt2->execute([":b"=>$id]);*/
            /* id ? */
        }
	}

