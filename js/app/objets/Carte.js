'use strict'
class Carte {

static get(item_id){ return this.items[item_id]}

// 
// Pour créer une nouvelle carte à la liste
// 
static create(element){
	// console.log("add carte pour", element, element.owner)
	const newItem = new this({
			ct: `#${element.owner.domId}`
		, id: Montrello.getNewId('ca')
		, ty:'ca'
		, ti: 'Nouvelle carte'
		, ow:element.owner.ref
		, objs: {}
	})
	newItem.build()
	newItem.save()
	newItem.editTitle()
	return newItem
}

static get ownerClass(){return Liste}


constructor(data){
	// console.log("data initialisation de la carte :", data)
	this.data = data
}

get ref(){return `${this.ty}-${this.id}`}

build(){
	// this.obj = document.querySelector(`${this.constname}#modele-${this.constname}`).cloneNode(/* deep = */ true)
	this.obj = DOM.clone('modeles carte#modele-carte')
	this.obj.id = this.domId
	this.obj.classList.remove('hidden')
	this.container.querySelector('content > items').appendChild(this.obj)
	this.obj.owner = this
	UI.setEditableIn(this.obj)
	this.setCommonDisplayedProperties()
}

/**
	* Pour actualiser l'affichage de la carte
	*
	* ATTENTION : il s'agit vraiment et seulement de l'actualisation de
	* l'affichage et pas de l'enregistrement des nouvelles données.
	*/
updateDisplay(hdata){
	hdata.ti && this.setTitre(hdata.ti)
}

}// class Carte
Object.assign(Carte.prototype, TOMiniMethods)
Object.defineProperties(Carte.prototype, TOMiniProperties)