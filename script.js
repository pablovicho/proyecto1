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

//dados
const $dado1 = document.querySelector("dado1");
/*const $dado2 = document.querySelector("dado2");
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
const $dado16 = document.querySelector("dado16");*/



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
    constructor(array, imageurl, element) {
        this.array = array;
        this.element = element;
        this.image = new Image();
        this.imageurl = imageurl; 
    }

    draw(source) {

        if(source) {
        ctx.drawImage(source, 0, 0, 10, 10);
        
    }
    else {(source = "/imagenes/empty-dice.png")}
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

/*
const dado2 = new Dado(['e','l','r','t','t','y'], "/imagenes/empty-dice.png", $dado2);
const dado3 = new Dado(['a','o','o','t','t','ñ'], "/imagenes/empty-dice.png", $dado3);
const dado4 = new Dado(['a','b','b','j','o','o'], "/imagenes/empty-dice.png", $dado4);

const dado5 = new Dado(['e','h','r','t','v','w'], "/imagenes/empty-dice.png", $dado5);
const dado6 = new Dado(['c','i','m','o','t','u'], "/imagenes/b.png", $dado6);
const dado7 = new Dado(['d','i','s','t','t','y'], "/imagenes/o.png", $dado7);
const dado8 = new Dado(['e','i','o','s','s','t'], "/imagenes/g.png", $dado8);

const dado9 = new Dado(['d','e','l','r','v','y'], "/imagenes/g.png", $dado9);
const dado10 = new Dado(['a','c','h','o','p','s'], "/imagenes/l.png", $dado10);
const dado11 = new Dado(['h','i','m','n','u','q'], "/imagenes/e.png", $dado11);
const dado12 = new Dado(['e','e','i','n','s','u'], "/imagenes/empty-dice.png", $dado12);

const dado13 = new Dado(['e','e','g','h','n','ñ'], "/imagenes/empty-dice.png", $dado13);
const dado14 = new Dado(['a','f','f','k','p','s'], "/imagenes/empty-dice.png", $dado14);
const dado15 = new Dado(['h','l','n','n','r','z'], "/imagenes/empty-dice.png", $dado15);
const dado16 = new Dado(['d','e','i','l','r','x'], "/imagenes/empty-dice.png", $dado16);
*/
const dados = [[dado1, dado2, dado3, dado4], // AAEEGN, ELRTTY, AOOTTW, ABBJOO, 
[dado5,dado6, dado7, dado8], // EHRTVW, CIMOTU, DISTTY, EIOSST, 
[dado9, dado10, dado11, dado12], // DELRVY, ACHOPS, HIMNQuU, EEINSU, 
[dado13, dado14, dado15, dado16, ]]; // EEGHNW, AFFKPS, HLNNRZ, DEILRX

//no sé si sea mejor en objeto, en array de arrays, o una clase, 
//pero sí es importante que no sean completamente aleatorios, para que haya más vocales que consonantes
//me preocupa que se repitan tanto estas variables. no me parece óptimo




function revolverDados() {
   /*
    $dado1 = dado1.revolver(dados[0]);
    $dado2 = dado2.revolver(dados[1]);
    $dado3 = dado3.revolver(dados[2]);
    $dado4 = dado4.revolver(dados[3]);

    $dado5 = dado5.revolver(dados[4]);
    $dado6 = dado6.revolver(dados[5]);
    $dado7 = dado7.revolver(dados[6]);
    $dado8 = dado8.revolver(dados[7]);
    
    $dado9 = dado9.revolver(dados[8]);
    $dado10 = dado10.revolver(dados[9]);
    $dado11 = dado11.revolver(dados[10]);
    $dado12 = dado12.revolver(dados[11]);
    
    $dado13 = dado13.revolver(dados[12]);
    $dado14 = dado14.revolver(dados[13]);
    $dado15 = dado15.revolver(dados[14]);
    $dado16 = dado16.revolver(dados[15]);
    */
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

    setTimeout(() => {
        (endGame());
    }, 6*1000)
  //checkCollitions();
}


    // 	
    // 	
    // };


function update() {
    reloj--;
    console.log(reloj)
    if (reloj === 0) endGame();
}


function endGame() {
    //cuando termine la cuenta regresiva, esto debe mostrar el score, la lista de palabras que lograste, 
    //y (de ser posible) la lista de palabras posibles con esa configuración.
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    clearInterval(intervalId);
    reloj = 6;
    console.log(reloj);

}


window.onload = (event) => {
    let board = new Board();
    board.draw();
    let dado1 = new Dado($dado1);
    dado1.draw($dado1);
};

document.getElementById('start').onclick = () => {
    if (intervalId) return;
    start();
    intervalId = setInterval(update, 1000)
}