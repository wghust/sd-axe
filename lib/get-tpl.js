module.exports = (fn) => {
  const path = require('path');
  const exec = require('child_process').exec;
  const download = require('download-git-repo');
  const src = path.resolve(__dirname, '../config/');
  exec('rm -rf ' + src + '/tpl-git.json', () => {
    download('direct:git@github.com:wghust/tpl-list.git', src, {
      clone: true
    }, (err) => {
      if (err) {
        console.log(err);
        fn(false);
      } else {
        fn(true);
      }
    });
  });
};