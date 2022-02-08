export default function addPalabra(palabra, lista, countScore, dibujaScore, listaPalabrasDOM) {
    // Si pasa el checklist, entonces sumar la palabra a una lista nueva
    let palabraString = palabra.join("").toLowerCase()
    lista.push(palabraString);
    console.log(lista)
    countScore(palabraString, score); //cuenta la longitud de la palabra, y entonces calcula el score
    dibujaScore(); //dibuja el score
    let hijaPalabra = document.createElement("li");
    hijaPalabra.innerHTML = palabraString;
    listaPalabrasDOM.appendChild(hijaPalabra);
  }