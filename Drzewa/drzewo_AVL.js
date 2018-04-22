// Ogólnie ten program mi działa
// Ale czy prawidłowo równoważy drzewo
// To ja nie mam bladego pojęcia
//-------------------------------------------------

function avlNode(up, left, right, bf, key) {
    this.up = up;
    this.left = left;
    this.right = right;
    this.key = key;
    this.bf = bf;
}

// Zmienne globalne

var cr, cl, cp, root;
root = null;

function replaceAt(text, index, val) {
    return text.substr(0, index) + val + text.substr(index + 1);
}

function printBt(sp, sn, v) {
    var s;

    if(v) {
        s = sp;
        if (sn == cr) s = replaceAt(s, s.length - 2, ' ');
        printBt(s + cp, cr, v.right);

        s = s.substr(0, sp.length - 2);
        console.log(s + sn + v.key + ":" + v.bf);

        s = sp;
        if (sn == cl) s = replaceAt(s, s.length - 2, ' ');
        printBt(s + cp, cl, v.left);
    }
}

function dfsRelease(v) {
    if (v) {
        dfsRelease(v.left);
        dfsRelease(v.right);

        v.up = null;
        v.left = null;
        v.right = null;
        v.key = null;
    }
}

// Rotacja RR

function rr(a) {
    var b = a.right;
    var p = a.up;

    a.right = b.left;
    if (a.right) a.right.up = a;

    b.left = a;
    b.up = p;
    a.up = b;

    if(p) {
        if (p.left == a) {
            p.left = b;
        } else {
            p.right = b;
        }
    } else {
        root = b;
    }

    if (b.bf == -1) {
        a.bf = b.bf = 0;
    } else {
        a.bf = -1;
        b.bf = 1;
    }
}

// Rotacja LL

function ll(a) {
    var b = a.left;
    var p = a.up;

    a.left = b.right;
    if (a.left) a.left.up = a;

    b.right = a;
    b.up = p;
    a.up = b;

    if (p) {
        if (p.left == a) {
            p.left = b;
        } else {
            p.right = b;
        }
    } else {
        root = b;
    }

    if (b.bf == 1) {
        a.bf = b.bf = 0;
    } else {
        a.bf = 1;
        b.bf = -1;
    }

}

// Rotacja RL

function rl(a) {
    var b = a.right;
    var c = b.left;
    var p = a.up;

    b.left = c.right;
    if (b.left) b.left.up = b;

    a.right = c.left;
    if (a.right) a.right.up = a;

    c.left = a;
    c.right = b;
    a.up = b.up = c;
    c.up = p;

    if (p) {
        if (p.left == a) {
            p.left = c;
        } else {
            p.right = c;
        }
    } else {
        root = c;
    }

    if (c.bf == -1) {
        a.bf = 1;
    } else {
        a.bf = 0;
    }

    if (c.bf == 1) {
        b.bf = -1;
    } else {
        b.bf = 0;
    }
}

// Rotacja LR

function lr(a) {
    var b = a.left;
    var c = b.right;
    var p = a.up;

    b.right = c.left;
    if (b.right) b.right.up = b;

    a.left = c.right;
    if (a.left) a.left.up = a;

    c.right = a;
    c.left = b;
    a.up = b.up = c;
    c.up = p;

    if (p) {
        if (p.left == a) {
            p.left = c;
        } else {
            p.right = c;
        }
    } else {
        root = c;
    }

    if (c.bf == 1) {
        a.bf = -1;
    } else {
        a.bf = 0;
    }

    if (c.bf == -1) {
        b.bf = 1;
    } else {
        b.bf = 0;
    }

    c.bf = 0;
}


// Wstawia nowy węzeł do drzewa AVL
// k - klucz nowego węzła

function insertAvl(k) {
    var w, p, r, t;

    w = new avlNode(null, null, null, 0, k);
    //-----------------------------------------------
    // FAZA 1 - wstawianie węzła do drzewa AVL
    //-----------------------------------------------

    p = root;
    if(!p) {
        root = w;
    } else {
        while (true) {
            if (k < p.key) {
                if (!p.left) {
                    p.left = w;
                    break;
                }
                p = p.left;
            } else {
                if (!p.right) {
                    p.right = w;
                    break;
                }
                p = p.right;
            }
        }
    }

    w.up = p;

    //-----------------------------------------------
    // FAZA 2 - równoważenie drzewa AVL
    //-----------------------------------------------

    if (p) { // Dodałem tutaj warunek jeżeli p istnieje
        if (p.bf) {
            p.bf = 0; // UWAGA NR 1
        } else {
            if (p.left == w) { // UWAGA NR 2
                p.bf = 1;
            } else {
                p.bf = -1;
            }

            r = p.up;         // będziemy szli w górę drzewa w kierunku korzenia
                              // r i p wskazują ojca i syna na tej ścieżce
            t = false;
            while (r) {
                if (r.bf) {
                    t = true; // ustalamy wynik pętli
                    break;    // przerywamy pętlę
                }
                              // inaczej modyfikujemy r.bf
                if (r.left == p) {
                    r.bf = 1;
                } else {
                    r.bf = -1;
                }

                p = r;
                r = r.up;
            }

            if (t) {
                if (r.bf == 1) {
                    if (r.right == p) {
                        r.bf = 0;
                    } else if (p.bf == -1) {
                        lr(r);
                    } else {
                        ll (r);
                    }
                } else {
                    if (r.left == p) {
                        r.bf = 0;
                    } else if(p.bf == 1) {
                        rl(r);
                    } else {
                        rr(r);
                    }
                }
            }
        }
    }
}


