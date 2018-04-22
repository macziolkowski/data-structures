// Mniej więcej kumam jak ten algorytm działa, ale nie widzę tego jak
// i w którym momencie są usuwane cykle proste przez ten algorytm
// po prostu tego nie czuję.
// Ta rekurencja miesza mi trochę w głowie

function dlistel (data, next, previous) {
    this.data = data;
    this.next = next;
    this.previous = previous;
}


var n, m;
var graf, visited;
var E = [];


// Procedury obsługi listy dwukierunkowej
//------------------------------------------------------------------------------

// Procedura dołącza do listy nowy element
// za elementem wskazanym przez p
//------------------------------------------------------------------------------

function addC (x, p) {
    var r;

    r = new dlistel(x, p.next);
    if (r.next) r.next.previous = r;
    r.previous = p;
    p.next = r;
}

// Procedura usuwa z listy element wskazany przez p
//------------------------------------------------------------------------------

function remC(p) {
    if (p.next) {
        p.next.previous = p.previous;
    }
    if (p.previous) {
        p.previous.next = p.next;
    }
    p.next = null;
    p.previous = null;
    p.data = null;
}


// Rekurencyjna funkcja dodająca do listy nowy cykl
// v - wierzchołek startowy i końcowy cyklu
// w - wierzchołek bieżący
// p - referencja do wskazania punktu wstawiania na liście
//------------------------------------------------------------------------------

function dfsAddCycle(v, w, p) {
    var u;
    var t;
    var txt = ''

    // for (t = C; t; t = t.next) txt += t.data + ' ';
    // console.log('       Cykl: ' + txt);
    // console.log(graf);

    visited[w] = true;      // oznaczamy w jako odwiedzony
    addC(w,p);              // dodajemy w do cyklu
    p = p.next;
    for (u = 0; u < n; u++) {
        if (graf[w][u]) {       // Przeglądamy sąsiadów sąsiada wierzchołka v\
            console.log('     Sprawdzam ' + u);
            if (u == v) {       // Cykl znaleziony?
                addC(v,p);      // zamykamy cykl na liście
                do {
                    graf[p.data][p.next.data] = 0;     // Usuwamy krawędź cyklu
                    if (p.data == v) return true;
                    p = p.previous;
                } while (true);
            }
            if (!visited[u] && dfsAddCycle(v,u,p)) return true; // A kiedy ten przypadek wystąpi?
            // Czy to wystąpi gdy trafimy na przedostatni wierzchołek cyklu?
        }
    }

    p = p.previous;             // Z listy usuwamy w
    remC(p.next);               // Jeżeli nie zwróciliśmy true to znaczy że wierzchołek nie jest częścią cyklu
    return false;
}


// **********************
// *** Program główny ***
// **********************


var i, j, C, p;

n = 9;
m = 17;

graf = new Array(n);
visited = new Array(n);

E.push([0,1]);
E.push([1,3], [1,4]);
E.push([2,1], [2,5]);
E.push([3,0], [3,2], [3,7]);
E.push([4,2], [4,3], [4,6]);
E.push([5,4], [5,7]);
E.push([6,3]);
E.push([7,4], [7,8]);
E.push([8,5]);

for (i = 0; i < n; i++) {
    graf[i] = new Array(n);
    for (j = 0; j < n; j++) graf[i][j] = 0;
}

for (i = 0; i < m; i++) {
    graf[E[i][0]][E[i][1]] = 1;
}

C = new dlistel(E[m-1][0], null, null);

for (p = C; p; p = p.next) {    // Przeglądamy listę C
    console.log('Teraz jestem w ' + p.data);
    for (i = 0; i < n; i++) {   // Szukamy sąsiadów
        if (graf[p.data][i]) {
            console.log('   Sprawdzam sąsiada ' + i);
            for (j = 0; j < n; j++) visited[j] = false;
            dfsAddCycle(p.data, i, p);    // Dla każdego sąsiada uruchamiamy szukanie cyklu
        }
    }
}


// Wyświetlamy zawartość listy, czyli pełny cykl Eulera

for (p = C; p; p = p.next) console.log(p.data);
