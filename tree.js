class Node {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
  insert (value) {
    if (value > this.value) {
      if (this.right === null) {
        this.right = new Node(value)
      } else {
        this.right.insert(value)
      }
    } else {
      if (this.left === null) {
        this.left = new Node(value)
      } else {
        this.left.insert(value)
      }
    }
  }
  search (value) {
    if (this.value === value) {
      return this
    } else if(this.right && value > this.value) {
      return this.right.search(value)
    } else if(this.left && value < this.value) {
      return this.left.search(value)
    }
    return null
  }
  traversing (order, fn) {
    if (typeof fn === 'function') {
      switch (order) {
      case 'pre':
        fn(this)
        this.left && this.left.traversing(order, fn)
        this.right && this.right.traversing(order, fn)
        break
      case 'in':
        this.left && this.left.traversing(order, fn)
        fn(this)
        this.right && this.right.traversing(order, fn)
        break
      case 'post':
        this.left && this.left.traversing(order, fn)
        this.right && this.right.traversing(order, fn)
        fn(this)
        break
      default:
        break
      }
    }
  }
}

class AVLNode extends Node {
  constructor (value) {
    super(value)
    this.h = 1
  }
  insert (value, parent) {
    // do insertion
    if (value > this.value) {
      if (this.right === null) {
        this.right = new AVLNode(value)
      } else {
        this.right.insert(value, this)
      }
    } else {
      if (this.left === null) {
        this.left = new AVLNode(value)
      } else {
        this.left.insert(value, this)
      }
    }
    // update height
    this.h = 1 + Math.max(this.getHeight(this.left), this.getHeight(this.right))

    // rebalance
    const bf = this.getBF()
    if (bf < -1) {
      if (value > this.left.value) { // LR case rotation
        // TODO
      } else { // LL case rotation
        // TODO
      }
    } else if (bf > 1) {
      if (value > this.right.value) { // RR case rotation
        // TODO
      } else { // RL case rotation
        // TODO
      }
    }
  }
  leftRotate () {
    const z = this
    const y = this
  }
  rightRotate () {

  }
  getHeight (node) {
    node = node || this
    return node ? node.h : 0
  }
  getBF (node) {
    node = node || this
    return this.getHeight(node.right) - this.getHeight(node.left)
  }
}

module.exports = {
  Node,
  AVLNode
}
