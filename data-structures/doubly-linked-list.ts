import { inspect } from "node:util";

interface LinkedList<T> {
  readonly length: number;
  insertAt(item: T, index: number): void;
  remove(item: T): T | undefined;
  removeAt(index: number): T | undefined;
  append(item: T): void;
  prepend(item: T): void;
  get(index: number): T | undefined;
}

class ListNode<T> {
  public value: T;
  public prev: ListNode<T> | null;
  public next: ListNode<T> | null;

  constructor(
    value: T,
    prev: ListNode<T> | null = null,
    next: ListNode<T> | null = null
  ) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class DoublyLinkedList<T> implements LinkedList<T> {
  private head?: ListNode<T>;
  private tail?: ListNode<T>;
  public length = 0;
  append(item: T): void {
    this.length++;
    const node = new ListNode<T>(item);
    if (!this.tail) {
      this.head = this.tail = node;
    }
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }
  prepend(item: T): void {
    this.length++;
    const node = new ListNode<T>(item);
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }
  removeLast(): T | undefined {
    if (!this.tail) {
      return;
    }

    this.length--;

    if (this.length === 0) {
      const node = this.tail;
      this.head = this.tail = undefined;
      return node.value;
    }
    const node = this.tail;
    if (node.prev) {
      this.tail = node.prev;
      this.tail.next = null;
      node.prev = null;
      return node.value;
    }
  }
}
