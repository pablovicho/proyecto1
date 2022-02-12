export default function palabraEnLista(palabra, lista) {
    return lista.includes(palabra.join("").toLowerCase()) ?
    false : true
     //aquí invertí los valores falso y verdadero, para que sea más intuitivo
}