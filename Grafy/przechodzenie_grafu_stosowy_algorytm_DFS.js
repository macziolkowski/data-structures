function slistel(data, next) {
    this.data = data;
    this.next = next;
}

var n, m;
n = 6;
m = 9;

var A = new Array(n);
var visited = new Array(n);
var E = []; // Tablica krawędzia

E.push([0, 1]);
E.push([0, 5]);
E.push([5, 2]);
E.push([5, 1]);
E.push([4, 1]);
E.push([4, 5]);
E.push([3, 4]);
E.push([2, 1]);
E.push([2, 3]);

function dfs(v) {
    var S, p, r;

    p = new slistel(v, null);
    S = p;

    visited[v] = true;

    while(S) {
        v = S.data;
        S = S.next;

        console.log(v);

        for (p = A[v]; p; p = p.next) {
            if (!visited[p.data]) {
                r = new slistel(p.data, S);
                S = r;
                visited[p.data] = true;
            }
        }
    }
}

var i, p, r;

for (i = 0; i < n; i++) {
    visited[i] = false;
    A[i] = null;
}

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
}

dfs(0);
