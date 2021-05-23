'use strict'
class CheckList {

static get(item_id){ return this.items[item_id]}

/**
	* Création d'une check-list
	* (dans le formulaire de carte)
	*/
static createFor(owner){
	const clist = new CheckList({ow:owner.ref, owner:owner, ty:'cl', id:Montrello.getNewId('cl')})
	clist.build_and_observe()
	clist.createTask()
	clist.save()
}


constructor(data){
	this._data = data /** Quand une donnée doit être modifiée dans les
											* données avant enregistrement, comme ici la
											* liste des tâches, on passe par cette formule
											* au lieu de this.data = data et on crée la
											* méthode get data(){...} qui retournera _data
											* modifié
											*/
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
	this.createTask()
}

onClickRemoveList(ev){
	message("Je dois détruire la liste de tâche")
}

/**
	* Pour ajouter une tâche à la liste
	*/
createTask(){
	CheckListTask.createFor(this)
}


}
Object.assign(CheckList.prototype, TOMiniMethods)
Object.defineProperties(CheckList.prototype, TOMiniProperties)