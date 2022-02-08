const canvas = document.querySelector("#canvas"); //el canvas
const ctx = canvas.getContext("2d");

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
      if (this.clicked) {this.fillStyle = "green"}
      else {this.fillStyle = "black"};
      if (this.letra) {
        ctx.fillText(`${this.letra}`, this.xLetra, this.yLetra);
      } else {
        ctx.fillText("", this.xLetra, this.yLetra);
      }
    }
  }

  export default Dado