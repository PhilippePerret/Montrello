'use strict'
class Tableau {

	static get current(){return this._current || new Tableau({type:'tableau'})}
	
	static set current(t){this._current = t}


	constructor(data){
		this.data = data || {}
	}

}
Object.assign(Tableau.prototype, TOMiniMethods)
Object.defineProperties(Tableau.prototype, TOMiniProperties)