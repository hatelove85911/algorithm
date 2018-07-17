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

class AVL extends BST {

  _heightDifferece(node) {

  }
  _rotateL() {
    
  }
  _rotateR() {

  }

}

module.exports = {
	Node,
	BST
}
