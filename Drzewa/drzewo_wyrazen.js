// Program działa, ale chyba wkradł się jakiś błąd, daje inny wynik niż
// na stronie szkoły
// Później wartoby sprawdzić

var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.prompt();
rl.on('line', function(line) {
    if (line === 'print') {
        root = etree(ONP(equation));
        printBt("", "", root);
        dfsRelease(root);
    } else if(line === 'close') {
        console.log("Thank you for using binary tree doctor");
        rl.close();
    } else {
        equation = line;
    }
}).on('close', function() {
    process.exit(0);
});


// To nie zadziała, ale nie wiem czemu
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement+ str.substr(index + replacement.length);
}

function btNode(left, right, data) {
    this.left = left;
    this.right = right;
    this.data = data;
}

var S_MAX = 100; //  rozmiar dla stosów

// Zmienn globalne
//--------------------

var cr, cl, cp; // łańcuchy do znaków ramek

// Zwraca priorytet operatora
//-----------------------------

function p(c) {
    switch(c) {
        case '+' :
        case '-' : return 1;
        case '*' :
        case '/' : return 2;
        case '^' : return 3;
    }
    return 0;
}

// Funkcja przekształca wyrażenie arytmetyczne e na ONP
//-----------------------------------------------------

function ONP(e) {
    var S = new Array(S_MAX);
    var sp, t, i;

    sp = 0;
    t = "";

    for (i = 0; i < e.length; i++) {
        switch(e[i]) {
            case ' ' : break; // spację ignorujemy
            case '(' : {      // nawias otwierający zawsze na stos
                S[sp++] = '(';
                break;
            }
            case ')' : {      // Ze stosu przesyłamy na wyjście wsszystkie
                while(S[sp - 1] != '(') {  // operatory aż do nawiasu otw.
                    t += S[--sp];
                    console.log(S[sp] + ' ');
                }
                sp--; // Usuwamy ze stosu nawias otwierajcy
                break;
            }
            case '+' :
            case '-' :
            case '*' :
            case '/' :
            case '^' : {
                while(sp) {
                    if ((p(e[i]) == 3) || (p(e[i]) > p(S[sp - 1]))) break;
                    // Na wyjście przesyłamy ze stosu wszystkie operatory
                    // o wyższych priorytetach
                    t += S[--sp];
                    console.log(S[sp] + ' ');
                }
                S[sp++] = e[i]; // Operator umieszczamy na stosie
                break;
            }
            default: {
                t += e[i];
                console.log(e[i]);
                break;
            }
        }
    }

    while(sp) {
        t += S[--sp]; // Dodajemy do stringa ONP to co zostało na stosie
        console.log(S[sp] + ' ');
    }

    return t;
}

// Funkcja zwraca adres korzenia drzewa wyrażeń,
// które zostaje utworzone na podstawie wyrażenia e
//-------------------------------------------------

function etree(e) {
    var S = new Array(S_MAX);
    var sp, v, i;

    sp = 0;

    for (i = 0; i < e.length; i++) {
        v = new btNode(null, null, e[i]);

        switch(e[i]) {
            case '+' :
            case '-' :
            case '*' :
            case '/' :
            case '^' : {
                v.right = S[--sp]; // pobieramy ze stosu węzły
                v.left = S[--sp];  // i czynimy je synami węzła
                break;
            }
            default : {     // Argument
                v.left = v.right = null;
                break;
            }
        }

        S[sp++] = v;
    }

    return S[sp - 1];  // Zwracamy adres korzenia
}

function dfsRelease(v) {
    if(v) {
        dfsRelease(v.left);
        dfsRelease(v.right);
        v = null;
    }
}

function printBt(sp, sn, v) {
    var s;

    if(v) {
        s = sp;
        if(sn == cr) s = replaceAt(s, s.length - 2, ' ');
        printBt(s + cp, cr, v.right);

        s = s.substr(0, s.length - 2);
        console.log(s + sn + v.data);

        s = sp;
        if(sn == cl) s = replaceAt(s, s.length - 2, ' ');
        printBt(s + cp, cl, v.left);
    }
}

var equation, root, cr, cp, cl;

cr = String.fromCharCode(9484).concat(String.fromCharCode(9472));
cl = String.fromCharCode(9492).concat(String.fromCharCode(9472));
cp = String.fromCharCode(9474).concat(' ');

















//
