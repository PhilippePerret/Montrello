'use strict'
class PickerDates {

static new(owner){
	const p = new PickerDates(owner)
	p.build_and_observe()
	return p
}

constructor(owner){
	this.owner = owner
}

/**
	* Retourne la version affichable dans la carte (ou autre)
	*/
get asHuman(){
	const complexeDate = new ComplexeDate(this.data)
	return complexeDate.asShortString
}

/**
	* Mets les dates du propriétaire dans les champs
	*/
displayDates(){
	const dates = this.owner.dates
	this.setDateFrom(dates.fr)
	this.setDateTo(dates.to)
	this.setDateDuree(dates.du)
}

build_and_observe(){
	this.build()
	this.observe()
}

build(){
	const o = DOM.clone('modeles pickerdates')
	document.body.appendChild(o)

	this.obj = o

}
observe(){
	this.btnSave.addEventListener('click', this.onClickSaveBtn.bind(this))
	this.btnClose.addEventListener('click', this.hide.bind(this))
}

/**
	* Pour enregistrer les date
	*/
onClickSaveBtn(ev){
	this.hide()
	this.owner.setDates(this.data)
}

get data(){
	return {
			fr: this.getDateFrom()
		, to: this.getDateTo()
		, du: this.getDateDuree()
	}
}

getDateFrom(){return stringOrNull(this.spanDateFrom.value)}
getDateTo(){return stringOrNull(this.spanDateTo.value)}
getDateDuree(){return stringOrNull(this.spanDateDuree.value)}

setDateFrom(v){this.spanDateFrom.value = v || ""}
setDateTo(v){this.spanDateTo.value = v || ""}
setDateDuree(v){this.spanDateDuree.value = v || ""}

get spanDateFrom(){return DGet('#date-from', this.obj)}
get spanDateTo(){return DGet('#date-to', this.obj)}
get spanDateDuree(){return DGet('#date-duree', this.obj)}

}
Object.assign(PickerDates.prototype, TOMiniMethods)
Object.defineProperties(PickerDates.prototype, TOMiniProperties)


const MOIS = [
	  {'full':'janvier', 	'short':'janv'}
	, {'full':'février', 	'short':'fév'}
	, {'full':'mars', 		'short':'mars'}
	, {'full':'avril', 		'short':'avr'}
	, {'full':'mai', 			'short':'mai'}
	, {'full':'juin',			'short':'juin'}
	, {'full':'juillet',	'short':'juil'}
	, {'full':'aout',			'short':'aout'}
	, {'full':'septembre','short':'sept'}
	, {'full':'octobre',	'short':'oct'}
	, {'full':'novembre',	'short':'nov'}
	, {'full':'décembre',	'short':'déc'}
]
class ComplexeDate {
constructor(data){
	this.data = data
}

/**
	* Retourne TRUE si la date est dépassée
	*/
isOutOfDate(){
	return this.readDateFin && (new Date() > this.readDateFin)
}


get asShortString(){
	if ( !this.from ) return ""
	var segs = ['<span class="picto">🕣</span>']
	segs.push(`du ${MDate.asHumanShort(this.dateFrom)}`)
	if ( this.realDateFin ) {
		segs.push(`au ${MDate.asHumanShort(this.realDateFin)}`)
	}
	segs = segs.join(' ')
	const color = this.isOutOfDate() ? 'bad' : 'bon'
	return `<span class="${color}">${segs}</span>`
}


get dateFrom(){
	if(!this.from) return
	return this.from.asDate
}
get dateTo(){
	if(!this.to) return
	return this.to.asDate
}
get realDateFin(){
	if ( this.dateTo ){ 
		return this.dateTo
	}	else if ( this.dateFrom && this.duree ) {
		const dureeS = dureeString2Secondes(this.duree)
		let d = new Date()
		d.setTime(this.dateFrom.getTime() + dureeS * 1000)
		return d
	}
	return 
}


get from()	{return this.data.fr && (new MDate(this.data.fr))}
get to()		{return this.data.to && (new MDate(this.data.to))}
get duree()	{this.data.du}


}// class ComplexeDate

class MDate {

static asHumanShort(date){
	const dmois = MOIS[date.getMonth()]
	return `${date.getDate()} ${dmois.short}`	
}

constructor(str){
	this.str = str
}
get asDate(){
	return this._asdate || (this._asdate = dateString2Date(this.str) )
}
get asHumanShort(){
	const dmois = MOIS[this.asDate.getMonth()]
	return `${this.asDate.getDate()} ${mois.short}`
}

}// class MDate