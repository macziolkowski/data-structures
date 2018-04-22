function bstNode(up, left, right, key) {
    this.up = up;
    this.left = left;
    this.right = right;
    this.key = key;
}

var cr, cl, cp; // Zmienne globalne

function replaceAt(string, index, val) {
    return string.substr(0, index) + val + string.substr(index + 1);
}

function printBt(sp, sn, v) {
    var s;

    if(v) {
        s = sp;
        if(sn == cr) s = replaceAt(s, s.length - 2, ' ');
        printBt(s + cp, cr, v.right);

        s = s.substr(0, s.length - 2);
        console.log(s + sn + v.key);

        s = sp;
        if(sn == cl) s = replaceAt(s, s.length - 2, ' ');
        printBt(s + cp, cl, v.left);
    }
}

function dfsRelease(v) {
    if(v) {
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
                if(!p.left) {
                    p.left = w;
                    break;
                } else {
                    p = p.left;
                }
            } else {
                if(!p.right) {
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

function findBst(p, k) {
    while(p && p.key != k) {
        p = (k < p.key) ? p.left : p.right;
    }

    return p;
}

function minBst(p) {
    if(p) {
        while(p.left) {
            p = p.left;
        }
    }

    return p;
}

function succBst(p) {
    var r;

    if(p) {
        if(p.right) {
            return minBst(p.right);
        } else {
            r = p.up;
            while(r && (p == r.right)) {
                p = r;
                r = r.up;
            }
            return r;
        }
    }

    return p;
}

// Procedura usuwa węzeł z drzewa BST
// root - referencja do zmiennej wskazującej węzeł
// X = wskazanie węzła do usunięcia

function removeBst(x) {
    var y, z;

    if(x) {
        // Jeśli X nie ma synów lub ma tylko jednego, to Y wskazuje X
        // Inaczej Y wskazuje następnik X

        y = !x.left || !x.right ? x : succBst(x);

        // Z wskazuje syna Y lub null

        z = y.left ? y.left : y.right;

        // Jeśli syn Y istnieje, to zastąpi Y w drzewie

        if(z) z.up = y.up;

        // Y zostaje zastąpione przez Z w drzewie;

        if(!y.up) {
            root = z;
        } else if (y == y.up.left) {
            y.up.left = z;
        } else {
            y.up.right = z;
        }

        // Jeśli Y jest następnikiem X, to kopiujemy dane

        if(y != x) x.key = y.key;

        y = null;
    }
}

var tK = new Array(15);
var i, x, root, i1, i2;
root = null;


cr = String.fromCharCode(9484).concat(String.fromCharCode(9472));
cl = String.fromCharCode(9492).concat(String.fromCharCode(9472));
cp = String.fromCharCode(9474).concat(' ');


for(i = 0; i < 15; i++) {
    tK[i] = i+1;
}

for(i = 0; i < 100; i++) {
    i1 = Math.round(Math.random() * 14);
    i2 = Math.round(Math.random() * 14);

    x = tK[i1];
    tK[i1] = tK[i2];
    tK[i2] = x;
}

for(i = 0; i < 15; i++) {
    console.log(tK[i]);
    insertBst(tK[i]);
}

printBt("", "", root);

for (i = 0; i < 100; i++) { // ponownie mieszamy tablicę
    i1 = Math.round(Math.random() * 14);
    i2 = Math.round(Math.random() * 14);

    x = tK[i1];
    tK[i1] = tK[i2];
    tK[i2] = x;
}

for(i = 0; i < 5; i++) {
    console.log(tK[i]);

    removeBst(findBst(root, tK[i]));
}


printBt("", "", root);













//
