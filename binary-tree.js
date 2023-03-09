/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    let iterations = [];
    let rightVisitStack = [this.root];
    let leftVisitStack = [this.root];
    let i= 0;
    while (leftVisitStack.length) {
      i++;
      let poppedNode = leftVisitStack.pop();
      if (poppedNode) {
        
        if (poppedNode.left) {
          leftVisitStack.push(poppedNode.left);
        }
      
        if (!poppedNode.right && !poppedNode.left) {
          iterations.push(i)
          i = 0;
        }
      }
    }
    while (rightVisitStack.length) {
      i++;
      let poppedNode = rightVisitStack.pop();
      if (poppedNode) {
        
        if (poppedNode.right) {
          rightVisitStack.push(poppedNode.right);
        }
      
        if (!poppedNode.right && !poppedNode.right) {
          iterations.push(i)
          i = 0;
        }
      }
    }
    return Math.min(...iterations);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
     function maxDepthHelper(node) {
      // if neither right or left, return 1;
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return maxDepthHelper(node.right)+1;
      if (node.right === null) return maxDepthHelper(node.left)+1;
      return (
        Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1
      );
     }
     return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;
 
    function sumsHelper(node) {
      if (node === null) return 0;
      const leftSum = sumsHelper(node.left);
      const rightSum = sumsHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }
    sumsHelper(this.root);
    return result;
  }


  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let nums = []
    let nextLarger;
    function nextLargerHelper(node) {
      if (node === null) return nextLarger;
      if (node.val > lowerBound) nums.push(node.val);
      nextLargerHelper(node.left);
      nextLargerHelper(node.right); 
    }
    nextLargerHelper(this.root);
    if (nums.length > 0) {
      return Math.min(...nums)
    } else {
      return null;
    }
    
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  // areCousins(node1, node2) {
  //   if (node1 === this.root || node2 === this.root) return false;
  //   if (node1.val % 2 == 0 && node2.val == node1.val+1) return false;
  //   if (node1.val % 2 ==0 && node2.val == node1.val-1) return false;
  //   let toVisitQueue = [this.root];

  //   while (toVisitQueue.length){
  //     let current = toVisitQueue.shift();

  //       if (current == node1) {
  //       if (node1.val % 2 != 0 && toVisitQueue.includes(node2)) {
  //         return true;
  //       } else if (current == node1 && toVisitQueue.slice(1, Math.floor(toVisitQueue.length/4)).includes(node2));
  //         return true;
  //     }   

  //     if (current.left) {
  //       toVisitQueue.push(current.left)
  //     }
  //     if (current.right) {
  //       toVisitQueue.push(current.right)
  //     }
  
  //   }
  //   return false;
  // }

  // let's try this a different way... find the left most node in our tree (will always be left node * 2). Then, when we find the left most node check to see if node2 is included in toVisistQueue (jumping over the next val in queue because the node to the right of the leftmost node will have same parent as current node)
  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;
    if (node1.val % 2 == 0 && node2.val == node1.val+1) return false;
    if (node1.val % 2 ==0 && node2.val == node1.val-1) return false;

    let toVisitQueue = [this.root];

    let leftNodeVal = 2;

    while (toVisitQueue.length){
      let current = toVisitQueue.shift();
      if (current.val === leftNodeVal) {
        leftNodeVal = current.val * 2;

        if (toVisitQueue.slice(1, current.val).includes(node2)) {
          return true;
        }
      }
      if (current.left) toVisitQueue.push(current.left);
      if (current.right) toVisitQueue.push(current.right);
    }
    return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    let toVisitQueue = [tree.root];
    let newStr = ""
    while (toVisitQueue.length){
      let current = toVisitQueue.shift();

      if (current) {
        newStr += current.val
      } else {
        newStr += 'N';
      }
      if (current) toVisitQueue.push(current.left);
      if (current) toVisitQueue.push(current.right);
    }
    return newStr;
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(serialized) {
    let serialArr = serialized.split("");
    if (serialArr[0]== 'N') return;
    let root = new BinaryTreeNode(+serialArr.shift());
    let Queue = [root];
    
    while (serialArr.length) {
      let current = Queue.shift();
      if (serialArr[0] !== 'N') {
        current.left = new BinaryTreeNode(+serialArr[0]);
      }
      if (serialArr[1] !== 'N') {
        current.right = new BinaryTreeNode(+serialArr[1]);
      }
      serialArr.shift()
      serialArr.shift()
      if (current.left) Queue.push(current.left);
      if (current.right) Queue.push(current.right);
    }
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  // this one stumped me... looked up the solution:

  lowestCommonAncestor(node1, node2, currentNode=this.root) {
    // base case 1: empty tree
    if (currentNode === null) return null;

    // base case 2: root is one of the target nodes
    if (currentNode === node1 || currentNode === node2) return currentNode;

    // recursively search the left sub-tree
    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);

    // recursively search the right sub-tree
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    // if neither left nor right is null, currentNode is the ancestor
    if (left !== null && right !== null) return currentNode;
    
    // if one node is not null, return it
    if (left !== null || right !== null) return left || right;
    
    // left and right are both null, return null
    if (left === null && right === null) return null;
  }
}


module.exports = { BinaryTree, BinaryTreeNode };
