import { showHidden } from "./utils/logging.js";

class Node {
	next = null;
	value = null;
	constructor(next = null, value = null) {
		this.next = next;
		this.value = value;
	}
}
class Queue {
	head = {
		next: null,
	};
	tail = {
		next: null,
	};
	enqueue(value = null) {
		const node = new Node(this.head.next, value);
		this.head.next = node;
		if (this.tail.next === null) {
			this.tail.next = node;
		}
	}
	dequeue(value = null) {
		const node = new Node(null, value);
		if (this.tail.next === null) {
			this.tail.next = node;
		} else {
			this.tail.next.next = node;
			this.tail.next = node;
		}
		if (this.head.next === null) {
			this.head.next = node;
		}
	}
	peek(value) {
		let node = this.head.next;
		while (true) {
			if (node === null) {
				break;
			}
			console.log(node.value);
			node = node.next;
		}
	}
	pop() {
		if (this.head.next === null) {
			return;
		}
		const node = this.head.next;
		this.head.next = node.next;
		node.next = null;
	}
}
const queue = new Queue();
for (let i = 0; i < 5; ++i) {
	queue.enqueue(i);
}
queue.pop();
queue.peek();

showHidden(queue);
