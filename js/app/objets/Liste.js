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
	const newItem = new Liste({owner:owner, ct:'tb', ty:'li', ow:owner.ref, id:Montrello.getNewId('li')})
	newItem.build()
	newItem.save()
}

static get ownerClass(){return Tableau}


constructor(data){
	this.data = data
}

build(){
	this.obj = document.querySelector(`${this.constname}#modele-${this.constname}`).cloneNode(/* deep = */ true)
	this.obj.id = `${this.constname}-${this.id}`
	this.obj.classList.remove('hidden')
	console.log("owner", this.owner)
	this.owner.obj.querySelector('.listes').appendChild(this.obj)
	this.obj.owner = this
	UI.setEditableIn(this.obj)
	this.setCommonDisplayedProperties()
}


}// class Liste

Object.assign(Liste.prototype, TOMiniMethods)
Object.defineProperties(Liste.prototype, TOMiniProperties)