const canvas = document.querySelector("#canvas"); //el canvas
const ctx = canvas.getContext("2d");

class Tablero {
	constructor(src) {
		this.x = 0;
		this.y = 0;
		this.width = canvas.width;
		this.height = canvas.height;
		this.image = new Image();
		this.image.src = src;
	}

	draw() {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
}

export default Tablero