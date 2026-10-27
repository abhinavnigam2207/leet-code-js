/**
 * Problem: Invert Binary Tree
 * Difficulty: Easy
 *
 * Given the root of a binary tree, invert the tree, and return its root.
 *
 * Example 1:
 *   Input: root = [4,2,7,1,3,6,9]
 *   Output: [4,7,2,9,6,3,1]
 *
 * Example 2:
 *   Input: root = [2,1,3]
 *   Output: [2,3,1]
 *
 * Example 3:
 *   Input: root = []
 *   Output: []
 *
 * Constraints:
 *   - The number of nodes in the tree is in the range [0, 100].
 *   - -100 <= Node.val <= 100
 */

/**
 * Approach:
 *   Inverting a tree means mirroring it, which is just swapping the left and right child of every node.
 *   Do a depth-first traversal: at each node swap its two children, then recursively invert both
 *   subtrees. An empty node is already inverted, so it is the base case.
 *
 * Data structure:
 *   Recursion (implicit call stack) - each node is visited exactly once and the call stack only grows
 *   as deep as the tree height, so no extra queue or copy of the tree is needed.
 */

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param {TreeNode | null} root
 * @return {TreeNode | null}
 */
function invertTree(root) {
  if (root === null) return null;
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  return root;
}

// Builds a tree from LeetCode-style level-order array (null = missing child).
function buildTree(values) {
  if (values.length === 0 || values[0] === null) return null;
  const root = new TreeNode(values[0]);
  const queue = [root];
  let i = 1;
  while (i < values.length) {
    const node = queue.shift();
    if (values[i] !== null && values[i] !== undefined) {
      node.left = new TreeNode(values[i]);
      queue.push(node.left);
    }
    i++;
    if (i < values.length && values[i] !== null) {
      node.right = new TreeNode(values[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// Serializes a tree back to a level-order array, trimming trailing nulls.
function toArray(root) {
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node === null) {
      result.push(null);
      continue;
    }
    result.push(node.val);
    queue.push(node.left, node.right);
  }
  while (result.length > 0 && result[result.length - 1] === null) result.pop();
  return result;
}

if (require.main === module) {
  const tests = [
    { input: [4, 2, 7, 1, 3, 6, 9], expected: [4, 7, 2, 9, 6, 3, 1] },
    { input: [2, 1, 3], expected: [2, 3, 1] },
    { input: [], expected: [] },
  ];
  for (const { input, expected } of tests) {
    const actual = toArray(invertTree(buildTree(input)));
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(
      `Input: ${JSON.stringify(input)} | Expected: ${JSON.stringify(expected)} | Got: ${JSON.stringify(actual)} | ${pass ? 'PASS' : 'FAIL'}`
    );
  }
}

module.exports = { invertTree, TreeNode };

/**
 * Complexity:
 *   Time:  O(n)
 *   Space: O(h), where h is the tree height (O(n) worst case for a skewed tree, O(log n) if balanced)
 *
 * Every node is visited once and the swap at each node is O(1).
 * The only extra memory is the recursion stack, which holds at most one frame per level of the tree.
 */
