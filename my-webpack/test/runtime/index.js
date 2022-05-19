import a from './a';

import('./aSync').then((m) => {
  console.log('m', m);
});
console.log(a);
