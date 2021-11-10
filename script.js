//---------------------CONTADORES
let score = 0;
let lista = [];
let intervalId;
let reloj = 6;

//------------------VARIALES GLOBALES
const $start = document.querySelector("start");
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");


//------------------CLASES
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
    constructor(x, y, xLetra, yLetra, letra) {
        this.x = x;
        this.y = y;
        this.xLetra = xLetra;
        this.yLetra = yLetra;
        this.img = new Image();
        this.img.src = "/imagenes/empty-dice.png";
        this.letra = letra;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, 150, 150);
        ctx.font = '50px serif';
        if(this.letra) {
        ctx.fillText(this.xLetra, this.yLetra, this.letra);
        } else {
        ctx.fillText("A", this.xLetra, this.yLetra);
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


//-------------------------INSTANCIAS
let board = new Board();
let dado1 = new Dado(0, 0, xLetra(1), yLetra(1), "");
let dado2 = new Dado(150, 0, xLetra(2), yLetra(1), "B");
let dado3 = new Dado(300, 0, xLetra(3), yLetra(1), "O");
let dado4 = new Dado(450, 0, xLetra(4), yLetra(1), "G");
let dado5 = new Dado(0, 150, xLetra(1), yLetra(2), "G");
let dado6 = new Dado(150, 150, xLetra(2), yLetra(2), "L");
let dado7 = new Dado(300, 150, xLetra(3), yLetra(2), "E");
let dado8 = new Dado(450, 150, xLetra(4), yLetra(2), "");
let dado9 = new Dado(0, 300, xLetra(1), yLetra(3), "");
let dado10 = new Dado(150, 300, xLetra(2), yLetra(3), "");
let dado11 = new Dado(300, 300, xLetra(3), yLetra(3), "");
let dado12 = new Dado(450, 300, xLetra(4), yLetra(3), "");
let dado13 = new Dado(0, 450, xLetra(1), yLetra(4), "");
let dado14 = new Dado(150, 450, xLetra(2), yLetra(4), "");
let dado15 = new Dado(300, 450, xLetra(3), yLetra(4), "");
let dado16 = new Dado(450, 450, xLetra(4), yLetra(4), "");
//-------------------------FUNCIONES

function xLetra(num) {
    return (600/4)*num-(600/8)-18;
}

function yLetra(num) {
    return (600/4)*num-(600/8)+18
}

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
    dado1.draw();
    dado2.draw();
    dado3.draw();
    dado4.draw();
    dado5.draw();
    dado6.draw();
    dado7.draw();
    dado8.draw();
    dado9.draw();
    dado10.draw();
    dado11.draw();
    dado12.draw();
    dado13.draw();
    dado14.draw();
    dado15.draw();
    dado16.draw();
};

document.getElementById('start').onclick = () => {
    if (intervalId) return;
    start();
    intervalId = setInterval(update, 1000);
}









/*const $diccionario = require('diccionario');
  
diccionario.readFile('diccionario.txt', (err, data) => {
    if (err) throw err;
  
    console.log(data.toString());
// esto me servirá tal vez leer el diccionario

})*/


/*
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

esto me permite quitar acentos
*/



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


