// Ogólnie to nie rozumiem dlaczego ten algorytm Tarjana działa
// Nie kumam tych zależności które są tu wykoszystane i jak autor na nie wpadł
// Jest bug ale nie wiem czemu


function slistel(data, next) {
    this.data = data;
    this.next = next;
}

// Zmienne globalne

var n, m, dv;       // Liczba wierzchołków, krawędzi, numeracja
var graf;           // Tablica list sąsiedztwa
var D;              // Numery DFS
var L;              // Lista mostów
var E = [];         // Tablica krawędzi

n = 8;
m = 11;

E.push([0,1], [0,2], [0,3], [0,5]);
E.push([1,4], [1,5]);
E.push([2,3]);
E.push([3,6], [3,7]);
E.push([4,5]);
E.push([6,7]);


// Funkcja rekurencyjna wyszukująca punkty artykulacji
// v - numer bieżącego wierzchołka
// vf - ojciec bieżącego wierzchołka na drzewie rozpinającym
// Reszta parametrów to zmienne globalne
//------------------------------------------------------------------------------

function dfsAp(v, vf) {
    var low, temp, u;
    var test;
    var p;

    D[v] = low = dv++; // Jak mam rozumieć tę linijkę?

    test = false;

    for (p = graf[v]; p; p = p.next) { // Przeglądamy listę sąsiadów
        u = p.data;                    // Numer wierzchołka sąsiada
        if (u != vf) {                 // u nie może być ojcem v
            if (!D[u]) {
                console.log('Odwiedzam ' + u);               // Jeśli sąsiad nie był odwiedzany
                temp = dfsAp(u,v);     // rekurencyjnie odwiedzamy go
                if (temp < low) low = temp;
                if (temp >= D[v]) test = true;   // test na punkt artykulacji
            }
            else if (D[u] < low) low = D[u];
        }
    }

    // Wszyscy sąsiedzi zostali odwiedzeni, sprawdzamy wynik testu

    if (test) {
        p = new slistel(v, L);
        L = p;
    }

    return low;
}


// **********************
// *** Program główny ***
// **********************

var i, nc;
var p, r;

graf = new Array(n);        // Tworzymy zmienne dynamiczne
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

// Szukamy punktów artykulacji

for (v = 0; v < n; v++) {
    if (!D[v]) {
        dv = 2          // Numer DFS dla pierwszego syna
        nc = 0;         // Zerujemy licznik synów
        D[v] = 1;       // Korzeń ma zawsze numer DFS 1
        for (p = graf[v]; p; p = p.next) {  // Przeglądamy sąsiadów v
            u = p.data;
            if (!D[u]) {
                nc++;
                dfsAp(u, v);
            }
        }
    }

    if (nc > 1) {      // Czy korzeń jest punktem artykulacji
        p = new slistel(v, L);
        L = p;
    }
}


// Wypisujemy znalezione punkty artykulacji

while (L) {
    console.log(L.data);
    p = L;
    L = L.next;
    p.data = null;
    p.next = null;
}

















//
