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

class DoublyLinkedListNode<T> {
	public value: T | null;
	public prev: DoublyLinkedListNode<T> | null;
	public next: DoublyLinkedListNode<T> | null;

	constructor(
		value: T | null = null,
		prev: DoublyLinkedListNode<T> | null = null,
		next: DoublyLinkedListNode<T> | null = null,
	) {
		this.value = value;
		this.prev = null;
		this.next = null;
	}
}

class DoublyLinkedList<T> implements LinkedList<T> {
	private head: DoublyLinkedListNode<T> | null = null;
	private tail: DoublyLinkedListNode<T> | null = null;
	public readonly length = 0;
	constructor(length: number) {
		if (length <= 0) {
			return;
		}
		this.head = new DoublyLinkedListNode<T>();
		let parent: DoublyLinkedListNode<T> | null = this.head;
		for (let i = 0; i < length; ++i) {
			const node = new DoublyLinkedListNode<T>();
			parent.next = node;
			parent = node;
		}
		this.tail = new DoublyLinkedListNode(null, parent);
	}
	insertAt(item: T, index: number): void {
		if (index < 0 || index > this.length) {
			return;
		}
		let parent: DoublyLinkedListNode<T> | null = this.head;
		for (let i = 0; i <= index; ++i) {
			const node = new DoublyLinkedListNode<T>();
			parent = node;
		}
		parent?.value = item;
	}
}
const doublyLinkedList = new DoublyLinkedList<number>(2);
