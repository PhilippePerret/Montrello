'use strict'
class Tableau {

static get(item_id){ return this.items[item_id]}

static get current(){
	return this._current
}

static set current(t){
	if ( this._current ) this._current.hide()
	this._current = t
	Montrello.setConfig({current_pannel_id: t.id})
	t.prepare()
}

// Actualise la liste des tableaux
static updateFeedableMenu(){
	const fmenu = FeedableMenu.get('menu-tableaux')
	fmenu.prepare()
}
// (pour la feedable menu)
static onChooseItem(item){
	console.log("Je dois afficher le tableau ", item)
	this.current = item
}

constructor(data){
	this.data = data
}

afterSet(hdata){
	if (hdata.ti) this.spanName.innerHTML = this.titre
}

prepare(){
	this.spanName.innerHTML = this.titre
	this.spanName.owner = this
	this.obj || this.build()
	this.show()
}

get spanName(){
	return this._spanName || (this._spanName = document.body.querySelector('span.pannel_name'))
}


get ref(){return `${this.ty}-${this.id}`}

show(){ this.obj.classList.remove('hidden')}
hide(){ this.obj.classList.add('hidden')}

/**
	* Construction du tableau
	*/
build(){
	this.obj = document.body.querySelector('tableau').cloneNode(/* deep = */ true)
	this.obj.id = `tableau-${this.id}`
	document.body.appendChild(this.obj)
	this.obj.owner = this
	UI.setEditableIn(this.obj)
}


}
Object.assign(Tableau.prototype, TOMiniMethods)
Object.defineProperties(Tableau.prototype, TOMiniProperties)