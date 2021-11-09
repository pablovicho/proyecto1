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
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");
/*const $diccionario = require('diccionario');
  
diccionario.readFile('diccionario.txt', (err, data) => {
    if (err) throw err;
  
    console.log(data.toString());
})*/

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

const dado1 = ['a','a','e','e','g','n'];
const dado2 = ['e','l','r','t','t','y'];
const dado3 = ['a','o','o','t','t','ñ'];
const dado4 = ['a','b','b','j','o','o'];
const dado5 = ['e','h','r','t','v','w'];
const dado6 = ['c','i','m','o','t','u'];
const dado7 = ['d','i','s','t','t','y'];
const dado8 = ['e','i','o','s','s','t'];
const dado9 = ['d','e','l','r','v','y'];
const dado10 = ['a','c','h','o','p','s'];
const dado11 = ['h','i','m','n','u','q'];
const dado12 = ['e','e','i','n','s','u'];
const dado13 = ['e','e','g','h','n','ñ'];
const dado14 = ['a','f','f','k','p','s'];
const dado15 = ['h','l','n','n','r','z'];
const dado16 = ['d','e','i','l','r','x'];

const dados = [
// AAEEGN, ELRTTY, AOOTTW, ABBJOO, 
dado1, 
dado2,
dado3,
dado4,
// EHRTVW, CIMOTU, DISTTY, EIOSST, 
dado5,
dado6,
dado7,
dado8,	
// DELRVY, ACHOPS, HIMNQuU, EEINSU, 
dado9,
dado10, 
dado11, // Qu. La q tiene que incluir la u
dado12,
// EEGHNW, AFFKPS, HLNNRZ, DEILRX
dado13,
dado14,
dado15, 
dado16, 
//no sé si sea mejor en objeto, en array de arrays, o una clase, 
//pero sí es importante que no sean completamente aleatorios, para que haya más vocales que consonantes
]


//clases
class Board {
    constructor() {
        this.x = 0;
		this.y = 0;
		this.width = $canvas.width;
		this.height = $canvas.height;
		this.image = new Image();
		this.image.src = "../images/fondo-board.png";
    }

    draw() {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		}
}

class Dado {
    constructor(image) {
        this.width = $dado2.width;
        this.height = $dado2.height;
        this.image = new Image();
        this.image.src = image;
    }
}




function revolver(dado) {
return Math.floor(Math.random() * dado.length);
//esto regresa un número del 0 al 5, que se va a usar para elegir una letra de cada dado
}

function revolverDados() {
    $dado1 = revolver(dados[0]);
    $dado2 = revolver(dados[1]);
    $dado3 = revolver(dados[2]);
    $dado4 = revolver(dados[3]);

    $dado5 = revolver(dados[4]);
    $dado6 = revolver(dados[5]);
    $dado7 = revolver(dados[6]);
    $dado8 = revolver(dados[7]);
    
    $dado9 = revolver(dados[8]);
    $dado10 = revolver(dados[9]);
    $dado11 = revolver(dados[10]);
    $dado12 = revolver(dados[11]);
    
    $dado13 = revolver(dados[12]);
    $dado14 = revolver(dados[13]);
    $dado15 = revolver(dados[14]);
    $dado16 = revolver(dados[15]);
    
//esto debería realizar la función revolver para todos los dados
}

function mezclarDados(dados) {
    return Math.floor(Math.random() * dados.length);
    //esto debería poner todos los dados al azar. 
    //tal vez no sea necesario, y en su lugar sea mejor usar los dados fijos. 
    //¿Pero no sería mejor en este caso usar todas las letras en cada dado? pero así las vocales salen muy poquito
}

function armarPalabra(click) {
    //esto debe juntar la elección de cada letra en orden
    palabra.push(click);
}

function revisarPalabra(palabra) {
    forEach((palabra.split("").join("")) = (letra) => {
        
    });
    //esto debe revisar si cada letra está concatenada a la anterior Y si no se usó el mismo dado para la palabra
    //mi problema es que no quiero la palabra misma ni sus letras, sino los botones que se usaron
    }
    

function listaPalabra(palabra) {
    //esto debe revisar si la palabra está en el diccionario Y si no se escribió ya anteriormente. 
 return palabra
}

function addPalabra(palabra) {
    //¿qué pasa con las ñ en una función? seguro trae problemas en algunos navegadores
    //esto debe ser un botón que invoca revisarPalabra y listaPalabra
    //Si pasa el checklist, entonces sumarla a una lista nueva 
    return revisarPalabra(palabra) && listaPalabra(palabra) ? lista.push(palabra) : null;
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