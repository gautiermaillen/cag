$(function(){
	$("section#tshirt ul.lTshirt").on("click","li",afficheDetail);

	function afficheDetail(){
		// console.log(this);
		// $tdata = {prod_nom:"Boule",prod_prix:"25€",prod_date:"25-06-15",prod_desc:"Français",cre_nom:"Moi",mat_nom:"coton",cat_nom:"illustré"};
		// formulaire($tdata,this);
		$leLI = this;
		$.getJSON(
			"dispatcher.php",
			{
				operation : "affichage",
				id : 		$(this).attr("data-id")
			},
			function(data){
				// console.log(data);
				formulaire(data,$leLI);
			}
		);
	}
});