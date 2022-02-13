
//IMPORTACIONES
import eliminaDados from "./functions/eliminaDados.js"
import lose from "./functions/lose.js"
import win from "./functions/win.js"
// import countScore from "./functions/countScore.js"
import palabraExiste from "./functions/palabraExiste.js"
import palabraEnLista from "./functions/palabraEnLista.js"
import addPalabra from "./functions/addPalabra.js"
import Dado from "./classes/Dado.js"
import array from "./array.js"


//---------------------CONTADORES Y VARIABLES GLOBALES

const canvas = document.querySelector("#canvas"); //el canvas
const listaPalabrasDOM = document.querySelector("#listaPalabras");
const ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 600;
const relojHTML = document.querySelector("#reloj");

let hijaPalabraDOM // esto muestra la palabra en la lista de palabras en el DOM
let score = 0;
let lista = []; // esta es la lista de palabras adivinadas
let intervalId;
let reloj = 60;
const cellSize = 150; //el tamaño de los dados. Para que sea responsivo, tendré que cambiar los números fijos por porcentajes, aquí y en el canvas
let dadosArray = []; //Un arreglo que contiene todos los dados que se van da dibujar
const gameGrid = []; // Un arreglo que contiene a todos los cuadros donde están los dados
let palabraArray = []; //un arreglo donde se van a ir empujando las letras para formar la palabra

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

//----------CREACIÓN DEL TABLERO----------------

function crearDado(dadosArray) {
  // El loop entra al canvas por rows en este loop, y va iterando 150px en X hasta terminar el canvas.width y baja de nuevo en 150px (cellSeize)
  for (let y = 0; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      // cada vez que nos movemos horizontalmente en X en 100px (cellSize) se manda al array un nuevo Cell
      let newWordArray = array.sort ((a, b) => {return 0.5 - Math.random()}) //esto crea un nuevo array de letras al azar
      dadosArray.push(new Dado(x, y, newWordArray[0].toUpperCase()))
    }
  }
}

function dibujaDados() {
  // Loop que itera en el array global que se va a ir llenando
  dadosArray.forEach((dado)=>{
    dado.draw();
  })
}


//-------------------------FUNCIONES PRINCIPALES-----------------------------
function start() {
  //esto debe crear un nuevo tablero, una nueva lista, un nuevo score, invocar las funciones de revolver, revolverDados y mezclarDados, e iniciar la cuenta regresiva con finish
  listaPalabrasDOM.textContent = '';
  score = 0;
  lista = [];
  dadosArray = [];
  crearDado(dadosArray);
  eliminaDados(listaPalabrasDOM);
  document.querySelector("aside").innerHTML = 'SCORE: 0';
}

function update() {
    reloj--;  //cada segundo, hace log de reloj y continúa la cuenta regresiva. al terminar, invoca endgame
  // 1. Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);    
  // 2. Dibujar los elementos
  dibujaDados();
  dibujaReloj();
  canvas.setAttribute("class", 'canvas3');
  //3. Invocar endgame
  if (reloj <= 0) endGame();   
}

function endGame() {
  //cuando termine la cuenta regresiva, esto debe mostrar el score, la lista de palabras que lograste,
  //y (de ser posible) la lista de palabras posibles con esa configuración.
  clearInterval(intervalId); //limpia el intervalo
  reloj = 60; //limpia el reloj (lo debo poner en 60 cuando esté listo)
  intervalId = null;
  console.log(score)
  dibujaWinLose();
}

//------------------MOUSE EVENTS------------------

document.getElementById("start").onclick = () => {
  //esto crea la cuenta regresiva e invoca start desde el botón
  if (intervalId) return;
  start();
  intervalId = setInterval(update, 1000);
};

canvas.onclick = () => {
  // Tomaremos la coordenada principal u original del mouse en X y Y
  // Y la ubicamos al  interior de una Celda
  dadosArray.forEach((dado)=>{
    if (dado.clicked === false) {//<---- Si ya había hecho click en el lugar, NO HAGAS NADA
      if ( 
        mouse.x > dado.x &&
        mouse.x < dado.x + cellSize &&
        mouse.y > dado.y &&
        mouse.y < dado.y + cellSize
      ) {
        palabraArray.push(dado.letra);
        dado.clicked = true; //<---- Ahora sí, marca la celda como que ya hizo click
      }
    }
  });
}

document.getElementById("add").onclick = () => {
  if (palabraExiste(palabraArray, diccionario) && palabraEnLista(palabraArray, lista) && (palabraArray.length > 2)) { 
    //esto revisa si la palabra está en el diccionario y si no está en la lista
    const palabraString = palabraArray.join("").toLowerCase()
    addPalabra(palabraString, lista);
    countScore(palabraString); //cuenta la longitud de la palabra, y entonces calcula el score
    dibujaScore(); //dibuja el score
    dibujaPalabras(palabraString);
  }

    palabraArray = [];
    dadosArray.forEach((element) => {
        element.clicked = false;
    });
}

//----------FUNCIONES DE DIBUJO-------------
function dibujaScore() {
  //esto dibuja el score en el DOM
  document.querySelector("aside").innerHTML = `SCORE: ${score}`;
}

function dibujaPalabras(palabraString) {
  let hijaPalabra = document.createElement("li");
  hijaPalabra.innerHTML = palabraString;
  listaPalabrasDOM.appendChild(hijaPalabra);
}

function dibujaWinLose() {
  //esto dibuja el mensaje de ganaste o perdiste
  score >= 8 ? win() : lose()
}

function dibujaReloj() {
  if (reloj < 10) {
    relojHTML.innerHTML = `<span class="position-relative" style="color:#FF0000"> 00:0${reloj}</span>`;
  } else {
    relojHTML.innerHTML = `<span class="position-relative" style="color:black"> 00:${reloj}</span>`;
  }
}


function countScore(palabra) { //esto cuenta el largo de cada palabra del array lista, y suma puntos al score.
    
  const length = palabra.length;

  if        (length === 3)  {score ++
  } else if (length === 4)  {score ++
  } else if (length === 5)  {score += 2
  } else if (length === 6)  {score += 3
  } else if (length === 7)  {score += 5
  } else if (length  >  7)  {score += 10
  }
}