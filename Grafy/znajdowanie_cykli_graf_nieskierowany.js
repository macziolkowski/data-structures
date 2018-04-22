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
        if(S) {
            var e = S;
            S = S.next;
            e.data = null;
            e.next = null;
        }
    }
}

// Funkcja rekurencyjna wyszukująca cykl
//-----------------------------------------------------------------------------
function dfsFindCycle(graf, v, w, S, visited) {
    var u, p;

    visited[w] = true;
    p = graf[w]

    while (p) {
        u = p.data;
        if (u != S.top()) {
            S.push(w);
            if (u == v) return true;
            if (!visited[u] && dfsFindCycle(graf, v, u, S, visited)) return true;
            S.pop();
        }
        p = p.next;
    }

    return false;
}

// **********************
// *** Program główny ***
// **********************

var n, m, i, j, u;
var p, r, A;
var visited;
var S = new stack();
var E = [];
var info = '';

n = 9;
m = 10;

A = new Array(n);
for (i = 0; i < n; i++) A[i] = null;

E.push([0,1], [0,3]);
E.push([1,8]);
E.push([2,4], [2,5]);
E.push([3,7], [3,8]);
E.push([4,6]);
E.push([5,6], [5,7]);

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
    p = new slistel(E[i][0], A[E[i][1]]);
    A[E[i][1]] = p;
}

visited = new Array(n);

for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) visited[j] = false;  // Zerujemy tablicę odwiedzin
    S.push(-1);
    info += i + ' ';

    if (!dfsFindCycle(A, i, i, S, visited)) {
        S.pop;
        console.log(info + ' - no cycle');
    } else {
        while(!S.empty()) {
            u = S.top();
            S.pop();
            if (u > -1) info += u + ' ';
        }
        console.log(info);
    }
    info = '';
}



















//
