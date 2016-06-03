<?php
	class DBConnexion
	{
		private static $instance = null;
		private $pdo = null;
		private function __construct()
		{
			$utilisateur ="admin";
			$motdepasse="pwd_admin";
			$serveur = "mysql:host=localhost;dbname=tshirt";
			$this->pdo = new PDO ($serveur, $utilisateur, $motdepasse); // DSN (quel driver utilisé ? Livre p.478)			self::$pdo = new PDO ($serveur,$utilisateur,$motdepasse);
		 	$this->pdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$requete="SET NAMES utf8";
			$resultat= $this->pdo->exec($requete);
		}

		public static function getInstance()
		{
			if(self::$instance==null)
			{
				self::$instance = new DBConnexion();
			}

			return self::$instance->pdo;
		}
	}
   