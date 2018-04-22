// Nie wiem czy ten algorytm działa prawidłowo u mnie
// Ale nie chce mi się tego teraz sprawdzać
// Ale i tak sprawdź to później.


function bstNode(up, left, right, key) {
    this.up = up;
    this.left = left;
    this.right = right;
    this.key = key;
}

var cr, cl, cp;
var root = null;

function replaceAt(text, index, val) {
    return text.substr(0, index) + val + text.substr(index + 1);
}

function printBt(sp, sn, v) {
    var s = "";

    if(v) {
        s = sp;
        if (sn == cr) s = replaceAt(s, s.length - 2, ' ');
        printBt(s + cp, cr, v.right);

        s = s.substr(0, s.length - 2);
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
        while (true) {
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

function rotL (a) {
    var b = a.right;
    var p = a.up;

    if (b) {
        a.right = b.left;
        if (a.right) a.right.up = a;

        b.left = a;
        b.up = p;
        a.up = b;
    }

    if(p) {
        if(p.left == a) {
            p.left = b;
        } else {
            p.right = b;
        }
    } else {
        root = b;
    }
}

// Rotacja w prawo

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

var i;

cr = String.fromCharCode(9484).concat(String.fromCharCode(9472));
cl = String.fromCharCode(9492).concat(String.fromCharCode(9472));
cp = String.fromCharCode(9474).concat(' ');

for(i = 0; i < 15; i++) {
    insertBst(10 + Math.round(Math.random() * 90));
}

printBt("", "", root);

// Dokonujemy rotacji lewego poddrzewa w lewo, jeśli istnieje

if (root.left) rotL(root.left);

// Dokonujemy rotacji prawego poddrzewa w prawo, jeśli istnieje

if (root.right) rotR(root.right);

console.log("\n\n\n Po rotacjach \n\n\n");

printBt("", "", root);

dfsRelease(root);















/////
