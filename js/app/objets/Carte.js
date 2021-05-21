'use strict'
class Carte {

static get(carte_id){
	return this.items[carte_id]
}
// 
// Pour ajouter une carte à la liste
// 
static add(element,ev){
	// console.log("add carte pour", element, element.owner)
	const newCarte = this.create({ct:`liste#liste-${element.owner.id}`, titre: 'Nouvelle carte'})
	newCarte.owner_id = element.owner.id
	newCarte.owner 		= element.owner
}

static create(data){
	const newItem = new this(data)
	newItem.build()
	newItem.save()
	return newItem
}

static get ownerClass(){return Liste}


constructor(data){
	this.data = data
	this.data.id || Object.assign(this.data, {id: Montrello.getNewId(this.constname)})
}

build(){
	this.obj = document.querySelector(`${this.constname}#modele-${this.constname}`).cloneNode(/* deep = */ true)
	this.obj.id = `${this.constname}-${this.id}`
	this.obj.classList.remove('hidden')
	// console.log("this.container", this.container)
	this.container.querySelector('content > items').appendChild(this.obj)
	this.obj.owner = this
	UI.setEditableIn(this.obj)
	this.setCommonDisplayedProperties()
	
}

}// class Carte
Object.assign(Carte.prototype, TOMiniMethods)
Object.defineProperties(Carte.prototype, TOMiniProperties)