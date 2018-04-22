function slistel(data, next) {
    this.data = data;
    this.next = next;
}


var n = 7;
var m = 11;

var A = new Array(n); // Graf wyjściowy
var AT = new Array(n); // Graf transponowany
var E = []; // Tablica krawędzi
var i, p, r, txt;

for (i = 0; i < n; i++) {
    A[i] = null;
    AT[i] = null;
}

E.push([0,3]);
E.push([1,0]);
E.push([2,0]);
E.push([2,1]);
E.push([4,1]);
E.push([4,2]);
E.push([4,5]);
E.push([5,2]);
E.push([5,3]);
E.push([5,6]);
E.push([6,4]);

for (i = 0; i < m; i++) {
    var p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
}

// Wyznaczamy graf transponowany

for (v = 0; v < n; v++) { // Przeglądamy kolejne wierzchołki
    for (p = A[v]; p; p = p.next) {
        r = new slistel(v, AT[p.data]);
        AT[p.data] = r;
    }
}

console.log('Graf wyjściowy');
for (v = 0; v < n; v++) {
    txt = v + ': ';
    for (p= A[v]; p; p = p.next) txt += p.data + ' ';
    console.log(txt);
}
console.log('\nGraf transponowany');
for (v = 0; v < n; v++) {
    txt = v + ': ';
    for (p= AT[v]; p; p = p.next) txt += p.data + ' ';
    console.log(txt);
}



















//
