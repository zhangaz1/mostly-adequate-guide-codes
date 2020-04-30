import R from 'ramda';

export * from './Identity';
export * from './Maybe';
export * from './Either';
export * from './IO';

export const chain = R.curry((f, m) => m.chain(f));