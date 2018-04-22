function slistel(data, next) {
    this.data = data;
    this.next = next;
}

var graf;       // Tablica list sąsiedztwa grafu
var T;          // Tablica list sąsiedztwa drzewa rozpinającego
var visited;    // Tablica odwiedzin


// Rekurencyjna funkcja tworzenia drzewa rozpinającego w głąb
// v - numer wierzchołka startowego
// reszta zmiennych globalna
//-----------------------------------------------------------------------

function dfsTree(v) {
    var p, r;
    var u;

    visited[v] = true;          // Oznaczamy wierzchołek jako odwiedzony
    for (p = graf[v]; p; p = p.next) {
        u = p.data;
        if (!visited[u]) {     // Interesują nas tylko nieodwiedzeni sąsiedzi
            r = new slistel(u, T[v]);   // Dodajemy do listy T[v]s
            T[v] = r;
            dfsTree(u);       // Rekurencyjnie tworzymy drzewo
        }
    }
}


// **********************
// *** Program główny ***
// **********************

var n, m, i;
var p, r;

n = 17;
m = 24;

graf = new Array(n);
T = new Array (n);
visited = new Array(n);

var E = []; // Tablica krawędzi

E.push([0,1], [0,2], [0,3]);
E.push([1,2], [1,9], [1,14]);
E.push([2,6]);
E.push([3,4], [3,6]);
E.push([4,12], [4,13]);
E.push([5,6], [5,9]);
E.push([6,7], [6,8], [6,12]);
E.push([7,13]);
E.push([10,11], [10,14], [10,15]);
E.push([11,16]);
E.push([12,16]);
E.push([13,16]);
E.push([14,15]);

// Odczytujemy kolejne definicje krawędzi

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], graf[E[i][0]]);
    graf[E[i][0]] = p;
    p = new slistel(E[i][0], graf[E[i][1]]);
    graf[E[i][1]] = p;
}


// Tworzymy drzewo rozpinające graf

dfsTree(6);

// Wyświetlamy tablicę list sąsiedztwa drzewa rozpinającego

for (i = 0; i < n; i++) {
    console.log(i + ' :');
    for (p = T[i]; p; p = p.next) console.log('--' + p.data);
}
