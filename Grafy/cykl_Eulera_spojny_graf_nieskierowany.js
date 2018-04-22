var n, m, sptr;
var i, j;
var A;
var S;
var E = [];                     // Tablica krawędzi

n = 6;
m = 10;
A = new Array(n);
S = new Array(m + 1);
sptr = 0;

E.push([0,4], [0,5]);
E.push([1,2], [1,3], [1,4], [1,5]);
E.push([2,3], [2,4], [2,5]);
E.push([4,5]);

for (i = 0; i < n; i++) {
    A[i] = new Array(n);
    for (j = 0; j < n; j++ ) {
        A[i][j] = 0;
    }
}

for (i = 0; i < m; i++) {
    A[E[i][0]][E[i][1]]++;
    A[E[i][1]][E[i][0]]++;
}

function dfsEuler(v) {
    var i;

    for (i = 0; i < n; i++) {
        while(A[v][i]) {
            A[v][i]--;          // Usuwamy krawędź
            A[i][v]--;
            dfsEuler(i);        // Rekurencja
        }
    }
    S[sptr++] = v;              // Wierzchołek v umieszczamy na stosie
}


// **********************
// *** Program główny ***
// **********************


// Wyznaczamy cykl Eulera


dfsEuler(0);

console.log('Eulerian cycle: ');

for (i = 0; i < sptr; i++) console.log(S[i]);







//
