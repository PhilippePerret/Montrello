'use strict'


const Montrello = {

type2class:function(type){
	this.types2class = this.types2class || {
			'tb': Tableau
		, 'li': Liste
		, 'ca': Carte
		, 'cl': CheckList
		, 'ta': CheckListTask
	}
	return this.types2class[type]
},

/**
	* Retourne un nouvel identifiant pour le type +type+
	*/
getNewId:function(type){
	this.lastIds || (this.lastIds = {})
	this.lastIds[type] || Object.assign(this.lastIds, {[type]: 0})
	++ this.lastIds[type]
	return this.lastIds[type]
},

/**
	* Initialisation de Montrello
	*
	* On charge toutes les données et on les dispatch
	*
	*/
init:function(){
	this.resetProps()

	return Ajax.send('load.rb',{type:'config'})
	.then(this.dispatch.bind(this, 'config'))
	.then(Ajax.send.bind(Ajax,'load.rb',{type:'tb' /* Tableau */}))
	.then(this.dispatch.bind(this, 'tb'))
	.then(Ajax.send.bind(Ajax,'load.rb',{type:'li' /* liste */ }))
	.then(this.dispatch.bind(this, 'li'))
	.then(Ajax.send.bind(Ajax,'load.rb',{type:'ca' /* carte */}))	
	.then(this.dispatch.bind(this, 'ca'))
	.then(ret => {console.log("This.lastIds", this.lastIds)})
	.catch(console.error)
},

resetProps(){
	this.lastIds = {}
},

dispatch(type, ret){
	// console.log("type = %s, ret = ", type, ret)
	return new Promise((ok,ko) => {
		if ( !ret ){ ok() }
		else {
			if ( ret.type == 'config' ) {
				this.dispatch_config(ret.data)
			} else {
				if(ret.data.length == 0) return
				this.dispatch_data(ret.data, ret.type)
			}
			ok()
		}
	})
},

dispatch_config(data){
	const my = this
	this.config = data
},

setConfig(hdata){
	Object.assign(this.config, hdata)
	Ajax.send('save.rb', {data: this.config})
	.catch(console.error)
},


dispatch_data(data, type){
	console.log("type = %s", type, data)
	const my = this
	Object.assign(my.lastIds, {[type]: 0})
	const Classe = eval(data[0].cr)
	Classe.items = {}
	data.forEach(hdata => {
		// console.log("Construction de l'objet %s: ", hdata.type, hdata)
		if (my.lastIds[type] < hdata.id) my.lastIds[type] = Number(hdata.id)
		const item = new Classe(hdata)
		Object.assign(Classe.items, {[hdata.id]: item})
		if (type != 'tb') item.build()
	})
	// 
	// Quelques cas particuliers
	// 
	if (type == 'tb' /* tableau */) {
		console.log("Chargement des tableaux, j'essaie de mettre le courant")
		if ( this.config.current_pannel_id ){
			Tableau.current = Tableau.get(this.config.current_pannel_id)
		} else {
			// Si aucun tableau courant n'est défini, il faut en créer un
			Tableau.current = new Tableau({ty:'tb',ti:"Nouveau tableau", id:Montrello.getNewId('tb')})
		}
		// On construit la base de tous les tableaux (sur lesquels les
		// listes seront posées)
		Object.values(Tableau.items).forEach(tablo => tablo.build())
		// Maintenant que les tableaux sont chargés, on peut actualiser
		// le menu des tableaux dans l'header
		Tableau.updateFeedableMenu()
	}
}

}//Montrello