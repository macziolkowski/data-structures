function directSearchFactorization(n) {
  var g = Math.sqrt(n);
  var i;
  for (i = 2; i <=g; i++) {
    while (n % i === 0) {
      console.log(i);
      n /= i;
      if (n == 1){
        break;
      }
    }
  }
  if (n > 1) {
    console.log(n);
  }
}

function advancedSearchFactorization(n) {
  var g = Math.sqrt(n),
      i = 2,
      k = 1,
      d = -1;
  console.log('A teraz zaawansowany');
  while (i <= g){
    while (n % i === 0) {
      console.log(i);
      n /= i;
      if (n == 1) {
        return;
      }
    }
    if ( i > 3) {
      i = 6 * k + d;
    } else {
      i += 1;
      continue;
    }
    if ( d == 1) {
      d = -1;
      k += 1;
    } else {
      d = 1;
    }
  }
  if ( n > 1) console.log(n);
  return;
}


advancedSearchFactorization(196);
