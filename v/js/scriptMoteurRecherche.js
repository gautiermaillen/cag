$(function(){
	$("header>section>form#moteurDeRecherche input[type=text]").on("keyup",recherche);

	function recherche(){
		$.getJSON(
			"dispatcher.php",
			{
				operation : "recherche",
				recherche : $(this).val()
			},
			function(data){
				console.log("JSON");
				// fonction créée dans le fichier JS "fonctionUtile.js"
				supprimerEnfant("section#tshirt ul.lTshirt");
				// fonction créée dans le fichier JS "fonctionUtile.js"
				boucleFor(data["tabNomsTshirt"],"li",$("section#tshirt ul.lTshirt"),"prod_nom","prod_id");
				setTimeout(lesIcones,500,$("section#tshirt ul.lTshirt li"));
					// "fonctionUtile.js", crée les icones sur chaque li
					//lesIcones($("section#tshirt ul.lTshirt li"));
			}
		);
	}
});