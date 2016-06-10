<?php
    require_once __DIR__."/Tshirt.php";

    class ConnexionAdapter {
        private $verifierIdentite = [];
        private $pdo;
            
        public function __construct(PDO $pdo)
		{
			$this->pdo = $pdo;
		}
        
        public function verifierIdentite($login){
            /* sélectionner tous les users et les logins de la table administrateurs et vérifier s'il y en a un qui correspond au login qu'on fait passer*/
            $sql = "
            SELECT
				admin_id,
                admin_login,
                admin_pwd
				FROM administrateurs
                WHERE admin_login=:a
            ";
			$stmt = $this->pdo->prepare($sql);
			$stmt->execute([":a"=>$login]);
			$this->verifierIdentite = $stmt->fetchAll(PDO::FETCH_CLASS, "Tshirt");
			return $this->verifierIdentite;
        }
        
        public function inscription($login,$mdp)
        {
            $sql = "
            INSERT INTO
                administrateurs
                (
                    admin_id,
                    admin_login,
                    admin_pwd
                )
            VALUES
                (NULL, :a, :b)
            ";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([":a"=>$login,":b"=>$mdp]);
        }
    }

?>