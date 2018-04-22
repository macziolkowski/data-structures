var MAXINT = 2147483647; // "plus nieskończoność"

var d;
var i, j, k, m, n;
var E = []; // Tablica krawędzi z wagami


n = 5;
m = 13;
d = new Array(n);

E.push([0,1,5], [0,2,4], [0,3,8]);
E.push([1,0,-4], [1,2,-2], [1,4,5]);
E.push([2,3,5], [2,4,2]);
E.push([3,0,-1], [3,1,2], [3,4,-1]);
E.push([4,2,4], [4,3,2]);


for (i = 0; i < n; i++) {
    d[i] = new Array(n);
    for (j = 0; j < n; j++) {
        d[i][j] = MAXINT;
    }
    d[i][i] = 0;
}

for (i = 0; i < m; i++) {
    d[E[i][0]][E[i][1]] = E[i][2];
}

console.log(d);


// Algorytm Floyda-Warshalla
for (k = 0; k < n; k++) {
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            if ((d[i][k]) == MAXINT || (d[k][j] == MAXINT)) continue;
            w = d[i][k] + d[k][j];
            if (d[i][j] > w) d[i][j] = w;
        }
    }
}

var txt ='';

for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
        txt += 'd[' + i + ',' + j + '] = ';
        if (d[i][j] == MAXINT) {
            txt += 'NO PATH';
        } else {
            txt += d[i][j];
        }
        console.log(txt);
        txt = '';
    }
}
