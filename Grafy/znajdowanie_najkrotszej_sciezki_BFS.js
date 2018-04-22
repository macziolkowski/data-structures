var MAXINT = -2147483647;

function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function queue () {
    var head = null;
    var tail = null;

    this.empty = function() {
        return !head;
    }

    this.front = function() {
        if (head) {
            return head.data;
        } else {
            return MAXINT;
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


// Zmienne globalne
// -------------------

var n = 8; // Liczba wierzchołków
var m = 11; // Liczba krawędzi
var A = new Array(n); // Macierz sąsiedztwa
var E = []; // Tablica krawędzi

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

// Procedura szukania ścieżki
// vs - numer wierzchołka startowego
// vk - numer wierzchołka końcowego
//------------------------------------------

function bfsPath(vs, vk) {
    var Q = new queue();
    var visited = new Array(n);
    var found;
    var P = new Array(n); // Tworzymy tablicę ścieżki
    var v, u, i;
    var pv;

    for (i = 0; i < n; i++) {
        visited[i] = false;
    }

    Q.push(vs);
    P[vs] = -1;
    visited[vs] = true;
    found = false;

    while (!Q.empty()) {
        v = Q.front();
        Q.pop();

        if (v == vk) {
            found = true;
            break;
        }

        // Przeglądamy sąsiadów wierzchołka v

        for (pv = A[v]; pv; pv = pv.next) {
            u = pv.data;
            if (!visited[u]) {
                P[u] = v;
                Q.push(u);
                visited[u] = true;
            }
        }
    }

    if (!found) {
        console.log('There is no path connecting ' + vs + ' and ' + vk);
    } else {
        while (v > -1) {
            console.log(v);
            v = P[v];
        }
    }
}

// **********************
// *** Program główny ***
// **********************

var i, p, r;

for (i = 0; i < n; i++) A[i] = null;

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
}

bfsPath(0, 6);


















//
