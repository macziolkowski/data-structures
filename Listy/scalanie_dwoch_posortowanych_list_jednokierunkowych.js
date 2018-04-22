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
  this.length++;
};

slist.prototype.popFront = function() {
  var p = this.head;

  if(p) {
    this.head = p.next;
    p.next = null;
    this._length--;
  }
};

slist.prototype.size = function() {
  var c = 0,
      p = this.head;

  while(p) {
    c++;
    p = p.next;
  }
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


var test = new slist();
var list1 = new slist();
var list2 = new slist();
var i;

for(i = 20; i > 0; i -= 2) {
  list1.pushFront(i);
  list2.pushFront(i - 1);
}

console.log('List 1:');
list1.printl();

console.log('List 2:');
list2.printl();

console.log('Test length:');
console.log(test._length);

test.merge(list1, list2);

console.log('Lists merged');
test.printl();
