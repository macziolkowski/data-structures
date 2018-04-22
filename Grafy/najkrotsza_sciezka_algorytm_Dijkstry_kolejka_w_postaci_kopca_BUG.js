// Gdzieś jest błąd, dla dwóch wierzchołków algorytm nie liczy ścieżki
// Oto wygenerowany wynik
// 0: 0   $0
// 1: 0 1   $3
// 2: 0 1 2   $4
// 3: 3   $2147483647
// 4: 0 4   $3
// 5: 5   $2147483647
// zgodnie z odpowiedzią z internetu to ścieżki dla 3 i 5 też istnieją
// trzeba to prześledzić


function slistel(data, next, weight) {
    this.data = data;
    this.next = next;
    this.weight = weight;
}

var MAXINT = 2147483647;

// **********************
// *** Program główny ***
// **********************


var i, j, m, n, v, u, w, x, y, sptr, hlen, parent, left, right, dmin, pmin,
    child, d, p, S, h, hp;
var QS;         // Zbiory Q i S
var graf;
var pw, rw;
var E = [];    // Tablica krawędzi

v = 0;          // Węzeł startowy
n = 6;          // Liczba węzłów
m = 9;          // Liczba krawędzi

d = new Array(n);       // Tablica kosztów dojścia
p = new Array(n);       // Tablica poprzedników
QS = new Array(n);      // Zbiory Q i S
graf = new Array(n);    // Tablica list sąsiedztwa
S = new Array(n);       // Stos
h = new Array(n);       // Kopiec
hp = new Array(n);      // Pozycje w kopcu
sptr = 0;               // Wskaźnik stosu

E.push([0, 1, 3], [0, 4, 3]);
E.push([1, 2, 1]);
E.push([2, 3, 3], [2, 5, 1]);
E.push([3, 1, 3]);
E.push([4, 5, 2]);
E.push([5, 0, 6], [5, 3, 1]);

for (i = 0; i < n; i++) {
    d[i] = MAXINT;
    p[i] = -1;
    QS[i] = false;
    graf[i] = null;
    h[i] = hp[i] = i;
}

hlen = n;

for (i = 0; i < m; i++) {
    pw = new slistel(E[i][1], graf[E[i][0]], E[i][2]);
    graf[E[i][0]] = pw; // Element dołączamy do listy
}


d[v] =0;            // Koszt dojścia v jest zerowy
x = h[0]; h[0] = h[v]; h[v] = x;    // Odtwarzamy właność kopca, to wygląda jak masło maślane

// Wyznaczamy ścieżki

for (i = 0; i < n; i++) {
    u = h[0];               // Korzeń kopca jest zawsze najmnijeszy

    // Usuwamy korzeń z kopca, odtwarzając własność kopca

    h[0] = h[--hlen];       // W korzeniu umieszczamy ostatni element
    hp[h[0]] = parent = 0;  // Zapamiętujemy pozycję elementu w kopcu
    while (true) {          // Z pętli idziemy w dół kopca, przywracając go
        left = parent + parent + 1;     // Pozycja lewego potomka
        right = left + 1;               // Pozycja lewego potomka
        if (left >= hlen) break;
                // Kończymy, jeśli lewy potomek poza kopcem
        dmin = d[h[left]];              // Wyznaczamy mniejszego potomka
        pmin = left;

        if ((right < hlen) && (dmin > d[h[right]])) {
            dmin = d[h[right]];
            pmin = right;
        }

        if (d[h[parent]] <= dmin) break; // Jeśli własność kopca zachowana, Kończymy
        x = d[h[parent]]; h[parent] = h[pmin]; h[pmin] = x; // Przywracamy własność kopca
        hp[h[parent]] = parent; hp[h[pmin]] = pmin;         // na danym poziomie
        parent = pmin;              // i przechodzimy na poziom niższy kopca
    }

    // Znaleziony wierzchołek przenosimy do S

    QS[u] = true;

    // Modyfikujemy odpowiednio wszystkich sąsiadów u, którzy są w Q

    for (pw = graf[u]; pw; pw = pw.next) {
        if (!QS[pw.data] && (d[pw.data] > d[u] + pw.weight)) {
            d[pw.data] = d[u] + pw.weight;
            p[pw.data] = u;

            // Po zmianie d[v] odtwarzamy własność kopca, idąc w górę

            for (child = hp[pw.data]; child; child = parent) {
                parent = Math.round(child / 2);
                if (d[h[parent]] <= d[h[child]]) break;
                x = h[parent]; h[parent] = h[child]; h[child] = x;
            }
        }
    }
}

// Gotowe, wyświetlamy wyniki

var txt = '';

for (i = 0; i < n; i++) {
    txt += i + ': ';

    // Ścieżkę przechodzimy od końca ku początkowi
    // Zapisując na stosie kolejne wierzchołki

    for (j = i; j > -1; j = p[j]) S[sptr++] = j;

    // Wyświetlamy ścieżkę, pobierając wierzchołki ze stosu

    while (sptr) txt += S[--sptr] + ' ';
    txt += '  $' + d[i]; // Na końcu ścieżki wpisujemy jej koszt

    console.log(txt);
    txt = '';
}





















//
