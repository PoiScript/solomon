```yaml
title: 部署博客到 GitHub Pages & Firebase
slug: deploy-blog-via-gh-pages-and-firebase
date: 2017-02-05T13:57:17.024Z
tags:
  - angular
  - firebase
  - github
```

> 2017-02-09 更新: 新增了 Firebase 自定义域名部分

## 前言

在上一篇里我介绍了我自己写的基于 Angular 的静态博客框架 Solomon。那么，在一个博客框架初步完成之后，下一步就是要实现博客部署。因为是静态博客，所以部署方面就省事了很多，只需要有免费静态页面搭建托管服务即可。这方面比较流行的是 [GitHub Pages](https://pages.github.com/) ，此外 Google 新推出的
[Firebase](https://firebase.google.com/) 也是不错的选择。不过显而易见的，
Firebase 在国内的体验并不好，所以我这里只作为一个备用方案。

此外，为了避免每次更新博客都需要在有开发环境的电脑上进行，我还用了
[Travis-CI](https://travis-ci.org) 以实现自动编译和自动部署。

## 介绍

**GitHub Pages** 是 GitHub 推出的静态页面托管服务，可以选择 GitHub 提供的默认域名 github.io 或者是自定义域名。此外，GitHub Pages 还支持自动使用 Jekyll 生成网站。

> 不过我的项目用的是 Angular ，只能直接部署 HTML 等纯静态文档了，这也是我下面选择用 Travis-CI 自动部署的原因。

---

**Firebase** 官网的介绍是：

> The tools and infrastructure you need to build better apps and grow successful businesses
>
> 构建更出色应用和成功地扩大业务所需的工具和基础架构

简单的来说，Firebase 是一个帮助开发者构建移动应用的平台，
Firebase 适用于 Android、iOS 和 Web 平台，它的功能包括 [Firebase Analytics (用户分析的解决方案)](https://firebase.google.com/docs/analytics/)、
[Realtime Database(实时数据库)](https://firebase.google.com/docs/database/)、
[Authentication(用户验证)](https://firebase.google.com/docs/auth/)、
[Cloud Messaging(云信息)](https://firebase.google.com/docs/cloud-messaging/) 等。

这里我们用到的是 Firebase 众多的功能的其中一种：
[Hosting(静态托管)](https://firebase.google.com/docs/hosting/) 。和 GitHub Pages 一样，Firebase 也提供默认域名 firebaseapp.com 和自定义域名。另外 Firebase Hosting 中内置了 SSL， 所以即使使用自定义域名也可以启用 HTTPS。

## 初始化 & 设置 & 部署

新建一个 GitHub Pages 的过程非常简单，只需要在你的 GitHub 上新建一个名为 `username.github.io` 的 repository。

> 注意： `username` 部分必须和你的 GitHub Username 完全相同。

然后你需要将你新建的 GitHub Pages 取回本地：

```bash
$ git clone https://github.com/username/username.github.io
```

将你的 HTML 等静态文件放进 `username.github.io`，接着运行

```bash
$ git add .
$ git commit -m "Initial commit"
$ git push -u origin master
```

> 还没有静态文件？运行
>
> ```bash
> $ echo '<p>Hello World!</p>' > index.html
> ```
>
> 生成一个吧！

最后用浏览器打开 https://username.github.io
即可看到你的 GitHub Pages 已经部署好了。

---

相比 GitHub Pages，Firebase 的配置相对要繁琐一些，首先你需要登录到 Firebase 并在 Firebase Console 中新建一个 Project。

![Create A Project at Firebase](https://c1.staticflickr.com/1/694/32723029306_743f988ba5_o.png)

新建好 Project 之后，让我们转到命令行，运行如下的命令，分别安装 firebase 工具，登录到 firebasee 和初始化：

```bash
$ npm install -g firebase-tools
$ firebase login
$ firebase init
```

![Firebase Login](https://c1.staticflickr.com/1/296/32723030316_1c948880d5_o.png)

在初始化界面我们依次选择:

Hosting(托管) > 你的项目的名字 > 默认 >
填写你的需要部署的文件夹的名字(Angular 项目默认是 `dist`) > 默认

![firebase init](https://c1.staticflickr.com/1/619/32723031336_cf21a7ca0e_o.png)

完成设置之后，部署很简单了，只需要运行

```bash
$ firebase deploy
```

即可部署到你的 firebase 上。

## 自动编译

尽管 GitHub Pages 和 Firebase 的部署都十分的简单：在本地生成文本后，只需要一行命令就可以部署。但是如我上面所说，有的时候如果我们身边没有配好开发环境的电脑的话，本地生成就成了大问题。

所幸，我们可以用 Travis-CI 提供的持续整合服务来实现自动编译和自动部署。

> **Travis-CI** 名字中的 CI 指的是 **Continuous integration**(持续整合)，意思是在开发时只要有变更，就会 **持续整合** 进主线中。
>
> 要实现的自动整合，就需要有服务器持续的监听项目库的变化，发生变化 (例如 git commit) 时，自动运行测试和部署的脚本。
>
> Travis-CI 提供分布式的持续集成服务，用于测试在 GitHub 上托管的代码。

首先，登录到 Travis-CI 并且为项目开启自动编译：

![enable Travis-ci](https://c1.staticflickr.com/1/620/32723031566_99ed10100b_o.png)

然后，在我们的 Repo 中加入 `.travis.yml` 文件，用来描述编译的步骤。我的 `.travis.yml` 目前长这样：

```yaml
language: node_js
node_js:
  - "6.1"

branches:
  only:
    - master

before_script:
  - yarn
  - npm install -g firebase-tools
  - npm install -g angular-cli

script:
  - ng build --prod

after_success:
  - firebase deploy --token $FIREBASE_TOKEN
  - cd dist
  - git init
  - git config user.name "PoiScript"
  - git config user.email "poiscript@gmail.com"
  - git add .
  - git commit -m "Committed via Travis-CI"
  - git push -f -q https://PoiScript:$GITHUB_TOKEN@github.com/PoiScript/poiscript.github.io

notifications:
  email:
    on_failure: change
    on_success: change
```

简单的介绍一下各项配置：

1.  `language`: 这里是定义你的语言，而且还可以规定你的语言的版本，例如这里是 node 6.1

> 选择语言版本的时候最好先到 [Travis CI User Documentation](https://docs.travis-ci.com/)
> 里确定 Travis CI 是否提供。

2.  `before_script`: 在这里命令会在开始编译之前运行。由于我的项目用的是 yarn 所以这里我直接运行 yarn 命令安装依赖。然后我又用 npm 全局安装了 angular-cli 和 firebase-tools， 因为接下来的编译和部署会用到他们。

3.  `script`: 这里是编译的命令。`--prod` 表示生产模式。

4.  `after_success`: 这里放编译之后运行的代码，换言之就是部署的代码。具体的内容我们放到下面讲。

写好 `.travis.yml` 之后，在之后的每一次更新里，Travis 都会帮你 clone 下来进行编译或测试。如果一切正常的话，Travis 的 Build 就会显示成 Passing。

## 自动部署

自动编译好了之后，接下来就需要 **自动部署** 了，为了安全起见我们当然不能直接把我的 GitHub 和 Google 密码交出去，所以我们需要 **Token** (令牌)。

GitHub 的 Token 是在 [Personal access tokens](https://github.com/settings/tokens) 页面。点击 **Generate New Token** 之后输入这个 Token 描述(例如：Trvias-CI)，然后选择该 Token 的权限， 我们只选择一个 **public_repo** 。

![Generate GitHub Personal access tokens](https://c1.staticflickr.com/1/664/32723032236_4dde625658_o.png)

最后点击 **Generate Token** 之后，就会显示出我们生成好的 GitHub 的 Token 啦。

> 注意 Personal access tokens 出现了之后要 **立即复制**，因为它只会出现一次。

获得 Firebase 的 Token 则是需要在命令行里运行：

```bash
$ firebase login:ci
```

![Generate firebase Token](https://c1.staticflickr.com/1/276/32723032766_5fcb4098d7_o.png)

在浏览器里验证身份之后，就可以获得你的 Token 了。

那么 Token 应该怎么用呢？肯定是不能直接写到 `.travis.yml` 里的。所幸，Travis-CI 提供了 **全局变量** 的功能，在 Travis-CI 的设置界面里，我们把我们的 Token 填进去：

![Set Travis-CI Environment Variables](https://c1.staticflickr.com/1/443/32723032906_3b93de2e49_o.png)

然后在我们的就可以通过 `$GITHUB_TOKEN`，`$FIREBASE_TOKEN` 的方式获得我们的 Token 。而且如果你没有勾选 **Display value in build log** 的话，也不会显示在 log 里：

![Hide Your Environment Variables in log ](https://c1.staticflickr.com/1/403/32764351145_e45e4c67b4_o.png)

通过 Token 部署 Firebase 也是一样简单，只需要在 `after_success` 里添加：

```yaml
- firebase deploy --token $FIREBASE_TOKEN
```

部署到 GitHub 则是这么写:

```yaml
- cd dist
- git init
- git config user.name "GIT_NAME"
- git config user.email "GIT_EMAIL"
- git add .
- git commit -m "Committed via Travis-CI"
- git push -f -q https://username:$GITHUB_TOKEN@github.com/username/username.github.io
```

在 git push 的时候，切记要加上 `-q`，不然会显示出 URL 那么你的 Token 也就泄漏了。

## 自定义域名

上面提到过部署在 GitHub Pages 和 Firebase 之后，可以使用它们的默认域名 github.io 和 firebaseapp.com 。

GitHub Pages 就是 **username.github.io**，例如我的是 https://poiscript.github.io；
Firebase 则是：**项目名-编号.firebaseapp.com**，像我这里的就是 https://solomon-c8973.firebaseapp.com。

Firebase 默认的域名很不好看对吧？
Google 分配怎么一个域名感觉就是逼人换域名一样，那么接下来我们就来换成我们自己的域名。

> Firebase 非常良心地为自定义域名也提供 SSL 证书 (Let's Encrypt)，而且 Firebase 也支持绑定到一级子域名，所以我建议有条件的都最好都绑定自己的域名。:)

首先打开你的 Firebase Console，在侧边栏选择 Hosting ，然后你就可以在 Domain 这一项里看到你当前绑定的域名了。然后我们点击右上角的 Connect Domain 添加新域名：

![Open Firebase Console](https://c2.staticflickr.com/4/3781/32674936951_c3561594f8_o.png)

在框框里我们填入我们要添加的域名，可以使用最多一级子域名：

![Add Domain](https://c1.staticflickr.com/3/2617/32417677370_db4eed7f5b_o.png)

> 当然我们也可以选择将其重定向到我们其他的页面，例如把 **fb** 重定向到 **firebase** 等等。

然后我们需要验证我们的域名的所有权，添加 A 记录到我们的域名的 DNS 上：

![Add A Record](https://c1.staticflickr.com/1/782/31983823993_e57d9f91ee_o.png)

因为我这个域名是在 gandi 买的，用的也是 gandi 的 DNS，所以我接下来用 gandi 做演示。

登录之后，选择相应的域名，然后在 Zone Files 处选择 Change：

![Change Zone File](https://c1.staticflickr.com/1/487/31983824193_a9fa324a0a_o.png)

> 如果你之前没有修改过默认的 Zone File 的话，需要点击上面的 Copy to edit，生成一份新的 Zone File，因为默认的 Zone File 是不可编辑的。
>
> ![Create Zone File](https://c1.staticflickr.com/3/2298/31983824553_d49a5b6abd_o.png)

然后你需要选择一个未被使用的或者新建一个 Version ，因为正在使用的 Version 也是不可修改的：

![Switch Version](https://c1.staticflickr.com/3/2525/31983827113_f481a91585_o.png)

接下来点击 Add 添加记录：

![Add A Record](https://c1.staticflickr.com/3/2565/31983824783_43b1254d4c_b.jpg)

添加完之后，确认自己使用了 **正确的 Zone File** 和 **正确的 Version** 之后就算设置完了，接下来等一会确保 DNS 更新之后就可以返回之前 Firebase 的页面点击 **Verfiy** 了。

最后一步需要你添加一个 TXT 记录。(抱歉没有截到图)

我们继续编辑 Zone File，添加一个这样的 TXT 记录：

![Add TXT record](https://c1.staticflickr.com/3/2235/31983825073_796fb53c98_o.png)

> 注意 `Name` 为 `@` ； `Value` 为 **Firebase 提供给你的**，前后需要加上 **双引号**。

然后我们就设置完啦，只需要再等一会，等到 Firebase Console
界面显示 **Connected** 就表示我们的自定义域名已经成功部署了。

![Check Connected Status](https://c2.staticflickr.com/4/3814/31983825243_617e8257a7_o.png)
