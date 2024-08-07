import { filledRandInt, areSame } from "../utils/compare.js";
import { showHidden } from "../utils/logging.js";
import { Queue } from "./queue.js";

class MinHeapNode<T> {
  value: T;
  right: MinHeapNode<T> | null;
  left: MinHeapNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.right = null;
    this.left = null;
    this.parent = null;
  }
}

class MinHeap {
  private root?: MinHeapNode<number>;
  private nodes: MinHeapNode<number>[] = [];

  insert(item: number) {
    if (!this.root) {
      this.root = new MinHeapNode(item);
      this.nodes.push(this.root);
      return;
    }

    const nextChildIndex = this.nodes.length;
    const parentIndex = this.getParentIndex(nextChildIndex);
    const parent = this.nodes[parentIndex];

    if (!parent) {
      throw new TypeError(
        `Invalid parent indexing.\nNode at index [${parentIndex}] does not exist.`
      );
    }
    const child = new MinHeapNode(item);
    if (this.isLeft(nextChildIndex)) {
      parent.left = child;
    } else {
      parent.right = child;
    }

    this.nodes.push(child);
    this.heapifyUp(nextChildIndex);
  }
  private heapifyUp(index: number) {
    if (index <= 0) {
      throw new Error("Trying to heapify up root node.");
    }

    let child = this.nodes[index];

    let parentIndex = this.getParentIndex(index);
    let parent = this.nodes[parentIndex];

    while (parent && child) {
      if (child.value < parent.value) {
        const swap = parent.value;
        parent.value = child.value;
        child.value = swap;
        // Root node.
        if (parentIndex === 0) {
          return;
        }

        // Now the child is the parent.
        child = parent;
        // Move to the next parent.
        parentIndex = this.getParentIndex(parentIndex);
        parent = this.nodes[parentIndex];
        continue;
      }
      return;
    }

    throw new Error(
      `Invalid indices at:\nChild: ${index}\nParent: ${parentIndex}`
    );
  }
  private getParentIndex(index: number): number {
    if (index <= 0) {
      throw new Error(`Out of bounds indexing: ${index}`);
    }
    const parentIndex = Math.floor(
      this.isLeft(index) ? (index - 1) / 2 : (index - 2) / 2
    );
    return parentIndex;
  }

  delete(): number | undefined {
    if (!this.root) {
      return;
    }
    const lastNode = this.nodes[this.nodes.length - 1];

    if (this.root === lastNode) {
      const value = this.root.value;
      this.root = undefined;
      return value;
    }

    const swap = this.root.value;
    this.root.value = lastNode.value;
    lastNode.value = swap;

    this.removeLast();
    this.heapifyDown();
    return lastNode.value;
  }
  private heapifyDown() {
    if (!this.root) {
      throw new TypeError(
        "Trying to heapify down the root, which does not exist."
      );
    }
    let parent = this.root;
    while (true) {
      const nodes: MinHeapNode<number>[] = [];
      const leftNode = parent.left;
      const rightNode = parent.right;

      if (leftNode && leftNode.value < parent.value) {
        nodes.push(leftNode);
      }
      if (rightNode && rightNode.value < parent.value) {
        nodes.push(rightNode);
      }

      if (nodes.length === 0) {
        return;
      }

      let child = null;

      if (nodes.length === 1) {
        child = nodes.pop();
      } else {
        child = nodes[0].value <= nodes[1].value ? nodes[0] : nodes[1];
      }

      if (!child) {
        throw new TypeError("child does not exist.");
      }

      const swap = parent.value;
      parent.value = child.value as unknown as number;
      child.value = swap;
      parent = child;
    }
  }
  private isLeft(index: number) {
    if (index <= 0) {
      throw new Error("Trying to check if root node is left or right.");
    }
    return index % 2 !== 0;
  }
  private removeLast() {
    const lastNodeIndex = this.nodes.length - 1;
    const parentIndex = this.getParentIndex(lastNodeIndex);
    const parent = this.nodes[parentIndex];
    if (!parent) {
      throw new TypeError("Parent does not exist.");
    }

    if (this.isLeft(lastNodeIndex)) {
      parent.left = null;
    } else {
      parent.right = null;
    }
    this.nodes.pop();
  }

  print() {
    console.log(this.nodes.map((node) => node.value).join(" "));
  }
}

const minHeap = new MinHeap();

const arr = filledRandInt(1, 100, 100);
for (let i = 0; i < arr.length; ++i) {
  minHeap.insert(arr[i]);
}

const arr1 = [];

while (true) {
  const n = minHeap.delete();
  if (Number.isFinite(n)) {
    arr1.push(n);
  } else {
    break;
  }
}

console.log(areSame(arr, arr1));
