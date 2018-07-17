class Node {
	constructor (value) {
		this.value = value
		this.left = null
		this.right = null
	}
}

class avlNode {
	constructor (value) {
		this.h = 0
		this.value = value
		this.left = null
		this.right = null
	}
	growSubTree (which) {
		this.h += which === 'l' ? -1 : 1
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
	_preOrderBelowNode(fn, node, results) {
		if (node === null) {return results}
		if (node.left) {
			const rLeft = this._preorderBelowNode(fn, node.left, results)
		}

		const rNode = fn(node)

		if(node. right) {
			const rRight = this._preorderBelowNode(fn, node.right)
		}

		return [...rLeft, rNode, ...rRight, ...results]

	}
	_traversing(node, path=[], order) {
		if (!node) {
			return path
		}

		const leftSubTreePath = this._traversing(node.left)
		const rightSubTreePath = this._traversing(node.right)

		switch (order) {
			case 'pre':
				return [...leftSubTreePath, node, ...rightSubTreePath]
			case 'in':
				return [node, ...leftSubTreePath, ...rightSubTreePath]
			case 'post':
				return [...leftSubTreePath, ...rightSubTreePath, node]
			default:
				return [...leftSubTreePath, node, ...rightSubTreePath]
		}
	}
	preOrder(node, path=[]) {
		if (node === undefined) {
			node = this.root
		}
		return this._traversing(node, path, 'pre')
	}
	inOrder(node, path=[]) {
		if (node === undefined) {
			node = this.root
		}
		return this._traversing(node, path, 'in')
	}
	postOrder(node, path=[]) {
		if (node === undefined) {
			node = this.root
		}
		return this._traversing(node, path, 'post')
	}
}


module.exports = {
	Node,
	BST
}