var n, m;

n = 6;
m = 9;

var A = new Array(n);
var visited = new Array(n);

function slistel(data, next) {
    this.next = next;
    this.v = data;
}


function dfs(v) {
    var p;
    visited[v] = true;
    console.log(v);

    for(p = A[v]; p; p = p.next) {
        if (!visited[p.v]) dfs(p.v);
    }
}

var i;
var E = []; // tablica krawędzi
var p, r;

E.push([0,5]);
E.push([0,1]);
E.push([5,2]);
E.push([5,1]);
E.push([4,1]);
E.push([4,5]);
E.push([3,4]);
E.push([2,1]);
E.push([2,3]);

for (i = 0; i < n; i++) {
    A[i] = null;
    visited[i] = false;
}

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
}

console.log(A);

dfs(0);
