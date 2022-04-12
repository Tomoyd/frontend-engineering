import footer from './footer';
import header from './header';
import { addNum } from './test.ts';

function use() {
  header();
  footer();
  return '';
}

addNum();
use();
