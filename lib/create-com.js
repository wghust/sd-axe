module.exports = (answers) => {
  const path = require('path');
  const fs = require('fs');
  const exec = require('child_process').exec;
  const inquirer = require('inquirer');
  const ora = require('ora');
  const formatJson = require('format-json');
  const download = require('download-git-repo');
  const spinner = ora({
    text: ''
  });
  const tplGitList = require('../config/tpl-git.json');
  // 配置地址
  const src = path.resolve(__dirname, '../cache_tpl/');
  const dist = process.cwd() + '/' + tplGitList[answers.projectType].prefix + answers.projectName;

  const questions = [{
    type: 'confirm',
    name: 'isCover',
    message: '文件夹已存在，是否覆盖文件夹',
    default: true
  }];

  const clearCache = (fn) => {
    exec('rm -rf ' + src, () => {
      fn && fn();
    });
  };

  const showExtendIfm = () => {
    console.log('--------------------------------------------');
    console.log('\n  项目地址: ./' + tplGitList[answers.projectType].prefix + answers.projectName);
    console.log('  项目类型: ' + answers.projectType + '\n');
  };

  const setPackage = () => {
    const pkgPath = dist + '/package.json';
    fs.readFile(pkgPath, (err, buffer) => {
      if (err) {
        spinner.text = '初始化配置失败';
        spinner.fail();
      } else {
        const conJson = JSON.parse(buffer.toString());
        // 在tpl-git.json里，key唯一
        conJson.uniqueName = answers.projectType;
        conJson.name = answers.projectName;
        conJson.description = answers.description;
        conJson.author = answers.author;
        conJson.keywords = [
          'skydragon',
          answers.projectType
        ];
        fs.writeFile(pkgPath, formatJson.plain(conJson), function(error) {
          if (error) {
            spinner.text = '初始化配置失败或模板package.json配置项不存在';
            spinner.fail();
            console.log('--------------------------------------------');
          } else {
            spinner.text = '初始化配置成功';
            spinner.succeed();
            showExtendIfm();
            console.log('--------------------------------------------');
          }
        });
      }
    });
  };

  const createProject = () => {
    download('direct:' + tplGitList[answers.projectType].git, src, {
      clone: true
    }, (err) => {
      if (err) {
        spinner.text = '下载模板失败';
        spinner.fail();
        console.log('--------------------------------------------');
      } else {
        exec('cp -rf ' + src + '/. ' + dist, (error, stdout, stderr) => {
          if (error) {
            spinner.text = '初始化模板失败';
            spinner.fail();
            console.log('--------------------------------------------');
          } else {
            spinner.text = '初始化模板成功';
            spinner.succeed();
            setPackage();
          }
        });
      }
    });
  };

  const existProject = () => {
    fs.exists(dist, (isExist) => {
      if (isExist) {
        inquirer.prompt(questions).then((checkAnswers) => {
          console.log('--------------------------------------------');
          spinner.start();
          if (checkAnswers.isCover) {
            spinner.text = '开始创建项目...';
            createProject();
          } else {
            spinner.text = '创建项目失败';
            spinner.fail();
          }
        });
      } else {
        fs.mkdir(dist, (err) => {
          console.log('--------------------------------------------');
          spinner.start();
          if (err) {
            spinner.text = '创建项目失败';
            spinner.fail();
          } else {
            createProject();
          }
        });
      }
    });
  };

  clearCache(() => {
    existProject();
  });
};