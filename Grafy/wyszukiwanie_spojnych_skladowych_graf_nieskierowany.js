function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function stack () {
    var S

    this.empty = function ()  {
        return !S;
    }

    this.top = function () {
        if (S) {
            return S.data;
        }
    }

    this.push = function (v) {
        var p = new slistel(v, S);
        S = p;
    }

    this.pop = function() {
        if (S) {
            var p = S;
            S = S.next;
            p.data = null;
            p.next = null;
        }
    }
}

// **********************
// *** Program główny ***
// **********************

var n = 17, m = 17;
var A = new Array(n);
var C = new Array(n);
var E = []; // Tablica krawędzi
var S = new stack();
var cn, i, j, v, u;

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

for (i - 0; i < n; i++) {
    A[i] = null;
    C[i] = 0;
}

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]); // Tworzymy krawedz w jedna strone
    A[E[i][0]] = p;
    p = new slistel(E[i][0], A[E[i][1]]); // Tworzymy krawedz w druga strone
    A[E[i][1]] = p;
}

cn = 0;  // Zerujemy licznik spojnych skladowych

for (i = 0; i < n; i++) {
    if (!C[i]) {
        cn++;
        S.push(i);
        C[i] = cn;
        while(!S.empty()) {
            v = S.top(); // Pobieramy wierzchołek
            S.pop(); // Usuwamy go ze stosu

            // Przegladamy sasiadow wierzcholka

            for (p = A[v]; p; p = p.next) {
                u = p.data;
                if (!C[u]) {
                    S.push(u); // Na stos idą sąsiedzi nieodwiedzeni
                    C[u] = cn; // i ponumerowani
                }
            }
        }
    }
}

for (i = 1; i <= cn; i++) {
    console.log('SCC : ' + i + ' : ');  // Numer spójnej składowej
    for (j = 0; j < n; j++) {
        if (C[j] == i) console.log(j); // Wierzchołki tej składowej
    }
}
















//
