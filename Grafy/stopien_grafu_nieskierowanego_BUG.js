// To mi nie działa prawidłowo
// Ale nie wiem w sumie czemu
// Przede wszystkim nie wszystkie krawędzie powiązane z danym wierzchołkiem
// Pokazane są w liście sąsiadów danego wierzchołka
// Czasem pokazane są na liście sąsiada i jest problem bo nie są wliczane
// Do stopnia danego wierzchołka
// O dziwo w C++ ten sam kod działa

function slistel(data, next) {
    this.data = data;
    this.next = next;
}

var n, m, i;

n = 8;
m = 22;

var G = new Array(n);
var dg, sv, p, r;
var E = []; // Tablica krawedzi

E.push([0, 1]);
E.push([0, 3]);
E.push([0, 3]);
E.push([0, 4]);
E.push([1, 1]);
E.push([1, 3]);
E.push([1, 4]);
E.push([1, 5]);
E.push([2, 3]);
E.push([2, 3]);
E.push([2, 5]);
E.push([3, 3]);
E.push([3, 4]);
E.push([3, 7]);
E.push([4, 5]);
E.push([4, 6]);
E.push([4, 7]);
E.push([5, 5]);
E.push([5, 6]);
E.push([6, 6]);
E.push([6, 7]);
E.push([7, 7]);

for (i = 0; i < n; i++) G[i] = null;

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], G[E[i][0]]);
    G[E[i][0]] = p;

    if (E[i][0] != E[i][1]) {
        p = new slistel(E[i][0], E[i][1]);
        G[E[i][1]] = p;
    }
}

dg = 0;

var text;

for (i = 0; i < n; i++) {
    text = '';
    for (p = G[i]; p; p = p.next) {
        text += ' ' + p.data;
    }
    console.log(text);
}

for (v = 0; v < n; v++) {
    dv = 0; // Zerujemy stopień wierzchołka
    for (p = G[v]; p; p = p.next) {
        if (p.data == v) {
            dv += 2;
        } else {
            dv++;
        }
    }
    if (dv > dg) dg = dv; // Jeśli stopień jest większy od dg, to uaktualniamy
}

console.log(dg);















//
