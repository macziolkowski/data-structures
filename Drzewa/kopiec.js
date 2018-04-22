var readline = require("readline"); // dla nodejs-a

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var cr, cl, cp;
var T = new Array(15);
var n = 0;
var i;

// wypisywanie drzewa

function printBt(sp, sn, v) {
    var s;

    if (v < n) {
        s = sp;
        if (sn == cr) {
            s = s.split('');
            s[s.length - 2] = ' ';
            s = s.join('');
        }
        printBt(s + cp, cr, 2 * v + 2);

        s = s.substring(0, sp.length - 2);

        console.log(s + sn + T[v]);

        s = sp;
        if(sn == cl) {
            s = s.split('');
            s[s.length - 2] = ' ';
            s = s.join('');
        }
        printBt(s + cp, cl, 2 * v + 1);
    }
}

// wstawianie wartości v do kopca

// To też wymaga dokładniejszego przeanalizowania

function heapPush(v) {
    var i, j;

    i = n;
    n++;
    j = Math.floor((i - 1) / 2);

    while(i > 0 && T[j] < v) {
        T[i] = T[j];
        i = j;
        j = Math.floor((i - 1) / 2);
    }

    T[i] = v;
}


// Nie jestem przekonany co do tego czy ten heapPop działa tak jak powinien
function heapPop() {
    if (n === 0) return;

    n -= 1;
    var i = 0,
        j = 1,
        v = T[n];

    while (j < n) {
        if (j + 1 < n && T[j + 1] > T[j]) j++;
        if (v >= T[j]) break;

        T[j] = T[i];
        i = j;
        j = Math.floor(2 * j + 1);
    }

    T[i] = v;
}

var cr = String.fromCharCode(9484).concat(String.fromCharCode(9472)); // ┌─
var cl = String.fromCharCode(9492).concat(String.fromCharCode(9472)); // └─
var cp = String.fromCharCode(9474).concat(String.fromCharCode(32)); // "│ "


for(i = 0; i < 15; i++) {
    v = Math.round(Math.random() * 100);
    console.log('Wstawiam liczbę ' + v);
    heapPush(v);
}

console.log(T);

printBt("", "", 0);

heapPop();

console.log('\n A teraz po usunięciu pierwszego elementu \n');

printBt("", "", 0);

















//
