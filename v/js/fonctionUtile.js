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