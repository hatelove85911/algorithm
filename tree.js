class Node {
  constructor (value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BST {
  constructor() {
    this.root = null
  }
  _insertRecur (value, node) {
    if (value > node.value) {
      if (node.right === null) {
        node.right = new Node(value)
      } else {
        this._insertRecur(value, node.right)
      }
    } else {
      if (node.left === null) {
        node.left = new Node(value)
      } else {
        this._insertRecur(value, node.left)
      }
    }
  }
  insert(value) {
    if (this.root === null) {
      this.root = new Node(value)
    } else {
      this._insertRecur(value, this.root)
    }
  }
  _searchRecur(value, node) {
    if (node === null) {
      return null
    }

    if (node.value === value) {
      return node
    } else if(value > node.value) {
      return this._searchRecur(value, node.right)
    } else {
      return this._searchRecur(value, node.left)
    }
  }
  search (value) {
    return this._searchRecur(value, this.root)
  }
  _traversing(node, order) {
    if (!node) {
      return []
    }

    const leftSubTreePath = this._traversing(node.left, order)
    const rightSubTreePath = this._traversing(node.right, order)

    switch (order) {
    case 'pre':
      return [node, ...leftSubTreePath, ...rightSubTreePath]
    case 'in':
      return [...leftSubTreePath, node, ...rightSubTreePath]
    case 'post':
      return [...leftSubTreePath, ...rightSubTreePath, node]
    default:
      return [...leftSubTreePath, node, ...rightSubTreePath]
    }
  }
  preOrder(node) {
    if (node === undefined) {
      node = this.root
    }
    return this._traversing(node, 'pre')
  }
  inOrder(node) {
    if (node === undefined) {
      node = this.root
    }
    return this._traversing(node, 'in')
  }
  postOrder(node) {
    if (node === undefined) {
      node = this.root
    }
    return this._traversing(node, 'post')
  }
}

class avlNode {
  constructor (value) {
    this.h = 0
    this.value = value
    this.left = null
    this.right = null
    this.parent = null
  }
  growSubTree(branch, value) {
    const newNode = new avlNode(value)
    this[branch] = newNode
    newNode.parent = this

    const oldH = this.h
    const hDelta = branch === 'left' ? -1 : 1
    this.h += hDelta

    // if the new height of node is bigger than earlier
    // then all the parent height need to be adjusted
    if (Math.abs(this.h) > Math.abs(oldH)) {
      let parent = this.parent
      let sub = this
      while(parent) {
        parent.h += sub === parent.left ? -1 : 1
        sub = parent
        parent = parent.parent
      }
    }
  }
}
class AVL extends BST {
  _insertRecur (value, node) {
    if (value > node.value) {
      if (node.right === null) {
        node.growSubTree('right', value)
      } else {
        this._insertRecur(value, node.right)
      }
    } else {
      if (node.left === null) {
        node.growSubTree('left', value)
      } else {
        this._insertRecur(value, node.left)
      }
    }
  }
  insert(value) {
    if (this.root === null) {
      this.root = new avlNode(value)
    } else {
      this._insertRecur(value, this.root)
    }
  }
}

module.exports = {
  Node,
  BST,
  avlNode,
  AVL
}
