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
	o.setAttribute('data-owner-ref', this.carte.ref)
	document.body.appendChild(o)
	$(o).draggable()
	this.obj = o
	this.buildObjets()
}

/**
	* Construction des objets de la carte
	*
	* QUESTION Faudrait-il généraliser à tous les objets ?
	*/
buildObjets(){

	return // TODO enlever quand OK

	if (!this.carte.objs || Object.keys(this.carte.objs).length == 0){
		console.log("Aucun objet de carte à afficher")
		return
	}
	for(var otype in this.carte.objs) {
		const aryObjets = this.carte.objs[otype]
		console.log("Afficher les objets de type %s :", otype, aryObjets)
		const classe = Montrello.type2class(otype)
		const conteneur = this.obj.querySelector(`content[data-type-objet="${otype}"]`)
		aryObjets.forEach(objet_id => {
			const objet = classe.get(objet_id)
			console.log("objet = ", objet)
			conteneur.appendChild(objet.obj)
		})
	}
}
}