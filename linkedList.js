function Node (value) {
  this.value = value
  this.next = null
}

function linkedList() {
  this._length = 0
  this.head = null
}

linkedList.prototype = {
  constructor: linkedList,
  add: function (value) {
    var nd = new Node(value)
    if (this.head === null) { 
      this.head = nd
    } else {
      var ptr = this.head
      while(ptr.next !== null) {
        ptr = ptr.next
      }
      ptr.next = nd
    }
    this._length++
    return this
  },
  getNodeAt: function (index) {
    var i = 0
    var nd = this.head
    while (i < index && nd && nd.next !== null) {
      nd = nd.next
      i++
    }
    return i !== index ? null : nd
  },
  remove: function (index) {
    if (index === 0 && this.head !== null) { 
      this.head = this.head.next
      this._length--
    }
    var parent = this.getNodeAt(index-1)

    if (parent !== null && parent.next !== null) {
      parent.next = parent.next.next
      this._length--
    }
    return this
  },
  toArray: function () {
    var result = []
    var curr = this.head
    while(curr) {
      result.push(curr.value)
      curr = curr.next
    }
    return result
  }
}


function NodeDouble (value) {
  this.value = value
  this.next = null
  this.prev = null
}

function DoubleLinkedList () {
  this._length = 0
  this.head = null
  this.tail = null
}

DoubleLinkedList.prototype = {
  constructor: DoubleLinkedList,
  prepend: function (value) {
    var newNode = new NodeDouble(value)
    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
    } else {
      var tmp = this.head
      this.head = newNode
      newNode.next = tmp
      tmp.prev = newNode 
    }
    this._length++
    return this
  },
  removeHead: function () {
    if (this.head !== null) {
      this.head = this.head.next
      if (this.head !== null) {
        this.head.prev = null
      }

      this._length--
    }
    return this
  },
  append: function (value) {
    var newNode = new NodeDouble(value)
    if (this.head === null) {
      this.head = newNode
      this.tail = newNode
    } else {
      var tmp = this.tail
      this.tail = newNode
      newNode.prev = tmp
      tmp.next = newNode 
    }
    this._length++
    return this
  },
  removeLast: function () {
    if (this.head !== null) {
      this.head = this.head.next
      if (this.head !== null) {
        this.head.prev = null
      }

      this._length--
    }
    return this
  },
  findNodeAtPosition(pos) {
    if (this._length === 0) {return null}
    if (pos<0) {return null}
    if (pos>=this._length) {return null}

    var percent = pos/this._length
    var bForward = percent > 0.5 ? false : true

    var curr = bForward ? this.head : this.tail
    var iter = bForward ? 0 : this._length - 1

    while(iter !== pos) {
      curr = curr[bForward ? 'next' : 'prev']
      iter += bForward ? 1 : -1
    }

    return curr
  },
  insertAtPosition(pos, value) {
    if (pos === 0) {
      this.prepend(value)
    } else {
      var node = this.findNodeAtPosition(pos-1)			
      this.insert(node, value)
    }
  },
  deleteAtPosition(pos) {
    var node = this.findNodeAtPosition(pos)
    this.delete(node)
  },
  insert: function(node, value) {
    var newNode = new NodeDouble(value)
    if (node !== null) {
      var tmp = node.next
      node.next = newNode
      newNode.next = tmp
      newNode.prev = node
      this._length++
    }
  },
  delete: function (node) {
    if (node !== null) {
      node.prev = node.next
      node.next = node.prev
      this._length--
    }
  },
  toArray: function () {
    var result = []
    var curr = this.head
    while(curr) {
      result.push(curr.value)
      curr = curr.next
    }
    return result
  }
}