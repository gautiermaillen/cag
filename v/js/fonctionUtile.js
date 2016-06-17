// crée des éléments à partir d'un tableau JSON et les 'append' dans une balise HTML
	// $tab : tableau JSON,
	// $quoi : l'élément à créer,
	// $ou : l'endroit où l'élément doit-être inséré,
	// $pourquoi : quel nom/valeur à reprendre dans le tableau JSON
function boucleFor($tab,$quoi,$ou,$pourquoi,$id_pourquoi){
	for (var i = 0; i < $tab.length; i++){
		$("<"+$quoi+" name='"+$tab[i][$pourquoi]+"' data-id='"+$tab[i][$id_pourquoi]+"' "+">"+$tab[i][$pourquoi]+"</"+$quoi+">").appendTo($ou);
	}
}

function lesIcones($tabTshirt){
	for (var i = 0; i < $tabTshirt.length; i++)
	{
		$ul = $("<ul>").attr("class", "options");

		$("<li>").attr("name", "afficher").attr("class", "fa fa-eye").appendTo($ul);
		$("<li>").attr("name", "modifier").attr("class", "fa fa-pencil").appendTo($ul);
		$("<li>").attr("name", "supprimer").attr("class", "fa fa-times").appendTo($ul);

		$ul.appendTo($tabTshirt[i]);
	}
}

// Supprime les enfants d'une balise HTML passé en paramètre
function supprimerEnfant($parent){
	$($parent).children().remove();
}

// Création du formulaire d'affichage du t-shirt sélectionné 
function formulaire($tshirt,$element,$tail){
	$tail = ($tail == undefined)?false:true;
	// On affiche que les tailles existantes avec du stock
	if ($tail){
		if ($tshirt["exem_stock"] != 0){
			$($element).children("form").children("fieldset").append("<p>"+$tshirt["tail_nom"]+" : "+$tshirt["exem_stock"]+"</p>");
		}
	}
	else{
		$($element).append("<form><fieldset><legend>"+$tshirt["prod_nom"]+"</legend><ul><li><img src='./images/"+$tshirt["prod_img_gd"]+"' alt='Grande photo'></li><li><img src='./images/"+$tshirt["prod_img_pt"]+"' alt='Petite photo'></li><li>Prix : "+$tshirt["prod_prix"]+"</li><li>Date : "+$tshirt["prod_date"]+"</li><li>Description : "+$tshirt["prod_desc"]+"</li><li>Créateur : "+$tshirt["cre_nom"]+"</li><li>Matière : "+$tshirt["mat_nom"]+"</li><li>Catégorie : "+$tshirt["cat_nom"]+"</li></ul></fieldset></form>");
	}
}

$(function() {
	$("#datepicker").datepicker(
		{
			dateFormat: 'yy-mm-dd'
		});

});

function formulaireModif($tshirt,$element,$tail){
	$tail = ($tail == undefined)?false:true;
	if ($tail){
		$($element).children("form").children("fieldset").children("#stock").append("<p><label>"+$tshirt["tail_nom"]+"</label><input type=\"text\" name=\""+$tshirt["tail_nom"]+"\" value=\""+$tshirt["exem_stock"]+"\"></p>");
	}
	else{
		$($element).append("<form class='modification'><fieldset><legend>"+$tshirt["prod_nom"]+"</legend><p><label>Nom : </label><input type='text' name=\"nom\" value=\""+$tshirt["prod_nom"]+"\"></p><p><label>Prix : </label><input type='text' name='prix' value='"+$tshirt["prod_prix"]+"'></p><p><label>Date : </label><input type='text' name='date' value='"+$tshirt["prod_date"]+"'></p><p><label>Description : </label><textarea name='desc'>"+$tshirt["prod_desc"]+"</textarea></p><p><label>Créateur : </label><select name='createur'><option data-id='"+$tshirt["cre_id"]+"' selected='selected'>"+$tshirt["cre_nom"]+"</option></select></p><p><label>Matière : </label><select name='matiere'><option data-id='"+$tshirt["mat_id"]+"' selected='selected'>"+$tshirt["mat_nom"]+"</option></select></p><p><label>Catégorie : </label><select name='categorie'><option data-id='"+$tshirt["cat_id"]+"' selected='selected'>"+$tshirt["cat_nom"]+"</option></select></p><section id='stock'></section><p><input type='button' id='modifier' value='Modifier'></p></fieldset></form>");
	}
	
}