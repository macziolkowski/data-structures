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
        S = S.next;
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


// Funkcja bada cykliczność składowej grafu
//-----------------------------------------------------------------------------

function isComponentCyclic(G, v, visited) {
    var S = new stack();
    var p, w, z;

    S.push(v);      //Na stos wierzchołek startowy i -1
    S.push(-1);

    visited[v] = true;
    while (!S.empty()) {
        w = S.top();
        S.pop();
        v = S.top();
        S.pop();

        for (p = G[v]; p; p = p.next) {
            z = p.data;
            if (!visited[z]) {
                S.push(z);
                S.push(v);
                visited[z] = true;
            } else if (z != w) {
                return true;
            }
        }
    }
    return false;
}


// Funkcja bada cykliczność grafu
//------------------------------------------------------------------------------

function isCyclic(n, G) {
    var i;
    var visited;

    visited = new Array(n);         // Tworzymy tablicę odwiedzin
    for (i = 0; i < n; i++) {
        visited[i] = false;
    }
    for (i = 0; i < n; i++) {
        if (!visited[i] && isComponentCyclic(G, i, visited)) {
            return true;
        }
    }
    return false;
}

// **********************
// *** Program główny ***
// **********************

var n, m, i, p, r, A;
var E = [];       // Tablica krawędzi

n = 12;
m = 10;

E.push([0,4]);
E.push([1,8]);
E.push([2,3], [2,5]);
//E.push([3,7]);
E.push([4,9]);
E.push([5,8], [5,10]);
E.push([6,9], [6,11]);
E.push([7,10]);

A = new Array(n);

for (i = 0; i < n; i++) A[i] = null;

for (i = 0; i < m; i++) {
    var p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
    var p = new slistel(E[i][0], A[E[i][1]]);
    A[E[i][1]] = p;
}

if (isCyclic(n,A)) {
    console.log('Cyclic graph');
} else {
    console.log('Acyclic graph');
}






















//
