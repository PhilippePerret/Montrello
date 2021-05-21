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
	UI.setEditableIn(cform.obj)
	cform.edit(carte)
	cform.obj.querySelector('header > span.close-btn')
		.addEventListener('click', cform.close.bind(cform))
}


edit(carte){
	this.carte = carte
	console.log("this.carte:", this.carte)
	this.show()
	this.carte.owner.obj.style.zIndex = 0
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

get obj(){return this._obj||(this._obj = this.build())}

build(){
	const o = document.querySelector('carte_form').cloneNode(true)
	o.owner = this
	document.body.appendChild(o)
	return o
}
}