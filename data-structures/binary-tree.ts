import { inspect } from "node:util";
import { areSame } from "../utils/compare.js";
import { Queue } from "./queue.js";
import type { DoublyLinkedList } from "./doubly-linked-list-2.js";

class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(
    value: T,
    left: TreeNode<T> | null = null,
    right: TreeNode<T> | null = null
  ) {
    this.left = left;
    this.right = right;
    this.value = value;
  }
}

class BinaryTree {
  private root: TreeNode<number> | null;
  private queue = new Queue<TreeNode<number>>();
  constructor(treeMap?: DoublyLinkedList<T>, rootValue?: number) {
    if (treeMap && rootValue) {
      this.root = BinaryTree.binaryTreeFromTreeMap<T>(treeMap, rootValue);
    } else {
      this.root = null;
    }
  }
  insert(item: number) {
    if (!this.root) {
      this.root = new TreeNode(item);
      return;
    }

    function insert(node: TreeNode<number>) {
      if (node.value === item) {
        return;
      }

      if (node.value > item) {
        if (!node.left) {
          node.left = new TreeNode(item);
          return;
        }
        insert(node.left);
      } else {
        if (!node.right) {
          node.right = new TreeNode(item);
          return;
        }
        insert(node.right);
      }
    }

    insert(this.root);
  }
  delete(item: number): number | undefined {
    if (!this.root) {
      return;
    }
    if (this.root.value === item) {
      const val = this.root.value;
      this.root = null;
      return val;
    }

    function recurse(node: TreeNode<number>) {
      if (item < node.value) {
        if (node.left) {
          if (node.left.value === item) {
            node.left = null;
          } else {
            recurse(node.left);
          }
        }
      } else {
        if (node.right) {
          if (node.right.value === item) {
            node.right = null;
          } else {
            recurse(node.right);
          }
        }
      }
    }

    recurse(this.root);
  }
  static binaryTreeFromTreeMap<T>(
    treeMap: DoublyLinkedList<T>,
    rootValue: T
  ): TreeNode<T> {
    const root = new TreeNode<T>(rootValue);
    BinaryTree.constructBinaryTree(root, treeMap);
    return root;
  }
  static constructBinaryTree<T>(
    node: TreeNode<T>,
    treeMap: DoublyLinkedList<T>
  ) {
    const leftValue = treeMap.removeFirst() ?? null;

    if (leftValue !== null) {
      const leftNode = new TreeNode<T>(leftValue);
      node.left = leftNode;
      BinaryTree.constructBinaryTree(leftNode, treeMap);
    }

    const rightValue = treeMap.removeFirst() ?? null;

    if (rightValue !== null) {
      const rightNode = new TreeNode<T>(rightValue);
      node.right = rightNode;
      BinaryTree.constructBinaryTree(rightNode, treeMap);
    }
  }
  private recurse(node: TreeNode<number> | null, path: number[]): number[] {
    if (!node) {
      return path;
    }

    path.push(node.value);
    this.recurse(node.left, path);
    this.recurse(node.right, path);

    return path;
  }
  preOrderSearch() {
    return this.recurse(this.root, []);
  }
  printTree() {
    if (!this.root) {
      return;
    }

    const queue = new Queue<TreeNode<number>>();
    queue.enqueue(this.root);

    while (queue.length > 0) {
      const node = queue.deque();
      console.log("Node value: ", node?.value);

      if (node?.left) {
        queue.enqueue(node.left);
      }

      if (node?.right) {
        queue.enqueue(node.right);
      }
    }
  }
}

// const treeMap = new DoublyLinkedList<number | null>();
// const values = [3, null, null, 5, null, 5, 6, null, null, null];
// for (const value of values) {
//   treeMap.append(value);
// }

const binaryTree = new BinaryTree();

binaryTree.insert(5);

for (let i = 0; i < 10; ++i) {
  binaryTree.insert(i);
}
binaryTree.printTree();
console.log("---\n\n");
binaryTree.delete(7);
binaryTree.printTree();
