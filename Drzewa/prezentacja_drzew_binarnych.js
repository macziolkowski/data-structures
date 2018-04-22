var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function btNode() {
    this.left = null;
    this.right = null;
    this.data = null;
}


var data = [];
var root;

var cr = String.fromCharCode(9484).concat(String.fromCharCode(9472)); // ┌─
var cl = String.fromCharCode(9492).concat(String.fromCharCode(9472)); // └─
var cp = String.fromCharCode(9474).concat(String.fromCharCode(32)); // "│ "

function readBt(arr) {
    var n = arr.length;
    var vp = new Array(n);
    var i, l, r, d;

    for(i = 0; i < n; i++) {
        vp[i] = new btNode();
    }

    for(i = 0; i < n; i++) {
        d = arr[i][0];
        l = arr[i][1];
        r = arr[i][2];

        vp[i].data = d;
        vp[i].left = l ? vp[l] : null;
        vp[i].right = r ? vp[r] : null;
    }

    console.log('This is vp');
    console.log(vp);

    root = vp[0];
}

function dfsRelease(v) {
    if(v) {
        dfsRelease(v.left);
        dfsRelease(v.right);
        v = null;
    }
}


// Nie kumam tego algorytmu, i co teraz?
function printBt(sp, sn, v) {
    var s;

    if(v) {
        s = sp;
        if (sn == cr) s[s.length - 2] = ' ';
        printBt(s + cp, cr, v.right);

        s = s.substring(0, sp.length - 2);
        console.log(s + sn + v.data);

        s = sp;
        if(sn == cl) s[s.length - 2] = ' ';
        printBt(s + cp, cl, v.left);
    }
}


rl.prompt();
rl.on('line', function(line) {
    if(line === 'start') {
        readBt(data);
        printBt("", "", root);
        dfsRelease(root);
    } else if(line === 'exit') {
        console.log("Thank you for using binary tree illustrator");
        rl.close();
    } else {
        var temp = line.split(' ').map(function(x) {
            if(x) return parseInt(x);
            return null;
        });
        data.push(temp);
        console.log(data);
    }
}).on('close', function() {
    process.exit(0);
});






//
