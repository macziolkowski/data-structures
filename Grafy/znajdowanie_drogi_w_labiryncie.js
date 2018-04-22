var MAXINT = -2147483647;

function slistel(data, next) {
    this.data = data;
    this.next = next;
}

function replaceAt(txt, index, val) {
    return txt.substr(0, index) + val + txt.substr(index + 1);
}

function queue() {
    var head;
    var tail;

    this.empty = function () {
        return !head;
    }

    this.front = function () {
        if (head) {
            return head.data;
        } else {
            return -MAXINT;
        }
    }

    this.push = function (v) {
        var p = new slistel(v, null);
        if (tail) {
            tail.next = p;
        } else {
            head = p;
        }
        tail = p;
    }

    this.pop = function () {
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
//--------------------------------

var wst, kst;  // Współrzędne startowe - wiersz, kolumna;
var wwy, kwy;  // Wpółrzędne końcowe - wiersz, kolumna;
var n = 21;    // Liczba wierszy
var L = [];    // Labirynt

L.push('########################################');
L.push('#S.##..#.....###.................##....#');
L.push('##.#.....#.#...#.######.###..###.#..####');
L.push('#..#.###.#.#.###.#....###.##.#.........#');
L.push('##...#.###.#.#...#.#.##......###########');
L.push('####.....###.#.###.#.#..#..#..#........#');
L.push('#.....##.#...#.....#.##.#.############.#');
L.push('#####..###.#########.#..#.#............#');
L.push('#........#.#.........##.#.##.###.#####.#');
L.push('#.###.##.#.#.#######..#.#..#.#.#.....#.#');
L.push('#...#..#.#.#.#........#.####.#.#####.#.#');
L.push('###.####.#.#.###.#.#..#......#.......#.#');
L.push('#...#....#.#.....#######.#####.#####.#.#');
L.push('###.#.#.##.#####.#.....#.......#.....#.#');
L.push('#...###....###.#.#.#.#.###############.#');
L.push('#.#...########.#.#.#.#.................#');
L.push('###.#.#........#.#.#########.###########');
L.push('#...#....#####.#.#...#.....#.......#...#');
L.push('#.########...###.#.#.#.#####.#.###.#.###');
L.push('#..........#.....#.#.........#...#....W#');
L.push('########################################');


function readL() {
    var s, T;
    var i, j;

    i = 0;
              // Liczba wierszy w L
    wst = kst = wwy = kwy = -1;    // Współrzędne startu oraz wyjścia

    for (i = 0; i < n; i++) {    // Szukamy S i W
        for (j = 0; j < L[i].length; j++) {
            if (L[i][j] == 'S') {
                wst = i;
                kst = j; // S znalezione
            } else if (L[i][j] == 'W') {
                wwy = i;
                kwy = j; // W znalezione
                L[i] = replaceAt(L[i], j, '.');
            }
        }
    }
}

// Procedura szukania wyjścia
//-----------------------------------

function findW() {
    var Q = new queue();
    var w, k;     // Wiersz, kolumna bieżącego wierzchołka
    var i, j;

    Q.push(wst);
    Q.push(kst);

    while (!Q.empty()) {
        w = Q.front(); Q.pop(); // Pobieramy z kolejki wiersz;
        k = Q.front(); Q.pop(); // i kolumnę bieżącego wierzchołka

        // Sprawdzamy czy osiągneliśmy wyjście

        if ((w == wwy) && (k == kwy)) break;

        // Przeglądamy sąsiadów bieżącego wierzchołka

        for (i = -1; i <= 1; i++) {
            for (j = -1; j <= 1; j++) {
                if ((i != j) && (!i || !j)) {
                    if (L[w+i][k+j] == '.') {
                        // W komórce sąsiada zapisujemy, skąd przyszliśmy do niej

                        if (i == -1) {
                            L[w + i] = replaceAt(L[w+i], k+j, 'd'); // z dołu
                        } else if (i == 1) {
                            L[w + i] = replaceAt(L[w+i], k+j, 'g'); // z góry
                        } else if (j == -1) {
                            L[w + i] = replaceAt(L[w+i], k+j, 'p'); // z prawej
                        } else {
                            L[w + i] = replaceAt(L[w+i], k+j, 'l'); // z lewej
                        }

                        Q.push(w + i); // Sąsiad zostaje umieszczony w kolejce
                        Q.push(k + j);
                    }
                }
            }
        }
    }
}


// Procedura wypisuje labirynt z ewentualną ścieżką
// Zastępuje znaki kierunków znakiem -.
//-----------------------------------------------------------

function writeL() {
    var i, j;
    var c;

    // Najpierw sprawdzamy, czy ścieżka została znaleziona
    // Jeśli tak, to zastępujemy ją znakami +

    if (L[wwy][kwy] != '.') {
        i = wwy;
        j = kwy;

        while ((i != wst) || (j != kst)) {
            c = L[i][j];
            L[i] = replaceAt(L[i], j, '+');
            switch (c) {
                case 'd' :
                    i++;
                    break;
                case 'g' :
                    i--;
                    break;
                case 'p' :
                    j++;
                    break;
                case 'l' :
                    j--;
                    break;
            }
        }
    }

    L[wwy] = replaceAt(L[wwy], kwy, 'W');  // Odtwarzamy znak wyjścia

    // Teraz usuwamy znaki kierunku i wypisujemy labirynt

    for (i = 0; i < n; i++) {
        for (j = 0; j < L[i].length; j++) {
            switch (L[i][j]) {
                case 'g': ;
                case 'd': ;
                case 'p': ;
                case 'l': L[i] = replaceAt(L[i], j, ' ');
            }
        }
        console.log(L[i]);
    }
}

// **********************
// *** Program główny ***
// **********************

readL();

if ((wst == -1) || (kst == -1) || (wwy == -1) || (kwy == -1)) {
    console.log("Brak definicji S lub W!!! \n")
} else {
    findW(); // Szukamy wyjścia
    writeL(); // Wyświetlamy wyniki poszukiwań
}
