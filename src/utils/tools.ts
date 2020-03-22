import R from 'ramda';

const join = m => m.join();
const either = R.curry((failed, succeed, eitherObj) => {
	switch (eitherObj.constructor.name) {
		case 'Left': return failed(eitherObj.join());
	}
});

export const tools = {};