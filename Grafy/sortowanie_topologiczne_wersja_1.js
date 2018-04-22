function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function dlistel(data, next, previous) {
    this.data = data;
    this.next = next;
    this.previous = previous;
}


// **********************
// *** Program główny ***
// **********************


var n, m, i, vind;
var ps, rs, graf;
var pd, rd, L;
var test;
var E = [];

n = 6;
m = 10;

E.push([0,2]);
E.push([1,0], [1,2]);
E.push([3,0], [3,1], [3,4]);
E.push([4,1], [4,2]);
E.push([5,0], [5,4]);


graf = new Array(n);
for (i= 0; i < n; i++) graf[i] = null;

for (i = 0; i < m; i++) {
    ps = new slistel(E[i][1], graf[E[i][0]]);
    graf[E[i][0]] = ps;
}


// Wykonujemy sorotwanie topologiczne grafu
vind = new Array(n);        // Tworzymy tablicę stopni wchodzących
for (i= 0; i < n; i++) vind[i] = 0;

for (i = 0; i < n; i++) {
    for (ps = graf[i]; ps; ps = ps.next) {
        vind[ps.data]++;        // Wyznaczamy stopnie wchodzące wierzchołków
    }
}

L = null;
for (i = n - 1; i >= 0; i--) {      // Na liście L umieszczamy od 0 do n - 1
    pd = new dlistel(i, L);
    if (pd.next) pd.next.previous = pd;
    pd.previous = null;
    L = pd;
}

do {
    test = false;       // Oznaczamy brak usunięcia wierzchołka

    pd = L;
    while (pd) {
        if (vind[pd.data]) {     // Szukamy wierzchołka o stopniu wejściowym 0
            pd = pd.next;
        } else {
            test = true;        // Usuwamy wierzchołek
            for (ps = graf[pd.data]; ps; ps = ps.next) {
                vind[ps.data]--;
            }

            console.log(pd.data);
            rd = pd;        // Zapamiętujemy adres elementu L
            pd = pd.next;   // Następny wierzchołek na liście lub NULL

            if (rd.next) rd.next.previous = rd.previous;
            if (rd.previous) {
                rd.previous.next = rd.next;
            } else {
                L = pd;
            }

            rd.data = null;
            rd.next = null;
            rd.previous = null;
        }
    }
} while(test)
















//
