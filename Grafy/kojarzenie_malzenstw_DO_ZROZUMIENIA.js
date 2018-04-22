// Bardzo złożony algorytm, trzeba będzie dłużej przed nim posiedzieć
// żeby go dobrze zrozumieć


function slistel(data, next) {
    this.data = data;
    this.next = next;
}

var MAXINT = -2147483647;

function queue() {
    var head;
    var tail;

    this.empty = function() {
        return !head;
    }

    this.front = function() {
        if (head) {
            return head.data;
        } else {
            return -MAXINT;
        }
    }

    this.push = function(v) {
        var p = new slistel(v, null);
        if (tail) {
            tail.next = p;
        } else {
            head = p;
        }
        tail = p;
    }

    this.pop = function() {
        if (head) {
            var p = head;
            head = head.next;
            if (!head) tail = null;
            p.data = null;
            p.next = null;
        }
    }
}

// **********************
// *** Program główny ***
// **********************


var n, m, i, v, x, y, matching, augment;
var p, r, graf;
var visited, color;
var Q = new queue();
var E = [];

n = 10;
m = 11;

E.push([0,8], [0,7]);
E.push([1,8], [1,6], [1,5]);
E.push([2,5])
E.push([3,9], [3,8], [3,6]);
E.push([4,8], [4,7]);

color = new Array(n);
matching = new Array(n);
augment = new Array(n);
visited = new Array(n);
graf = new Array(n);

for (i = 0; i < n; i++) graf[i] = null;

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], graf[E[i][0]]);
    graf[E[i][0]] = p;
    p = new slistel(E[i][0], graf[E[i][1]]);
    graf[E[i][1]] = p;
    color[E[i][0]] = false;     // Panna
    color[E[i][1]] = true;      // Kawaler
}


// Algorytm znajdowania maksymalnego skojarzenia

for (i = 0; i < n; i++) {        // Elementy tablicy matching ustawiamy na -1
    matching[i] = -1;            // Co oznacza brak skojarzenia
}


for (v = 0; v < n; v++) {       // Przechodzimy przez kolejne wierzchołki
    if ((matching[v] == -1) && !color[v]) {
        for (i = 0; i < n; i++) visited[i] = false;   // Zerujemy tablicę odwiedzin
        while (!Q.empty()) Q.pop();                    // Zerujemy kolejkę

        visited[v] = true;       // Oznaczamy v jako wierzchołek odwiedzony
        augment[v] = -1;         // Poprzednikiem v jest korzeń drzewa rozpinającego
        Q.push(v);               // Umieszczamy v w kolejce
        while (!Q.empty()) {       // Uruchamiamy BFS
            x = Q.front();
            Q.pop();

            if (color[x]) {     // Kawalerowie
                if (matching[x] == -1) { // Kawaler wolny
                    while (augment[x] > -1) {
                        if (color[x]) {  // Zamieniamy krawędzie skojarzone z nieskojarzonymi
                            matching[x] = augment[x];
                            matching[augment[x]] = x;
                        }
                        x = augment[x];  // Cofamy się po ścieżce rozszerzającej
                    }
                    break;
                } else {      // Kawaler skojarzony
                    augment[matching[x]] = x;
                    visited[matching[x]] = true;
                    Q.push(matching[x]);  // W kolejce umieszczamy skojarzoną pannę
                }
            } else {        // Panny
                p = graf[x];    // Przeglądamy kawalerów
                while (p) {
                    y = p.data;
                    if (!visited[y]) {
                        visited[y] = true;
                        augment[y] = x;     // Tworzymy ścieżkę rozszerzającą
                        Q.push(y);
                    }
                    p = p.next;
                }
            }
        }
    }
}


// Wyświetlamy skojarzenia panna --- kawaler
for (i = 0; i < n; i++) {
    if (!color[i]) console.log(i + ' --- ' + matching[i]);
}




















//
