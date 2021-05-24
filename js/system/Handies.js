'use strict';
/** ---------------------------------------------------------------------

  MÉTHODES PRATIQUES
  ------------------
  Version 1.2.0

# 1.2.0
  Ajout de la méthode focusIn. Qui permet de focusser dans un élément
  en triggant un évènement focus.

# 1.1.1
  Amélioration de stopEvent pour désactiver encore plus de choses

# 1.1.0
  Modification de la méthode with_pixels -> px
  + Elle peut recevoir maintenant, dans les objets, des valeurs qui ont
    déjà leur unité et ne seront pas transformées. Pour ne pas avoir à
    compliquer la définition de l'attribut style lorsqu'il y a d'autres
    valeurs comme des zooms, des polices, etc.
# 1.0.2
  Ajout de la méthode 'px'
*** --------------------------------------------------------------------- */

// Pour focus dans un élément en triggant un évènement focus
// Mais bon… ça ne semble pas marcher…
function focusIn(element) {
  // var eventType = "onfocusin" in element ? "focusin" : "focus",
  //   , bubbles = "onfocusin" in element,
  //   , event;
  var eventType = 'focus'
    , bubbles = false
    , event

  if ("createEvent" in document) {
    event = document.createEvent("Event");
    event.initEvent(eventType, bubbles, true);
  }
  else if ("Event" in window) {
    event = new Event(eventType, { bubbles: bubbles, cancelable: true });
  }

  element.focus();
  element.dispatchEvent(event);
}

// Méthode à utiliser en catch des promesses
function onError(err){
  console.error(err)
  erreur("Une erreur est survenue, consulter la console.")
}

/**
* Pour ajouter les pixels aux valeurs numériques (*) :
*
* (String)  "12" => "12px"
* (Number)  12 => "12px"
* (Object)  {top: 24, left: 34} => {top: "24px", left: "34px"}
*
* Si +asStyle+ est true, on retourne la donnée sous forme d'attribut style
* c'est-à-dire {top:24, left:34} => "top:24px;left:34px;"
* (ça n'est bien entendu valable que pour les Object(s))
*
* (*) Et seulement aux valeurs numériques, c'est-à-dire qu'on peut
*     laisser des propriétés déjà réglées sans problème.
***/
function px(vals, asStyle = false){
  if ('string' == typeof(vals) || 'number' == typeof(vals)) {
    return `${vals}px`
  } else {
    var newh = {}
    for(var k in vals){
      var val = vals[k]
      Object.assign(newh, { [k]: (isNaN(val) ? val : val+'px') })
    }
    if (asStyle){
      var str = []
      for(var k in newh){str.push(`${k}:${newh[k]};`)}
      return str.join('')
    } else {
      return newh
    }
  }
}

function stringOrNull(v){
  if (!v) return null
  v = v.trim()
  if ( v == "" ) return null
  return v
}
function integerOrNull(v){
  if (!v) return null
  v = v.trim()
  if ( v == '' ) return null
  return parseInt(v,10)
}

/**
  Méthode à appeler lorsque c'est un retourn ajax qui ne doit pas faire,
  dans un `catch`. La donnée retournée par le script ajax ruby doit contenir
  `error` pour signaler une erreur et/ou `message` pour afficher un message.
**/
function onAjaxSuccess(ret){
  if ( ret.error ) return erreur(ret.error)
  if (ret.message) message(ret.message)
}

function raise(msg){
  erreur(msg)
  throw new Error(msg)
}

const NOW = new Date()

/**
  Retourne le temps en secondes
  @documented
**/
function humanDateFor(timeSeconds){
  if (undefined === timeSeconds){ timeSeconds = new Date()}
  if ('number' != typeof(timeSeconds)) timeSeconds = parseInt(timeSeconds.getTime() / 1000)
  var d = new Date(timeSeconds * 1000)
  return `${String(d.getDate()).padStart(2,'0')} ${(String(d.getMonth()+1)).padStart(2,'0')} ${d.getFullYear()}`;
}

/**
  * Reçoit une date au format JJ/MM/AAAA (tronquée ou non) et 
  * retourne un objet Date.
  */
function dateString2Date(str){
  const now = new Date()
  let [j,m,a] = str.split('/')
  a = integerOrNull(a) || now.getFullYear()
  m = integerOrNull(m) || now.getMonth() + 1
  j = integerOrNull(j)
  console.log("Jour:%s, Mois:%s, Année:%s", j, m, a)
  return new Date(a, m - 1, j, 0, 0, 0)
}

/**
  * Reçoit une durée string au format "4s", "5j", "3m", "7a" et
  * retourne la durée correspondante, en secondes
  *
  */
const Unity2Secondes = {
  'sc' : 1, 'mn': 60, 'hr':3600, 'jr':24*3600, 'mo':24*3600*31, 'an':365*24*3600
}
function dureeString2Secondes(str){
  const u = str.substring(str.length - 3, str.length)
  let n = str.substring(0, str.length - 3)
  console.log("n = ", n)
  n = parseInt(n, 10) 
  if ( Unity2Secondes[u] ) {
    return n * Unity2Secondes[u]
  } else {
    erreur("Impossible de calculer la durée " + str + " (les unités possibles sont : 'sc', 'mn', 'hr', 'jr', 'mo', 'an'")
  }
}


function stopEvent(ev){
  ev.stopPropagation();
  ev.preventDefault();
  ev.stopImmediatePropagation()
  ev.returnValue = false
  return false
}

function dorure(str){return `<span style="color:#e9e330;background-color:blueviolet;padding:1px 6px;">${str}</span>`}

function clip(what, msg){
  const field = DCreate('textarea',{text:what})
  document.body.appendChild(field)
  field.focus()
  field.select()
  document.execCommand('copy')
  msg && message(msg)
  field.remove()
}

/**
* Pour charger un module du dossier 'js/module'
***/
function loadJSModule(moduleName){
  moduleName.endsWith('.js') || (moduleName += '.js')
  return new Promise((ok,ko)=>{
    const script = DCreate('SCRIPT',{src:`js/module/${moduleName}`, type:"text/javascript"})
    document.body.appendChild(script)
    script.addEventListener('load', ok)
  })
}
