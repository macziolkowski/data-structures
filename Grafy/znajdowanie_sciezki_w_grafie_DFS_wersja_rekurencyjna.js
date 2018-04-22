function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function stack() {
    var S = null;

    this.empty = function () {
        return !S;
    };

    this.top = function() {
        return S.data;
    };

    this.push = function (v) {
        var e = new slistel(v, S);
        S = e;
    };

    this.pop = function () {
        if (S) {
            var e = S;
            S = S.next;
            e.data = null;
            e.next = null;
        }
    };
}

// Zmienne globalne
// ------------------

var n = 8; // Liczba wierzchołków
var m = 11; // Liczba krawędzi
var S = new stack();  // Stos
var visited = new Array(n);
var A = new Array(n); // Macierz sąsiedztwa
var E = []; // Tablica krawędzi
var p, r, i; // Wierzchołki startowy i końcowy ścieżki

var vs = 0; // Wierzchołek startowy
var vk = 6; // Wierzchołek końcowy

for (i = 0; i < n; i++) {
    A[i] = null;
}

E.push([0, 1]);
E.push([1, 3]);
E.push([1, 2]);
E.push([2, 3]);
E.push([3, 5]);
E.push([3, 4]);
E.push([4, 5]);
E.push([5, 6]);
E.push([6, 7]);
E.push([7, 4]);
E.push([7, 0]);

// Rekurencyjna funkcja DFS
// ------------------------------

function dfs(v) {
    visited[v] = true;
    S.push(v);

    if (v == vk) return true; // Jeśli koniec, kończymy
    // Przetwarzamy nieodwiedzonych sąsiadów

    for (p = A[v]; p; p = p.next) {
        if (!visited[p.data] && dfs(p.data)) return true;
    }

    S.pop(); // Brak ścieżki usuwamy wierzchołek ze stosu
    return false; // Kończymy z wynikiem false
}

// Procedura szukania ścieżki
// --------------------------------

function dfsPath() {
    for (i = 0; i < n; i++) visited[i] = false;

    if (!dfs(vs)) {
        console.log('There is no path connecting vertices');
    } else {
        while(!S.empty()) {
            console.log(S.top());
            S.pop();
        }
    }
}

// **********************
// *** Program główny ***
// **********************

for (i = 0; i < m; i++) {
    p = new slistel(E[i][1], A[E[i][0]]);
    A[E[i][0]] = p;
}

dfsPath();


















//
