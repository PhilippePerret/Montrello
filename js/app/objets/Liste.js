'use strict'
class Liste {

static get(liste_id){
	return this.items[liste_id]
}

/**	Ajouter une liste au tableau
	*
	*/
static add(){
	message("Je dois ajouter une liste au tableau courant.")
	const newListe = this.create({ct:'tableau'})
}

static create(data){
	const newItem = new this(data)
	newItem.build()
	newItem.save()
}

static get ownerClass(){return null}


constructor(data){
	this.data = data
	this.data.id || Object.assign(this.data, {id: Montrello.getNewId(this.constname)})
}

build(){
	this.obj = document.querySelector(`${this.constname}#modele-${this.constname}`).cloneNode(/* deep = */ true)
	this.obj.id = `${this.constname}-${this.id}`
	this.obj.classList.remove('hidden')
	this.container.querySelector('#listes').appendChild(this.obj)
	this.obj.owner = this
	UI.setEditableIn(this.obj)
	this.setCommonDisplayedProperties()
	
}


}// class Liste

Object.assign(Liste.prototype, TOMiniMethods)
Object.defineProperties(Liste.prototype, TOMiniProperties)