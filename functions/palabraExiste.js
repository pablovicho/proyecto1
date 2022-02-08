export default function palabraExiste(palabra, lista, diccionario) {
    //esto debe revisar si la palabra está en el diccionario Y si no se escribió ya anteriormente.
    let boo = diccionario.includes(palabra.join("").toLowerCase())
    lista.includes(palabra.join("").toLowerCase()) && 
    !boo ? false : true; 
    //aquí invertí los valores falso y verdadero, para que sea más intuitivo
  }