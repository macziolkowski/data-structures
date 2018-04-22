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


function dfsFindCycle(graf, v, w, S, visited) {
    var u, p;

    visited[w] = true;
    S.push(w);
    p = graf[w];
    while (p) {
        u = p.data;
        if (u == v) return true;
        if (!visited[u] && dfsFindCycle(graf, v, u, S, visited)) return true;
        p = p.next;
    }

    S.pop();
    return false;
}


// **********************
// *** Program główny ***
// **********************

var n, m, i, j;
var p, r, A;
var visited;
var S = new stack();
var T = new stack();
var E = [];

n = 9;
m = 15;

var A = new Array(n);
for (i = 0; i < n; i++) A[i] = null;

E.push([0,1]);
E.push([1,4]);
E.push([2,5]);
E.push([3,0], [3,1]);
E.push([4,2]);
E.push([5,1], [5,8]);
E.push([6,3], [6,4]);
E.push([7,4], [7,5], [7,6], [7,8]);
E.push([8,3]);

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
}

visited = new Array(n);
var cycl = '';

for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) visited[j] = false;

    if (!dfsFindCycle(A, i, i, S, visited)) {
        console.log(i + ' - no cycle');
    } else {
        T.push(i);
        while (!S.empty()) {    // Przerzucamy stos S do stosu T
            T.push(S.top());
            S.pop();
        }

        while (!T.empty()) {    // Wyświetlamy ścieżkę
            cycl += T.top() + ' ';
            T.pop();
        }

        if (cycl != '') console.log(cycl);
    }
    cycl = '';
}
