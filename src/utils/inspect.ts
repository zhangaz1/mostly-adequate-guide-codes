export const inspect = (x: any) => {
	return (x && x.inspect)
		? x.inspect()
		: x;
};