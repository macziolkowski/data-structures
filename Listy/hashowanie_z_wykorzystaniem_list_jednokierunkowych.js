////// Implementacja tablicy haszowanej w JavaScript //////

function NaiveDict() {
  this.keys = [];
  this.values = [];
}

NaiveDict.prototype.set = function(key, value) {
  this.keys.push(key);
  this.values.push(value);
};

NaiveDict.prototype.get = function(lookupKey) {

  for(var i = 0; i < this.keys.length; i++) {
    var key = this.keys[i];

    if(key == lookupKey) {
      return this.values[i];
    }

  }
};


function HashTable(size) {
  this.bucketCount = size;
  this.buckets = [];
  for (var i = 0; i < this.bucketCount; i++) {
    this.buckets.push(new NaiveDict());
  }
}

HashTable.prototype.hashFunction = function(key) {
  var hash = 0;
  for (var i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }

  return hash;
};

HashTable.prototype.getBucketIndex = function(key) {
  return this.hashFunction(key) % this.bucketCount;
};

HashTable.prototype.getBucket = function(key) {
  return this.buckets[this.getBucketIndex(key)];
};

HashTable.prototype.set = function(key, value) {
  this.getBucket(key).set(key, value);
};

HashTable.prototype.get = function(lookupKey) {
  return this.getBucket(lookupKey).get(lookupKey);
};


//// Program ktory sprawdzi wydajnosc tabeli haszujacej

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var sizeTest = 100000;

var dict = new HashTable(sizeTest);

var keys = [];
var values = [];
for (var i = 0; i < sizeTest; i++) {
  keys.push(makeid());
  values.push(Math.round(Math.random()));
}

console.time('SET');
for(var i = 0; i < keys.length; i++) {
  dict.set(keys[i], values[i]);
}
console.timeEnd('SET');

console.time('GET');
for(var i = 0; i < keys.length; i++) {
  var val = dict.get(keys[i]);
}
console.timeEnd('GET');

///////////

// Haszowanie z wykorzystaniem listy jednokierunkowej

function Node(data) {
  this.data = data;
  this.next = null;
}

function hf(s) {
  var h, i;

  h = 0;
  for(i = 0; i < s.length; i++) {
    h = 31 * h + s[i] - 65;
  }

  return h % 10;
}
