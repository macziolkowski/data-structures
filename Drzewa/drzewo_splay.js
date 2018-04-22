function bstNode(up, left, right, key) {
    this.up = up;
    this.left = left;
    this.right = right;
    this.key = key;
}


var cr, cl, cp, root;
root = null;

function replaceAt(text, index, val) {
    return text.substr(0, index) + val + text.substr(index + 1);
}

function printBt(sp, sn, v) {
    var s;

    if (v) {
        s = sp;
        if (sn == cr) s = replaceAt(s, s.length - 2, ' ');
        printBt(s + cp, cr, v.right);

        s = s.substr(0, sp.length - 2);
        console.log(s + sn + v.key);

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

function insertBst(k) {
    var w, p;

    w = new bstNode(null, null, null, k);
    p = root;

    if(!p) {
        root = w;
    } else {
        while(true) {
            if (k < p.key) {
                if (!p.left) {
                    p.left = w;
                    break;
                } else {
                    p = p.left;
                }
            } else {
                if (!p.right) {
                    p.right = w;
                    break;
                } else {
                    p = p.right;
                }
            }
        }
    }

    w.up = p;
}

// Rotacja w lewo
//-----------------------

function rotL(a) {
    var b = a.right;
    var p = a.up;

    if (b) {
        a.right = b.left;
        if (a.right) a.right.up = a;

        b.left = a;
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
    }
}


// Rotacja w prawo
//-----------------------

function rotR(a) {
    var b = a.left;
    var p = a.up;

    if (b) {
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
    }
}


// Procedura Splay
// root - korzeń drzewa
// k - klucz
//-----------------------------

function splay(k) {
    var x, y;

    x = root;  // Poszukujemy węzła o kluczu k, poczynając od korzenia

    if (x) {
        do {
            if (x.key == k) break;
            y = x;    // zapamiętujemy adres węzła;
            x = k < x.key ? x.left : x.right;
        } while (x);
    }

    if (!x) x = y;     // Jeśli w drzewie nie ma takiego węzła, to za x
                       // bierzemy bezpośredni następnik lub poprzednik
    while (true) {     // W pętli węzeł x przesuwamy do korzenia
        if (!x.up) break;

        if (!x.up.up) {  // ojcem x jest korzeń
            if (x.up.left == x) {
                rotR(x.up);
            } else {
                rotL(x.up);
            }
            break;
        }

        if ((x.up.up.left == x.up) && (x.up.left == x)) {
            // prawy ZIG-ZIG
            rotR(x.up.up);
            rotR(x.up);
            continue;
        }

        if ((x.up.up.right == x.up) && (x.up.right == x)) {
            // lewy ZIG-ZIG
            rotL(x.up.up);
            rotL(x.up);
            continue;
        }

        if (x.up.right == x) {
            // lewy ZIG, prawy ZAG
            rotL(x.up);
            rotR(x.up);
        } else {
            // prawy ZIG, lewy ZAG
            rotR(x.up);
            rotL(x.up);
        }
    }
}


// **********************
// *** PROGRAM GŁÓWNY ***
// **********************

var a, b, c, i;
// root zadeklarowany na początku

cr = String.fromCharCode(9484).concat(String.fromCharCode(9472));
cl = String.fromCharCode(9492).concat(String.fromCharCode(9472));
cp = String.fromCharCode(9474).concat(' ');

a = c = 8;
b = 16;

for (i = 0; i < 15; i++) {
    insertBst(c);
    c += b;
    if (c > 16) {
        a >>= 1;
        b >>= 1;
        c = a;
    }
}

printBt("", "", root);

c = 1 + Math.round(Math.random() * 15);
console.log("\nKlucz : " + c);

splay(c);

console.log("============================\n");

printBt("", "", root);
dfsRelease(root);


















//
