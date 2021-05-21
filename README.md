# Montrello

L'idée de ce site est de faire une version personnalisée d'une station de travail à la façon de l'application Trello.

## RÉFLEXION SUR LES ENTITÉS

Note : pour changer, je vais essayer d'aller du plus petit (la carte) au plus gros (l'application ou le tableau)

* **carte**. C'est une carte, qui peut être une tâche, une liste de tâche, etc.
* **tableau**. C'est pour la gestion d'un tableau

### CLASSES ABSTRAITES

Bien définir les classes abstraites qui doivent être utilisées par de nombreuses autres classes

Par exemple, une classe abstraite doit :

* avoir une propriété 'tag' qui est son étiquette, avec toute la gestion qui va avec
* avoir une propriété 'start_at' qui est sa date de démarrage
* avoir une propriété 'end_at' qui est sa date de fin attendue
* avoir des propriétés 'attachements' qui sont des pièces jointes
* avoir des propriétés 'links' qui sont des liens associés