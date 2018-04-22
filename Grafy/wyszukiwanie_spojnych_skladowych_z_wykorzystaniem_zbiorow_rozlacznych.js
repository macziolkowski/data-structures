function tNode() {
    this.up = null; // Rodzic wezla
    this.rank = null; // Ranga
    this.data = null; // Zawartosc wezla
}


// Tworzy drzewo jednowezlowe
//--------------------------------

function makeSet(x) {
    x.up = x;
    x.rank = 0;
}

function findSet(x) {
    if (x.up != x) x.up = findSet(x.up);
    return x.up;
}

function unionSets(x, y) {
    var rx, ry;

    rx = findSet(x); // Korzen drzewa z wezlem x
    ry = findSet(y); // Korzen drzewa z wezlem y
    if (rx != ry) { // Korzenie muszą być rózne
        if (rx.rank > ry.rank) {
            ry.up = rx;
        } else {
            rx.up = ry;
            if (rx.rank == ry.rank) ry.rank++;
        }
    }
}

// **********************
// *** Program głowny ***
// **********************

var n = 17; m =17;
var T = new Array(n);
var E = []; // Tablica krawędzi
var i, j, v, u;

E.push([0,1], [0,2], [0,3]);
E.push([1,2], [1,14]);
E.push([4,11], [4,12]);
E.push([5,6], [5,9]);
E.push([6,7], [6,8]);
E.push([10,15]);
E.push([12,15]);
E.push([11,15]);
E.push([13,14], [13,16]);
E.push([14,16]);

for (i = 0; i < n; i++) {
    T[i] = new tNode();
    T[i].data = i;      // Numer wezla
    makeSet(T[i]);
}

console.log(T);

// Odczytujemy kolejne definicje krawedzi
for (i = 0; i < m; i++) {
    unionSets(T[E[i][0]], T[E[i][1]]); // Laczymy zbiory z u i v
}

// Wypisujemy wyniki
for (i = 0; i < n; i++) {
    if (i == findSet(T[i]).data) {
        console.log('SCC id = ' + i + ' : ');
        for (j = 0; j < n; j++) {
            if (i == findSet(T[j]).data) console.log(j);
        }
    }
}
