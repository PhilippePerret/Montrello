'use strict'
/**
	* Méthodes minimales pour absolument tout objet Montrello
	*/
let TOMiniMethods = {

	save(params){

		this.data = this.data || {}

		//
		// Le constructeur de l'objet
		// 
		this.data.constructeur || (this.data.constructeur = this.constructor.name)

		// 
		// Le 'constname', le constructeur en minuscule => type
		// 
		this.data.type || (this.data.type = this.constname)

		// 
		// Si l'identifiant n'est pas défini
		this.data.id ||= (this.data.id = Montrello.getNewId(this.data.type))

		
		Ajax.send('save.rb', {data: this.data}).then(ret => {
			console.log("Retour d'ajax : ", ret)
			if (ret.erreur) erreur(ret.erreur)
			else {
				console.log("Données sauvegardées :", this.data)
				message("Donnée sauvegardée avec succès.")
			}
		})
	},

	set(hdata){
		Object.assign(this.data, hdata)
		this.save()
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
	}
}

const TOMiniProperties = {

	commonDisplayedProperties:{
		enumerable: true,
		get(){return['id','titre','container']}
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
		get(){return this.data.titre},
		set(v){this.data.titre = v}
	},


	container:{
		enumerable:true,
		get(){return this._container || (this.container = this.data.ct && document.querySelector(this.data.ct))},
		set(v){this._container = v}
	}
	

}