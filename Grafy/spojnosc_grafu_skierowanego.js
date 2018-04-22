function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function stack () {
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

// **********************
// *** Program główny ***
// **********************

var n = 17, m = 28, k = 24;
var A = new Array(n);
var visited = new Array(n);
var S = new stack();
var i, vc, p, r;
var E = []; // Krawędzie grafu spójnego
var T = []; // Krawędzie grafu niespójnego


E.push([0,3]);
E.push([1,0]);
E.push([2,0], [2,1]);
E.push([4,3], [4,12]);
E.push([5,1], [5,2], [5,6], [5,9]);
E.push([6,2], [6,3], [6,8]);
E.push([7,6]);
E.push([8,5]);
E.push([9,1], [9,9], [9,10]);
E.push([10,15]);
E.push([11,10], [11,16]);
E.push([12,6], [12,16]);
E.push([13,4], [13,7]);
E.push([14,10]);
E.push([15,14]);
E.push([16,13]);

T.push([0,3]);
T.push([1,0]);
T.push([2,0],[2,1]);
T.push([4,12]);
T.push([5,1],[5,2],[5,6],[5,9]);
T.push([6,2],[6,3],[6,8]);
T.push([7,6]);
T.push([8,5]);
T.push([9,1], [9,8]);
T.push([10,15]);
T.push([11,10], [11,16]);
T.push([12,16]);
T.push([13,4]);
T.push([14,10]);
T.push([15,14]);
T.push([16,13]);

for (i = 0; i < n; i++) {
    A[i] = null;
    visited[i] = false;
}

// Odczytujemy kolejne wierzchołki

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
}

// Tworzymy graf podstawowy

for (v = 0; v < n; v++) {
    for (p = A[v]; p; p = p.next) {
        S.push(v);
        S.push(p.data); // Krawędź v->u na stos
    }
}

while (!S.empty()) {
    u = S.top();  // Pobieramy zapamiętane wierzchołki
    S.pop();      // Do grafu dodajemy krawędź odwrotną
    v = S.top();
    S.pop();
    p = new slistel(v, A[u]);
    A[u] = p;
}


// Badamy spójność grafu podstawowego

vc = 0;
S.push(0);
visited[0] = true;

while(!S.empty()) {
    v = S.top();
    S.pop();
    vc++;
    for (p = A[v]; p; p = p.next) {
        u = p.data;
        if (!visited[u]) {         // Szukamy wierzchołków nieodwiedzonych
            visited[u] = true;     // Oznaczamy wierzchołek jako odwiedzony
            S.push(u);             // i umieszczamy go na stosie
        }
    }
}

// Wyświetlamy wyniki

console.log(vc, n);

if (vc == n) {
    console.log('Connected graph');
} else {
    console.log('Disconnected graph');
}
















//
