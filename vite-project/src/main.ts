import './style.css';
import utils from './utils';
const modules = import.meta.glob('./dir/*.js');
console.log('import.meta', import.meta);
console.log('modules', modules);
const app = document.querySelector<HTMLDivElement>('#app')!;
console.log('first', utils);
app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
