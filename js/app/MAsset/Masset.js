'use strict'
/**
	* Masset (pour M-Asset, Asset de Montrello)
	* -----------------------------------------
	*/

const MASSET_TYPES = {
		'cmd': {name: 'Commande', picto:'🖥', command:'Exec'}
	, 'flj': {name: 'Fichier joint', picto:'📎', command:'Open'}
	, 'fld': {name: 'Dossier', picto:'📦', command:'Open'}
	, 'url': {name: 'URL', picto:'🌏', command: 'Go'}
}

class Masset {

static get(ma_id){ return this.items[ma_id] }

/**
	* Création d'un nouveau Masset de type +mtype+ pour +owner+
	*
	* +btn+ Le bouton qui a déclenché la méthode (pour la position)
	*/
static create(mtype, owner, btn){
	// console.log("Je dois créer un masset de mtype %s pour", mtype, owner)
	const masset = new Masset({ty:'ma', mty: mtype}, owner)
	masset.edit(btn)
}

constructor(data, owner){
	this.data = data
	owner && (this.owner = owner)
	console.log("this.owner = ", this.owner)
}

/**
	* Exécution du masset en fonction de son mtype
	*
	* SI c'est une commande, il faut l'exécuter avec les backstcks
	* Si c'est un lien, il faut l'ouvrir dans le navigateur
	* Si c'est un fichier, il faut l'ouvrir dans son application
	* Si c'est un dossier, il faut l'ouvrir dans le finder
	* etc.
	*/
exec(ev){
	if ( this.mtype == 'url') { this.execAsUrl() }
	else {
		message("Exécution de l'opération, merci de patienter…")
		Ajax.send('exec_masset.rb', { data:this.data })
		.then(ret => {
			console.log("Résultat de l'opération:", ret.resultat)
			message("Opération exécutée avec succès, merci.", {keep: false})
		})
		.catch(ret => {console.error(ret); return erreur("Une erreur est survenue (consulter l'inspecteur)")})
	}
}

/**
	* Ouvrir le Masset
	*
	* Alias de l'édition
	*/
open(btn){
	this.edit(btn)
}

// Lorsque c'est une URL, il faut l'ouvrir dans une autre fenêtre
execAsUrl(){
	window.open(this.content,"fenetre-montrello")
}

/**
	* Édition du Masset
	*
	*/
edit(btn){
	btn && btn.owner && (this.owner = btn.owner)
	this.objEdit || this.buildAndObserveForEdit()
	this.positionne(btn)
	this.showEdit()
	this.contentField.focus()
	this.contentField.select()
}

/**
	* Enregistrement du Masset
	* 
	*/
save(){
	this.contentField.style.backgroundColor = ''
	const content = stringOrNull(this.contentField.value)
	if ( content ) {
		this.data.co = content
		this.data.ow = this.owner.ref
		this.id || (this.data.id = Montrello.getNewId('ma'))
		Ajax.send('save.rb', {data: this.data}).then(ret => {
			/** Soit le masset n'existe pas encore et il faut 
				* l'ajouter au propriétaire, soit il existe et il faut
				* actualiser son affichage. On le sait par exemple en 
				* le cherchant dans le DOM
				*/
			const omasset = DGet(`masset#${this.domId}`)
			if ( omasset ) {
				omasset.querySelector('label.masset-content').innerHTML = this.formatedContent
			} else {
				this.owner.addMasset(this)
				this.build_and_observe()
			}
			this.hideEdit()		
		}).catch(ret => {
			erreur("Une erreur est survenue (consulter l'inspecteur)")
			console.error(ret)
		})
	} else {
		erreur("Il faut absolument définir la valeur.")
		this.contentField.focus()
		this.contentField.style.backgroundColor = '#FFCCCC'
	}
}
get contentField(){
	return this._contentfield || (this._contentfield = DGet('input.masset-content', this.objEdit))
}
get spanField(){
	return this._spanfield || (this._spanfield = DGet('label.masset-content', this.obj))
}

/**
	* Destruction du Masset
	*
	*/
destroy(){
	erreur("Je ne sais pas encore détruire un Masset")
	this.hide()
}

buildAndObserveForEdit(){
	this.buildForEdit()
	this.observeForEdit()
}
buildForEdit(){
	const o = DOM.clone('modeles massetedit')
	this.objEdit = o
	document.body.appendChild(o)
	o.querySelector('picto.masset-picto').innerHTML = this.dataType.picto
	o.querySelector('.masset-label').innerHTML = this.dataType.name
	if (this.data.co) this.contentField.value = this.data.co
}
observeForEdit(){
	this.objEdit.owner = this
	UI.setOwnerMethodsIn(this.objEdit, this)
	const btnSave = this.objEdit.querySelector('button.btn-save')
}

build_and_observe(){this.build();this.observe()}
build(){
	const o = DOM.clone('modeles masset')
	o.id = this.domId
	this.obj = o

	// On essaie de trouver le conteneur
	// this.obj.querySelector()
	let conteneur
	if ( this.owner ) {
		console.log("owner.obj", this.owner.obj)
		conteneur = DGet('content[data-type-objet="ma"]', this.owner.obj)
	} else {
		conteneur = document.body
	}
	conteneur.appendChild(o)
	o.querySelector('picto.masset-picto').innerHTML = this.dataType.picto
	o.querySelector('button.btn-exec').innerHTML = this.dataType.command
	// Le contenu affiché
	this.spanField.innerHTML = this.formatedContent
}
observe(){
	this.obj.owner = this
	UI.setOwnerMethodsIn(this.obj, this)
	DGet('button.btn-edit', this.obj).owner = this.owner
}
positionne(btn){
	const pos = btn.getBoundingClientRect()
	this.objEdit.style.top 	= px(pos.top)
	this.objEdit.style.left = px(pos.left)
}

// Retourne le contenu formaté pour l'affichage
get formatedContent(){
	let c = this.content
	let clen = c.length
	if ( clen > 60) {c = c.substring(0,28) + '…' + c.substring(clen - 30, clen)}
	return c
}

show(){this.obj.classList.remove('hidden')}
hide(){this.obj.classList.add('hidden')}
remove(){
	this.obj.remove()
	delete this.obj
}
showEdit(){this.objEdit.classList.remove('hidden')}
hideEdit(){this.objEdit.classList.add('hidden')}

onClickButtonDestroy(ev){
	message("Je ne sais pas encore détruire un Masset")
}

get dataType(){return MASSET_TYPES[this.mtype]}

get domId(){return this._domid || (this._domid = `ma-${this.id}`)}

get id(){					return this.data.id }
get type(){				return this.data.ty }
get mtype(){			return this.data.mty }
get dates(){			return this.data.da && ComplexeDate.new(this.data.da)}
get tags(){				return this.data.ta && MTags.new(this.data.tg)}
get content(){		return this.data.co }
get massets(){		return this.data.ma && Massets.new(this.data.ma)}
get membre(){			return this.data.me && Member.get(this.data.me)}
get checklist(){	return this.data.cl && Checklist.get(this.data.cl)}
get state(){			return this.data.st }

}