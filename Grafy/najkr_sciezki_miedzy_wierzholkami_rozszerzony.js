var MAXINT = 2147483647;

var d, p;           // Macierze kosztów oraz poprzedników
var n, m;           // Liczba wierzchołków i krawędzi
var E = [];         // Tablica krawędzi


// Funkcja wyznaczania kosztów dojścia oraz
// minimalnych ścieżek w grafie ważonym
//------------------------------------------------------------------------------
function floydWarshall() {
    var i, j, k, w;

    for (k = 0; k < n; k++) {
        for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
                if ((d[i][k] == MAXINT) || (d[k][j] == MAXINT)) continue;
                w = d[i][k] + d[k][j];
                if (d[i][j] > w) {
                    d[i][j] = w;
                    p[i][j] = p[k][j];
                }
            }
        }
    }

    for (i = 0; i < n; i++) {
        if (d[i][j] < 0) return false;      // Ujemny cykls
    }
    return true;
}


// Rekurencyjna procedura odtwarzania minimalnej
// ścieżki z macierzy poprzedników p
//------------------------------------------------------------------------------
function fwPath(i, j) {
    if (i == j) {
        txt += i + ' ';
    } else if (p[i][j] == -1) {
        txt += 'NO PATH';
    } else {
        fwPath(i, p[i][j]);
        txt += j + ' ';
    }
}


// **********************
// *** Program główny ***
// **********************

var i, j, x, y, w;

n = 5;
m = 13;

E.push([0,1,5], [0,2,4], [0,3,8]);
E.push([1,0,-4], [1,2,-2], [1,4,5]);
E.push([2,3,5], [2,4,2]);
E.push([3,0,-1], [3,1,2], [3,4,-1]);
E.push([4,2,4], [4,3,2]);

d = new Array(n);
p = new Array(n);

for (i = 0; i < n; i++) {
    d[i] = new Array(n);
    p[i] = new Array(n);
    for (j = 0; j < n; j++) {
        d[i][j] = MAXINT;
        p[i][j] = -1;
    }
    d[i][i] = 0;
}

for (i = 0; i < m; i++) {
    d[E[i][0]][E[i][1]] = E[i][2];
    p[E[i][0]][E[i][1]] = E[i][0];      // Tu wstawiamy poprzednika
}

// Wywołujemy procedurę Floyda-Warshalla

txt = '';

if (floydWarshall()) {
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            txt += i + '-' + j + ' : ';
            fwPath(i, j, txt);
            if (d[i][j] < MAXINT) txt += ' $' + d[i][j];
            console.log(txt);
            txt = '';
        }
    }
} else {
    console.log('Negative cycle found');
}
