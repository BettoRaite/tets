function rotate(nums, k) {
	const firstHalf = nums.slice(0, k + 1);
	const secondHalf = nums.slice(k + 1);
	nums.length = 0;
	nums.push(...secondHalf, ...firstHalf);
}

const nums = [-1, -100, 5, 99];
const k = 1;
rotate(nums, k);
console.log(nums);
