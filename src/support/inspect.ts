export default (x: any) => {
	return (x && x.inspect)
		? x.inspect()
		: x;
};