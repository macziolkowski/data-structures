function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function isGraphCyclic(G, v, visited) {
    var p, u;

    visited[v] = 'G';           // Kolorujemy wierzchołek na szaro
    p = G[v];                   // Sprawdzamy kolejnych sąsiadów
    while (p) {
        console.log(visited);   // Pokazuje jak algorytm przechodził przez graf
        u = p.data;
        if (visited[u] == 'G') return true;
        if ((visited[u] =='W') && isGraphCyclic(G, u, visited)) return true;
        p = p.next;
    }
    visited[v] = 'B';
    return false;
}


function isCyclic(n, G) {
    var i, visited;

    visited = new Array(n);
    for (i = 0; i < n; i++) visited[i] = 'W';
    for (i = 0; i < n; i++) {
        if ((visited[i] == 'W') && isGraphCyclic(G, i, visited)) return true;
    }
    return false;
}

// **********************
// *** Program główny ***
// **********************

var n, m, i, p, r, A;
var E = [];

n = 6;
m = 7;

A = new Array(n);
for (i = 0; i < n; i++) A[i] = null;

E.push([0,1], [0,2], [0,3]);
E.push([1,2]);
E.push([3,4]);
E.push([4,5]);
E.push([5,3]);

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
}

if (isCyclic(n, A)) {
    console.log('Cyclic graph');
} else {
    console.log('Acyclic graph');
}
