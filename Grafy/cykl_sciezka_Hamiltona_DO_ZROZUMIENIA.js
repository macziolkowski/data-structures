// W grafie może być więcej niż jeden cykl i jedna ścieżka Hamiltona

function slistel(data, next) {
    this.data = data;
    this.next = next;
}


var n, m;
var graf;
var S;
var sptr;
var visited;
var E = [];


// Rekurencyjna procedura wyznaczająca ścieżki i cykle Hamiltona;
// v - wierzchołek bieżący
//------------------------------------------------------------------------------

function dfsHamilton (v) {
    var i;
    var test;
    var p;

    S[sptr++] = v;      // Wierzchołek v na stos
    if (sptr < n) {
        visited [v] = true;
        for (p = graf[v]; p; p = p.next) {      // przeglądamy sąsiadów v
            if (!visited[p.data]) dfsHamilton(p.data);   // Wywołanie rekurencyjne
        }
        visited[v] = false;         // Wycofujemy się z v (Dlaczego ???)
    } else {
        var txt = '';
        test = false;              // Zakładaym brak cyklu
        for (p = graf[v]; p; p = p.next) { // Przeglądaym sąsiadów
            if (!p.data) {              // Jeśli sąsiadem jest wierzchołek 0
                test = true;            // to mamy cykl
                break;
            }
        }

        for (i = 0; i < sptr; i++) {
            txt += S[i] + ' ';
        }
        // Dla cyklu dopisujemy wierzchołek startowy
        if (test) txt += '0';

        if (test) {
            console.log('Hamilton Cycle: ' + txt);
        } else {
            console.log('Hamilton Path: ' + txt);
        }

    }
    sptr--;             // Wierzchołek v usuwamy ze stosu (Dlaczego ???);
}

// **********************
// *** Program główny ***
// **********************

var i, p, r;

n = 8;
m = 13;

E.push([0,1], [0,3], [0,4]);
E.push([1,2], [1,4], [1,5]);
E.push([2,3], [2,6]);
E.push([3,5], [3,6]);
E.push([4,7]);
E.push([5,7]);
E.push([6,7]);

graf = new Array(n);
visited = new Array(n);
S = new Array(n);
sptr = 0;

for (i = 0; i < n; i++) {
    graf[i] = null;
    visited[i] = false;
}

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], graf[E[i][0]]);
    graf[E[i][0]] = p;
    p = new slistel(E[i][0], graf[E[i][1]]);
    graf[E[i][1]] = p;
}

dfsHamilton(0);
























//
