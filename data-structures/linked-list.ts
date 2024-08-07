class LinkedListNode<T> {
	next: LinkedListNode<T> | null;
	value?: T;
	constructor(value?: T, next: LinkedListNode<T> | null = null) {
		this.value = value;
		this.next = next;
	}
}

class LinkedList<T> {
	private head: LinkedListNode<T> | null;
	public length: number;
	constructor(items = 0) {
		this.length = 0;
		if (items) {
			this.head = null;
			return;
		}
		this.head = new LinkedListNode<T>();
		let parent = this.head;
		for (let i = 0; i < items - 1; ++i) {
			const node = new LinkedListNode<T>();
			parent.next = node;
			parent = node;
		}
	}
	addFirst(item: T) {
		const node = new LinkedListNode<T>(item);
		if (this.length === 0) {
			this.head = node;
		} else {
			node.next = this.head;
			this.head = node;
		}
		this.length += 1;
	}
	addLast(item: T) {
		let node = this.head;
		for (let i = 0; i < this.length; ++i) {
			if (node) {
				if (node.next === null) {
					node.value = item;
					return;
				}
				node = node.next;
			}
		}
	}
	add(item: T, index: number) {
		if (index < 0) {
			return;
		}
		if (!this.head) {
			this.head = new LinkedListNode<T>();
		}
		let node = this.head;
		for (let i = 0; i <= index; ++i) {
			if (node.next) {
				node = node.next;
			} else {
				const child = new LinkedListNode<T>();
				node.next = child;
				node = child;
			}
		}
		node.value = item;
		if (index + 1 > this.length) {
			this.length = index;
		}
	}
	getLast(): T | undefined {
		if (!this.head) {
			return;
		}
		let node = this.head;
		for (let i = 0; i < this.length; ++i) {
			if (node.next === null) {
				return node.value;
			}
			node = node?.next;
		}
	}
}

const linkedList = new LinkedList<number>();
linkedList.add(10, 10);
console.log(linkedList.getLast());
