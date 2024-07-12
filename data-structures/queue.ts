export class QueueNode<T> {
	value: T;
	next?: QueueNode<T>;

	constructor(value: T, next?: QueueNode<T>) {
		this.value = value;
		this.next = next;
	}
}

export class Queue<T> {
	public length: number;
	private head?: QueueNode<T>;
	private tail?: QueueNode<T>;
	constructor() {
		this.head = this.tail = undefined;
		this.length = 0;
	}
	enqueue(item: T): void {
		const node = new QueueNode(item);
		this.length += 1;

		if (!this.tail) {
			this.tail = this.head = node;
			return;
		}
		this.tail.next = node;
		this.tail = node;
	}
	deque(): T | undefined {
		if (!this.head) {
			return;
		}

		this.length -= 1;

		if (!this.head.next) {
			this.head = this.tail = undefined;
			return;
		}
		/*
		Do not have to set to implicitly set node.next undefined
		because nothing is pointing at it right now, except for node var
		that will die at the end of this scope and the node object will 
		be garbage collected.
		*/
		const node = this.head;
		this.head = node.next;
		node.next = undefined;

		return node.value;
	}
	peek(): T | undefined {
		return this.head?.value;
	}
	isEmpty(item: T): boolean {
		let node = this.head;
		for (let i = 0; i < this.length; ++i) {
			if (node?.value === item) {
				return true;
			}
			node = node?.next;
		}
		return false;
	}
}
const target = 213;
const queue = new Queue<number>();
queue.enqueue(12313);
queue.enqueue(target);
queue.enqueue(45);

console.log(queue.isEmpty(target));
