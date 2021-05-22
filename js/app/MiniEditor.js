'use strict'

class MiniEditor {

	// 
	// = main =
	// 
	// Méthode principale appelée par un objet possédant la classe
	// 'editable'
	// 
	static edit(element, position){
		this.miniEditor || this.buildMiniEditor()
		this.miniEditor.edit(element, position)
	}

	static buildMiniEditor(){
		this.miniEditor = new MiniEditor()
		this.miniEditor.build()
	}

edit(element, position){
	this.element = element
	this.forSpan = element.tagName != 'DIV'
	this.prepare({text: element.innerHTML, position: position})	
	this.show()
}

prepare(params){
	this.textField 	= this.obj.querySelector(this.forSpan ? 'input[type="text"]' : 'textarea')
	this.otherField = this.obj.querySelector(this.forSpan ? 'textarea' : 'input[type="text"]')
	this.textField.classList.remove('hidden')
	this.otherField.classList.add('hidden')
	this.value = params.text
	this.positionne(params.position)
}


positionne(){
	// console.log("position:", this.element.getBoundingClientRect())
	const rectE = this.element.getBoundingClientRect()
	this.obj.style.top 	= (parseInt(rectE.top) + 10) + 'px'
	this.obj.style.left = (parseInt(rectE.left) - 5) + 'px'
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
onKeyPressedTA(ev){
	if(ev.key == 'Enter' && ev.metaKey) this.onClickSave(ev)
	else if (ev.key == 'Escape') this.onClickCancel(ev)
	return true
}
onKeyDown(ev){
	if (ev.key == 'Tab') this.onClickCancel(ev)
	return true
}

onClickSave(ev){
	// this.element.innerHTML = this.value
	// console.log("this.element = ", this.element)
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

get value(){
	return this.textField.value
}
set value(v){
	this.textField.value = v
}

build(){
	let o = document.createElement('DIV')
	o.id = 'mini-editor'
	o.class = 'hidden'

	let i = document.createElement('INPUT')
	i.type = 'text'
	i.classList.add('hidden')
	o.appendChild(i)
	i.addEventListener('keypress', this.onKeyPressed.bind(this))
	i.addEventListener('keydown', this.onKeyDown.bind(this))

	let t = document.createElement('TEXTAREA')
	o.appendChild(t)
	t.classList.add('hidden')
	t.addEventListener('keypress', this.onKeyPressedTA.bind(this))
	t.addEventListener('keydown', this.onKeyDown.bind(this))		


	let bs = document.createElement('BUTTONS')
	let bsave = document.createElement('BUTTON')
	bsave.class="btn-save"
	bsave.innerHTML = 'Enregistrer'
	bsave.addEventListener('click', this.onClickSave.bind(this))
	let bcanc = document.createElement('BUTTON')
	bcanc.class = 'btn-cancel'
	bcanc.innerHTML = 'Renoncer'
	bcanc.addEventListener('click', this.onClickCancel.bind(this))
	
	bs.appendChild(bsave)
	bs.appendChild(bcanc)
	o.appendChild(bs)
	
	document.body.appendChild(o)

	this.obj = o

	return true
}
}


