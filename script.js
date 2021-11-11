//---------------------CONTADORES Y VARIABLES GLOBALES
//@import url('')
const $start = document.querySelector("start");
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

let score = 0;
let lista = [];
let intervalId;
let cellSize = 150;
let reloj = 6;
let array = ['e','l','r','t','t','y','a','o','o','t','t','ñ','a','b','b','j','o','o','e','h','r','t','v','e','c','i','m','o','t','u','d','i','s','t','t','y','e','i','o','s','s','t','d','e','l','r','v','y','a','c','h','o','p','s','h','i','m','n','u','q','e','e','i','n','s','u','e','e','g','h','n','ñ','a','f','f','k','p','s','h','l','n','n','r','z','d','e','i','l','r','x']

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

    draw(){
        //si mouse.x tiene cordenadas (verdadero) y mouse.y tiene coordenas (verdadero) y...
        // si (defensor = this.cell (esta instancia) y la posicion del mouse) - regresa o pinta esta misma cell(instancia)
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
        ctx.font = 'bold 50px Indie-Flower-Regular';
        if(this.letra) {
        ctx.fillText(`${this.letra}`, this.xLetra, this.yLetra);
        } else {
        ctx.fillText("", this.xLetra, this.yLetra);
    }
}



isTouching(obj) {
    return (
        this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + obj.height &&
        this.y + this.height > obj.y
    );
}

   // newImage(element,imageurl) {
     //       element.style.backgroundImage = "url("+imageurl+")";
       //  }
}




/*class MouseClick { //dogekiller
    constructor(x,y){
        this.x = x;
        this.y = y; 
        this.width = cellSize - cellGap * 2; // <- reduce el cuadro
        this.hight = cellSize - cellGap * 2;
    }
        
}*/

//-------------------------INSTANCIAS
let board = new Board();
let dado1 = new Dado(0, 0, xLetra(1), yLetra(1), `${revolver(array).toUpperCase()}`);
let dado2 = new Dado(150, 0, xLetra(2), yLetra(1), `${revolver(array).toUpperCase()}`);
let dado3 = new Dado(300, 0, xLetra(3), yLetra(1), `${revolver(array).toUpperCase()}`);
let dado4 = new Dado(450, 0, xLetra(4), yLetra(1), `${revolver(array).toUpperCase()}`);
let dado5 = new Dado(0, 150, xLetra(1), yLetra(2), `${revolver(array).toUpperCase()}`);
let dado6 = new Dado(150, 150, xLetra(2), yLetra(2), `${revolver(array).toUpperCase()}`);
let dado7 = new Dado(300, 150, xLetra(3), yLetra(2), `${revolver(array).toUpperCase()}`);
let dado8 = new Dado(450, 150, xLetra(4), yLetra(2), `${revolver(array).toUpperCase()}`);
let dado9 = new Dado(0, 300, xLetra(1), yLetra(3), `${revolver(array).toUpperCase()}`);
let dado10 = new Dado(150, 300, xLetra(2), yLetra(3), `${revolver(array).toUpperCase()}`);
let dado11 = new Dado(300, 300, xLetra(3), yLetra(3), `${revolver(array).toUpperCase()}`);
let dado12 = new Dado(450, 300, xLetra(4), yLetra(3), `${revolver(array).toUpperCase()}`);
let dado13 = new Dado(0, 450, xLetra(1), yLetra(4), `${revolver(array).toUpperCase()}`);
let dado14 = new Dado(150, 450, xLetra(2), yLetra(4), `${revolver(array).toUpperCase()}`);
let dado15 = new Dado(300, 450, xLetra(3), yLetra(4), `${revolver(array).toUpperCase()}`);
let dado16 = new Dado(450, 450, xLetra(4), yLetra(4), `${revolver(array).toUpperCase()}`);
//-------------------------FUNCIONES

function revolver(array) {
    let random = Math.floor(Math.random() * array.length);
    return array[random];     //esto regresa un número de array, que se va a usar para elegir una letra de cada dado
    }

function xLetra(num) { //ubica las letras adentro del cuadro en x
    return (600/4)*num-(600/8)-18;
}

function yLetra(num) { //ubica las letras adentro del cuadro en y
    return (600/4)*num-(600/8)+18
}

function revolverDados() {//esto debería realizar la función revolver para todos los dados
}

function mezclarDados(dados) {
    return Math.floor(Math.random() * dados.length);
    //esto debería poner todos los dados al azar. 
    //tal vez no sea necesario, y en su lugar sea mejor usar los dados fijos. 
    //¿Pero no sería mejor en este caso usar todas las letras en cada dado? pero así las vocales salen muy poquito
}

function armarPalabra(click) {//esto debe juntar la elección de cada letra en orden
    palabra.push(click);
}

function revisarPalabra(palabra) {//esto debe revisar si cada letra está concatenada a la anterior Y si no se usó el mismo dado para la palabra
    forEach((palabra.split("").join("")) = (letra) => { //mi problema es que no quiero la palabra misma ni sus letras, sino los botones que se usaron
    });
        }
    

function listaPalabra(palabra) { //esto debe revisar si la palabra está en el diccionario Y si no se escribió ya anteriormente. 
 return palabra
}

function addPalabra(palabra) { //esto debe ser un botón que invoca revisarPalabra y listaPalabra. Si pasa el checklist, entonces sumarla a una lista nueva 
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
cellGrids();
//checkCollitions();

}

function update() {
    reloj--;
    console.log(reloj);
    if (reloj === 0) endGame();
    board.draw();
}

function endGame() {
    //cuando termine la cuenta regresiva, esto debe mostrar el score, la lista de palabras que lograste, 
    //y (de ser posible) la lista de palabras posibles con esa configuración.
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    clearInterval(intervalId);
    reloj = 6;
    console.log(reloj);
    intervalId = null;
    reStart();
}

function reStart() {
//esto debería permitir que se pueda volver a hacer click en start
board.draw();
}

window.onload = (event) => {
    reStart();
};

document.getElementById('start').onclick = () => {
    if (intervalId) return;
    start();
    intervalId = setInterval(update, 1000);
}


$canvas.addEventListener('click', function(){
    // Tomaremos la coordenada principal o original del mouse en X y Y
    // supongamos que la posicion del mouse es 250 en X y cellSize = 150 entonces 250 - (150) = 100 
    // Esto es el valor de la posicion de mi Celda en X a la izquierda (son 4 columnas - 600px)
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
        for (let i = 0; i < dogeKillers.length; i++) {
            if (dogeKillers[i].x === gridPositionX && dogeKillers[i].y === gridPositionY) {
                return; // <---- Si la posicion del defensor que ya habia colocado es igual al click de mi nueva CELDA (NO HAGAS NADA)
            }}

})
