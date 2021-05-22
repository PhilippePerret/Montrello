class Menu_Accueil {
	static dashboard(){
		alert("J'active le dashboard")
	}
	static tableaux(){
		alert("J'affiche tous les tableaux")
	}
}
class Menu_Outils {
	static createRule(){alert("Je crée une règle")}
	static applyRule(){alert("J'applique une règle")}
}
class Menu_Preferences {
	static define(){alert("Je dois définir les préférences")}
}


class Menu_AddToCard {
	
	static membre(){}
	static tag(){}

	/**
		* Appelé par bouton pour ajouter la checklist
		*
		*/
	static checklist(bouton){
		console.log("bouton:", bouton)
		const owner = bouton.owner
		console.log("owner pour le checklist", owner)
		CheckList.createFor(owner)
	}
	static dates(){}
	static links(){}
	static files(){}
}

class Menu_ProcOnCard {
	static copy(){}
	static createModel(){}
	static follow(){}
	static archive(){}
	static destroy(){}
}