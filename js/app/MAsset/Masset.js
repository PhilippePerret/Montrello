'use strict'
/**
	* Masset (pour M-Asset, Asset de Montrello)
	* -----------------------------------------
	*/

const MASSET_TYPES = {
		'cmd': {name: 'Commande', picto:'🖥', command:'Exec'}
	, 'fij': {name: 'Fichier joint', picto:'📎', command:'Open'}
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
		Ajax.send('exec_masset.rb', { data:this.data })
		.then(ret => {console.log("Résultat de l'opération:", ret.resultat)})
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
	this.obj || this.build_and_observe()
	this.positionne(btn)
	this.show()
	this.contentField.value = this.content
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
			this.owner.addMasset(this)
			this.hide()		
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
	return this._contentfield || (this._contentfield = this.obj.querySelector('.masset-content'))
}

/**
	* Destruction du Masset
	*
	*/
destroy(){
	erreur("Je ne sais pas encore détruire un Masset")
	this.hide()
}

buildForEdit(){
	const o = DOM.clone('modeles massetedit')
	o.querySelector('picto.masset-picto').innerHTML = this.dataType.picto
	o.querySelector('button.masset-command').innerHTML = this.dataType.command
	o.querySelector('.masset-label').innerHTML = this.dataType.name
	document.body.appendChild(o)
	this.obj = o
	this.contentField.value = this.content
}
observeForEdit(){

}

build_and_observe(){this.build();this.observe()}
build(){
	const o = DOM.clone('modeles masset')
	o.querySelector('picto.masset-picto').innerHTML = this.dataType.picto
	o.querySelector('button.btn-exec').innerHTML = this.dataType.command
	o.querySelector('.masset-label').innerHTML = this.dataType.name
	o.querySelector('.masset-content').innerHTML = this.content
	document.body.appendChild(o)
	this.obj = o
}
observe(){
	this.obj.owner = this
	UI.setOwnerMethodsIn(this.obj, this)
	const btnSave = this.obj.querySelector('button.btn-save')
}
positionne(btn){
	const pos = btn.getBoundingClientRect()
	this.obj.style.top 	= px(pos.top)
	this.obj.style.left = px(pos.left)
}
show(){this.obj.classList.remove('hidden')}
hide(){this.obj.classList.add('hidden')}
remove(){
	this.obj.remove()
	delete this.obj
}

onClickButtonDestroy(ev){
	message("Je ne sais pas encore détruire un Masset")
}

get dataType(){return MASSET_TYPES[this.mtype]}

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