//---------------------CONTADORES Y VARIABLES GLOBALES
//@import url('')
const $start = document.querySelector("start"); //el botón de start
const $canvas = document.querySelector("canvas"); //el canvas
const $listaPalabras = document.querySelector("listaPalabras");
const ctx = $canvas.getContext("2d");

let score = 0; //todavía no tengo función para esto
let lista = [];
let intervalId;
let reloj = 6;
let array = ['e','l','r','t','t','y','a','o','o','t','t','ñ','a','b','b','j','o','o','e','h','r','t','v','e','c','i','m','o','t','u','d','i','s','t','t','y','e','i','o','s','s','t','d','e','l','r','v','y','a','c','h','o','p','s','h','i','m','n','u','q','e','e','i','n','s','u','e','e','g','h','n','ñ','a','f','f','k','p','s','h','l','n','n','r','z','d','e','i','l','r','x']

const cellSize = 150;
const dadosArray = []; //Un arreglo que contiene todos los dados que se van da dibujar
const gameGrid = []; // Un arreglo que contiene a todos los cuadros donde están los dados
const palabraArray = []; //un arreglo donde se van a ir empujando las letras donde se hace click
const cellGap = 5; //esto es lo que evitaría la colisión, y así permitir movimientos diagonales
const mouse = { //Mouse (pos) posiciona el mouse adentro del grid
    x: 10,
    y: 10,
    width: 0,
    height: 0,
}


// getBoundingClientRect -> esta funcion regresa un objecto del DOM (rectangulo) que contiene info del tamaño de algun elemento y su posicion
// sirve para saber donde se puede mover el mouse dentro del CANVAS y no fuera
let canvasPosition = $canvas.getBoundingClientRect();
//El método addEventlistener, es un escuchador que indica al navegador que este atento a la interacción del usuario.
//Tipo de evento: MouseEvent | UIEvent | Event | ProgressEvent<EventTarget> | ClipboardEvent | AnimationEvent | WheelEvent. ejemplos: mousedown, mouseenter, mouseleave, mousemove, *click*

$canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x - canvasPosition.left; // el mouse accede a las coordinadas del canvas global
    mouse.y = event.y - canvasPosition.top;
})

$canvas.addEventListener('mouseleave', function(event){ //cuando el mouse sale del canvas: mouseleave ocurre cuando el puntero del mouse se mueve fuera de un elemento.
    mouse.y = undefined;                                // regresa a la posicion acual del mouse obj.
    mouse.x = undefined; 
})


//------------------CLASES-----------------------

//handlecreategrid y handlegamegrid es en donde dibuja todo

//--------------------CELDAS---------------------
class Cell {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }

    draw(){         //si mouse.x tiene cordenadas (verdadero) y mouse.y tiene coordenas (verdadero) y regresa o pinta esta misma cell(instancia)
        if (mouse.x && mouse.y) {         
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);  
        }
    }

}


function createGrid() {
    // El loop entra al canvas por rows en este loop, primero empieza debajo de la linea azul (100px en hight) y 
    //va iterando 100px en X hasta terminar el $canvas.width y baja de nuevo en 100px (cellSeize)
    for (let y = 0; y < $canvas.height; y += cellSize) {
        for (let x = 0; x < $canvas.width; x += cellSize) {
            // cada vez que nos movemos horizontalmente en X en 100px (cellSize) se manda al array un nuevo Cell
            //se ponen Cell por todo el canvas en X y Y
            gameGrid.push(new Cell(x,y));
        }
    }
}

function cellGrids() {     // Loop que itera en el array global que se va a ir llenando en mi event click de Crear nuevo dogeKiller
    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw();
    }
}

//-----------------DADO

class Dado {
    constructor(x, y, letra) {
        this.x = x;
        this.y = y;
        this.xLetra = x+59;
        this.yLetra = y+95;
        this.img = new Image();
        this.img.src = "/imagenes/empty-dice.png";
        this.letra = letra;
        this.clicked = false;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, 150, 150);
        ctx.font = 'bold 50px Indie-Flower-Regular';
        if(this.letra) {
        ctx.fillText(`${this.letra}`, this.xLetra, this.yLetra);
        } else {
        ctx.fillText("", this.xLetra, this.yLetra);
    }
}

isTouching(obj) { //esta todavía no hace nada, y es probable que no la necesite si me sirve el event click
    return (
        this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + obj.height &&
        this.y + this.height > obj.y
    );
}
}

