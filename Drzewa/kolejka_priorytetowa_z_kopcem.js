var MAXINT = -2147483647;

function qelement(data) {
    this.prio = 0;
    this.data = data;
}

function queue(l) {
    // Chyba wypadałoby wpompować nody do pustej tablicy

    var T = new Array(l);
    var n = 0;

    this.empty = function() {
        return !n;
    };

    this.front = function() {
        return n ? T[0].data : -MAXINT;
    };

    this.frontPrio = function() {
        return n ? T[0].prio : -MAXINT;
    };

    this.push = function(prio, v) {
        var i, j;

        n++;
        i = n;
        j = Math.floor((i - 1) / 2);

        while(i > 0 && T[j].prio < prio) {
            T[i] = T[j];
            i = j;
            j = (i - 1) / 2;
        }

        T[i].prio = prio;
        T[i].data = data;
    };

    this.pop = function() {
        var i, j, v, p;

        if(n--) {
            //n -= 1;
            p = T[n].prio;
            v = T[n].data;

            i = 0;
            j = 1;

            while(j < n) {
                if (j + 1 < n && T[j+1].prio > T[j].prio) j++;
                if (p >= T[j+1].prio) break;
                T[i] = T[j];
                i = j;
                j = Math.floor(2 * j + 1);
            }

            T[i].prio = p;
            T[i].data = v;
        }
    };
}

//// Main

var Q = new queue(10);
var i, p, v;

for (i = 0; i < 10; i++) {
    v =  Math.round(Math.random() * 100);
    p = Math.round(Math.random() % 10);
    console.log(v + ' : ' +  p);
    Q.push(p, v);
}

while (!Q.empty()) {
    console.log(Q.front() + " : " + Q.frontPrio());
    Q.pop();
}



















///
