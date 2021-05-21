'use strict'

const Montrello = {
getNewId:function(type){
	this.lastIds || (this.lastIds = {})
	this.lastIds[type] || Object.assign(this.lastIds, {[type]: 0})
	++ this.lastIds[type]
	return this.lastIds[type]
},

init:function(){
	this.resetProps()
	return Ajax.send('load.rb',{type:'liste'})
	.then(this.dispatch.bind(this))
	.then(Ajax.send.bind(Ajax,'load.rb',{type:'carte'}))	
	.then(this.dispatch.bind(this))
	.then(ret => {
		console.log("This.lastIds", this.lastIds)
	})
},

resetProps(){
	this.lastIds = {}
},

dispatch(ret){
	if(ret.data.length == 0) return
	const my 		= this
	const data 	= ret.data
	const type 	= ret.type
	Object.assign(my.lastIds, {[type]: 0})
	const Classe = eval(data[0].constructeur)
	data.forEach(hdata => {
		// console.log("Construction de l'objet %s: ", hdata.type, hdata)
		if (my.lastIds[type] < hdata.id) my.lastIds[type] = Number(hdata.id)
		new Classe(hdata).build()
	})
	// console.log("Je dois dispatcher les données de type %s: ", ret.type, ret.data)	
}

}