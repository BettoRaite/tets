import { inspect } from "node:util";
export const showHidden = (value) => {
	console.log(
		inspect(value, {
			colors: true,
			depth: Number.MAX_SAFE_INTEGER,
			showHidden: true,
			compact: false,
		}),
	);
};
