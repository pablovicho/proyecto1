/*
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

esto me permite quitar acentos
*/


//contadores
let score = 0;
let lista = [];
let intervalId;
let reloj = 6;

//variables globales
const $start = document.querySelector("start");
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");
/*const $diccionario = require('diccionario');
  
diccionario.readFile('diccionario.txt', (err, data) => {
    if (err) throw err;
  
    console.log(data.toString());
// esto me servirá para quitar acentos

})*/

//clases
class Board {
    constructor() {
        this.x = 0;
		this.y = 0;
		this.width = $canvas.width;
		this.height = $canvas.height;
		this.image = new Image();
    }

    draw() {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		}
}

class Dado {
    constructor(x, y, letra) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = "/imagenes/empty-dice.png";
        this.letra = letra;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, 150, 150);
        ctx.font = '50px serif';
        if(this.letra) {
        ctx.fillText(this.letra);
        } else {
        ctx.fillText("A", this.x, this.y);
    }
}

    revolver(array) {
        let random = Math.floor(Math.random() * array.length);
        return array[random];
        //esto regresa un número del 0 al 5, que se va a usar para elegir una letra de cada dado
        //sin embargo, necesito asignar a cada una de estas letras una respectiva imagen
        }

   // newImage(element,imageurl) {
     //       element.style.backgroundImage = "url("+imageurl+")";
       //  }
}

//instancias
let dado1 = new Dado(0, 0);
let board = new Board();

function revolverDados() {

//esto debería realizar la función revolver para todos los dados
//sin embargo, es repetitivo, y debería poder usar la clase dado para crearlo
//también debería ser intuitivo el usar la imagen que tenga asignada
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
    //checkDice();

	// 2. Limpiar el canvas

	ctx.clearRect(0, 0, $canvas.width, $canvas.height);
	// 3. Dibujar los elementos
    let board = new Board();
    board.draw();
	let dado1 = new Dado();
    dado1.draw();

  //checkCollitions();
}


function update() {
    reloj--;
    console.log(reloj);
    if (reloj === 0) endGame();
    board.draw();
    dado1.draw();
}

function endGame() {
    //cuando termine la cuenta regresiva, esto debe mostrar el score, la lista de palabras que lograste, 
    //y (de ser posible) la lista de palabras posibles con esa configuración.
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    clearInterval(intervalId);
    reloj = 6;
    console.log(reloj);
    intervalId = null;
}


window.onload = (event) => {
    dado1.draw(0, 0, "a");
};

document.getElementById('start').onclick = () => {
    if (intervalId) return;
    start();
    intervalId = setInterval(update, 1000);
}










/*
['e','l','r','t','t','y']
['a','o','o','t','t','ñ']
['a','b','b','j','o','o']

['e','h','r','t','v','w']
['c','i','m','o','t','u']
['d','i','s','t','t','y']
['e','i','o','s','s','t']

['d','e','l','r','v','y']
['a','c','h','o','p','s']
['h','i','m','n','u','q']
['e','e','i','n','s','u']

['e','e','g','h','n','ñ']
['a','f','f','k','p','s']
['h','l','n','n','r','z']
['d','e','i','l','r','x']
*/


/*const dados = [[dado1, dado2, dado3, dado4], // AAEEGN, ELRTTY, AOOTTW, ABBJOO, 
[dado5,dado6, dado7, dado8], // EHRTVW, CIMOTU, DISTTY, EIOSST, 
[dado9, dado10, dado11, dado12], // DELRVY, ACHOPS, HIMNQuU, EEINSU, 
[dado13, dado14, dado15, dado16, ]]; // EEGHNW, AFFKPS, HLNNRZ, DEILRX*/


//no sé si sea mejor en objeto, en array de arrays, o una clase, 
//pero sí es importante que no sean completamente aleatorios, para que haya más vocales que consonantes
//me preocupa que se repitan tanto estas variables. no me parece óptimo