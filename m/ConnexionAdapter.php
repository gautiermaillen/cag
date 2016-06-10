<?php
    class ConnexionAdapter {
        private $pdo;
        /*private*/ 
            
        public function __construct(PDO $pdo)
		{
			$this->pdo = $pdo;
		}
        
        public function verifierIdentite(){
            /* sélectionner tous les users et les logins de la table administrateurs et vérifier s'il y en a un qui correspond au login qu'on fait passer*/
            $sql = "
            
            ";
            $stmt = $this->pdo->prepare($sql);
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