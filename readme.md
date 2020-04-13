![axe](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551148596&di=c837ac917fcffe5f3eb2615bf0fc7f10&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0130f659513bf2a8012193a3ed3bfc.jpg)

### 描述

开发简单的组件和单页面命令行工具

简而言之，就是一个git模板加载器。

### 安装

```
npm i sd-axe-cli -g
```

### 配置

```
axe init
```

### 添加模板

在文件夹``/config/tpl-git.json``里添加你需要配置的模板即可。

举例：

```
{
  "SkyDragon组件": {
    "git": "git@github.com:wghust/sd-tpl-com.git",
    "prefix": "sd-com-"
  }
}
```

```
Done:testgitCOn zhishui$ axe init
? 请选择类型 SkyDragon组件
? 请输入组件名 gakki
? 请输入开发者 tbj
? 请输入项目描述 
? 是否创建项目 Yes
? 文件夹已存在，是否覆盖文件夹 Yes
--------------------------------------------
✔ 初始化模板成功
✔ 初始化配置成功
--------------------------------------------

  项目地址: ./sd-com-gakki
  项目类型: SkyDragon组件

--------------------------------------------
```

### 更新模板

在业务项目里，如果模板存在更新项，可以在tpl-git.json里对对应的模板新增update更新项。

[https://github.com/wghust/tpl-list](https://github.com/wghust/tpl-list)

```
{
  "React-H5页面": {
    "git": "git@github.com:wghust/xd-page.git",
    "prefix": "",
    "update": [
      "./build",
      "./readme.md"
    ]
  }
}
```

然后cd到执行项目，执行:

```
axe update
```

更新项目模板。