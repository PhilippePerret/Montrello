'use strict'
class Liste {

static get(liste_id){
	return this.items[liste_id]
}

/**	Créer une liste pour le tableau courant
	*
	*/
static create(){
	const owner = Tableau.current
	const newItem = new Liste({owner:owner, ti:"Nouvelle liste", ct:'tb', ty:'li', ow:owner.ref, id:Montrello.getNewId('li')})
	newItem.build()
	newItem.save()
	newItem.editTitle()
}

static get ownerClass(){return Tableau}


constructor(data){
	this.data = data
}

build(){
	//
	// Par mesure de prudence, on doit s'assurer que le tableau proprié-
	// taire de cette liste existe toujours. Dans le cas contraire, on
	// refuse la construction.
	// 
	if (!this.owner){
		return erreur("Désolé, mais le tableau propriétaire de la liste "+this.titre+" est introuvable… Nous ne pouvons pas construire cette liste.")
	}
	this.obj = document.querySelector(`${this.constname}#modele-${this.constname}`).cloneNode(/* deep = */ true)
	this.obj.id = `${this.constname}-${this.id}`
	this.obj.classList.remove('hidden')
	// console.log("owner dans build de liste", this.owner)
	this.owner.obj.querySelector('items.listes').appendChild(this.obj)
	this.obj.owner = this
	UI.setEditableIn(this.obj)
	this.setCommonDisplayedProperties()
}


}// class Liste

Object.assign(Liste.prototype, TOMiniMethods)
Object.defineProperties(Liste.prototype, TOMiniProperties)