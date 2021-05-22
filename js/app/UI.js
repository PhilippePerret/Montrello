'use strict'

Object.assign(UI,{
	init(){
		Menu.init()

		// Rendre les listes du tableau sortable (généraliser ?)
		$('#listes').sortable({
				axis:'x'
			, items: '> liste'
			, activate: function(ev,ui){ui.helper.addClass('moved')}
			, deactivate: function(ev,ui){ui.item.removeClass('moved')}
		})

		// Tous les éléments textuels éditables doivent l'être
		this.setEditableIn(document)
	},


	/**
		* Méthode qui transforme tous les éléments de classe .editable
		*	en éléments dont on peut éditer le texte directement
		*/
	setEditableIn(container){
		container.querySelectorAll('.editable').forEach(element => {
			// On recherche le premier parent qui définit la classe
			// Note : la classe est "collée" à l'élément à la création de
			// l'élément. Par exemple, s'il s'agit d'une liste, l'instance
			// Liste est collée à la balise <liste> qui contient notamment
			// le titre éditable.
			let parent = element.parentNode
			while( parent && !parent.owner ) {
				parent = parent.parentNode
			}
			if (parent) element.owner = parent.owner;
			element.addEventListener('click', this.onEditEditable.bind(this, element))
		})

		container.querySelectorAll('*[data-strict-class][data-method]')
		.forEach(element => {
			const classe = eval(element.getAttribute('data-strict-class'))
			const method = element.getAttribute('data-method')
			element.owner = container.owner
			element.addEventListener('click', classe[method].bind(classe, element))
		})


		document.querySelectorAll('*[data-class]').forEach(container => {
			const classe = eval('Menu_' + container.getAttribute('data-class'))
			container.querySelectorAll('content > *[data-method]').forEach(el => {
				const method_name = el.getAttribute('data-method')
				// console.log("classe", classe)
				// console.log("methode name:", method_name)
				el.owner = container.owner
				el.addEventListener('click', classe[method_name].bind(classe, el))
			})
		})

	},

	onEditEditable(element, ev){
		MiniEditor.edit(element, {x: ev.clientX, y: ev.clientY})
	}

})

class DraggableObject {
	constructor(obj){
		this.obj = obj
	}
	onClick(){
		this.obj.classList.add('moved')
	}
}