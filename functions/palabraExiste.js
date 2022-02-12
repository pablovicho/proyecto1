export default function palabraExiste(palabra, diccionario) {
    //esto debe revisar si la palabra está en el diccionario Y si no se escribió ya anteriormente.
    return diccionario.includes(palabra.join("").toLowerCase()) ? true: false;
  }