import footer from './footer';
import header from './header';
import { testName } from './test.js';
function use() {
	header();
	footer();
	return '';
}

console.log('first', testName);
use();
