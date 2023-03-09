/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let total = 0;
    let toVisitStack = [this.root];

    while (toVisitStack.length) {
      let poppedNode = toVisitStack.pop();
      if (poppedNode) {
        total += poppedNode.val
        for(let child of poppedNode.children) {
        toVisitStack.push(child);
      }
      }
    }
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let count = 0;
    let toVisitStack = [this.root];

    while (toVisitStack.length) {
      let poppedNode = toVisitStack.pop();
      if (poppedNode) {
        if (poppedNode.val % 2 === 0) {
          count++;
        }
        for (let child of poppedNode.children) {
          toVisitStack.push(child);
        }
      }
    }
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let count = 0;
    let toVisitStack = [this.root];

    while (toVisitStack.length) {
      let poppedNode = toVisitStack.pop();
      if (poppedNode) {
        if (poppedNode.val > lowerBound) {
          count++;
        }
        for (let child of poppedNode.children) {
        toVisitStack.push(child);
        }
      }

    }
    return count;
  }
}

module.exports = { Tree, TreeNode };
