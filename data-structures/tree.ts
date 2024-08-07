type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};

class Tree<T> {
  root?: TreeNode<T>;
  height = 0;
  traverse() {
    this.traverseTree(this.root);
  }
  private traverseTree(node?: TreeNode<T>) {
    if (!node) {
      return;
    }
    if (node.children.length === 0) {
      return node.value;
    }
    for (const child of node.children) {
      this.traverseTree(child);
    }
  }
  private recurseLeft(node?: TreeNode<T>) {
    if (!node) {
      return;
    }
    if (node.children.length === 0) {
      return node.value;
    }
    this.recurseLeft(node.children[0]);
  }
}
