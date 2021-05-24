'use strict'

class CarteForm {

/**
	* Méthode appelée quand on clique sur la carte dans sa liste
	* pour l'éditer
	*/
static edit(element){
	const carte = element.owner
	const cform = new this(carte.data)
	/** On met cette instance en instance courante pour les boutons
		*
		*/
	this.current = cform
	cform.carte = carte
	cform.build()
	cform.setOwner(carte)
	cform.edit(carte)
	UI.setEditableIn(cform.obj)
	cform.obj
		.querySelector('header > span.close-btn')
		.addEventListener('click', cform.close.bind(cform))
	// Mettre les tags
	PickerTags.drawTagsIn(cform)
}

constructor(data){
	this.data = data
}

/**
	*		*** Méthodes répondant aux boutons de la colonne droite
	*/ 

editMembers(){
	message("Je dois ajouter un membre")
}
addChecklist(bouton){
	console.log("Propriétaire du bouton 'Checklist':", bouton.owner)
	CheckList.createFor(bouton.owner)
}
editDates(){
	message("Je dois éditer les dates")
}
editLinks(){
	message("Je dois éditer les liens")
}
editFiles(){
	message("Je dois éditer les fichiers/pièces joints")
}
editCommands(){
	message("Je dois éditer les commandes")
}
/**
	****************************************************************/

afterSet(hdata){
	this.carte.updateDisplay(hdata)
	hdata.tags && PickerTags.drawTagsIn(this)
}

setOwner(owner){
	this.carte = owner
	// // Ici, renseigner les propriétaires des balises
	// this.obj.querySelectorAll('liste_actions').forEach(element => {
	// 	element.owner = this
	// })
	// NON
	// Maintenant, c'est CarteForm (cette classe) qui doit recevoir les
	// modifications et les reporter sur la carte éditée.
}

edit(carte){
	this.show()
	this.setValues()
}

/**
	*
	*	On place les valeurs de la carte dans le formulaire de carte
	*
	* - le titre (common display property)
	* - la description (common display property)
	*
	*/
setValues(){
	this.setCommonDisplayedProperties()
}

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

	if (!this.carte.objs || Object.keys(this.carte.objs).length == 0){
		console.log("Aucun objet de carte à afficher")
		return
	}
	for(var otype in this.carte.objs) {
		const aryObjets = this.carte.objs[otype]
		// console.log("Afficher les objets de type %s :", otype, aryObjets)
		const classe = Montrello.type2class(otype)
		const conteneur = this.obj.querySelector(`content[data-type-objet="${otype}"]`)
		// console.log("Conteneur : ", conteneur)
		aryObjets.forEach(objet_id => {
			const objet = classe.get(objet_id)
			// console.log("objet = ", objet)
			objet.obj || objet.build_and_observe()
			conteneur.appendChild(objet.obj)
			objet.show()
		})
	}
}
}
Object.assign(CarteForm.prototype, TOMiniMethods)
Object.defineProperties(CarteForm.prototype, TOMiniProperties)