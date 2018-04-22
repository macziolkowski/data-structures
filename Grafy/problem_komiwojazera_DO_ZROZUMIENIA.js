// Algorytm rozwiązujący problem komiwojażera dla małych grafówarn
// w sumie nie łapię co ten algorytm robi takiego

var MAXINT = 2147483647;

var n, m, v0, d, dh, sptr, shptr;
var A;          // Macierz sąsiedztwa
var W;          // Macierz wag krawędzi
var S, Sh;      // Stosy w tablicy
var visited;    // Tablica odwiedzin
var E = [];     // Tablica krawędzi


// Rekurencyjna procedura poszukiwania cyklu Hamiltona
// o najmniejszej sumie wag krawędzi
// v - wierzchołek bieący

function TSP(v) {
    var u;

    Sh[shptr++] = v;            // Zapamiętujemy na stosie bieżący wierzchołek

    if (shptr < n) {            // Jeśli brak ścieżki Hamiltona, to jej szukamy
        visited[v] = true;      // Oznaczamy bieżący wierzchołek jako odwiedzony
        for (u = 0; u < n; u++) {
            if (A[v][u] && !visited[u]) {   // Szukamy jeszcze nieodwiedzonego sąsiada
                dh += W[v][u];      // Dodajemy wagę krawędzi v-u do sumy
                TSP(u);             // Rekurencyjnie wywołujemy szukanie cyklu Hamiltona
                dh -= W[v][u];      // Usuwamy wagę krawędzi z sumy
            }
        }
        visited[v] = false;         // Zwalniamy bieżący wierzchołek
    } else if (A[v0][v]) {          // Jeśli znaleziona ścieżka jest cyklem Hamiltona
        dh += W[v][v0];             // to sprawdzamy czy ma najmniejszą sumę wag
        if (dh < d) {               // Jeśli tak
            d = dh;                 // To zapamiętujemy tę sumę
            for (u = 0; u < shptr; u++) {   // Oraz kopiujemy stos Sh do S
                S[u] = Sh[u];
            }
            sptr = shptr;
        }
        dh -= W[v][v0];             // Usuwamy wagę krawędzi v-v0 z sumy
    }
    shptr--;
}

// **********************
// *** Program główny ***
// **********************

var i, j;
n = 8;
m = 16;

E.push([0,1,2], [0,2,2], [0,3,4], [0,4,3]);
E.push([1,2,2], [1,5,1], [1,6,1]);
E.push([2,4,2], [2,5,1]);
E.push([3,5,2], [3,7,3]);
E.push([4,6,4], [4,7,5]);
E.push([5,6,2], [5,7,2]);
E.push([6,7,2]);

S = new Array(n);
Sh = new Array(n);
visited = new Array(n);
A = new Array(n);
W = new Array(n);

for (i = 0; i < n; i++) {
    A[i] = new Array(n);
    W[i] = new Array(n);
    for (j = 0; j < n; j++) {
        A[i][j] = false;
        W[i][j] = 0;
    }
    visited[i] = false;
}

sptr = shptr = 0;

// Odczytujemy krawędzie

for (i = 0; i < m; i++) {
    A[E[i][0]][E[i][1]] = A[E[i][1]][E[i][0]] = true; // Istnienie krawędzi x-y
    W[E[i][0]][E[i][1]] = W[E[i][1]][E[i][0]] = E[i][2]; // Waga krawędzi x-y
}

// Rozpoczynamy algorytm

d = MAXINT;
dh = v0 = 0;
TSP(v0);

txt = '';
if (sptr) {
    for (i = 0; i < sptr; i++) txt += S[i] + ' ';
    txt += v0;
    console.log(txt);
    console.log('d = ' + d);
} else {
    console.log('No hamilton cycle')
}












//
