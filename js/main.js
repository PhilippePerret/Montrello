'use strict';

$(document).ready(function(){
	UI.insert("header", "body")
  .then(UI.insert.bind(UI,'footer', 'body'))
  .then(UI.insert.bind(UI,'tableau', 'body'))
  .then(UI.insert.bind(UI, "carte_form", "body"))
  .then(UI.insert.bind(UI, "modele_liste", "body"))
  .then(UI.init.bind(UI))
  .then(Montrello.init.bind(Montrello))
  .catch(console.error.bind(console))
  

})
