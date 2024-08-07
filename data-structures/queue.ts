export class QueueNode<T> {
  next?: QueueNode<T>;
  value?: T;
  constructor(value?: T, next?: QueueNode<T>) {
    this.value = value;
    this.next = next;
  }
}

export class Queue<T> {
  private head?: QueueNode<T>;
  private tail?: QueueNode<T>;
  public length: number;
  constructor() {
    this.length = 0;
  }
  enqueue(item: T) {
    this.length++;
    const node = new QueueNode<T>(item);

    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }
  dequeue(): T | undefined {
    if (!this.head) {
      return;
    }

    this.length--;

    if (this.length === 0) {
      const node = this.head;
      this.head = this.tail = undefined;
      return node.value;
    }

    const node = this.head;
    this.head = node.next;
    node.next = undefined;

    return node.value;
  }
  peek() {
    return this.head?.value;
  }
  isEmpty(): boolean {
    return this.length === 0;
  }
  printQueue() {
    if (!this.head) {
      return;
    }

    let node: QueueNode<T> | undefined = this.head;

    while (node) {
      console.log(node.value);
      node = node.next;
    }
  }
}
