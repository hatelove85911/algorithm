const {Node, BST, AVLNode, AVL} = require('../tree.js')
const {expect} = require('chai')

function BSTSetup({v, l, r}) {
  const node = new Node(v)
  if (l) {
    node.left = BSTSetup(l)
  }
  if (r) {
    node.right = BSTSetup(r)
  }
  return node
}

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
    const model = {
      v: 6,
      l: {
        v: 4,
        r: {
          v: 5
        }
      },
      r: {
        v: 7,
        r: {
          v: 9,
          l: {
            v: 8
          }
        }
      }
    }
    const tree = BSTSetup(model)
    expect(bst.root).to.deep.equal(tree)
  })

  it('should get the node of value', () => {
    const model = {
      v: 7,
      r: {
        v: 9,
        l: {
          v: 8
        }
      }
    }
    const tree = BSTSetup(model)
    expect(bst.search(7)).to.deep.equal(tree)

    const tree2 = BSTSetup({
      v: 8
    })
    expect(bst.search(8)).to.deep.equal(tree2)

  })

  it('should return null when value cannot be found', () => {
    expect(bst.search(10)).to.equal(null)
    expect(bst.search(3)).to.equal(null)
    expect(bst.search(1)).to.equal(null)
    expect(bst.search(11)).to.equal(null)
  })

  it('should preorder traverseing: parent->left->right', ()=> {
    const result = []
    const collect = node => result.push(node)
    bst.traversing('pre', collect)
    expect(result.map(node=>node.value)).to.deep.equal([6,4,5,7,9,8])
  })

  it('should inorder traversing: left->parent->right', () => {
    const result = []
    const collect = node => result.push(node)
    bst.traversing('in', collect)
    expect(result.map(node=>node.value)).to.deep.equal([4,5,6,7,8,9])
  })

  it('should postorder traversing: left->right->parent', ()=> {
    const result = []
    const collect = node => result.push(node)
    bst.traversing('post', collect)
    expect(result.map(node=>node.value)).to.deep.equal([5,4,8,9,7,6])
  })
}) 


// AVL Tree
function AVLSetup({v, h, l, r}) {
  const node = new AVLNode(v)
  node.h = h
  if (l) {
    node.left = AVLSetup(l)
  }
  if (r) {
    node.right = AVLSetup(r)
  }
  return node
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

    const model = {
      v: 13,
      h: 4,
      l: {
        v: 10,
        h: 3,
        l: {
          v: 5,
          h: 2,
          l: {
            v: 4,
            h: 1,
          },
          r: {
            v: 8,
            h: 1
          }
        },
        r: {
          v: 11,
          h: 1
        }
      },
      r: {
        v: 15,
        h: 2,
        r: {
          v: 16,
          h: 1
        }
      }
    }
    const tree = AVLSetup(model)

    expect(avl.root).to.deep.equal(tree)
  })

  it('should automatically balanced in LL case', () => {
    let avl = new AVL()
    avl.insert(13)
    avl.insert(10)
    avl.insert(15)
    avl.insert(5)
    avl.insert(11)
    avl.insert(16)
    avl.insert(4)
    avl.insert(8)
    avl.insert(3)

    const treeBalanded = {
      v: 13,
      h: 4,
      l: {
        v: 5,
        h: 3,
        l: {
          v: 4,
          h: 2,
          l: {
            v: 3,
            h: 1,
          }
        },
        r: {
          v: 10,
          h: 2,
          l: {
            v: 8,
            h: 1
          },
          r: {
            v: 11,
            h: 1
          }
        }
      },
      r: {
        v: 15,
        h: 2,
        r: {
          v: 16,
          h: 1
        }
      }
    }
    const root = AVLSetup(treeBalanded)

    expect(avl.root).to.deep.equal(root)
  })
  it('should automatically balanced in RR case', () => {
    let avl = new AVL()
    avl.insert(30)
    avl.insert(5)
    avl.insert(35)
    avl.insert(32)
    avl.insert(40)
    avl.insert(45)

    const treeBalanded = {
      v: 35,
      h: 3,
      l: {
        v: 30,
        h: 2,
        l: {
          v: 5,
          h: 1
        },
        r: {
          v: 32,
          h: 1
        }
      },
      r: {
        v: 40,
        h: 2,
        r: {
          v: 45,
          h: 1
        }
      }
    }
    const root = AVLSetup(treeBalanded)

    expect(avl.root).to.deep.equal(root)
  })
  it('should automatically balanced in LR case', () => {
    let avl = new AVL()
    avl.insert(13)
    avl.insert(10)
    avl.insert(15)
    avl.insert(5)
    avl.insert(11)
    avl.insert(16)
    avl.insert(4)
    avl.insert(6)
    avl.insert(7)

    const treeBalanded = {
      v: 13,
      h: 4,
      l: {
        v: 6,
        h: 3,
        l: {
          v: 5,
          h: 2,
          l: {
            v: 4,
            h: 1,
          }
        },
        r: {
          v: 10,
          h: 2,
          l: {
            v: 7,
            h: 1
          },
          r: {
            v: 11,
            h: 1
          }
        }
      },
      r: {
        v: 15,
        h: 2,
        r: {
          v: 16,
          h: 1
        }
      }
    }
    const root = AVLSetup(treeBalanded)

    expect(avl.root).to.deep.equal(root)
  })
  it('should automatically balanced in RL case', () => {
    let avl = new AVL()
    avl.insert(5)
    avl.insert(2)
    avl.insert(7)
    avl.insert(1)
    avl.insert(4)
    avl.insert(6)
    avl.insert(9)
    avl.insert(3)
    avl.insert(16)
    avl.insert(15)

    const treeBalanded = {
      v: 5,
      h: 4,
      l: {
        v: 2,
        h: 3,
        l: {
          v: 1,
          h: 1
        },
        r: {
          v: 4,
          h: 2,
          l: {
            v: 3,
            h: 1
          }
        }
      },
      r: {
        v: 7,
        h: 3,
        l: {
          v: 6,
          h: 1
        },
        r: {
          v: 15,
          h: 2,
          l: {
            v: 9,
            h: 1
          },
          r: {
            v: 16,
            h: 1
          }
        }
      }
    }
    const root = AVLSetup(treeBalanded)

    expect(avl.root).to.deep.equal(root)
  })
}) 
