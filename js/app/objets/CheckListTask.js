'use strict'

class CheckListTask {

static get(item_id){ return this.items[item_id]}

/**
	* Pour créer une nouvelle tâche dans +owner+
	*/
static createFor(owner){
	const newtask = new CheckListTask({owner:owner, ow:owner.ref, ty:'tk', id:Montrello.getNewId('task'), lab:"Nouvelle tâche"})
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
	this._data.lab = this.lab.innerHTML
	return this._data
}

// *** Construction et observation ***

build_and_observe(){
	this.build()
	this.observe()
}

build(){
	const li = document.createElement('LI')
	li.classList.add('li-task')
	li.setAttribute('data-task-id', this.id)
	const cb = document.createElement('SPAN')
	cb.classList.add('checkmark')
	const cb_id = `task-${this.id}`
	cb.id 	= cb_id
	const lab = document.createElement('LABEL')
	lab.classList.add('task')
	lab.setAttribute('for', cb_id)
	lab.setAttribute('title', "CMD + Clic pour modifier")
	lab.setAttribute('data-prop', 'label')
	lab.innerHTML = this._data.lab

	// Les boutons cachés
	const btns = document.createElement('BUTTONS')
	btns.classList.add('fright')
	const btn_sup = document.createElement('BUTTON')
	btn_sup.classList.add('btn-sup', 'text')
	btn_sup.innerHTML = '✖︎'

	btns.appendChild(btn_sup)

	li.appendChild(btns)
	li.appendChild(cb)
	li.appendChild(lab)

	this.checklist.ul.appendChild(li)

	// [1] Sert pour la méthode set() générale
	this.li = this.obj /* [1] */ = li
	this.btn_sup = btn_sup
	this.lab 	= lab
	this.cb 	= cb

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