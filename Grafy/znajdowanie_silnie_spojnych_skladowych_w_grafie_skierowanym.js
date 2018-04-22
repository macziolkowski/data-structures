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
            e.next = null;
            e.data = null;
        }
    }
}


// Funkcja bada, czy istnieje ścieżka od u do v
// u - wierzchołek startowy ścieżki
// v - wierzchołek końcowy ścieżki
// n - liczba wierzchołków w grafie
// graf - tablica list sąsiedztwa
// Wynik:
// true - istnieje ścieżka od u do v
// false - nie istnieje ścieżka od u do v
//---------------------------------------------------

function dfsBack(u, v, n, graf) {
    var i, x, y;
    var S = new stack();
    var visited = new Array(n);
    var p;

    for (i = 0; i < n; i++) visited[i] = false;

    S.push(u);              // Wierzcholek startowy na stos
    visited[u] = true;      // Oznaczamy ten wierzcholek jako odwiedzony

    while (!S.empty()) {   // Uruchamiamy przejście DFS
        x = S.top();
        S.pop();

        for (p = graf[x]; p; p = p.next) {
            y = p.data;
            if (y == v) {
                return true;
            }

            if (!visited[y]) {
                S.push(y);          // Nieodwiedzonego sąsiada umieszczamy na stosie
                visited[y] = true;  // i oznaczamy jako odwiedzonego
            }
        }
    }

    return false; // Jeśli nie znaleźliśmy ścieżki z u do v to kończymy z false
}


// Procedura przechodzi przez graf od wierzchołka startowego v
// i umieszcza w tablicy C informację o przynależności wierzchołków
// do określonej silnie spójnej składowej
// v - wierzchołek startowy
// n - liczba wierzchołków w grafie
// graf - tablica list sąsiedztwa
// cn - numer silnie spójnej składowej
// C - tablica numerów silnie spójnych składowych dla wierchołków
// Wynik:
// Ustawia tablicę C
//-----------------------------------------------------------------


function DFSscc(v, n, graf, cn, C) {
    var i, u, w;
    var S = new stack();
    var visited = new Array(n);
    var p;

    for (i = 0; i < n; i++) visited[i] = false;

    S.push(v);              // Wierzchołek startowy na stos
    visited[v] = true;      // Oznaczamy go jako odwiedzonego
    C[v] = cn;              // Ustawiamy dla v numer składowej

    while(!S.empty()) {     // Przejście DFS
        u = S.top();        // Odczytujemy wierzchołek ze stosu
        S.pop();            // Usuwamy wierzchołek ze stosu

        if ((u != v) && dfsBack(u, v, n, graf)) C[u] = cn;

        for (p = graf[u]; p; p = p.next) {
            w = p.data;
            if (!visited[w]) {
                S.push(w);
                visited[w] = true;
            }
        }
    }
}

// **********************
// *** Program główny ***
// **********************


var n = 13, m = 27;
var graf = new Array(n);               // Tablica list sąsiedztwa
var C = new Array(n);                  // Tablica z numerami spójnych składowych
var E = [];             // Tablica krawędzi
var i, v, u, cn;
var p, r;

E.push([0,1], [0,4]);
E.push([1,2], [1,4], [1,5], [1,8], [1,11]);
E.push([2,6]);
E.push([3,1], [3,7]);
E.push([4,8]);
E.push([5,2], [5,8]);
E.push([6,5], [6,7], [6,9]);
E.push([8,4]);
E.push([9,5], [9,7]);
E.push([10,8], [10,11]);
E.push([11,8], [11,9], [11,12]);
E.push([12,3], [12,6], [12,9]);

for (i = 0; i < n; i++) {
    graf[i] = null;
    C[i] = 0;
}

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], graf[E[i][0]]); // Tworzymy nowy element z krawędzi
    graf[E[i][0]] = p;                       // Dodajemy go na początek listy graf[v]
}


// Wyznaczamy silnie spójne składowe

cn = 0;  // Inicjujemy licznik składowych

for (v = 0; v <= n - 1; v++) {      // Przeglądamy kolejne wierzchołki grafu
    if (!C[v]) DFSscc(v, n, graf, ++cn, C); // Wyznaczamy silnie spójną składową
}

// Wyświetlamy silnie spójne składowe

for (i = 1; i <= cn; i++) {
    console.log('SCC' + i + ':');
    for (v = 0; v < n; v++) if (C[v] == i) console.log(v);
}















//
