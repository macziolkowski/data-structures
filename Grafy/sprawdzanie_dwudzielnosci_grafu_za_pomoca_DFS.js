var MAXINT = -2147483647;

function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function queue() {
    var head;
    var tail;

    this.empty = function() {
        return !head;
    }

    this.front = function() {
        if (head) {
            return head.data;
        } else {
            return -MAXINT;
        }
    }

    this.push = function(v) {
        var p = new slistel(v, null);
        if (tail) {
            tail.next = p;
        } else {
            head = p;
        }
        tail = p;
    }

    this.pop =  function() {
        if (head) {
            var p = head;
            head = head.next;
            if (!head) tail = null;
            p.data = null;
            p.next = null;
        }
    }
}



// Funkcja testuje dwudzielność grafu
// n - liczba wierzchołków grafu
// A - tablica list sąsiedztwa
//------------------------------------------------------------------------------

function isBipartite(n, A) {
    var Q = new queue();
    var C, v, u, i, p;

    C = new Array(n);        // Tworzymy tablicę kolorów
    for (i = 0; i < n; i++) C[i] = 0;

    for (i = 0; i < n; i++) {   // Przechodzimy przez kolejne wierzchołki
        if (!C[i]) {            // Szukamy wierzchołka szarego
            C[i] = 1;
            Q.push(i);

            while (!Q.empty()) {    // Przejście BFS
                v = Q.front();      // Pobieramy wierzchołek z kolejki
                Q.pop();
                for (p = A[v]; p; p = p.next) { // Przeglądamy sąsiadów wierzchołka V
                    u = p.data;
                    if (C[u] == C[v]) {
                        return false;
                    }

                    if (!C[u]) {
                        C[u] = -C[v];  // Kolorujemy sąsiada na kolor przeciwny
                        Q.push(u);     // i umieszczamy go w kolejce
                    }
                }
            }
        }
    }

    return true;
}

// **********************
// *** Program główny ***
// **********************

var n, m, i, p, r, A;
var E = [];         // Tablica krawędzi

n = 17;
m = 23;
A = new Array(n);
for (i = 0; i < n; i++) A[i] = null;

E.push([0,2], [0,3]);
E.push([1,2], [1,14]);
E.push([2,6]);
E.push([3,4], [3,6], [3,13]);
E.push([4,7], [4,12]);
E.push([5,6], [5,9], [5,10]);
E.push([6,7], [6,8], [6,12]);
E.push([7,13]);
E.push([8,9]);
E.push([10,11], [10,14], [10,15]);
E.push([11,16]);
E.push([12,16]);

// E.push([0,2], [0,3]);
// E.push([1,2], [1,14]);
// E.push([2,6]);
// E.push([3,4], [3,6], [3,13]);
// E.push([4,7], [4,12]);
// E.push([5,6], [5,3], [5,10]);
// E.push([6,1], [6,8], [6,12]);
// E.push([7,0]);
// E.push([8,0]);
// E.push([10,11], [10,14], [10,15]);
// E.push([11,16]);
// E.push([12,16]);

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
    p = new slistel(E[i][0], A[E[i][1]]);
    A[E[i][1]] = p;
}

if (isBipartite(n, A)) {
    console.log('Bipartiate graph');
} else {
    console.log('Not a bipartiate graph');
}

















//
