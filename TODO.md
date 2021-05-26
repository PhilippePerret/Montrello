# ToDO LIST

* Si une commande est un fichier, on l'exécute (il doit être exécutable)

* Poursuivre l'implémentation des Massets
	- distinction entre build et buildForEdit
	- tester les autres (fichier joint, dossier, commande)
	- des boutons pour définir les dates, les étiquettes, etc. des massets (voir comment les afficher ensuite)

* [BUG] Quand on crée une tâche (autres éléments aussi ?) il faut l'ajouter aux items de son constructor.

* Réserver les trois premières couleurs pour l'avancée
	- rouge 	: en cours
	- vert  	: accompli
	- orange 	: prochainement

* Il faut toujours enregistrer le 'ow' d'un élément, la référence à son propriétaire
	* supprimer tous les appels à ownerise
	* ajouter la méthode 'owner' qui doit retourner le propriétaire d'après 'ow'

* Implémenter les `MAsset`. Ce sont comme les unités de base
	- un type (commande, pièce jointe, dossier, lien internet, etc.)
	- un membre (celui qui les possède — `Member`)
	- un content (suivant le type, sera interprété différemment)
	- une date complexe `ComplexeDate`
	- des massets (`MAssets`, `MAsset`)
	- des étiquettes (`MTags`, `MTag`)
	- une liste de tâches (`CheckList`)
	- 
