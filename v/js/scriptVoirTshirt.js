$(function(){
	$("section#tshirt ul.lTshirt").on("click",">li",afficheDetail);

	function afficheDetail(ev){
		$leLI = this;
		if (!$($leLI).has("form").length){
			$.getJSON(
				"dispatcher.php",
				{
					operation : "affichage",
					id : 		$(this).attr("data-id")
				},
				function(data){
					// Voir dans fonctionUtile.js
					formulaire(data[0],$leLI);
				}
			);
		}
		else{
			$($leLI).children('form').remove();
		}
	}
});