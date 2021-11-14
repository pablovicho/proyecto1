//
// const script = document.createElement('script');                   // esto es de jquery
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

//---------------------CONTADORES Y VARIABLES GLOBALES
//@import url('')
const canvas = document.querySelector("#canvas"); //el canvas
const listaPalabras = document.querySelector("#listaPalabras");
const ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 600;
const relojHTML = document.querySelector("#reloj");

let score = 0;
let lista = [];
let intervalId;
let reloj = 60;
let array = [
  "e",
  "l",
  "r",
  "t",
  "t",
  "y",
  "a",
  "o",
  "o",
  "t",
  "t",
  "ñ",
  "a",
  "b",
  "b",
  "j",
  "o",
  "o",
  "e",
  "h",
  "r",
  "t",
  "v",
  "e",
  "c",
  "i",
  "m",
  "o",
  "t",
  "u",
  "d",
  "i",
  "s",
  "t",
  "t",
  "y",
  "e",
  "i",
  "o",
  "s",
  "s",
  "t",
  "d",
  "e",
  "l",
  "r",
  "v",
  "y",
  "a",
  "c",
  "h",
  "o",
  "p",
  "s",
  "h",
  "i",
  "m",
  "n",
  "u",
  "q",
  "e",
  "e",
  "i",
  "n",
  "s",
  "u",
  "e",
  "e",
  "g",
  "h",
  "n",
  "ñ",
  "a",
  "f",
  "f",
  "k",
  "p",
  "s",
  "h",
  "l",
  "n",
  "n",
  "r",
  "z",
  "d",
  "e",
  "i",
  "l",
  "r",
  "x",
  "a",
];

const cellSize = 150;
const dadosArray = []; //Un arreglo que contiene todos los dados que se van da dibujar
const gameGrid = []; // Un arreglo que contiene a todos los cuadros donde están los dados
let palabraArray = []; //un arreglo donde se van a ir empujando las letras donde se hace click
const cellGap = 5; //esto es lo que evitaría la colisión, y así permitir movimientos diagonales
const mouse = {
  //Mouse (pos) posiciona el mouse adentro del grid
  x: 10,
  y: 10,
  width: 0,
  height: 0,
};

// getBoundingClientRect -> esta funcion regresa un objecto del DOM (rectangulo) que contiene info del tamaño de algun elemento y su posicion
// sirve para saber donde se puede mover el mouse dentro del CANVAS y no fuera
let canvasPosition = canvas.getBoundingClientRect();
//El método addEventlistener, es un escuchador que indica al navegador que este atento a la interacción del usuario.
//Tipo de evento: MouseEvent | UIEvent | Event | ProgressEvent<EventTarget> | ClipboardEvent | AnimationEvent | WheelEvent. ejemplos: mousedown, mouseenter, mouseleave, mousemove, *click*

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x - canvasPosition.left; // el mouse accede a las coordinadas del canvas global
  mouse.y = event.y - canvasPosition.top;
});

//------------------CLASES-----------------------
//--------------------CELDAS---------------------
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }

  draw() {
    //si mouse.x tiene cordenadas (verdadero) y mouse.y tiene coordenas (verdadero) y regresa o pinta esta misma cell(instancia)
    if (mouse.x && mouse.y) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}

function createGrid() {
  // El loop entra al canvas por rows en este loop, primero empieza debajo de la linea azul (100px en hight) y
  //va iterando 100px en X hasta terminar el canvas.width y baja de nuevo en 100px (cellSeize)
  for (let y = 0; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      // cada vez que nos movemos horizontalmente en X en 100px (cellSize) se manda al array un nuevo Cell
      //se ponen Cell por todo el canvas en X y Y
      gameGrid.push(new Cell(x, y));
    }
  }
}

function cellGrids() {
  // Loop que itera en el array global que se va a ir llenando en mi event click de Crear nuevo dogeKiller
  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].draw();
  }
}

//-----------------DADO--------------------

class Dado {
  constructor(x, y, letra) {
    this.x = x;
    this.y = y;
    this.xLetra = x + 59;
    this.yLetra = y + 95;
    this.img = new Image();
    this.img.src = "/imagenes/empty-dice.png";
    this.letra = letra;
    this.clicked = false;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 150, 150);
    ctx.font = "bold 50px Indie-Flower-Regular";
    if (this.letra) {
      ctx.fillText(`${this.letra}`, this.xLetra, this.yLetra);
    } else {
      ctx.fillText("", this.xLetra, this.yLetra);
    }
  }

  isTouching(obj) {
    //esta todavía no hace nada, y es probable que no la necesite si me sirve el event mouseup
    return (
      this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y
    );
  }
}

function createDado() {
  // El loop entra al canvas por rows en este loop, y va iterando 150px en X hasta terminar el canvas.width y baja de nuevo en 150px (cellSeize)
  for (let y = 0; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      // cada vez que nos movemos horizontalmente en X en 100px (cellSize) se manda al array un nuevo Cell
      dadosArray.push(new Dado(x, y, `${revolver(array).toUpperCase()}`)); //se ponen dados por todo el canvas en X y Y
    }
  }
}

function drawDado() {
  // Loop que itera en el array global que se va a ir llenando en mi event click de Crear nuevo dogeKiller
  for (let i = 0; i < dadosArray.length; i++) {
    dadosArray[i].draw();
  }
}

function revolver(array) {
  let random = Math.floor(Math.random() * array.length);
  return array[random]; //esto regresa un número de array, que se va a usar para elegir una letra de cada dado
}

//--------------------BOARD---------------------------------
class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "imagenes/fondo-board.png";
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

//-------------------------FUNCIONES PRINCIPALES-----------------------------

