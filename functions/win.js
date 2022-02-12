const canvas = document.querySelector("#canvas"); //el canvas
const ctx = canvas.getContext("2d");
import Tablero from "../classes/Tablero.js";

export default function win() {
    let tablero = new Tablero("imagenes/you-win.png");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tablero.draw();
    canvas.setAttribute("class", 'canvas1');
}