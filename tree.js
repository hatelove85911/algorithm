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

class BST {
  constructor () {
    this.root = null
  }
  insert (value) {
    if (this.root === null) {
      this.root = new Node(value)
    } else {
      this.root.insert(value)
    }
  }
  search (value) {
    return this.root === null ? null : this.root.search(value)
  }
  traversing (order, fn) {
    this.root && this.root.traversing(order, fn)
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

    // check if subtree is still balanced
    // if yes, recalculate height
    // if not, rebalance
    if (this.checkBalance(value) === true) {
      this.recalHeight()
    } else {
      let top
      switch (this.checkBalance(value)) {
      case 'LL':
        top = this.rightRotate()
        break
      case 'LR':
        this.left = this.left.leftRotate()
        top = this.rightRotate()
        break
      case 'RR':
        top = this.leftRotate()
        break
      case 'RL':
        this.right = this.right.rightRotate()
        top = this.leftRotate()
        break
      }
      // update parent
      if (parent === null) {
        return top
      } else {
        parent[this === parent.left ? 'left' : 'right'] = top
      }
    }
  }
  checkBalance (value) {
    const bf = this.getBF()
    if (bf < -1 && value > this.left.value) {
      return 'LR'
    } else if (bf < -1) {
      return 'LL'
    } else if (bf > 1 && value > this.right.value) {
      return 'RR'
    } else if (bf > 1) {
      return 'RL'
    } else {
      return true
    }
  }
  leftRotate () {
    const y = this
    const x = y.right
    y.right = x.left
    x.left = y
    y.recalHeight()
    x.recalHeight()
    return x
  }
  rightRotate () {
    const y = this
    const x = y.left
    y.left = x.right
    x.right = y
    y.recalHeight()
    x.recalHeight()
    return x
  }
  recalHeight () {
    const leftSubtreeHeight = this.left ? this.left.getHeight() : 0
    const rightSubtreeHeight = this.right ? this.right.getHeight() : 0
    this.h = 1 + Math.max(leftSubtreeHeight, rightSubtreeHeight)
  }
  getHeight () {
    return this.h
  }
  getBF () {
    const leftSubtreeHeight = this.left ? this.left.getHeight() : 0
    const rightSubtreeHeight = this.right ? this.right.getHeight() : 0
    return rightSubtreeHeight - leftSubtreeHeight
  }
}

class AVL extends BST {
  insert (value) {
    if (this.root === null) {
      this.root = new AVLNode(value)
    } else {
      this.root = this.root.insert(value, null) || this.root
    }
  }
}
module.exports = {
  Node,
  BST,
  AVLNode,
  AVL
}
