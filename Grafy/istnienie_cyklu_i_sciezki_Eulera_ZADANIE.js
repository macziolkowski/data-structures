// Zastanów się, jak zmodyfikować powyższy algorytm, aby uwzględniał
// również pętle (pętlę należy liczyć za dwie krawędzie).


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
        var e = S;
        S = S.next;
        e.data = null;
        e.next = null;
    }
}


// Funkcja bada graf pod kątem posiadania cyklu lub ścieżki Eulera
// n - liczba wierzchołków w grafie
// graf - tablica list sąsiedztwa
// Wynik:
// 0 - graf nie zawiera sciezki lub cyklu Eulera
// 1 - graf zawiera sciezke Eulera
// 2 - graf zawiera cykl Eulera
// -----------------------------------------------------------------------------

function isEulerian(n, graf) {
    var no, nc, i, v, u;
    var S = new stack();
    var visited;
    var p;

    for (i = 0; i < n && !graf[i]; i++) // Szukamy wierzchołka z sąsisadami
    // Wierzchołek taki będzie miał listę sąsiadów, stąd !graf[i]

    if (i == n) return 1; // Graf nie ma krawędzi

    visited = new Array(n);
    for (v = 0; v < n; v++) visited[i] = false;

    no = 0;         // Zerujemy licznik wierzchołków o nieparzystym stopniu

    S.push(i);      // Wierzchołek startowy na stos
    visited[i] = true;

    // Uruchamiamy przejście DFS, aby wyznaczyć spójną składową zawierającą
    // wierzchołek startowy oraz policzyć stopnie wierzchołków i wyznaczyć
    // liczbę wierzchołków o stopniach nieparzystych

    while (!S.empty()) {
        v = S.top();            // pobieramy do v wierzchołek ze stosu
        S.pop();

        nc = 0;
        for (p = graf[v]; p; p = p.next) {
            nc++;               // Zwiększamy licznik sąsiadów
            u = p.data;
            if (!visited[u]) {
                visited[u] = true; // Zaznaczamy ich jako odwiedzonych
                S.push(u);
            }
        }

        if (nc % 2 == 1) no++;    // Nieparzysta liczba sąsiadów
    }

    for (v = i + 1; v < n; v++) {    // Przeglądamy pozostałe wierzchołki grafu
        if (!visited[v] && graf[v]) {
            return 0;
        }
    }

    if (!no) return 2;          // Graf zawiera cykl Eulera

    if (no == 2) return  1;

    return 0;                  // Graf nie posiada ścieżki lub cyklu Eulera
}


// **********************
// *** Program główny ***
// **********************

var n ,m ,i;
var p, r, A;

n = 12;
m = 14;























//
