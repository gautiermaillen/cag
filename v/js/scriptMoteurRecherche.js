$(function(){
	$("header>section>form#moteurDeRecherche input[type=button]").on("click",recherche);

	function recherche(){
		$.getJSON(
			"dispatcher.php",
			{
				operation : "recherche",
				recherche : $(this).prev().val()
			},
			function(data){
				// fonction créée dans le fichier JS "fonctionUtile.js"
				supprimerEnfant("section#tshirt ul.lTshirt");
				// fonction créée dans le fichier JS "fonctionUtile.js"
				boucleFor(data["tabNomsTshirt"],"<li/>",$("section#tshirt ul.lTshirt"),"prod_nom");
			}
		);
	}
});