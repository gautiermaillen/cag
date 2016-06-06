// crée des éléments à partir d'un tableau JSON et les 'append' dans une balise HTML
	// $tab : tableau JSON,
	// $quoi : l'élément à créer,
	// $ou : l'endroit où l'élément doit-être inséré,
	// $pourquoi : quel nom/valeur à reprendre dans le tableau JSON
function boucleFor($tab,$quoi,$ou,$pourquoi,$id_pourquoi){
	for (var i = 0; i < $tab.length; i++){
		$("<"+$quoi+" data-id='"+$tab[i][$id_pourquoi]+"' "+">"+$tab[i][$pourquoi]+"</"+$quoi+">").appendTo($ou);
	}
}

// Supprime les enfants d'une balise HTML passé en paramètre
function supprimerEnfant($parent){
	$($parent).children().remove();
}

// Création du formulaire d'affichage du t-shirt sélectionné 
function formulaire($tshirt,$element){
	$($element).append("<form><fieldset><legend>"+$tshirt["prod_nom"]+"</legend><ul><li>Prix : "+$tshirt["prod_prix"]+"</li><li>Date : "+$tshirt["prod_date"]+"</li><li>Description : "+$tshirt["prod_desc"]+"</li><li>Créateur : "+$tshirt["cre_nom"]+"</li><li>Matière : "+$tshirt["mat_nom"]+"</li><li>Catégorie : "+$tshirt["cat_nom"]+"</li></ul></fieldset></form>");
}

$(function() {
	$("#datepicker").datepicker(
		{
			dateFormat: 'yy-mm-dd'
		});

});