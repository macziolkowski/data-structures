var MAXN = 30;

function replaceAt(text, index, val) {
    return text.substr(0, index) + val + text.substr(index + 1);
}

function rbtNode(up, left, right, key, color) {
    this.up = up;
    this.left = left;
    this.right = right;
    this.key = key;
    this.color = color;
}

function trbTree () {
    var S = new rbtNode(undefined, undefined, undefined, null, 'B');
    var root = S;
    var cr, cl, cp;

    cr = String.fromCharCode(9484).concat(String.fromCharCode(9472));
    cl = String.fromCharCode(9492).concat(String.fromCharCode(9472));
    cp = String.fromCharCode(9474).concat(' ');

    this.dfsRelease = function (p) {
        if (p != S) {
            dfsRelease(p.left);
            dfsRelease(p.right);

            p.up = null;
            p.left = null;
            p.right = null;
            p.key = null;
            p.color = null;
        }
    };

    this.printRbt = function (sp, sn, p) {
        var t;

        if (p != S) {
            t = sp;
            if (sn == cr) t = replaceAt(t, t.length - 2, ' ');
            printRbt(t + cp, cr, p.right);

            t = t.substr(0, sp.length - 2);
            console.log(t + sn + p.color + ":" + p.key);

            t = sp;
            if (sn == cl) t = replaceAt(t, t.length - 2, ' ');
            printRbt(t + cp, cl, p.left);
        }
    };

    this.print = function () {
        printRbt("", "", root);
    };

    this.findRbt = function (k) {
        var p;

        p = root;
        while ((p != S) && (p.key != k)) {
            if (k < p.key) {
                p = p.left;
            } else {
                p = p.right;
            }
        }

        if (p == S) return null;
        return p;
    };

    this.minRbt = function (p) {
        if (p != S) {
            while (p.left != S) p = p.left;
        }
        return p;
    };

    // Zwraca następnik p
    this.succRbt = function (p) {
        var r;

        if (p != S) {
            if (p.right != S) return minRbt(p.right);
            else {
                r = p.up;
                while ((r != S) && (p == r.right)) {
                    p = r;
                    r = r.up;
                }
                return r;
            }
        }

        return S;
    };

    this.rotL = function (a) {
        var b, p;

        b = a.right;
        if (b != S) {
            p = a.up;
            a.right = b.left;
            if (a.right != S) a.right.up = a;

            b.left = a;
            b.up = p;
            a.up = b;

            if (p != S) {
                if (p.left == a) {
                    p.left = b;
                } else {
                    p.right = b;
                }
            } else {
                root = b;
            }
        }
    };

    this.rotR = function (a) {
        var b, p;

        b = a.left;
        if (b != S) {
            p = a.up;
            a.left = b.right;
            if (a.left != S) a.left.up = a;

            b.right = a;
            b.up = p;
            a.up = b;

            if (p != S) {
                if (p.left == a) {
                    p.left = b;
                } else {
                    p.right = b;
                }
            } else {
                root = b;
            }
        }
    };

    this.insertRbt = function (k) {
        var x, y;
        x = new rbtNode(root, S, S, k);

        if (x.up == S) {
            root = x;
        } else {
            while (true) {
                if (k < x.up.key) {
                    if (x.up.left == S) {
                        x.up.left = x; // x zastępuje lewy liść
                        break;
                    }
                    x.up = x.up.left;
                } else {
                    if (x.up.right == S) {
                        x.up.right = x; // x zastępuje prawy liść
                        break;
                    }
                    x.up = x.up.right;
                }
            }
            x.color = 'R'; // węzeł kolorujemy na czerwono
            while ((x != root) && (x.up.color == 'R')){
                if (x.up == x.up.up.left) {
                    y = x.up.up.right; // y - wujek x

                    if (y.color == 'R') {
                        x.up.color = 'B';
                        y.color = 'B';
                        x.up.up.color = 'R';
                        x = x.up.up;
                        continue;
                    }

                    if (x == x.up.right) {
                        x = x.up;
                        this.rotL(x);
                    }

                    x.up.color = 'B';
                    x.up.up.color = 'R';
                    this.rotR(x.up.up);
                    break;
                } else {
                    // Przypadki lustrzane
                    y = x.up.up.left;

                    if (y.color == 'R') {
                        x.up.color = 'B';
                        y.color = 'B';
                        x.up.up.color = 'R';
                        x = x.up.up;
                        continue;
                    }

                    if (x == x.up.left) {
                        x = x.up;
                        this.rotR(x);
                    }

                    x.up.color = 'B';
                    x.up.up.color = 'R';
                    this.rotL(x.up.up);
                    break;
                }
            }
        }
    };

    this.removeRbt = function (x) {
        var w, y, z;

        if ((x.left == S) || (x.right == S)) {
            y = x;
        } else {
            y = this.succRbt(x);
        }

        if (y.left != S) {
            z = y.left;
        } else {
            z = y.right;
        }

        z.up = y.up;

        if (y.up == S) {
            root = z;
        } else if (y == y.up.left) {
            y.up.left = z;
        } else {
            y.up.right = z;
        }

        if (y != x) x.key = y.key;

        // Naprawa struktury drzewa czerwono-czarnego
        if (y.color == 'B') {
            while ((z != root) && (z.color == 'B')) {
                if (z == z.up.left) {
                    w = z.up.right;

                    if (w.color == 'R') {
                        // Przypadek 1
                        w.color = 'R';
                        z.up.color = 'R';
                        this.rotL(z.up);
                        w = z.up.right;
                    }

                    if ((w.left.color == 'B') && (w.right.color == 'B')) {
                        // Przypadek 2
                        w.color = 'R';
                        z = z.up;
                        continue;
                    }

                    if (w.right.color == 'B') {
                        // Przypadek 3
                        w.left.color = 'B';
                        w.color = 'R';
                        this.rotR(w);
                        w = z.up.right;
                    }

                    w.color = z.up.color; // Przypadek 4
                    z.up.color = 'B';
                    w.right.color = 'B';
                    this.rotL(z.up);
                    z = root;            // to spowoduje zakończenie pętli
                } else {
                    // Przypadki lustrzane
                    w = z.up.left;

                    if (w.color == 'R') {
                        // Przypadek 1
                        w.color = 'B';
                        z.up.color = 'R';
                        this.rotR(z.up);
                        w = z.up.left;
                    }

                    if ((w.left.color == 'B') && (w.right.color == 'B')) {
                        // Przypadek 2
                        w.color = 'R';
                        z = z.up;
                        continue;
                    }

                    if (w.left.color == 'B') {
                        // Przypadek 3
                        w.right.color = 'B';
                        w.color = 'R';
                        this.rotL(w);
                        w = z.up.left;
                    }

                    // Przypadek 4
                    w.color = z.up.color;
                    z.up.color = 'B';
                    w.left.color = 'B';
                    this.rotR(z.up);
                    z = root;       // To spowoduje zakończenie pętli
                }
            }
        }

        z.color = 'B';

        y.up = null;
        y.left = null;
        y.right = null;
        y.key = null;
        y.color = null;
    };
}

