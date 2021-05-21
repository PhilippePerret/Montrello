'use strict'
class	Menu {
	/**
		Dans cette instanciation, on applique la méthode à tous les menus
		qu'on peut trouver
	*/
	static init(){
		document.querySelectorAll('*[data-class]').forEach(container => {
			const classe = eval('Menu_' + container.getAttribute('data-class'))
			container.querySelectorAll('content > *[data-method]').forEach(el => {
				const method_name = el.getAttribute('data-method')
				// console.log("classe", classe)
				// console.log("methode name:", method_name)
				el.addEventListener('click', classe[method_name].bind(classe))
			})
		})
	}
}