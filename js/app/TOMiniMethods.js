'use strict'
/**
	* Méthodes minimales pour absolument tout objet Montrello
	*/
let TOMiniMethods = {

	save(params){

		if (undefined == this.data) this.data = {}

		//
		// Le constructeur de l'objet
		// 
		this.data.cr || (this.data.cr = this.constructor.name)

		// 
		// Le 'constname', le constructeur en minuscule => type
		// 
		this.data.ty || (this.data.ty = this.constname)

		// 
		// Si l'identifiant n'est pas défini
		this.data.id ||= (this.data.id = Montrello.getNewId(this.data.type))

		// 
		// Certains valeurs sont à retirer
		const data4save = {}
		Object.assign(data4save, this.data)
		delete data4save.owner

		// console.log("Data à sauvegarder : ", data4save)

		Ajax.send('save.rb', {data: data4save}).then(ret => {
			// console.log("Retour d'ajax : ", ret)
			if (ret.erreur) erreur(ret.erreur)
			else {
				// console.log("Données sauvegardées :", data4save)
				message("Donnée sauvegardée avec succès.")
			}
		})
	},

	set(hdata){
		Object.assign(this.data, hdata)
		// Si c'est un champ autoéditable
		for (var k in hdata) {
			var v = hdata[k]
			let o = this.obj.querySelector(`*[data-prop="${k}"]`)
			o && (o.innerHTML = v)
		}
		this.save()
		if (this.afterSet) this.afterSet(hdata)
	},

	/**
		* La fonction générique qui met le titre en édition avec le
		* mini-éditeur (par exemple à la création de l'élément)
		*/
	editTitle(){
		MiniEditor.edit(this.obj.querySelector('title.editable'))
	},

	/**
		* Méthode qui règle dans la carte les propriétés communes, par
		* exemple le titre ou l'identifiant.
		*/
	setCommonDisplayedProperties(){
		this.commonDisplayedProperties.forEach(prop => {
			const o = this.obj.querySelector(`*[data-prop="${prop}"]`)
			o && (o.innerHTML = this.titre)
		})
	},

	getOwner(){
		if ( this.data.ow ) {
			const [type, id] = this.data.ow.split('-')
			return Montrello.type2class(type).get(id)
		} else if (this.constructor.ownerClass){
			const owner = this.constructor.ownerClass.get(this.owner_id)
			console.log("owner trouvé :", owner)
			return owner
		} else {
			console.log("ownerClass n'est pas définit pour %s", this.constructor.name)
		}
	}
}

const TOMiniProperties = {

	commonDisplayedProperties:{
		enumerable: true,
		get(){return['id','ty', 'ti','ct','dsc']}
	},

	domId:{
		enumerable: true,
		get(){return this._domid || (this._domid = `${this.constname}-${this.id}`)}
	},

	ty:{
		enumerable: true,
		get(){return this.data.ty}
	},

	constname:{
		enumerable: true,
		get(){return this.constructor.name.toLowerCase()}
	},

	id: {
		enumerable: true,
		get(){return this.data.id},
		set(v){this.data.id = v}
	},

	titre:{
		enumerable: true,
		get(){return this.data.ti},
		set(v){this.data.ti = v}
	},
	ti:{ // alias de titre, pour l'enregistrement
		enumerable: true,
		get(){return this.data.ti},
		set(v){this.data.ti = v}
	},

	owner:{
		enumerable:true,
		get(){return this._owner || (this._owner = this.data.owner || this.getOwner())},
		set(v){this._owner = v}
	},

	owner_id:{
		enumerable: true,
		get(){return this.data.owner_id},
		set(v){this.data.owner_id = v}
	},

	description:{
		enumerable:true,
		get(){return this.data.dsc},
		set(v){this.data.dsc = v}
	},

	dsc:{ // alias de description
		enumerable:true,
		get(){return this.data.dsc},
		set(v){this.data.dsc = v}
	},

	container:{
		enumerable:true,
		get(){return this._container || (this.container = this.ct && document.querySelector(this.ct))},
		set(v){this._container = v}
	},
	ct:{ // Selector du container
		enumerable:true,
		get(){return this.data.ct},
		set(v){ this.data.ct = v }
	} 
	

}