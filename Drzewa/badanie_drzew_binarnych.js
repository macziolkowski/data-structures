var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var test = [];


rl.prompt();
rl.on('line', function(line) {
    if (line === 'start') {
        readBt(test);
        dfs(root);
        writeBt();
        deleteBt();
    } else if (line === 'finish') {
        console.log("Thank you for using binary tree doctor");
        rl.close();
    } else {
        var temp = line.split(' ').map(function(x) {
            if(x != 'null') return parseInt(x);
            return null;
        });
        test.push(temp);
        console.log(test);
    }
    rl.prompt();
}).on('close', function() {
    process.exit(0);
});


function btNode() {
    this.left = null;
    this.right = null;
    this.level = 0;
    this.data = null;
}

var maxpath = 0;
var minpath = 2147483647;
var levelcount = [];
var leafcount = 0;
var onechildcount = 0;
var nodesum = 0;
var n, root;

function readBt(arr) {
    var n = arr.length;
    var vp = new Array(n);
    var i, d, l, r;

    for(i = 0; i < n; i++) {
        vp[i] = new btNode();
    }

    for (i = 0; i < n; i++) {
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

    var levelcount = new Array(n);
    for(i= 0; i < n; i++) levelcount[i] = 0;
}

function dfs(v) {
    if (v) {
        var children = 0;

        if (v.left) {
            children++;
            v.left.level = v.level + 1;
        }

        if(v.right) {
            children++;
            v.right.level = v.level + 1;
        }

        // test na najdłuższą ścieżkę

        if (v.level > maxpath) maxpath = v.level;

        // test na najkrótszą ścieżkę do liścia i zliczanie liści

        if (!children) {
            if (v.level < minpath) minpath = v.level;
            leafcount++;
        }

        // zliczanie węzłów na bieżącym poziomie
        levelcount[v.level] += 1; // Ta linia coś mi nie działa

        // zliczanie węzłów z jednym synem
        if (children == 1) onechildcount++;

        // sumowanie wartości węzłów

        nodesum += v.data;

        dfs(v.left);
        dfs(v.right);
    }
}

function writeBt() {
    console.log('maxpath = ' + maxpath);
    console.log('minpath = ' + minpath);

    for(var i = 0; i <= maxpath; i++) {
        console.log('level ' + i + " : number of nodes = " + levelcount[i]);
    }

    console.log('leafcount = ' + leafcount);
    console.log('onechildcount = ' + onechildcount);
    console.log('nodesum = ' + nodesum);
}

function dfsRelease(v) {
    if (v) {
        dfsRelease(v.left);
        dfsRelease(v.right);
        v =  null;
    }
}

function deleteBt() {
    dfsRelease(root);
}






















////
