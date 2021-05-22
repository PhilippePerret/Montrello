'use strict'

class CarteForm {

/**
	* Méthode appelée quand on clique sur la carte dans sa liste
	* pour l'éditer
	*/
static edit(element){
	const carte = element.owner
	const cform = new this()
	cform.carte = carte
	cform.build()
	cform.setOwner(carte)
	cform.edit(carte)
	UI.setEditableIn(cform.obj)
	cform.obj.querySelector('header > span.close-btn')
		.addEventListener('click', cform.close.bind(cform))
}

setOwner(owner){
	this.carte = owner
	// Ici, renseigner les propriétaires des balises
	this.obj.querySelectorAll('liste_actions').forEach(element => {
		element.owner = this
	})
}

edit(carte){
	this.show()


	// this.carte.owner.obj.style.zIndex = 0
	this.setValues()
}

setValues(){
	this.obj.querySelector('span.titre').innerHTML = this.carte.titre
}

set(hdata){
	console.log("Une nouvelle valeur à ", hdata)
	this.carte.set(hdata)
}

show(){this.obj.classList.remove('hidden')}
close(){ this.obj.remove()}

build(){
	const o = document.querySelector('carte_form').cloneNode(true)
	o.owner = this
	document.body.appendChild(o)
	$(o).draggable()
	this.obj = o
}
}