// Funkcja znajduje poprzednik węzła p
//-----------------------------------------------

function predAvl(p) {
    var r;

    if (p) {
        if (p.left) {
            p = p.left;
            while (p.right) p = p.right;
        } else {
            do {
                r = p;
                p = p.up;
            } while (p && p.right != r);
        }
    }

    return p;
}

// Funkcja szuka w drzewie AVL węzła o zadanym kluczu.
// Jeśli go znajdzie, zwraca jego wskazanie. Jeżeli nie,
// to zwraca wskazanie puste.
// Parametrami są:
// p - wskazanie korzenia drzewa AVL
// k - klucz poszukiwanego węzła
//-----------------------------------------------

function findAvl (p, k) {
    while (p && p.key != k) {
        p = (k < p.key) ? p.left : p.right;
    }

    return p;
}

// Funkcja usuwa rekurencyjnie węzeł x
// root - referencja do zmiennej z adresem korzenia
// x - wskazanie usuwanego węzła
//-----------------------------------------------

function removeAvl (x) {
    var t, y, z;
    var nest;

    if (x.left && x.right) {
        y = removeAvl(predAvl(x));
        nest = false;
    } else {
        if (x.left) {
            y = x.left;
            x.left = null;
        } else {
            y = x.right;
            x.right = null;
        }
        x.bf = 0;
        nest = true;
    }

    if (y) {
        y.up = x.up;
        y.left = x.left;
        if (y.left) {
            y.left.up = y;
        }
        y.right = x.right;
        if (y.right) {
            y.right.up = y;
        }
        y.bf = x.bf;
    }

    if (x.up) {
        if (x.up.left == x) {
            x.up.left = y;
        } else {
            x.up.right = y;
        }
    } else {
        root = y;
    }

    if (nest) {
        z = y;
        y = x.up;
        while (y) {
            if (!y.bf) {
                // Przypadek nr 1
                if (y.left == z) {
                    y.bf = -1;
                } else {
                    y.bf = 1;
                }
                break;
            } else {
                if (((y.bf == 1) && (y.left == z)) || ((y.bf == -1) && (y.right == z))) {
                    // Przypadek nr 2
                    y.bf = 0;
                    z = y;
                    y = y.up;
                } else {
                    if (y.left == z) {
                        t = y.right;
                    } else {
                        t = y.left;
                    }
                    if (!t.bf) {
                        // Przypadek 3a
                        if (y.bf == 1) {
                            ll(y);
                        } else {
                            rr(y);
                        }
                        break;
                    } else if (y.bf == t.bf) {
                        // Przypadek 3b
                        if (y.bf == 1) {
                            ll(y);
                        } else {
                            rr(y);
                        }
                        z = t;
                        y = t.up;
                    } else {
                        // Przypadek 3c
                        if (y.bf == 1) {
                            lr(y);
                        } else {
                            rl(y);
                        }
                        z = y.up;
                        y = z.up;
                    }
                }
            }
        }
    }

    return x;
}

//-----------------------------------------------
// Program główny
//-----------------------------------------------

var Tk = new Array(32); // tablica kluczy węzłów
var i, x, i1, i2;

// root jest zdefiniowany wyżej

cr = String.fromCharCode(9484).concat(String.fromCharCode(9472));
cl = String.fromCharCode(9492).concat(String.fromCharCode(9472));
cp = String.fromCharCode(9474).concat(' ');


for (i = 0; i < 32; i++) {
    Tk[i] = i + 1;
}

for (i = 0; i < 300; i++) {                   // Mieszamy tablicę
    i1 = Math.round(Math.random() * 31);      // Losujemy 2 indeksy
    i2 = Math.round(Math.random() * 31);

    x = Tk[i1];                       // Wymieniamy Tk[i1] <--> Tk[i2]
    Tk[i1] = Tk[i2];
    Tk[i2] = x;
}

for (i = 0; i < 32; i++) {
    // Na podstawie kluczy tworzymy drzewo AVL
    console.log(Tk[i]);
    insertAvl(Tk[i]);
}

printBt("", "", root);


// Ponownie mieszamy tablicę

for (i = 0; i < 300; i++) {
    i1 = Math.round(Math.random() * 31);
    i2 = Math.round(Math.random() * 31);

    x = Tk[i1];
    Tk[i1] = Tk[i2];
    Tk[i2] = x;
}

for (i = 0; i < 15; i++) {
    // usuwamy 15 węzłów
    console.log(Tk[i]);
    removeAvl(findAvl(root, Tk[i]));
}

console.log('\n========================================\n');

printBt("", "", root);
dfsRelease(root);
















//
