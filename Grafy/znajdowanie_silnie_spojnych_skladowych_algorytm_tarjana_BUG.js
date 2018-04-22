// bug
// Program nie działa ale nie wiem czemu
// W konsoli nie wywala żadnych błędów

function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function sslistEl() {
    this.next = null;
    this.v = null;
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


// Zmienne globalne
//----------------------

var n = 13;
var m = 27;
var E = []; // Tablica krawędzi
var cvn;
var VN = new Array(n);
var VLow = new Array(n);
var VS = new Array(n);
var graf = new Array(n);
var S = new stack();
var Lscc;

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
    VN[i] = 0;
    VS[i] = false;
}


// Procedura wykonująca przejście DFS i wyznaczająca
// silnie spójną składową
// v - wierzchołek startowy dla DFS
//--------------------------------------------------------

function DFSscc(v) {
    var u;
    var sccp, p;
    var listp;

    VN[v] = VLow[v] = ++cvn;  // Numerujemy wierzchołek i ustawiamy wstępnie parametr Low
    S.push(v);                // Wierzchołek na stos
    VS[v] = true;             // Zapamiętujemy, że v jest na stosie

    for (p = graf[v]; p; p = p.next) { // Przeglądamy listę sąsiadów
        if (!VN[p.data]) { // Jeśli sąsiad jest nieodwiedzony, to
            DFSscc(p.data); // Wywołujemy dla niego rekurencyjnie DFS
            VLow[v] = Math.min(VLow[v], VLow[p.data]); // I obliczamy Low dla v
        } else if (VS[p.data]) { // Jeśli sąsiad odwiedzony, lecz wciąż na stosie
            VLow[v] = Math.min(VLow[v], VN[p.data]); // to wyznaczamy parametr Low dla v
        }
    }

    if (VLow[v] == VN[v]) {     // Sprawdzamy, czy mamy kompletną składową
        sccp = null;            // Dodajemy tę składową do listy składowych
        do {
            u = S.top();    // Pobieramy wierzchołek ze stosu
            S.pop();        // Pobierany wierzchołek usuwamy ze stosu
            VS[u] = false;  // Zapamiętujemy, że nie ma go już na stosie
            p = new slistel(u, sccp); // Dodajemy go na początek listy
            sccp = p;
        } while (u != v);  // Kontynuujemy aż do korzenia składowej

        listp = new sslistEl();  // Nowy element listy składowych
        listp.v = sccp;          // Zapisujemy w nim listę
        listp.next = Lscc;       // i dołączamy na początek listy składowych
    }
}

// **********************
// *** Program główny ***
// **********************

var i;
var p, r;
var listp, listr;

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], graf[E[i][0]]);
    graf[E[i][0]] = p;
}


// Wyznaczamy silnie spójnie składowe

cvn = 0;                            // Zerujemy numer wierzchołka
Lscc = null                         // Tworzymy pustą listę składowych

for (v = 0; v < n; v++) {           // Przeglądamy kolejne wierzchołki
    if (!VN[v]) DFSscc(v);          // W nieodwiedzonym wierzchołku uruchamiamy DFS
}

cvn = 0;                            // cvn jest teraz licznikiem składowych

for (listp = Lscc; listp; listp = listp.next) { // Przeglądamy listę składowych
    console.log('SCC' + ++cvn + ' :');          // Wyświetlamy numer składowej
    for (p = listp.v; p; p = p.next) {          // Przeglądamy listę wierzchołków
        console.log(p.v);                       // Wyświetlamy wierzchołek składowej
    }
}
