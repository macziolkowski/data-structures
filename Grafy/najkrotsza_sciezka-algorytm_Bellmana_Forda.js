var MAXINT = 2147483647;

function slistel(data, next, weight) {
    this.data = data;
    this.next = next;
    this.weight = weight;
}


var m, n;
var A;              // Tablica dynamiczna list sąsiedztwa
var d;              // Tablica kosztów dojścia
var p;              // Tablica poprzedników
var E = [];         // Tablica krawędzi


// Funkcja wyznacza najkrótsze ścieżki
// v - wierzchołek startowy
// Wyjście:
// true - wyniki w d i p;
// false - graf zawiera ujemny cykl

function BF(v) {
    var i, x;
    var test;
    var pv;

    d[v] = 0;           // Zerujemy koszt dojścia do v
    for (i = 1; i < n; i++) {   // Pętla relaksacji
        test = true;            // Oznacza, że algorytm nie wprowadził zmian do d i p
        for (x = 0; x < n; x++) {   // Przechodzimy przez kolejne wierzchołki grafu
            for (pv = A[x]; pv; pv = pv.next) { // Przeglądamy listę sąsiadów wierzchołka x
                if (d[pv.data] > d[x] + pv.weight) {
                    test = false;           // Jest zmiana w d i p;
                    d[pv.data] = d[x] + pv.weight;    // Relaksujemy krawędź z x do jego sąsiada
                    p[pv.data] = x;                 // Poprzednikiem sąsiada będzie x
                }
            }
        }
        if (test) return true;      // Jeśli nie było zmian, to kończymy
    }

    for (x = 0; x < n; x++) {
        for (pv = A[x]; pv; pv = pv.next) {
            if (d[pv.data] > d[x] + pv.weight) return false;    // Ujemny cykl
        }
    }
}


// **********************
// *** Program główny ***
// **********************

var v, x, y, w, sptr, S;
var rv, pv;

v = 0;      // Wierzchołek startowy
n = 6;      // Liczba wierzchołków
m = 11;     // Liczba krawędzi

E.push([0, 1, 5]);
E.push([1, 3, 3], [1, 4, 9]);
E.push([2, 0, 3], [2, 1, -4]);
E.push([3, 4, 3], [3, 5, 2]);
E.push([4, 2, -1], [4, 5, -5]);
E.push([5, 0, 9], [5, 2, 8]);

A = new Array(n);
d = new Array(n);
p = new Array(n);
for (i = 0; i < n; i++) {
    d[i] = MAXINT;
    p[i] = -1;
    A[i] = null;
}

for (i = 0; i < m; i++) {
    pv = new slistel(E[i][1], A[E[i][0]], E[i][2]);
    A[E[i][0]] = pv;
}


// Wyznaczamy najkrótsze ścieżki algorytmem Bellmana-Forda

if (BF(v)) {
    S = new Array(n);           // Tworzymy prosty stos
    sptr = 0;
    var txt = '';

    for (i = 0; i < n; i++) {
        txt += i + ': ';

        for (x = i; x != -1; x = p[x]) {    // Wierzchołki ścieżki umieszczamy na stosie
            S[sptr++] = x;                  // W kolejności od ostatniego do pierwszego
        }

        while (sptr) {
            txt += S[--sptr] + " ";
        }

        txt += '  $' + d[i];
        console.log(txt);
        txt = '';
    }
} else {
    console.log('Negative cycle found');
}
















//
