class Node<T> {
	value?: T;
	next?: Node<T>;
	constructor(value?: T, next?: Node<T>) {
		this.value = value;
		this.next = next;
	}
}
/*
Stack is a type of data structure where
first in, last out.


 */
class Stack<T> {
	private head?: Node<T>;
	public length: number;
	constructor() {
		this.length = 0;
		this.head = undefined;
	}
	/*
        I do push the first element
        is going go much deeper
    */
	push(item: T): T | undefined {
		this.length += 1;

		const node = new Node<T>(item);
		if (!this.head) {
			this.head = node;
			return;
		}
		node.next = this.head;
		this.head = node;
		return this.head.value;
	}
	pop(): T | undefined {
		if (!this.head) {
			return;
		}
		this.length -= 1;

		const node = this.head;
		this.head = node.next;
		node.next = undefined;
		return node.value;
	}
	peek(): T | undefined {
		return this.head?.value;
	}
}
const stack = new Stack<number>();
for (let i = 0; i < 10; ++i) {
	stack.push(i);
}
for (let i = 0; i < 20; ++i) {
	console.log(stack.pop());
}
