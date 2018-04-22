// Bardzo złożony algorytm, później wartoby mu poświęcić trochę czasu, żeby go
// lepiej zrozumieć - czemu w ogóle on działa
//-----------------------------------------------------------------------------


function slistel(data, next) {
    this.data = data;
    this.next = next;
}

var n = 17, m = 17;
var cv;       // Liczba wierzchołków, krawędzi, numeracja
var graf;           // Tablica list sąsiedztwa
var D;              // Numery DFS
var L;              // Lista mostów
var E = [];         // Tablica krawędzi

E.push([0,1], [0,2], [0,3]);
E.push([1,2], [1,14]);
E.push([4,11], [4,12]);
E.push([5,6], [5,9]);
E.push([6,7], [6,8]);
E.push([10,15]);
E.push([11,15]);
E.push([12,15]);
E.push([13,14], [13,16]);
E.push([14,16]);

// Funkcja rekurencyjna wyszukująca mosty
// v - numer bieżącego wierzchołka
// vf - ojciec bieżącego wierzchołka na drzewie rozpinającym
// Reszta parametrów to zmienne globalne
//------------------------------------------------------------------------------

function DFSb(v, vf) {
    var low, temp, u;
    var p;

    // Numerujemy wierzchołek, ustalamy wstępną wartość 'low' oraz zwiększamy numerację

    D[v] = low = cv++;

    for (p = graf[v]; p; p = p.next) {      // Przeglądamy listę sąsiadów
        u = p.data;                         // u - numer wierchołka sąsiada
        if (u != vf) {                      // u nie może być ojcem v
            if (!D[u]) {                    // Jeśli sąsiad u nie był odwiedzany, to
                temp = DFSb(u, v);          // rekurencyjnie odwiedzamy go
                if (temp < low) low = temp;
            } else if (D[u] < low) {
                low = D[u];
            }
        }
    }

    // Wszyscy sąsiedzi zostali odwiedzeni. Teraz robimy test na most.

    if ((vf > - 1) && (low == D[v])) {
        p  = new slistel(v, L);
        L = p;
        p = new slistel(vf, L);
        L = p;
    }

    return low;         // Wynik
}

// **********************
// *** Program główny ***
// **********************

var i;
var p, r;

graf = new Array(n);
D = new Array(n);
L = null;

for (i = 0; i < n; i++) {
    graf[i] = null;
    D[i] = 0;
}

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], graf[E[i][0]]);
    graf[E[i][0]] = p;
    p = new slistel(E[i][0], graf[E[i][1]]);
    graf[E[i][1]] = p;
}

// Szukamy mostów

for (i = 0; i < n; i++) {
    if (!D[i]) {            // Szukamy nieodwiedzoneg wierzchołka
        cv = 1;             // Początek numeracji DFS
        DFSb(i, -1);        // Szukamy mostów
    }
}

// Wypisujemy znalezione mosty

v = 0;
text = '';

while (L) {
    text += L.data + ' ';
    v ^= 1;
    if (!v) {
        console.log(text);
        text = '';
    }
    p = L;
    L = L.next;
    p.data = null
    p.next = null;
}

















//
