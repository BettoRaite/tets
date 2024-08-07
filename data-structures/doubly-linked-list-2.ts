type ListNode<T> = {
  value: T;
  prev?: ListNode<T>;
  next?: ListNode<T>;
};

export class DoublyLinkedList<T> {
  public length: number;
  private head?: ListNode<T>;
  private tail?: ListNode<T>;
  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }
  append(item: T) {
    this.length += 1;

    const node: ListNode<T> = {
      value: item,
    };
    if (!this.tail) {
      this.head = node;
      this.tail = node;
      return;
    }
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }
  removeFirst(): T | undefined {
    if (!this.head) {
      return;
    }

    this.length -= 1;

    if (this.length === 0) {
      const node = this.head;
      this.tail = this.head = undefined;
      return node.value;
    }

    if (!this.head.next) throw new TypeError("head next does not exist.");

    this.head.next.prev = undefined;
    const node = this.head;
    this.head = node.next;
    node.next = undefined;
    return node.value;
  }
  peek() {
    return this.head?.value;
  }
  getAll(): T[] {
    const values: T[] = [];
    let curr = this.head;

    for (let i = 0; curr && i < this.length; ++i) {
      values.push(curr.value);
      curr = curr.next;
    }
    return values;
  }
}
