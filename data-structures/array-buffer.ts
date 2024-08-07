class FixedArray<T> extends ArrayBuffer {
	private length: number;
	private totalItems: number;
	private view: Uint32Array;

	constructor(items: number) {
		super(items * 4);
		this.length = 0;
		this.totalItems = items;
		this.view = new Uint32Array(this as ArrayBuffer);
	}
	push(item: T) {
		if (this.length < this.totalItems - 1) {
			this.view[this.length] = item as unknown as number;
			this.length += 1;
		}
	}
	pop(): T | undefined {
		if (this.length === 0) {
			return;
		}
		const value = this.view[this.length];
		this.length -= 1;
		return;
	}
	get(index: number) {
		if (index >= this.length) {
			return;
		}
		return this.view[index];
	}
}
const array = new FixedArray<number>(4);
array.push(10);
console.log(array.get(0));
