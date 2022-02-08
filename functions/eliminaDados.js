export default function eliminaDados(parent) { //esto elimina los dados, para que no se acumulen a la segunda vuelta
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}