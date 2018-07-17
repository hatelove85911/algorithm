const {BST, Node} = require('../tree.js')
const {expect} = require('chai');

describe('BST', () => {
	let bst
	beforeEach(() => {
		bst = new BST()
		bst.insert(6)
		bst.insert(4)
		bst.insert(7)
		bst.insert(5)
		bst.insert(9)
		bst.insert(8)
	})

	it('should insert node correctly', ()=> {
        var root = new Node(6)
        root.left = new Node(4)
        root.left.right = new Node(5)
        root.right = new Node(7)
        root.right.right = new Node(9)
        root.right.right.left = new Node(8)
        expect(bst.root).to.deep.equal(root)
	})

	it('should get the node of value', () => {
		const node7 = new Node(7)
		node7.right = new Node(9)
		node7.right.left = new Node(8)
		expect(bst.search(7)).to.deep.equal(node7)

		const node8 = new Node(8)
		expect(bst.search(8)).to.deep.equal(node8)

	})

	it('should return null when value cannot be found', () => {
		expect(bst.search(10)).to.equal(null)
		expect(bst.search(3)).to.equal(null)
		expect(bst.search(1)).to.equal(null)
		expect(bst.search(11)).to.equal(null)
	})

	it('should preorder traverseing: parent->left->right', ()=> {
		const result = bst.preOrder()
		expect(result.map(node=>node.value)).to.deep.equal([6,4,5,7,9,8])
	})

	it('should inorder traversing: left->parent->right', () => {
		const result = bst.inOrder()
		expect(result.map(node=>node.value)).to.deep.equal([4,5,6,7,8,9])
	})

	it('should postorder traversing: left->right->parent', ()=> {
		const result = bst.postOrder()
		expect(result.map(node=>node.value)).to.deep.equal([5,4,8,9,7,6])
	})
}) 
