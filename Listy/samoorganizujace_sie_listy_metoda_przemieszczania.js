function Node(data) {
  this.data = data;
  this.next = null;
  this.previous = null;
}

function dlist() {
  this.head = null;
  this.tail = null;
  this._length = 0;
}

dlist.prototype.printl = function() {
  var p = this.head;

  while(p) {
    console.log(p.data);
    p = p.next;
  }
};

dlist.prototype.pushFront = function(v) {
  var p = new Node(v);

  p.next = this.head;
  this.head = p;
  if (p.next) {
    p.next.previous = p;
  } else {
    this.tail = p;
  }

  ++this._length;
};

dlist.prototype.popFront = function() {
  var p = this.head;

  if(p.next) {
    this.head = p.next;
    p.next.previous = null;
    p.next = null;
  } else {
    this.head = null;
    this.tail = null;
  }

  --this._length;
};

dlist.prototype.findMove = function(v) {
  var p;

  for(p = this.head; p; p = p.next) {

    if(p.data == v) {

      if(p.previous) {
        p.previous.next = p.next;
      } else {
        break;
      }

      if(p.next) {
        p.next.previous = p.previous;
      } else {
        this.tail = p.previous;
      }

      p.next = p.previous;
      p.previous = p.next.previous;
      p.next.previous = p;
      if (p.previous) {
        p.previous.next = p;
      } else {
        this.head = p;
      }

      break;
    }

  }

  return p;
};

var test = new dlist();
var i;

for(i = 20; i > 0; i--) {
  test.pushFront(i);
}

test.printl();
console.log('Długosc: ' + test._length);

for(i = 0; i < 60; i++) {
  test.findMove(Math.round(Math.random() * 19 + 1));
}

console.log('A teraz po samoorgranizacji:');
test.printl();
