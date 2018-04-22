function slistel(data, next) {
    this.data = data;
    this.next = next;
}

var n, m, d, i, p, r;

n = 8;
m = 20;

var G = new Array(n);
var DV = new Array(n);
var E = [];

E.push([0,0]);
E.push([0,1]);
E.push([1,4]);
E.push([1,5]);
E.push([1,6]);
E.push([1,8]);
E.push([2,3]);
E.push([2,5]);
E.push([2,7]);
E.push([4,0]);
E.push([4,2]);
E.push([4,6]);
E.push([4,7]);
E.push([4,8]);
E.push([5,5]);
E.push([6,6]);
E.push([6,3]);
E.push([6,7]);
E.push([7,0]);
E.push([8,8]);

for (i = 0; i < n; i++) {
    G[i] = null;
    DV[i] = 0;
}

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], G[E[i][0]]);
    G[E[i][0]] = p;
}

for (v = 0; v < n; v++) {
    for (p = G[v]; p; p = p.next) {
        DV[v]++;
        DV[p.data]++;
    }
}

d = DV[0];
no = 0; // Numer wierzchołka

for (v = 1; v < n; v++) {
    if (DV[v] > d) {
        d = DV[v];
        no = v;
    }
}

console.log('Stopień grafu: ' + d + '  Numer wierzchołka: ' + no);











//
