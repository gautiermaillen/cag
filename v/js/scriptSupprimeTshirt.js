$(function(){
	$("ul.lTshirt").on("click","li[name=supprimer]",supprimeTshirt);

	function supprimeTshirt(){
		if (confirm("Souhaitez-vous supprimer ce t-shirt : '"+$(this).parent().parent().text()+"' ?")){
			$.ajax(
				"dispatcher.php",{
					method:"GET",
					data:{
						operation : "suppression",
						id : 		$(this).parent().parent().attr("data-id")
					},
					success:function(doc,status,xhr){
						location.reload();
					}
				}
			);
		}
	}
});