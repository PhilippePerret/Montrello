'use strict'

class MiniEditor {

	// 
	// = main =
	// 
	// Méthode principale appelée par un objet possédant la classe
	// 'editable'
	// 
	static edit(element, position){
		this.miniEditor || (this.miniEditor = new MiniEditor() )
		this.miniEditor.edit(element, position)
	}


edit(element, position){
	this.element = element
	this.prepare({text: element.innerHTML, position: position})	
	this.show()
}

prepare(params){
	this.value = params.text
	this.positionne(params.position)
}


positionne(pos){
	console.log("pos: ", pos)
	this.obj.style.top 	= (pos.y) + 'px'
	this.obj.style.left = (pos.x + 5) + 'px'
}

show(){
	this.obj.classList.remove('hidden')
	this.textField.focus()
	this.textField.select()
}
hide(){this.obj.classList.add('hidden')}


onKeyPressed(ev){
	if(ev.key == 'Enter') this.onClickSave(ev)
	else if (ev.key == 'Escape') this.onClickCancel(ev)
	return true
}
onKeyDown(ev){
	if (ev.key == 'Tab') this.onClickCancel(ev)
	return true
}

onClickSave(ev){
	this.element.innerHTML = this.value
	// console.log("this.element.owner = ", this.element.owner)
	// console.log("this.property = ", this.element.getAttribute('data-prop'))
	// Il faut aller plus loin = modifier la propriété dans l'objet
	this.element.owner.set({[this.element.getAttribute('data-prop')]: this.value})
	this.stopEdition()
}
onClickCancel(ev){
	this.stopEdition()
}


stopEdition(){
	this.hide()
}

get obj(){
	return this._obj || (this._obj = this.build() )
}

get value(){
	return this.textField.value
}
set value(v){
	this.textField.value = v
}
get textField(){
	return this._textfield || (this._textfield = this.obj.querySelector('input[type="text"]') )
}

build(){
	let o = document.createElement('DIV')
	o.id = 'mini-editor'
	o.class = 'hidden'
	let i = document.createElement('INPUT')
	i.type = 'text'
	o.appendChild(i)
	i.addEventListener('keypress', this.onKeyPressed.bind(this))
	i.addEventListener('keydown', this.onKeyDown.bind(this))
	let bs = document.createElement('BUTTONS')
	let bsave = document.createElement('BUTTON')
	bsave.class="btn-save"
	bsave.innerHTML = 'Enregistrer'
	bsave.addEventListener('click', this.onClickSave.bind(this))
	let bcanc = document.createElement('BUTTON')
	bcanc.class = 'btn-cancel'
	bcanc.innerHTML = 'Renoncer'
	bcanc.addEventListener('click', this.onClickCancel.bind(this))
	bs.appendChild(bcanc)
	bs.appendChild(bsave)
	o.appendChild(bs)
	document.body.appendChild(o)

	return o
}
}