//**********************
//*** PROGRAM GŁÓWNY ***
//**********************

var Tk = new Array(MAXN);
var i, x, i1, i2;
var rbt = new trbTree();

for (i = 0; i < MAXN; i++) {
    // Tablicę wypełniamy wartościami kluczy
    Tk[i] = i + 1;
}

for (i = 0; i < 300; i++) {
    // Mieszamy tablicę
    i1 = Math.round(Math.random() * (MAXN - 1));
    i2 = Math.round(Math.random() * (MAXN - 1));

    x = Tk[i1];
    Tk[i1] = Tk[i2];
    Tk[i2] = x;
}

for (i = 0; i < MAXN; i++) {
    // Na podstawie tablicy tworzymy drzewo czerwono-czarne
    console.log(Tk[i]);
    rbt.insertRbt(Tk[i]);
}

rbt.print();

for (i = 0; i < 300; i++) {
    // Mieszamy tablicę
    i1 = Math.round(Math.random() * (MAXN - 1));
    i2 = Math.round(Math.random() * (MAXN - 1));

    x = Tk[i1];
    Tk[i1] = Tk[i2];
    Tk[i2] = x;
}

console.log('\n============================================\n');

// Usuwamy połowę węzłów
for (i = 0; i < MAXN >> 1; i++) {
    console.log(Tk[i]);
    rbt.removeRbt(rbt.findRbt(Tk[i]));
}

rbt.print();














//
