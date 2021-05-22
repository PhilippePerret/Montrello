'use strict'
class Carte {

static get(item_id){ return this.items[item_id]}

// 
// Pour créer une nouvelle carte à la liste
// 
static create(element){
	console.log("add carte pour", element, element.owner)
	const newItem = new this({
		id: Montrello.getNewId('ca'),
		ty:'ca', 
		ti: 'Nouvelle carte', 
		ow:element.owner.ref
	})
	newItem.build()
	newItem.save()
	return newItem
}

static get ownerClass(){return Liste}


constructor(data){
	this.data = data
}

get ref(){return `${this.ty}-${this.id}`}

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