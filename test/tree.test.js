const {BST, Node, AVL, avlNode} = require('../tree.js')
const {expect} = require('chai')

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


describe('AVL', () => {
  let avl, n13,n10,n5,n11,n4,n8,n15,n16
  beforeEach(() => {
    avl = new AVL()
    avl.insert(13)
    avl.insert(10)
    avl.insert(15)
    avl.insert(5)
    avl.insert(11)
    avl.insert(16)
    avl.insert(4)
    avl.insert(6)

    n13 = new avlNode(13)
    n10 = new avlNode(10)
    n5 = new avlNode(5)
    n11 = new avlNode(11)
    n4 = new avlNode(4)
    n8 = new avlNode(8)
    n15 = new avlNode(15)
    n16 = new avlNode(16)


  })

  it('should identical to initial height', ()=> {
    // setup relationship
    n5.left = n4
    n5.right = n8
    n10.left = n5
    n10.right = n11
    n13.left = n10
    n13.right = n15
    n15.right = n16

    // setup height
    n13.h = -1
    n10.h = -1
    n5.h = 0
    n11.h = 0
    n4.h = 0
    n8.h = 0
    n15.h = 1
    n16.h = 0

    expect(avl.root).to.deep.equal(n13)
  })

  it('should automatically balanced in LL case', ()=> {
    avl.insert(3)

    // setup relationship
    // let n3 = new avlNode(3)
		
    // setup height
		
  })
  it('should automatically balanced in RR case')
  it('should automatically balanced in LR case')
  it('should automatically balanced in RL case')
}) 
