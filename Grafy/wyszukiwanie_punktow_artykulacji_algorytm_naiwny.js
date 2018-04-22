function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function stack() {
    var S;

    this.empty = function() {
        return !S;
    }

    this.top = function() {
        return S.data;
    }

    this.push = function(v) {
        var e = new slistel(v, S);
        S = e;
    }

    this.pop = function() {
        if (S) {
            var e = S;
            S = S.next;
            e.data = null;
            e.next = null;
        }
    }
}


// Funkcja oblicza liczbę spójnych składowych w grafie
// n - liczba wierzchołków w grafie
// graf - tablica list sąsiedztwa
// VU - tablica dostępności krawędzi grafu
//------------------------------------------------------------------------------

function cnn(n, graf, VU) {
    var C, cc, i, v, u;
    var S = new stack();
    var p;

    C = new Array(n);               // Tworzymy tablicę spójnych składowych
    for (i = 0; i < n; i++) C[i] = 0;
    cc = 0;                         // Zerujemy licznik spójnych składowych

    for (i = 0; i < n; i++) {
        if (VU[i] && !C[i]) {      // Szukamu nieodwiedzonego jeszcze wierzchołka
            cc++;
            S.push(i);
            C[i] = cc;
            while(!S.empty()) {
                v = S.top();
                S.pop();
                for (p = graf[v]; p; p = p.next) {
                    u = p.data;
                    if (VU[u] && !C[u]) {
                        S.push(u);
                        C[u] = cc;
                    }
                }
            }
        }
    }

    return cc;
}


// **********************
// *** Program główny ***
// **********************

var n, m;
var A;
var E = [];
var nc, i;
var L, p, r;
var VU;

n = 8;
m = 11;

VU = new Array(n);
A = new Array(n);

for (i = 0; i < n; i++) {
    A[i] = null;
    VU[i] = true;
}

E.push([0,1], [0,2], [0,3], [0,5]);
E.push([1,4], [1,5]);
E.push([2,3]);
E.push([3,6], [3,7]);
E.push([4,5]);
E.push([6,7]);

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
    p = new slistel(E[i][0], A[E[i][1]]);
    A[E[i][1]] = p;
}

// Algorytm znajdowania punktów artykulacji

L = null;
nc = cnn(n, A, VU);

for (v = 0; v < n; v++) {
    VU[v] = false;
    if (cnn(n, A, VU) > nc) {
        p = new slistel(v, L);
        L = p;
    }
    VU[v] = true;
}

while (L) {
    console.log(L.data);
    p = L;
    L = L.next;
    p.data = null;
    p.next = null;
}
























//
