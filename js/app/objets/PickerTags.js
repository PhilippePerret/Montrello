'use strict'
/**
	class PickerTags
	----------------
	Pour l'édition des tags

	Il existe deux sortes de tags : 
		1. 	Les "étiquettes" normales, qu'on peut définir pour ce qu'on 
				veut
		2. 	Les tags qui permettent de déterminer où en est l'élément dans
				son développement (pour le moment, les cartes et les listes)
*/
const DATA_TAGGER = {
	colors:{
			'1': {colorId:1, color: '#880000', 	name:''}
		, '2': {colorId:2, color: 'orange', 	name:''}
		, '3': {colorId:3, color: 'yellow', 	name:''}		
	}

}
class PickerTags {

	/**
		* Le picker de couleur pour choisir les étiquettes de la carte
		*/
	static get tagger(){
		return this._tagger || (this._tagger = (new PickerTags(DATA_TAGGER)).build_and_observe() )
	}

constructor(data){
	this.data = data
}

build_and_observe(){
	this.build()
	this.observe()
	return this
}
build(){
	const o = DOM.clone('modeles pickertags')
	o.classList.remove('hidden')
	const ocontent = o.querySelector('content')

	// Construction des blocks de couleur
	Object.values(this.data.colors).forEach(dcolor => {
		const p = DOM.clone('modeles pickertag')
		p.setAttribute('data-color-id', dcolor.colorId)
		p.addEventListener('click', this.onClickOnColor.bind(this,p))
		const spanBlock = p.querySelector('span.color-block')
		spanBlock.style.backgroundColor = dcolor.color
		const spanName  = spanBlock.querySelector('span.color-name')
		spanName.innerHTML = dcolor.name
		ocontent.appendChild(p)
	})

}
observe(){

}

onClickOnColor(pickertag, ev){
	console.log("Bloc couleur cliqué:", pickertag)
}

}
Object.assign(PickerTags.prototype, TOMiniMethods)
Object.defineProperties(PickerTags.prototype, TOMiniProperties)