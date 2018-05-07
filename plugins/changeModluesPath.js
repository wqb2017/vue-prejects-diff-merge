let fs = require('fs');
let path = require('path');

let processArgObj = getProcessArg();

let PWD = path.join(process.cwd(), 'src');
let target = path.join(process.cwd(), 'src', processArgObj.src);
let standard = path.join(process.cwd(), 'src', 'standard');

function ChangeModluesPath() {}

ChangeModluesPath.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation, cb) {
    compilation.plugin('build-module', function(module) {
      if (!module.resource || !module.resource.includes(PWD)) return;
      if (module.resource.includes(standard)) {
        let targetPath = module.resource.replace(standard, target);
        if (fs.existsSync(targetPath)) {
          replaceModulesPath(module, 'standard', processArgObj.src);
        }
      } else {
        if (!fs.existsSync(module.resource)) {
          replaceModulesPath(module, processArgObj.src, 'standard');
        }
      }
    });
  });
};

function replaceModulesPath(module, source, target) {
  let targetPath = path.join(process.cwd(), 'src', target);
  let sourcePath = path.join(process.cwd(), 'src', source);
  module.context = module.context.replace(sourcePath, targetPath);
  module.rawRequest = module.rawRequest.replace(source, target);
  module.request = module.request.replace(sourcePath, targetPath);
  module.resource = module.resource.replace(sourcePath, targetPath);
  module.userRequest = module.userRequest.replace(sourcePath, targetPath);
}

function getProcessArg() {
  return process.argv.reduce((next, val, index) => {
    if (index < 2) return next;
    let tempArr = val.split('=');
    return (next[tempArr[0]] = tempArr[1] || true), next;
  }, {});
}

module.exports = ChangeModluesPath;
