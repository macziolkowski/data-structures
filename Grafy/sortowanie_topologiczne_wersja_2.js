function slistel(data, next) {
    this.data = data;
    this.next = next;
}

var sptr, S;
var graf;
var visited;
var E = [];

var WHITE = 0;          // Kolory wierzchołków
var GRAY = 1;
var GREEN = 2;


// Rekurencyjna funkcja dokonująca sortowania topologicznego
// v - wierzchołek startowy
//------------------------------------------------------------------------------

function dfsTSort(v) {
    var p;

    if (visited[v] == GRAY) {      // Sprawdzamy, czy nie ma cyklu
        console.log ('Not a directed acyclic graph');  // Jest cykl
        return false;           // Sortowanie nie może zostać wykonane
    }

    if (visited[v] == WHITE) {
        visited[v] = GRAY;
        for (p = graf[v]; p; p = p.next) {
            if (!dfsTSort(p.data)) return false;
        }
        visited[v] = GREEN;     // Wierzchołek kolorujemy na zielono
        S[sptr++] = v;          // i umieszczamy go na stosie
    }

    return true;
}

// **********************
// *** Program główny ***
// **********************

var n, m, i;
var p, r;

n = 6;
m = 10;

E.push([0,2]);
E.push([1,0], [1,2]);
E.push([3,0], [3,1], [3,4]);
E.push([4,1], [4,2]);
E.push([5,0], [5,4]);


graf = new Array(n);
S = new Array(n);
sptr = 0;
visited = new Array(n);

for (i = 0; i < n; i++) {
    graf[i] = null;
    visited[i] = WHITE;
}

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], graf[E[i][0]]);
    graf[E[i][0]] = p;
}

//console.log(graf);

// Wykonujemy sortowanie topologiczne

for (i = 0; i < n; i++) {
    if (visited[i] == WHITE) {
        if (!dfsTSort(i)) break;
    }
}

// Wypisujemy wyniki


if (sptr == n) {
    for (i = n -1; i >= 0; i--) console.log(i);
}

















//
