# Montrello<br />Manuel développement



Un nouveau principe consiste à tout définir dans le HTML et que le maximum de choses se passe automatiquement, presque par magie.

## Construction

### Menus

Par exemple, pour faire un menu :

~~~html
<menu data-class="MaClasse">
	<content>
    <li data-method="maMethode1">Le menu qui appellera Menu_MaClasse#maMethode1</li>
    <li data-method="methode2">Le menu qui appellera Menu_MaClasse#methode2</li>
  </content>	
</menu>
~~~

Le code se comprend tout seul. Il suffit, en javascript, de définir alors :

~~~javascript
class Menu_MaClasse {
  static maMethode1(){ /* ... */ }
  static method2(){ /* ... */ }
}
~~~

### Boutons

On peut obtenir la même chose avec des boutons :

~~~html
<liste_actions data-class="MonTruc">
	<content>
    <button data-method="lamethodecauet">Jouer Menu_MonTruc#lamethodecauet</button>
    <button data-method="lamethodephil">Jouer Menu_MonTruc#lamethodephil</button>
  </content>
</liste_actions>
~~~

> Noter que la balise 'liste_actions' ci-dessus pourrait s’appeler comme on veut.



### Champs éditables

Pour éditer simplement un champ, souvent, on le clique, il se met en édition et la propriété de l’objet est changée. 

Cela fonctionne de cette manière :

Dans le HTML :

~~~html
<liste id="une_liste" class="">
	<header>
    <title class="editable" data-prop="titre">Titre de la liste</title>
  </header>
</liste>
~~~

Avec ce code (ci-dessus), de façon automatique, la balise `title` se met en édition (mini-éditeur) et quand on la change, c’est le titre de la liste concerné qui est changé.

Cela est rendu possible de cette manière suivante.

* Quand on crée la carte de la liste (le code ci-dessous), on associe l’instance `Liste` qui crée cette carte (`Liste#build`) à l’objet DOM par le biais de la propriété `owner`. L’instance `Liste` est propriétaire (`owner`) de la carte.
* Ce propriétaire (l’instance `Liste`) est également mis en propriétaire de tous les éléments `.editable` de la carte.
* Quand on édite le `title`, on lit la propriété concernée, qui se trouve dans `data-prop` et on la modifie dans la liste concernée.



#### Modification des valeurs affichées

Normalement, les valeurs sont automatiquement corrigées. Mais, lorsque la balise affichant la valeur se trouve hors de l’objet du propriétaire, comme c’est le cas par exemple avec le titre du tableau et le tableau, la valeur affichée n’est pas corrigée. Dans ce cas, on peut ajouter au propriétaire une méthode `afterSet(data)` qui sera appelée après la méthode générique `set(data)` avec les mêmes arguments.

Les valeurs affichées pourront être corrigées dans cette méthode où qu’elles se trouvent.



## Enregistrement des données

Le principe est de faire encore un truc générique qui puisse permettre le modulaire.

Le module `TOMiniMethods.js` contient toutes les méthodes utilises et base et notamment la méthode `save` qui va utiliser le script ajax `save.rb` pour sauver tous les types de données.

Rappel : pour le moment, on envoie le seul élément à sauvegarder, il est sauvegardé dans un fichier `YAML` qui ne contient que lui. Au chargement, tous ces fichiers `YAML` sont rassemblés en une seule grosse donnée.

Concrètement, par exemple avec les `Liste`.





## Tests

Les tests de l’application se font avec `InsideTests`.

### Méthodes généralistes utiles

**`await App.isReady([après nombre secondes])`**

Pour attendre que l’application soit prête, principalement au lancement. Si on a besoin de faire attendre, on joue avec `App._isUpAndRunning` qu’on met à `true` ou `false`.

Exemple de code :

~~~javascript
Test.new("Mon test d'attente de l'application", async function(){
  
  // Méthode qui va mettre App._isUpAndRunning à false
  ma_methode_qui_va_faire_attendre()
  
  // On lance une méthode asynchrone qui produit un gros
  // travail et qui, à la fin, met App._isUpAndRunning à true
  mon_gros_travail()
  
  // On attend la fin de mon_gros_travail(), on lui laisse seulement
  // 10 secondes (30 par défaut)
  await App.isReady(10)
  
  // Si le gros travail a été effectué dans les temps
  return true
})
~~~

