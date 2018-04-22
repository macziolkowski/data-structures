function Node(data) {
  this.data = data;
  this.next = null;
}

function slist() {
  this.head = null;
  this._length = 0;
}

slist.prototype.printl = function() {
  var p = this.head;

  while(p) {
    console.log(p.data);
    p = p.next;
  }
};

slist.prototype.pushFront = function(v) {
  var p = new Node(v);

  p.next = this.head;
  this.head = p;
  this._length++;
};

slist.prototype.popFront = function() {
  var p = this.head;

  if(p) {
    this.head = p.next;
    p.next = null;
    this._length--;
  }
};

slist.prototype.split = function(l1, l2) {

  var s = false;
  l1.pushFront(0);
  l2.pushFront(0);
  p1 = l1.head;
  p2 = l2.head;

  while(this.head) {

    if(s) {
      p2.next = this.head;
      p2 = p2.next;
    } else {
      p1.next = this.head;
      p1 = p1.next;
    }
    this.head = this.head.next;
    s = !s;

  }
  p1.next = p2.next = null;
  l1.popFront();
  l2.popFront();
};

slist.prototype.merge = function(l1, l2) {
  this.pushFront(0);
  var p = this.head;

  while(l1.head && l2.head) {

    if(l1.head.data > l2.head.data) {
      p.next = l2.head;
      l2.head = l2.head.next;
    } else {
      p.next = l1.head;
      l1.head = l1.head.next;
    }
    p = p.next;
  }

  while(l1.head) {
    p.next = l1.head;
    l1.head = l1.head.next;
    p = p.next;
  }

  while(l2.head) {
    p.next = l2.head;
    l2.head = l2.head.next;
    p = p.next;
  }

  this.popFront();
};

slist.prototype.mergeSort = function() {
  var h1 = new slist();
  var h2 = new slist();

  if(this.head && this.head.next) {
    this.split(h1, h2);
    h1.mergeSort();
    h2.mergeSort();
    this.merge(h1, h2);
  }
};

var test = new slist();
var i;

for (i = 0; i < 20; i++) {
  test.pushFront(Math.round(Math.random() * 20));
}

test.printl();

console.log('After sorting');
test.mergeSort();
test.printl();
