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
        if (S) {
            var e = S;
            S = S.next;
            e.data = null;
            e.next = null;
        }
    }
}

// Funkcja oblicza liczbę spójnych składowych w grafie
// n - liczba wierzchołków w grafie
// graf - tablica list sąsiedztwa
// VU - tablica dostępności krawędzi grafu
//--------------------------------------------------------

function ccn(n, graf, VU) {
    var C, cc, i, v, u;
    var S = new stack();
    var p;

    C = new Array(n);   // Tworzymy tablicę spójnych składowych

    for (i = 0; i < n; i++) C[i] = 0;   // Zerujemy tablicę spójnych składowych

    cc = 0;

    for (i = 0; i < n; i++) {
        if (!C[i]) {
            cc++;       // Zwiększamy licznik składowych
            S.push(i);  // Na stosie umieszczamy numer bieżącego węzła
            C[i] = cc;  // Wierzchołek numerujemy i oznaczamy jako odwiedzony
            while (!S.empty()) {
                v = S.top(); // Pobieramy wierzchołek ze stosu
                S.pop();     // Usuwamy wierzchołek ze stosu
                for (p = graf[v]; p; p = p.next) { // Przeglądamy sąsiadów v
                    u = p.data;
                    if ((VU[v] || VU[u]) && !C[u]) {
                        S.push(p.data); // Na stos idą sąsiedzi nieodwiedzeni
                        C[u] = cc;      // i ponumerowani
                    }
                }
            }
        }
    }

    return cc;
}


// **********************
// *** Program główny ***
// **********************

var n, m;         // Liczba wierzchołków i krawędzi
var A;            // Tablica list sąsiedztwa
var E = [];            // Tablica krawędzi
var nc, i, L, p, r, VU;

n = 17;
m = 17;

E.push([0,1], [0,2], [0,3]);
E.push([1,2], [1,14]);
E.push([4,11], [4,12]);
E.push([5,6], [5,9]);
E.push([6,7], [6,8]);
E.push([10,15]);
E.push([11,15]);
E.push([12,15]);
E.push([13,14], [13,16]);
E.push([14,16]);

VU = new Array(n);
A = new Array(n);

for (i = 0; i < n; i++) {
    A[i] = null;
    VU[i] = true;
}

// Odczytujemy definicje krawędzi

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
    p = new slistel(E[i][0], A[E[i][1]]);
    A[E[i][1]] = p;
}

// Algorytm znajdowania mostów

L = null;             // Pusta lista mostów
nc = ccn(n, A, VU);   // Zapamiętujemy liczbę spójnych składowych

for (v = 0; v < n; v++) {   // Przechodzimy przez kolejne wierzchołki grafu
    p = A[v];               // Przeglądamy listę sąsiedztwa wierzchołka v
    while (p) {
        u = p.data;
        if (u > v) {        // Interesują nas tylko krawędzie w jedną stronę
            VU[v] = VU[u] = false;  // Zaznaczamy krawędź v-u jako usuniętą
            if (ccn(n, A ,VU) > nc) {
                r  = new slistel(u, L);     // Znaleziony most dodajemy do listy L
                L = r;
                r = new slistel(v, L);
                L = r;
            }
            VU[v] = VU[u] = true;  // Kasujemy zaznaczenie krawędzi jako usuniętej
        }
        p = p.next;
    }
}


// Wypisujemy znalezione mosty, jednocześnie usuwając listę L

v = 0;
var text = '';

while (L) {
    text += L.data + ' ';
    v ^= 1;         // PYTANIE Co robi ten operator ??
    if (!v) {
        console.log(text);
        text = '';
    }
    p = L;
    L = L.next;
    p.data = null;
    p.next = null;
}






















//
