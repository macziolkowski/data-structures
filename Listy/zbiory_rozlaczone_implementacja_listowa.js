function Node(data) {
  this.data = data;
  this.next = null;
  this.previous = null;
}

Node.prototype.findSet = function(x) {
  var p = x;
  for (p; p.previous; p = p.previous);
  return p;
};

function unionSets(x, y) {
  var rx, ry, p;

  rx = findSet(x);
  ry = findSet(y);

  if (rx != ry) {
    for(p = x; p.next; p = p.next);
    p.next = ry;
    ry.previous = p;
  }
}
