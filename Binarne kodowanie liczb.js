function hornersMethod(p, s) {
  var L = s.charCodeAt(0) - 48,
      i,
      c;
  for (i = 1; i < s.length; i++){
    c = s.charCodeAt(i) - 48;
    L = L * p + c;
  }
  console.log(L);
  return;
}

function binaryConvert(L, p) {
  var s = '',
      c = 0;
  while (L !== 0){
    c = L % p;
    s = String.fromCharCode(c + 48) + s;
    L = Math.floor(L / p);
  }
  console.log(s);
}


// Funkcja do wyznaczania wartośći liczby ułamkowej z dowolnego systemu //
// pozycyjnego do systemu dziesiętnego //
function binaryCalculateFractional(p, s) {
  var L = 0.0,
      w = p,
      u = false,
      i,
      c;
  for (i = 0; i < s.length; i++){
    if (s[i] == ','){
      u = true;
      continue;
    }
    c = s.charCodeAt(i) - 48;
    if (u === true){
      L = L + c / w;
      w *= p;
    } else {
      L = L * p + c;
    }
  }
  console.log(L);
}


// Funkcja do wyznaczania wartośći liczby ułamkowej z systemu dziesiętnego //
// do dowolnego systemu pozycyjnego z określeniem liczby miejsc po przecinku //
function binaryFromDecimal(L, p, m) {
  var Lc = Math.floor(L),
      Lu = L - Lc,
      s = '',
      c;
  do {
    c = Lc % p;
    s = String.fromCharCode(c + 48) + s;
    Lc = Math.floor(Lc / p);
} while (Lc !== 0);
  s += ',';
  do {
    Lu *= p;
    c = Math.floor(Lu);
    s += String.fromCharCode(c + 48);
    Lu -= c;
    m -= 1;
} while (m > 0);
  console.log(s);
  return;
}

// Prezliczanie liczy z systemu dziesiętnego do //
// naturalnego systemu dwójkowego //
function toNaturalBinarySystem(W){
  s = '';
  do {
    c = W % 2;
    s = c.toString() + s;
    W = Math.floor(W / 2);
  } while (W > 0);
  console.log(s);
  return true;
}


// Prezliczanie liczy z naturalnego systemu dwójkowego do //
// systemu dziesiętnego //
function fromNaturalToDecimal(B) {
  var W = parseInt(B[0]),
      i,
      c;
  for (i = 1; i < B.length; i++) {
    c = parseInt(B[i]);
    W = W + W + c;
  }
  console.log(W);
  return true;
}
