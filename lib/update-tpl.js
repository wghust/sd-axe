module.exports = () => {
  const path = require('path');
  const exec = require('child_process').exec;
  const ora = require('ora');
  const download = require('download-git-repo');
  const colors = require('colors');
  const spinner = ora({
    text: ''
  });
  const tplGitList = require('../config/tpl-git.json');
  const src = path.resolve(__dirname, '../cache_tpl/');
  const dist = process.cwd();

  // 本地package.json
  const localPackageIfm = require(dist + '/package.json');
  const uniqueName = localPackageIfm.uniqueName ? localPackageIfm.uniqueName : 'React-H5页面';
  const curGitIfm = tplGitList[uniqueName];

  const clearCache = (fn) => {
    exec('rm -rf ' + src, () => {
      fn && fn();
    });
  };

  // 递归更新
  const recursionUpdate = (list, index) => {
    if (index < list.length) {
      const curSrc = path.resolve(src, list[index]);
      const curDist = path.resolve(dist, list[index]);
      exec('cp -rf ' + curSrc + ' ' + curDist, (error, stdout, stderr) => {
        if (error) {
          spinner.text = '更新模板失败';
          spinner.fail();
          console.log('\n 已更新完毕' + index + '个更新项');
          console.log('还需更新' + (list.length - index - 1) + '个更新项目');
          console.log('请联系@zhishui修复\n');
          console.log('--------------------------------------------');
        } else {
          spinner.text = '更新(' + list[index] + ')成功';
          spinner.succeed();
          recursionUpdate(list, ++index);
        }
      })
    } else {
      console.log('--------------------------------------------');
    }
  };

  // 下载特定模板到缓存区
  const downloadTpl = () => {
    if (curGitIfm === undefined) {
      spinner.text = '模板不存在，请确认再试';
      spinner.fail();
      return;
    }
    clearCache(() => {
      spinner.start();
      spinner.text = '获取更新项...';
      download('direct:' + curGitIfm.git, src, {
        clone: true
      }, (err) => {
        if (err) {
          spinner.text = '获取更新项失败';
          spinner.fail();
          console.log('--------------------------------------------');
        } else {
          let updateList = curGitIfm.update;
          if (Object.prototype.toString.call(updateList) !== '[object Array]') {
            updateList = [];
          }
          spinner.text = '获取更新项完毕';
          spinner.succeed();
          console.log('--------------------------------------------');
          console.log('更新模板>>' + colors.cyan(uniqueName) + '<<');
          recursionUpdate(updateList, 0);
        }
      });
    });
  };

  downloadTpl();
};