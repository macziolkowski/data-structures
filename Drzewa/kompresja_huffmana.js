var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.prompt(
    console.log('Please provide signs and binary code for each sign')
);
rl.on('line', function(line) {

});

function replaceAt(text, index, val) {
    return text.substr(0, index) + val + text.substr(index + 1);
}

function tNode (left, right, key) {
    this.left = left;
    this.right = right;
    this.key = key;
}


// Tworzymy z danych wejściowych
// drzewo kodu bezprzystankowego
//------------------------------

function makeT(root) {
    var n, i, j;
    var s, b, p;

    root = new tNode(null, null, null);

    // !!! Tutaj odczytujemy liczbę definicji
    // To wymaga podania przeze mnie
    // Trzeba to przeredagować

    for (i = 0; i < n; i++) {
        // Tutaj będziemy czytać znak i kod.
        // Trzeba to będzie przekazać w tablicy dwuwymiarowej
        // Do funkcji

        p =  root;

        for (j = 0; j < b.length; j++) {
            if (b[j] == '0') {
                if (!p.left) {
                    p.left = new tNode(null, null, null);
                }
                p = p.left;
            } else {
                if (!p.right) {
                    p.right = new tNode(null, null, null);
                }
                p = p.right;
            }
        }

        p.key = s;
    }
}


function decodeT(root) {
    var p, b, i;

    // W tym miejscu musimy odczytać kod

    p = root;

    for (i = 0; i < b.length; i++) {
        if (b[i] == '0') {
            p = p.left;
        } else {
            p = p.right;
        }

        if (!p.left) {
            console.log(p.key);
            p = root;
        }
    }
}

function dfsRelease(v) {
    if (v) {
        dfsRelease(v.left);
        dfsRelease(v.right);

        v.left = null;
        v.right = null;
        v.key = null;
    }
}






















//
