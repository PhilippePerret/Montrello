'use strict'
/**
	* Méthodes minimales pour absolument tout objet Montrello
	*/
let TOMiniMethods = {

	save(params){
		message("Je dois sauver l'objet " + this.constructor.name )

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

		// 
		// Transformations nécessaires
		// 
		if ( this.container ) this.data.ct = this.container.id
		
		console.log("Données à sauver", this.data)

		Ajax.send('save.rb', {data: this.data}).then(ret => {
			console.log("Retour d'ajax : ", ret)
			if (ret.erreur) erreur(ret.erreur)
			else message("Donnée sauvegardée avec succès.")
		})
	},

	set(hdata){
		Object.assign(this.data, hdata)
		this.save()
	}
}

const TOMiniProperties = {
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


	container:{
		enumerable:true,
		get(){return this._container || (this.container = this.data.ct && document.querySelector(this.data.ct))},
		set(v){this._container = v}
	}
	

}