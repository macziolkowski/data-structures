// W sumie to nie wiem czemu nie działa
// Ale nie chce mi się tego teraz sprawdzać
// Ale ostatecznie trzeba

var n, m, cv, sptr;
var A;                      // Macierz sąsiedztwa
var S;                      // Stos w tablicy
var D;                      // Tablica numerów wierzchołków
var E = [];                 // Tablica wierzchołków - graf z cyklem Eulera
var E2 = [];                // Tablica wierzchołków - graf ze ścieżką Eulera
var i, j, v1;
var VD;                             // Stopnie wierzchołków

n = 9;
m = 14;

VD = new Array(n);
A = new Array(n);
S = new Array(m + 1);       // Tworzymy pusty stos
D = new Array(n);
sptr = 0;

E.push([1,4], [1,6]);
E.push([2,3], [2,5]);
E.push([3,4], [3,5], [3,7]);
E.push([4,5], [4,6], [4,7], [4,8]);
E.push([5,6]);
E.push([6,7]);
E.push([7,8]);


E2.push([0,1], [0,6]);
E2.push([1,4], [1,6], [1,8]);
E2.push([2,7], [2,8]);
E2.push([4,6], [4,7]);
E2.push([5,7], [5,8]);
E2.push([6,7]);
E2.push([7,8]);



for (i = 0; i < n; i++) {
    VD[i] = 0;
}

for (i = 0; i < n; i++) {
    A[i] = new Array(n);
    for (j = 0; j < n; j++) {
        A[i][j] = 0;
    }
}

for (i = 0; i < m; i++) {
    A[E[i][0]][E[i][1]] = 1;        // Krawędź v1 -> v2 obecna
    A[E[i][1]][E[i][0]] = 1;        // Krawędź v2 -> v1 obecna
    VD[E[i][0]]++;
    VD[E[i][1]]++;                  // Obliczamy stopnie v1 i v2
}


// Funckja wyszukująca mosty w grafie
// Wejscie:
// v - numer wierzchołka startowego
// vf - ojciec wierzchołka v na drzewie rozpinającym
// Wyjscie:
// Parametr Low dla wierzchołka v
//-----------------------------------------------------------------------------

function dfsB(v, vf) {
    var low, temp, i;

    D[v] = cv;                  // Numerujemy Wierzchołek
    low = cv;                   // Wstępna wartość Low
    cv++;                       // Numer dla następnego wierzchołka
    for (i = 0; i < n; i++) {
        if (A[v][i] && (i != vf)) {
            if (!D[i]) {        // Jeśli sąsiad nieodwiedzony
                temp = dfsB(i, v);      // to wywołujemy rekurencyjnie dfsB()
                if (temp < low) low = temp;     // Modyfikujemy low
            } else if (D[i] < low) low = temp;
        }
    }

    if ((vf > -1) && (low == D[v])) {   // Mamy most?
        A[vf][v] = A[v][vf] = 2;        // Oznaczamy krawedz vf-v jako most
    }

    return low;
}


// Procedura wyszukuje cykl lub ścieżkę Eulera
// Wejscie:
// v - wierzchołek startowy
//------------------------------------------------------------------------------

function findEuler(v, m) {
    var u, w, i;

    while (true) {
        S[sptr++] = v;
        for (u = 0; (u < n) && !A[v][u]; u++) {  // Szukamy pierwszego sąsiada v
            if (u == n) break;                 // Nie ma sąsiadów, kończymy
        }

        for (i = 0; i < n; i++) D[i] = 0;       // Zerujemy tablicę D

        cv = 1;                                 // Numer pierwszego wierzchołka dla DFS
        dfsB(v, -1);

        // Szukamy krawędzi nie będącej mostem

        for (w = u + 1; (A[v][u] == 2) && (w < n); w++) {
            if (A[v][w]) u = w;
        }

        A[v][u] = A[u][v] = 0;       // Usuwamy krawędź v-u
        v = u;
    }
}


// **********************
// *** Program główny ***
// **********************

// Szukamy pozycji startowej

for (v1 = 0; v1 < n; v1++) {
    if (VD[v1]) break;
}

for (i = v1; i < n; i++) {
    if (VD[i] % 2) {
        v1 = i;
        break;
    }
}

// Wyznaczamy cykl lub ścieżkę Eulera
findEuler(v1, A);

// Wypisujemy zawartość stosu

if (VD[v1] % 2) {
    console.log('Eulerian path:')
} else {
    console.log('Eulerian cycle:')
}

for (i = 0; i < sptr; i++) console.log(S[i]);




















//