function start() {
  //esto debe crear un nuevo tablero, una nueva lista, un nuevo score, invocar las funciones de revolver, revolverDados y mezclarDados, e iniciar la cuenta regresiva con finish
  createDado();
  //limpiaLista();
}

function update() {
  //cada segundo, hace log de reloj y continúa la cuenta regresiva. al terminar, invoca endgame
  // 1. Limpiar el canvas
  //document.getElementById("canvas").style.backgroundImage = none;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 2. Dibujar los elementos
  drawDado();
  cellGrids();
  drawReloj();
  //3. Invocar endgame
  reloj--;
  if (reloj <= 0) endGame();
}

document.getElementById("start").onclick = () => {
  //esto solamente crea la cuenta regresiva e invoca start desde el botón
  if (intervalId) return;
  start();
  intervalId = setInterval(update, 1000);
};

function endGame() {
  //cuando termine la cuenta regresiva, esto debe mostrar el score, la lista de palabras que lograste,
  //y (de ser posible) la lista de palabras posibles con esa configuración.
  countScore(lista); //cuenta las palabras de la lista, qué tan largas son, y entonces calcula en score
  drawScore(); //dibuja el score
  clearInterval(intervalId); //limpia el intervalo
  reloj = 60; //limpia el reloj (lo debo poner en 60 cuando esté listo)
  intervalId = null;
  lista = [];
  winLose();
}

window.onload = (event) => {
  // loadDiccionario(); aquí buscaría cargar el diccionario desde JSON
};

function pintaLetra(element) {
  //canvas = "0f4c5c"  //¿esto está bien planteado? quiero que al hacer click, la letra cambie de color
}

//------------------MOUSE EVENTS------------------

canvas.addEventListener("mouseup", function () {
  // Tomaremos la coordenada principal u original del mouse en X y Y
  // supongamos que la posicion del mouse es 250 en X y cellSize = 150 entonces 250 - (150) = 100
  // Esto es el valor de la posicion de mi Celda en X a la izquierda (son 4 columnas - 600px)
console.log(mouse.x, mouse.y);
  for (let i = 0; i < dadosArray.length; i++) {
    if (dadosArray[i].clicked === false) {
      //<---- Si ya había hecho click en el lugar, NO HAGAS NADA
      if ( 
        mouse.x > dadosArray[i].x &&
        mouse.x < dadosArray[i].x + cellSize &&
        mouse.y > dadosArray[i].y &&
        mouse.y < dadosArray[i].y + cellSize
      ) {
        palabraArray.push(dadosArray[i].letra);
        console.log(palabraArray);
        dadosArray[i].clicked = true; //<---- Ahora sí, marca la celda como ya clickeada
      }
    }
    if ((dadosArray[i].clicked == true)) {
        dadosArray[i].fillStyle = "green"; //<---- Ahora sí, marca la celda como ya clickeada
    } else {
      dadosArray[i].fillStyle = "black";
    }
  }
});

document.getElementById("add").onclick = () => {
  console.log(palabraArray);
  if (listaPalabra(palabraArray)) { //esto revisa si la palabra está en el diccionario y si no está en la lista
    addPalabra(palabraArray);
  }
    palabraArray = [];
    dadosArray.forEach((element) => {
        element.clicked = false;
    });
}


function listaPalabra(palabra) {
  //esto debe revisar si la palabra está en el diccionario Y si no se escribió ya anteriormente.
  if (lista.includes(palabra.join("").toLowerCase())) return false;
  return diccionario.includes(palabra.join("").toLowerCase()) ? true : false; //aquí invertí los valores falso y verdadero, para que sea más intuitivo
}

function addPalabra(palabra) {
  //esto debe invocar revisarPalabra y listaPalabra. Si pasa el checklist, entonces sumarla a una lista nueva
  lista.push(palabra.join("").toLowerCase());
  const hija = palabra.join("").toLowerCase();
  const hijaPalabra = document.createElement("li");
  hijaPalabra.innerHTML = hija;
    listaPalabras.appendChild(hijaPalabra);
    console.log(hijaPalabra);
  
} //debo enlazarlo a cuando se deja de hacer click

function countScore(lista) {
  //esto cuenta el largo de cada palabra del array lista, y suma puntos al score. falta invocarla
  lista.forEach((elemento) => {
    let length = elemento.length;
    switch (length) {
      case 1 || 2:
        break;
      case 3 || 4:
        score += 1;
        break;
      case 5:
        score += 2;
        break;
      case 6:
        score += 3;
        break;
      case 7:
        score += 5;
        break;
      case 8 || 9 || 10 || 11 || 12:
          score += 10;
          break;
      default:
        break;
    }
  });
  return score;
}

function drawScore() {
  //esto dibuja el score en el DOM
  document.querySelector("aside").innerHTML = `SCORE: ${score}`;
}

function winLose() {
  // falta invocarla y asignarla
  return score >= 10 ? true : false;
}

function drawWinLose() {
  //esto dibuja el mensaje de ganaste o perdiste
  if (winLose()) {
    document.querySelector("win-Lose").innerHTML = `<div id="win-Lose">
    <span>"Ganaste!!</span></div>`;
  } else {
    document.querySelector("win-Lose").innerHTML = `<div id="win-Lose"><span>"Perdiste :/"</span></div>`;
  }
}

function drawReloj() {
  if (reloj < 10) {
    relojHTML.innerHTML = `<span class="position-relative" style="color:#FF0000"> 00:0${reloj}</span>`;
  } else {
    relojHTML.innerHTML = `<span class="position-relative" style="color:black"> 00:${reloj}</span>`;
  }
}

function limpiaLista() {
    listaPalabras.removeChild(hijaPalabra);
    score = 0;
}
