function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function stack() {
    var S = null;

    this.empty = function() {
        return !S;
    };

    this.top = function() {
        return S.data;
    };

    this.push = function(v) {
        var e = new slistel(v, S);
        S = e;
    };

    this.pop = function() {
        if (S) {
            var e = S;
            S = S.next;
            e.data = null;
            e.next = null;
        }
    };
}


var n = 8; // Liczba wierzchołków
var m = 11; // Liczba krawędzi skierowanych
var A = new Array(n);
var E = [];

for (i = 0; i < n; i++) A[i] = null;

E.push([0,1]);
E.push([1,2]);
E.push([1,3]);
E.push([2,3]);
E.push([3,4]);
E.push([3,5]);
E.push([4,5]);
E.push([5,6]);
E.push([6,7]);
E.push([7,0]);
E.push([7,4]);

function dfsPath(vs, vk) {
    var S = new stack();
    var visited, found;
    var P, v, u, i;
    var pv;

    visited = new Array(n);
    for (i = 0; i < n; i++) visited[i] = false;

    P = new Array(n);

    P[vs] = -1;
    S.push(vs);
    visited[vs] = true;
    found = false;

    while(!S.empty()) {
        v = S.top(); // Pobieramy ze stosu wierzchołek v
        S.pop();

        if (v == vk) {
            found = true;
            break;
        }

        // Przeglądamy sąsiadów wierzchołka V

        for (pv = A[v]; pv; pv = pv.next) {
            u = pv.data;
            if (!visited[u]) {
                P[u] = v; // W P zapisujemy fragment ścieżki
                S.push(u); // Umieszcamy węzeł u na stosie
                visited[u] = true; // Oznaczamy węzeł u jako odwiedzony
            }
        }
    }

    if (!found) {
        console.log('Path does not exist');
    } else {
        while(v > -1) {
            console.log(v);  // Wypisujemy wierzchołki ścieżki
            v = P[v]; // Cofamy się do poprzedniego wierzchołka ścieżki
        }
    }
}

// **********************
// *** Program główny ***
// **********************


var i, p, r;

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
}

dfsPath(0,6);

















//
