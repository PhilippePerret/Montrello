'use strict'

class CheckListTask {

static get(item_id){ return this.items[item_id]}

/**
	* Pour créer une nouvelle tâche dans +owner+
	*/
static createFor(owner){
	const newtask = new CheckListTask({
			owner:owner
		, ow:owner.ref
		, ty:'tk'
		, id:Montrello.getNewId('task')
		, lab:"Nouvelle tâche"
	})
	newtask.build_and_observe()
	newtask.edit()
}

constructor(data){
	this.checklist 	= data.owner
	this.checked 		= false
	this._data = data /** Cf. l'explication dans CheckList */
}

// *** Propriétés ***

get data(){
	this.lab && (this._data.lab = this.lab.innerHTML)
	return this._data
}

// *** Construction et observation ***

build_and_observe(){
	this.build()
	this.observe()
}

build(){
	const o 	= document.body.querySelector('task#modele-task').cloneNode(/* deep = */ true)
	const cb 	= o.querySelector('span.checkmark')
	const lab = o.querySelector('label')
	
	const o_id 	= `task-${this.id}`
	const cb_id = `${o_id}-cb`

	o.setAttribute('data-task-id', this.id)
	o.id 	= o_id
	o.classList.remove('hidden')
	cb.id = cb_id
	lab.setAttribute('for', cb_id)
	lab.innerHTML = this._data.lab

	// On met la tâche dans la liste
	console.log("this.checklist.ul:", this.checklist.ul)
	this.checklist.ul.appendChild(o)

	// [1] Sert pour la méthode set() générale
	this.li = this.obj /* [1] */ = o
	this.btn_sup 	= o.querySelector('button.btn-sup')
	this.lab 			= lab
	this.cb 			= cb

}//build


/**
	* Pour observer la tâche
	*
	*/
observe(){
	this.cb.addEventListener('click', this.onClickCheckTask.bind(this))
	this.lab.addEventListener('click', this.onClickCheckTask.bind(this))
	this.btn_sup.addEventListener('click', this.onClickSupTask.bind(this))
	// Pour le label (éditable), il faut en plus indiquer le propriétaire
	this.lab.owner = this
}

onClickCheckTask(ev){
	if (ev.metaKey) {
		// <= 	La touche commande est appuyée
		//  =>	On doit éditer le texte
		this.edit()
	} else {
		this.checked = !this.checked
		this.cb.classList[this.checked?'add':'remove']('checked')
		this.li.classList[this.checked?'add':'remove']('checked')
	}
}

edit(){
	MiniEditor.edit(this.lab)
}

onClickSupTask(ev){
	message("Je dois détruire la tâche")
}


}//class CheckListTask
Object.assign(CheckListTask.prototype, TOMiniMethods)
Object.defineProperties(CheckListTask.prototype, TOMiniProperties)
