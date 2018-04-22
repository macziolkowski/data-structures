function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function stack () {
    var S;

    this.empty = function () {
        return !S;
    }

    this.top = function () {
        return S.data;
    }

    this.push  = function (v) {
        var p = new slistel(v, S);
        S = p;
    }

    this.pop = function () {
        if (S) {
            var e = S;
            S = S.next;
            e.data = null;
            e.next = null;
        }
    }
}

// **********************
// *** Program główny ***
// **********************

var n = 17, m = 28 , k = 26;
var A = new Array(n);
var visited = new Array(n);
var S = new stack();
var i, vc, p, r;
var E = []; // Tablica krawędzi grafu spójnego
var T = []; // Tablica krawędzi grafu niespójnego

E.push([0,1], [0,2], [0,3]);
E.push([1,2], [1,5], [1,9], [1,14]);
E.push([2,5], [2,6]);
E.push([3,4], [3,6]);
E.push([4,12], [4,13]);
E.push([5,6], [5,8], [5,9]);
E.push([6,7], [6,8], [6,12]);
E.push([7,13]);
E.push([8,9], [8,10]);
E.push([10,14], [10,15]);
E.push([11,16]);
E.push([12,16]);
E.push([13,16]);
E.push([14,15]);

T.push([0,1], [0,2], [0,3]);
T.push([1,2], [1,5], [1,9]);
T.push([2,5], [2,6]);
T.push([3,4], [3,6]);
T.push([4,12], [4,13]);
T.push([5,6], [5,8], [5,9]);
T.push([6,7], [6,8], [6,12]);
T.push([7,13]);
T.push([8,9]);
T.push([10,14], [10,15]);
T.push([11,16]);
T.push([12,16]);
T.push([13,16]);
T.push([14,15]);

for (i = 0; i < n; i++) {
    A[i] = null;
    visited[i] = false;
}

for (i = 0; i < k; i++) {
    p = new slistel(T[i][1], A[T[i][0]]);
    A[T[i][0]] = p;
    p = new slistel(T[i][0], A[T[i][1]]);
    A[T[i][1]] = p;
}

vc = 0;
S.push(0);
visited[0] = true;

while (!S.empty()) {
    v = S.top();
    S.pop();
    vc++;
    for (p = A[v]; p; p = p.next) { // Przeglądamy sąsiadów
        u = p.data;
        if (!visited[u]) {
            visited[u] = true;  // Oznaczamy wierzchołek jako odwiedzony
            S.push(u);          // i umieszczamy go na stosie
        }
    }
}

// Wyświetlamy wyniki

if (vc == n) {
    console.log('Connected graph');
} else {
    console.log('Disconnected graph');
}
























//
