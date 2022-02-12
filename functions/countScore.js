export default function countScore(palabra, score) { //esto cuenta el largo de cada palabra del array lista, y suma puntos al score.
    
      let length = palabra.length;
      if(length === 3 || length === 4) {
          score += 1;
      } else if (length === 5) {
          score += 2;
      } else if (length === 6) {
          score += 3
      } else if (length === 7) {
          score += 5;
      } else if (length > 7) {
          score += 10
      }
    return score;
  }