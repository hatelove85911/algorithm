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

function treeSetup({v, h, l, r}) {
  const root = new avlNode(v)
  root.h = h
  if (l) {
    root.left = treeSetup(l)
    root.left.parent = root
  }
  if (r) {
    root.right = treeSetup(r)
    root.right.parent = root
  }
  return root
}

describe('AVL', () => {

  it('should identical to initial height', ()=> {
    let avl = new AVL()
    avl.insert(13)
    avl.insert(10)
    avl.insert(15)
    avl.insert(5)
    avl.insert(11)
    avl.insert(16)
    avl.insert(4)
    avl.insert(8)

    const initialTree = {
      v: 13,
      h: -1,
      l: {
        v: 10,
        h: -1,
        l: {
          v: 5,
          h: 0,
          l: {
            v: 4,
            h: 0,
          },
          r: {
            v: 8,
            h: 0
          }
        },
        r: {
          v: 11,
          h: 0
        }
      },
      r: {
        v: 15,
        h: 1,
        r: {
          v: 16,
          h: 0
        }
      }
    }
    const root = treeSetup(initialTree)

    expect(avl.root).to.deep.equal(root)
  })

  it('should automatically balanced in LL case')
  it('should automatically balanced in RR case')
  it('should automatically balanced in LR case')
  it('should automatically balanced in RL case')
}) 
