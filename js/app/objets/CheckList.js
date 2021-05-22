'use strict'
class CheckList {

/**
	* Création d'une check-list
	* (dans le formulaire de carte)
	*/
static createFor(owner){
	const clist = new CheckList(owner)
	clist.build_and_observe()
	clist.addTask()
	clist.save()
}


constructor(owner, data){
	this.owner = owner
	this._data = data || {tasks: [], id: Montrello.getNewId('checklist')}
}


// *** Données et propriétés ***

get data(){
	this._data.tasks = this.getTaskListIds()
	return this._data
}

// Retourne la liste des identifiants de tâche
getTaskListIds(){
	let idlist = []
	this.ul.querySelectorAll('li.li-task').forEach(li => {
		idlist.push(li.getAttribute('data-task-id'))
	})
	return idlist
}

// *** Construction et observation ***

build_and_observe(){
	this.build()
	this.observe()
}

/**
	*	Construction de la checklist
	*
	* C'est un élément complexe de l'interface, avec beaucoup de 
	* veilleurs d'évènements.
	*
	*/
build(){
	const o = document.createElement('DIV')
	o.classList.add('checklist-container')
	
	this.ul = document.createElement('UL')
	this.ul.classList.add('checklist')
	$(this.ul).sortable({axis:'y'})


	const btn_add  = document.createElement('BUTTON')
	btn_add.innerHTML = 'Ajouter tâche'
	btn_add.classList.add('btn-add')
	const btn_sup = document.createElement('BUTTON')
	btn_sup.classList.add('link','fright', 'btn-sup')
	btn_sup.innerHTML = 'Supprimer'
	
	const btns = document.createElement('BUTTONS')
	btns.appendChild(btn_sup)
	btns.appendChild(btn_add)

	o.appendChild(this.ul)
	o.appendChild(btns)

	this.owner.obj.querySelector('div#carte-taches-div > content').appendChild(o)
	
	this.obj = o
	this.btn_add = btn_add
	this.btn_sup = btn_sup

}

/**
	* Place les observeur d'évènement (de click principalement)
	*
	*/
observe(){
	// 
	// Bouton pour ajouter une tâche
	// 
	this.btn_add.addEventListener('click', this.onClickAddTask.bind(this))

	// 
	// Bouton pour supprimer la liste
	// 
	this.btn_sup.addEventListener('click', this.onClickRemoveList.bind(this))
}

onClickAddTask(ev){
	this.addTask()
}

onClickRemoveList(ev){
	message("Je dois détruire la liste de tâche")
}

/**
	* Pour ajouter une tâche à la liste
	*/
addTask(){
	const task = new CheckListTask(this)
	task.build_and_observe()
	task.edit()
}


}
Object.assign(CheckList.prototype, TOMiniMethods)
Object.defineProperties(CheckList.prototype, TOMiniProperties)


class CheckListTask {
constructor(checklist, data){
	this.checklist 	= checklist
	this.checked 		= false
	this._data = data || {id: Montrello.getNewId('task'), lab: null, chk: false}
}

// *** Propriétés ***

get data(){
	this._data.lab = this.lab && this.lab.innerHTML // pas défini à la construction
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
	lab.innerHTML = this.data.lab || "Une nouvelle tâche à définir"

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
