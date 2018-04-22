function slistel(data, next) {
    this.data = data;
    this.next = next;
}

var n, m, i;
var p, q, r, x, txtRow;

n = 7;
m = 7;

var A = new Array(n);
var AK = new Array(n);
var E = []; // Tablica krawedzi

E.push([0,3]);
E.push([1,0]);
E.push([1,5]);
E.push([5,2]);
E.push([5,4]);
E.push([5,6]);
E.push([6,0]);

for (i = 0; i < n; i++) {
    A[i] = null;
    AK[i] = null;
}

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
}

for (i = 0; i < n; i++) {

    // Kopiujemy listę A[i] do AK[i]
    for (p = A[i]; p; p = p.next) {
        x = new slistel(p.data, AK[i]);
        AK[i] = x;
    }

    // Teraz kopiujemy sąsiadów sąsiadów do AK[i]
    for (p = A[i]; p; p = p.next) {
        // Przeglądamy listę sąsiedztwa sąsiada
        for (q = A[p.data]; q; q = q.next) {
            // Sprawdzamy czy dodawany wierzchołek jest unikalny
            for (r = AK[i]; r && (r.data != q.data); r = r.next);

            // Jeśli wierzchołek q.data jest unikalny, to dodajemy go do listy AK[i]
            if (!r) {
                x = new slistel(q.data, AK[i]);
                AK[i] = x;
            }
        }
    }
}

// Wypisujemy zawartość tablicy list sąsiedztwa kwadratu grafu

for (i = 0; i < n; i++) {
    txtRow = i + ':';
    for (p = A[i]; p; p = p.next) txtRow += ' ' + p.data;
    console.log(txtRow);
}

console.log('\n--------------------\n');

for (i = 0; i < n; i++) {
    txtRow = i + ':';
    for (p = AK[i]; p; p = p.next) txtRow += ' ' + p.data;
    console.log(txtRow);
}




//
