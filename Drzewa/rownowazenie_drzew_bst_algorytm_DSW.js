function bstNode(up, left, right, key) {
    this.up = up;
    this.left = left;
    this.right = right;
    this.key = key;
}


var cr, cl, cp;

function replaceAt(text, index, val) {
    return text.substr(0, index) + val + text.substr(index + 1);
}

function printBt(sp, sn, v) {
    var s;

    if (v)  {
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

function log2(x) {
    var y = 1;

    while((x >>= 1) > 0) y <<= 1;

    return y;
}


function rebalanceDsw(v) {
    var n, i, s, p;

    n = 0;
    p = root;
    while(p) {
        if (p.left) {
            rotR(p);
            p = p.up;
        } else {
            n++;
            p = p.right;
        }
    }

    s = n + 1 - log2(n + 1);

    p = root;

    for(i = 0; i < s; i++) {
        rotL(p);
        p = p.up.right;
    }

    n = n - s;

    while(n > 1) {
        n >>= 1;
        p = root;
        for (i = 0; i < n; i++) {
            rotL(p);
            p = p.up.right;
        }
    }
}

var i;
var root = null;

cr = String.fromCharCode(9484).concat(String.fromCharCode(9472));
cl = String.fromCharCode(9492).concat(String.fromCharCode(9472));
cp = String.fromCharCode(9474).concat(' ');

for (i = 0; i < 15; i ++) insertBst(Math.round(Math.random() * 50));

printBt("", "", root);
console.log("\n================================\n");
rebalanceDsw(root);
printBt("", "", root);
dfsRelease(root);

















////
