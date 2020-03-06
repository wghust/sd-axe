#!/usr/bin/env node

const program = require('commander');
const packageIfm = require('./package.json');

// 导入模块
const userInput = require('./lib/user-input');
const createCom = require('./lib/create-com');
const getTpl = require('./lib/get-tpl');
const updateTpl = require('./lib/update-tpl');

// 基础参数配置
program
  .command('init')
  .action(() => {
    getTpl((state) => {
      if (!state) {
        console.log('获取模板列表失败');
        return;
      }
      userInput((answers) => {
        if (answers.isCreate) {
          createCom(answers);
        }
      });
    })
  });

program
  .command('update')
  .action(() => {
    getTpl((state) => {
      if (!state) {
        console.log('获取模板列表失败');
        return;
      }
      updateTpl();
    });
  });

program
  .version(packageIfm.version)
  .usage('init')
  .usage('update')
  .parse(process.argv);

if (program.args.length === 0) {
  console.log('\n*************************************\n');
  console.log('* author: zhishui\n');
  console.log('* email: zhishui@tongbanjie.com\n');
  console.log('* website: http://newblog.tecclass.cn');
  console.log('\n*************************************\n');
}