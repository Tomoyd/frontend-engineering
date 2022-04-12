const fs = require('fs');
const path = require('path');

function GenerateRoute(options) {}

function resolve(dir) {
  return path.join(__dirname, 'routes', dir);
}

GenerateRoute.prototype.apply = function (compiler) {
  compiler.plugin('before-compile', (compilation, callback) => {
    const routesDir = resolve('/');
    const dirs = fs.readdirSync(routesDir);
    const paths = [];

    genRoutePath(dirs, paths, '/');
    const target = resolve('routes.js');
    fs.writeFileSync(
      target,
      `module.exports = ${JSON.stringify(paths, null, 2)}`,
      'utf-8',
    );
    callback();
  });
};

function genRoutePath(dirs, paths = [], parent) {
  let parentIsPath = dirs.includes('index.js');
  if (parentIsPath) {
    paths.push({ path: parent });
  }
  console.log('dirs', dirs);
  dirs.forEach((dir) => {
    const parentPath = path.join(parent, dir);
    const dirPath = resolve(parentPath);
    if (fs.statSync(dirPath).isDirectory()) {
      genRoutePath(
        fs.readdirSync(dirPath),
        paths,
        parentPath.replace('\\', '/'),
      );
    }
  });
}

module.exports = GenerateRoute;
