$(function(){
	$("section#tshirt ul.lTshirt").on("click","li[name=afficher]",afficheDetail);

	function afficheDetail(ev){
		$leLI = $(this).parent().parent();
		if (!$leLI.has("form").length){
			$("ul.lTshirt li form").remove();
			$.getJSON(
				"dispatcher.php",
				{
					operation : "affichage",
					id : 		$leLI.attr("data-id")
				},
				function(data){
					// Voir dans fonctionUtile.js
					formulaire(data[0],$leLI);
					for (var i = 0; i < data.length; i++){
						formulaire(data[i],$leLI,"tailles");
					}
				}
			);
		}
		else{
			$($leLI).children('form').remove();
		}
	}
});