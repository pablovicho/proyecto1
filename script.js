/*
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

esto me permite quitar acentos
*/


//contadores
let score = 0;
let lista = [];

//variables globales
const $start = document.querySelector("start");

//dados
const $dado1 = document.querySelector("dado1");
const $dado2 = document.querySelector("dado2");
const $dado3 = document.querySelector("dado3");
const $dado4 = document.querySelector("dado4");

const $dado5 = document.querySelector("dado5");
const $dado6 = document.querySelector("dado6");
const $dado7 = document.querySelector("dado7");
const $dado8 = document.querySelector("dado8");

const $dado9 = document.querySelector("dado9");
const $dado10 = document.querySelector("dado10");
const $dado11 = document.querySelector("dado11");
const $dado12 = document.querySelector("dado12");

const $dado13 = document.querySelector("dado13");
const $dado14 = document.querySelector("dado14");
const $dado15 = document.querySelector("dado15");
const $dado16 = document.querySelector("dado16");


const dados = {
// AAEEGN, ELRTTY, AOOTTW, ABBJOO, 
dado1: ['a','a','e','e','g','n'], 
dado2: ['e','l','r','t','t','y'],
dado3: ['a','o','o','t','t','ñ'],
dado4: ['a','b','b','j','o','o'],
// EHRTVW, CIMOTU, DISTTY, EIOSST, 
dado5: ['e','h','r','t','v','w'],
dado6: ['c','i','m','o','t','u'],
dado7: ['d','i','s','t','t','y'],
dado8: ['e','i','o','s','s','t'],	
// DELRVY, ACHOPS, HIMNQuU, EEINSU, 
dado9: ['d','e','l','r','v','y'],
dado10: ['a','c','h','o','p','s'], 
dado11: ['h','i','m','n','u','q'], // Qu
dado12: ['e','e','i','n','s','u'],
// EEGHNW, AFFKPS, HLNNRZ, DEILRX
dado13: ['e','e','g','h','n','ñ'],
dado14: ['a','f','f','k','p','s'],
dado15: ['h','l','n','n','r','z'], 
dado16: ['d','e','i','l','r','x'], 
//no sé si sea mejor en objeto, en array de arrays, o una clase
}

function revolver(dado) {
return Math.floor(Math.random() * dado.length);
//esto regresa un número del 0 al 5, que se va a usar para elegir una letra de cada dado
}

function revolverDados() {
    $dado1 = revolver()
//esto debería realizar la función revolver para todos los dados
}

function mezclarDados() {
    //esto debería poner todos los dados al azar. 
    //tal vez no sea necesario, y en su lugar sea mejor usar los dados fijos. 
    //¿Pero no sería mejor en este caso usar todas las letras en cada dado? 
}

function armarPalabra() {
    //esto debe juntar la elección de cada letra en orden
}

function addPalabra() {
    //¿qué pasa con las ñ en una función? seguro trae problemas en algunos navegadores
    //esto debe ser un botón que invoca revisarPalabra y listaPalabra
}

function revisarPalabra() {
    //esto debe revisar si cada letra está concatenada a la anterior Y si no se usó el mismo dado para la palabra
}

function listaPalabra() {
    //esto debe revisar si la palabra está en el diccionario Y si no se escribió ya anteriormente. 
    //Si pasa el checklist, entonces sumarla a una lista nueva 
}

function start() {
    //esto debe crear un nuevo tablero, una nueva lista, un nuevo score,
    //invocar las funciones de revolver, revolverDados y mezclarDados,
    //e iniciar la cuenta regresiva con finish
}

function finish() {
    //cuando termine la cuenta regresiva, esto debe mostrar el score, la lista de palabras que lograste, 
    //y (de ser posible) la lista de palabras posibles con esa configuración.
}