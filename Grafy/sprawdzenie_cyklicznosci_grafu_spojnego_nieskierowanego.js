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


// Funckja bada cykliczność grafu
//------------------------------------------------------------------------------

function isCyclic(n, G) {
    var S = new stack();
    var visited;
    var p, w, v, z, i;              // Zmienne pomocnicze

    visited = new Array(n);

    for (i = 0; i < n; i++) visited[i] = false;

    S.push(0); S.push(-1);
    visited[0] = true;
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
            } else if (z != w) {   // Jeśli sąsiad jest odwiedzony i nie jest
                return true;        // wierzchołkiem z którego przyszliśmy, to
            }                       // odrkyliśmy cykl i kończymy z TRUE
        }
    }
    return false;
}

// **********************
// *** Program główny ***
// **********************

var n, m, i, p, r, A;
var E = [];     // Tablica krawędzi

n = 6;
m = 6;

E.push([0,1]);
E.push([1,2], [1,4], [1,5]);
E.push([2,3]);
E.push([4,5]);

A = new Array(n);

for (i = 0; i < n; i++) A[i] = null;

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
    p = new slistel(E[i][0], A[E[i][1]]);
    A[E[i][1]] = p;
}

if (isCyclic(n, A)) {
    console.log('Cyclic graph');
} else {
    console.log('Acyclic graph');
}
