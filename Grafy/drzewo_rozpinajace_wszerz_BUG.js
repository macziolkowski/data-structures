// Aplikacja przy wykonywaniu nie zwraca żadnego błędu i nie whygląda na to
// żeby się wywalała
// znowu się kłania problem że JavaScript przekazuje zmienne przez wartość a nie
// przez referencje, co powoduje, że trzeba trochę te funkcje inaczej napisać
// zauważyłem że nie ma tego problemu, gdy funkcje są metodami jakiegoś obiektu
// wtedy wszystko wydaje się banglać
// póki co nie chce mi się myśleć nad obejściem tego, ale będzie trzeba to
// ostatecznie zrobić

function slistel(data, next) {
    this.data = data;
    this.next = next;
}

var n = 17;
var m  =24;
var A = new Array(n); // Tablica list sąsiedztwa grafu
var T = new Array(n); // Tablica sąsiedztwa drzewa rozpinającego
var visited = new Array(n) // Tablica odwiedzin
var E = []; // Tablica krawędzi

E.push([0,1], [0,2], [0,3]);
E.push([1,2], [1,9], [1,14]);
E.push([2,6]);
E.push([3,4], [3,6]);
E.push([4,12], [4,13]);
E.push([5,6], [5,9]);
E.push([6,7], [6,8], [6,12]);
E.push([7,13]);
E.push([10,11], [10,14], [10,15]);
E.push([11,16]);
E.push([12,16]);
E.push([13,16]);
E.push([14,15]);


// Zapisuje na początek listy

function push(L, x) {
    p = new slistel(x, L);
    L = p;
}

// Odczytuje z listy usuwając odczytany element

function pop(L) {
    var x = L.data;
    var p = L;
    L = L.next;
    p.data = null;
    p.next = null;
    return x;
}

// Zapisuje do kolejki

function qPush(x) {
    var p = new slistel(x, null);
    if (!tail) {
        head = p;
    } else {
        tail.next = p;
    }
    tail = p;
}

// Odczytuej z kolejki usuwając element

function qPop() {
    var p = head;
    var x = head.data;
    head = head.next;
    if (!head) {
        tail = null;
    }
    p.data = null;
    p.next = null;
    return x;
}

// Tworzymy drzewo rozpinające

function bfsTree(v) {
            // Kolejka
    var p;
    var w, z;

    head = tail = null;         // Tworzymy pustą kolejkę

    qPush(-1);      // W kolejce umieszczamy krawędź -1 v
    qPush(v);

    visited[v] = true;          // Oznaczamy v jako odwiedzony

    while (head) {              // Uruchamiamy BFS
        v = qPop();   // Pobieramy parę v-w z kolejki
        w = qPop();

        if (v > -1) push(T[v],w); // w dodajemy do listy T[v];
        for (p = A[w]; p; p = p.next) { // Sąsiadów wierzchołka umieszczamy w kolejce
            z = p.data;
            if (!visited[z]) {
                visited[z] = true;
                qPush(w);   // Do kolejki para w-sąsiad
                qPush(z);
            }
        }
    }
}


// **********************
// *** Program główny ***
// **********************

var i, p;

for (i = 0; i < n; i++) {
    A[i] = null;
    T[i] = null;
    visited[i] = false;
}

// Odczytujemy kolejne definicje krawędzi

for (i = 0; i < m; i++) {
    push(A[E[i][0]], E[i][1]);   // Krawędź v1-v2
    push(A[E[i][1]], E[i][0]);   // Krawędź v2-v1
}

console.log(A);

// Tworzymy drzewo rozpinające wszerz

bfsTree(6);

for (i = 0; i < n; i++) {
    console.log(i + ' :');
    for (p = T[i]; p; p = p.next) console.log('->' + p.data);
}




















//
