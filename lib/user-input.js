module.exports = (cb) => {
  const inquirer = require('inquirer');
  const tplGitList = require('../config/tpl-git.json');

  const typeArr = [];
  for (const key in tplGitList) {
    typeArr.push(key);
  }

  const questions = [{
    type: 'list',
    name: 'projectType',
    message: '请选择类型',
    choices: typeArr,
    default: typeArr[0]
  }, {
    type: 'input',
    name: 'projectName',
    message: '请输入项目名',
    default: 'gakki',
    validate (value) {
      if (value === '') {
        return '组件名不能为空';
      }
      return true;
    }
  }, {
    type: 'input',
    name: 'author',
    message: '请输入开发者',
    default: 'tbj'
  }, {
    type: 'input',
    name: 'description',
    message: '请输入项目描述'
  }, {
    type: 'confirm',
    name: 'isCreate',
    message: '是否创建项目',
    default: true
  }];

  inquirer.prompt(questions).then(function(answers) {
    cb(answers);
  });
};