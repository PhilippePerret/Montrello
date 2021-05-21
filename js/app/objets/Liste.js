'use strict'
class Liste {

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



constructor(data){
	this.data = data
	// Object.defineProperties(this,TOMiniProperties)
}

build(){
	this.obj = document.querySelector(`${this.constname}#modele-${this.constname}`).cloneNode(/* deep = */ true)
	this.obj.id = ""
	this.obj.classList.remove('hidden')
	this.container.querySelector('#listes').appendChild(this.obj)
	this.obj.owner = this
	UI.setEditableIn(this.obj)
	this.setCommonDisplayedProperties()
	
}


}// class Liste

Object.assign(Liste.prototype, TOMiniMethods)
Object.defineProperties(Liste.prototype, TOMiniProperties)