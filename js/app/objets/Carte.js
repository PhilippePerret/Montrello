'use strict'
class Carte {

// 
// Pour ajouter une carte à la liste
// 
static add(){
	message("Je dois ajouter une carte")
}

}// class Carte
Object.assign(Carte.prototype, TOMiniMethods)
Object.defineProperties(Carte.prototype, TOMiniProperties)