'use strict'

const Montrello = {
	getNewId:function(type){
		this.lastIds || (this.lastIds = {})
		this.lastIds[type] || Object.assign(this.lastIds, {[type]: 0})
		++ this.lastIds[type]
		return this.lastIds[type]
	}
}