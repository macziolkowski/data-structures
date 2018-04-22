function slistel (data, next, edgew) {
    this.data = data;
    this.next = next;
    this.edgew = edgew;
}

var MAXINT = 2147483647;

// **********************
// *** Program główny ***
// **********************


var i, j, m, n, w, x, y, sptr, d, p, S, QS;
var E = [];     // Tablica krawędzi wraz z wagami krawędzi
var graf;       // Tablica list sąsiedztwa
var pw, rw;

v = 0;
n = 6;
m = 9;

E.push([0,1,3]);
E.push([0,1,3]);
E.push([0,4,3]);
E.push([1,2,1]);
E.push([2,3,3]);
E.push([2,5,1]);
E.push([3,1,3]);
E.push([4,5,2]);
E.push([5,0,6]);
E.push([5,3,1]);


d = new Array(n);           // Tablica kosztów dojścia
p = new Array(n);           // Tablica poprzedników
QS = new Array(n);          // Zbiory Q i S
graf = new Array(n);        // Tablica list sąsiedztwa
S = new Array(n);           // Stos
sptr = 0;


for (i = 0; i < n; i++) {
    d[i] = MAXINT;
    p[i] = -1;
    QS[i] = false;
    graf[i] = null;
}


// Odczytujemy dane wejściowe

for (i =0; i < m; i++)  {
    pw = new slistel(E[i][1], graf[E[i][0]], E[i][2]); // element list z wagą
    graf[E[i][0]] = pw;
}

d[v] = 0;       // Koszt dojścia v jest zerowy


// Wyznaczamy ścieżki

for (i = 0; i < n; i ++) {

    // Szukamy wierzchołka w Q o najmniejszym koszcie d
    for (j = 0; QS[j]; j++);
    for (u = j++; j < n; j++) {
        if (!QS[j] && (d[j] < d[u])) u = j;
    }

    // Znaleziony wierzchołek przenosimy do S

    QS[u] = true;

    // Modyfikujemy odpowiednio wszystkich sąsiadów u, którzy są w Q

    for (pw = graf[u]; pw; pw = pw.next) {
        if (!QS[pw.data] && (d[pw.data] > d[u] + pw.edgew)) {
            d[pw.data] = d[u] + pw.edgew;
            p[pw.data] = u;
        }
    }
}

// Gotowe, wyświetlamy wyniki

var txt = '';
for (i = 0; i < n; i++) {
    txt += i + ': ';
    for (j = i; j > -1; j = p[j]) S[sptr++] = j; // Fajny sposób przemieszczania się pomiędzy poprzednikami.
    while (sptr) txt += S[--sptr] + ' ';

    // Na końcu ścieżki wypisujemy jej koszt;
    txt += ' $' + d[i];

    console.log(txt);
    txt = '';
}
















//
