'use strict'
class FeedableMenu {

static get(menu_id){return this.items[menu_id]}

static build(element){
	const m = new FeedableMenu(element)
	m.prepare()
	if (!this.items)this.items = {}
	Object.assign(this.items, {[element.id]: m})
}

/**
	* +element+ 	Span principal devant tout contenir
	*/
constructor(element){
	this.element 	= element
	this.owner 		= eval(element.getAttribute('data-class'))
}

// Ouvre et ferme le menu
toggle(){
	this.element.classList.toggle('closed')
	this.element.classList.toggle('opened')
}

/**
	* Ajoute un item
	* (par exemple un titre à une liste de titres)
	*/
add(item){
	const cr = item.constructor
	// console.log("ajout d'un item au feedable menu (item, owner =)", item, cr)
	cr.items || (cr.items = {})
	Object.assign(cr.items, {[item.id]: item})
	this.ul.appendChild((new FeedableMenuItem(this, item)).obj)
}

prepare(){
	if ( !this.owner.items || Object.keys(this.owner.items).length == 0) {
		// return console.log("Pas d'items, je ne peux pas prépare le menu feedable de %s", this.owner.name)
		return
	}
	this.ul = document.createElement('UL')
	this.ul.style.zIndex = 2000
	this.ul.classList.add('feeded-menu')
	for(var item_id in this.owner.items){
		const menuItem = new FeedableMenuItem(this, this.owner.items[item_id])
		this.ul.appendChild(menuItem.obj)
	}
	this.element.classList.add('closed')
	this.element.querySelector('content').appendChild(this.ul)
	this.element.addEventListener('click', this.toggle.bind(this))
}


}//class FeedableMenu

class FeedableMenuItem {
constructor(menu, item){
	this.menu 	= menu
	this.owner 	= item // L'instance de l'élément, par exemple un tableau
}

get obj(){return this._obj || (this._obj = this.build() )}

build(){
	const o = document.createElement('LI')
	o.setAttribute('data-owner-ref', this.owner.ref)
	o.innerHTML = this.owner.titre
	o.addEventListener('click', this.onClick.bind(this))
	this._obj = o
	return o
}

onClick(ev){
	// console.log("Je dois activer = ", this.owner, this.menu.owner)
	this.menu.owner.onChooseItem(this.owner)
}

}// class FeedableMenuItem