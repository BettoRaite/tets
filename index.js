import { traverseLinkedList, insert } from "./queue.js";

const linkedList = {
	value: 0,
	next: {
		value: 1,
		next: {
			value: 2,
			next: {
				value: 3,
				next: null,
			},
		},
	},
};

insert(linkedList, 6, 10);
traverseLinkedList(linkedList);

console.log(linkedList.next.next.next.value === 10);