function createDado() {
    // El loop entra al canvas por rows en este loop, y va iterando 150px en X hasta terminar el $canvas.width y baja de nuevo en 150px (cellSeize)
    for (let y = 0; y < $canvas.height; y += cellSize) {
        for (let x = 0; x < $canvas.width; x += cellSize) {   // cada vez que nos movemos horizontalmente en X en 100px (cellSize) se manda al array un nuevo Cell
            dadosArray.push(new Dado(x, y, `${revolver(array).toUpperCase()}`)); //se ponen dados por todo el canvas en X y Y
        }
    }
}

function drawDado() {     // Loop que itera en el array global que se va a ir llenando en mi event click de Crear nuevo dogeKiller
    for (let i = 0; i < dadosArray.length; i++) {
        dadosArray[i].draw();
    }
}

function revolver(array) {
    let random = Math.floor(Math.random() * array.length);
    return array[random];     //esto regresa un número de array, que se va a usar para elegir una letra de cada dado
    }



//--------------------BOARD
class Board {
    constructor() {
        this.x = 0;
		this.y = 0;
		this.width = $canvas.width;
		this.height = $canvas.height;
		this.img = new Image();
        this.img.src = "/imagenes/fondo-board.png";
    }

    draw() {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		}
}



//-------------------------FUNCIONES PRINCIPALES-----------------------------

function start() {
    //esto debe crear un nuevo tablero, una nueva lista, un nuevo score, invocar las funciones de revolver, revolverDados y mezclarDados, e iniciar la cuenta regresiva con finish
    createDado();
	// 2. Limpiar el canvas
	ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    ctx.beginPath();
	// 3. Dibujar los elementos    
    drawDado();
    ctx.closePath();
    //checkDice();
    //checkCollitions();

}

function update() { //cada segundo, hace log de reloj y continúa la cuenta regresiva. al terminar, invoca endgame
    reloj--;
    console.log(reloj);
    cellGrids();
    if (reloj === 0) endGame();
}

document.getElementById('start').onclick = () => { //esto solamente crea la cuenta regresiva e invoca start
    if (intervalId) return;
    start();
    intervalId = setInterval(update, 1000);
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
    let board = new Board();
};

function pintaLetra(element) {
    element.style.font = "0f4c5c"  //¿esto está bien planteado?
}


//------------------MOUSE EVENTS------------------

$canvas.addEventListener('mousedown', function(){
    // Tomaremos la coordenada principal u original del mouse en X y Y
    // supongamos que la posicion del mouse es 250 en X y cellSize = 150 entonces 250 - (150) = 100 
    // Esto es el valor de la posicion de mi Celda en X a la izquierda (son 4 columnas - 600px)
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap; //tal vez el error esté en este cálculo
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
        for (let i = 0; i < dadosArray.length; i++) {
            if (dadosArray[i].x === gridPositionX && gameGrid[i].y === gridPositionY) {
                if (dadosArray[i].clicked === true) { //<---- Si ya había hecho click en el lugar, NO HAGAS NADA
                    return
                }
                pintaLetra(dadosArray[i].letra);
                palabraArray.push(dadosArray[i].letra);
                console.log(palabraArray);
                dadosArray[i].clicked = true; //<---- Ahora sí, marca la celda como ya clickeada
            }
        }
})

$canvas.addEventListener('mouseup', function(){
    if(listaPalabra(palabraArray)) {
        addPalabra(palabraArray);
        palabraArray = [];
    }
})

function listaPalabra(palabra) { //esto debe revisar si la palabra está en el diccionario Y si no se escribió ya anteriormente. 
 return diccionario.includes(palabra.join("")) && lista.includes(palabra.join("")) ? false : true //aquí invertí los valores falso y verdadero, para que sea más intuitivo
}

function addPalabra(palabra) { //esto debe invocar revisarPalabra y listaPalabra. Si pasa el checklist, entonces sumarla a una lista nueva 
lista.push(palabra.join(""));
let $nuevaPalabra = palabra.join("");
$listaPalabras.appendChild($nuevaPalabra);

} //debo enlazarlo a cuando se deja de hacer click



//------------------JSON REQUEST-------------------
const requestURL = 'diccionario/diccionario_formateado.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    const diccionario = request.response;
    return diccionario;
  }