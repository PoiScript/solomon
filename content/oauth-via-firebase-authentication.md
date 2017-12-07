前言
---

在上上篇文章  里我介绍了我的新博客系统 **Solomon**,
其中就讲的到了我用了 GitHub Issue 做为评论系统.
这么做有两个麻烦的地方:
1. 需要为每一篇文章创建一个 issue;
2. 评论者需要有 GitHub 帐号,
然后在登录的状态下到 issue 的页面进行评论.

作为一个处女座,
我觉得需要到别的页面才能评论或点赞的用户体验太糟糕了.
所以, 我考虑让评论者通过 OAuth 授权的方式获得 Token,
然后就可以直接在文章页面进行评论了.

OAuth
---

> OAuth（开放授权）是一个开放标准，
> 允许用户让第三方应用访问该用户在某一网站上存储的私密的资源
> （如照片，视频，联系人列表），
> 而无需将用户名和密码提供给第三方应用。
>
> via 维基百科

OAuth 的具体实现就是通过提供给第三方一个 **Token**,
第三方就可以通过这个 Token 在 **特定的时间** 内访问 **特定的内容**.

既然要在 GitHub 上评论,
我们就需要先在 GitHub 上注册我们的应用:

打开 [Developer applications](https://github.com/settings/developers)
或者进入 GitHub 的设置页面,
在侧边栏里选择 **OAuth applicatioins**.

然后选择  **Register a new application**
注册一个新的应用:

![Register a new OAuth application](https://c1.staticflickr.com/3/2544/32836484732_010a3af524_b.jpg)

> 注意这里有个 **Authorization callback URL**,
> 它是我们和 GitHub 完成授权之后的一个重定向地址,
> 目前我们还不知道要填什么.
> 可以先空着也可以随便填点什么,
> 等一下我们会换成正确的地址.

填写好信息之后点击 **Register application**.
之后就可以看到这个界面,
就代表我们的应用已经注册好了.

![Client ID & Client Secret](https://c1.staticflickr.com/3/2302/32950124986_de5d4164e5_b.jpg)

在这个页面我们还可以可以我们的 **Client ID** 和 **Client Secret**.

**Client ID** 是用于用户和 GitHub 获得授权的时候使用的,
GitHub 通过这个得知你要授权的网站,
并且会把该网站需要的权限列出来,
让用户决定是否授权.

用户确认了之后就会跳转到我们上面提到的 **Callback URL**,
并且返回一个 **code**.

我们在得到了 **code** 之后,
将它和 **Client Secret** 传给 GitHub,
GitHub 就会返回一个有时限的 **access_token**,
通过这个 token 我们就能访问到 GitHub 的资源了.

但是, OAuth 授权的话意味着需要有服务器帮我们完全上述内容.
这对于我这种静态博客来说是一大困难.
本身就是为了节省打理服务器的时间而选择了静态博客,
现在为了一个评论的功能再引入一个服务器,
不免有点本末倒置.

所幸, 托管我的网站的 Firebase 提供了
[Firebasee Authentication](https://firebase.google.com/docs/auth/),
让我们可以通过 Firebasee 的服务器完成整个授权过程.

Firebase Authentication
---

关于 Firebase 的介绍在上上一篇我简要的介绍过了.
Firebase Authentication 则是 Firebase 提供的一个身份验证服务.

Firebase Authentication 不仅可以使用 **传统的邮箱密码验证**,
还引入了一些比较流行的身份提供商, 例如:
**Google, Facebook 和 Twitter** 等.

![Sign-in providers](https://c1.staticflickr.com/3/2312/32836484982_67c9929997_o.png)

此外, Firebase Authentication 利用了行业标准:
我们上面提到的 **OAuth 2.0** 和 **OpenID** 等,
所以也可以集成到自定义的后端里.

要使用 Firebase Authentication 需要先进行一下配置:
首先登录到 [Firebase Console](https://console.firebase.google.com/).

然后在侧边栏里选择 **Authentication**,
然后选择 **Sign-in Method** 子选项卡:

![Sign-in Method](https://c1.staticflickr.com/3/2840/32836485442_c5d88f2ec8_o.png)

接下来开启 GitHub 认证,
填写我们的 **Client ID**, **Client secret**:

![Setup GitHub provider](https://c1.staticflickr.com/1/766/32950124566_48f78f16dc_b.jpg)

注意到下面地址了吗?
那个就是我们的 **回调地址**,
保存好 Firebase 这边的设置之后.
我们需要回到 GitHub,
把回调地址改成 Firebase 提供给我们的那个:

![callback url](https://c1.staticflickr.com/3/2351/32836485542_23f4471c15_o.png)

> 为了安全, Firebase 限制了只有通过认证的域名才可以通过完全整个用户认证的过程.
>
> 默认的认证的域名只有 localhost 和你项目的默认地址.
>
> 所以, 如果你使用了自定义域名的话.
> 还需要把你的域名加到 **OAuth redirect domains** 里:
>
> ![OAuth redirect domains](https://c1.staticflickr.com/1/733/32836485712_979b27f90d_o.png)

Angularfire 2
---

GitHub 和 Firebase 都设置好之后,
就可以正式的使用了.

Firebase Authentication 提供了两种使用方法:

 1. [FirebaseUI](https://github.com/firebase/FirebaseUI-Web)

 2. [Firebase Authentication SDK](https://firebase.google.com/docs/auth/web/github-auth)

FirebaseUI 尚处于测试阶段,
所以我这里选择用 Firebase Authentication SDK.

Firebase 提供的
[Demo](https://github.com/firebase/quickstart-js/blob/master/auth/github-popup.html)
是在应用的 HTML 中加入 `firebase.js` 文件,
然后在 `<script>` 中定义各种操作.

既然我们已经用了 **Angular**,
就不需要用这种比较「脏」的方法了.
我们这里用 Angular 官方提供的库:
[Angularfire2](https://github.com/angular/angularfire2)

设置 Angularfire 2 很容易, 先 **安装依赖**:

```shell
$ yarn add firebase angularfire2
```

> 当然也可以用 `$ npm install firebase angularfire2 --save`

然后在你的 **根模块** 里加上:

```TypeScript
export const firebaseConfig = {
  apiKey: '<your-key>',
  authDomain: '<your-project-authdomain>',
  databaseURL: '<your-database-URL>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
```

注意要将其中的 `firebaseConfig` 改成你的项目的配置.

配置在哪里找呢?
在你的 **Firebase Console**
的 **Overview** 里点击 **Add Firebase to your web app**:

![Firebase web app config](https://c2.staticflickr.com/4/3708/32991332765_c60264d52e_b.jpg)

配置完了之后就可以使用了.
例如,
登录的话需要调用 `AngularFire.auth#login()` :

```TypeScript
this.af.auth.login({
  provider: AuthProviders.Github,
  method: AuthMethods.Popup,
  scope: ['public_repo']
}).then((res: any) => {
  console.log(res)
  if ('accessToken' in res.github) this.tokenService.setToken(res.github.accessToken)
  else this.snackBarOpen('Access Token Not Found, Re-login Please.', 1000)
})
```

这里需要注意两点:

1. 为了安全, GitHub 只会在登录的时候返回 `accessToken`.
所以我们需要在发起登录请求的之后调用 `.then()`,
获取我们需要的 `accessToken`,
存在我们的 **TokenService** 里或者其他地方.

2. 我们获取 `accessToken` 的目地是用它来调用 **GitHub API**,
实现评论的功能的.
所以我们在登录的时候需要多申请一个 `public_repo` 的权限.
否则就会出现 `Issue not viewable by xxx` 等错误.

> 我一开始没发现, 还去 stackoverflow 提问:
> [How to Post Comment using GitHub OAuth Token in Angular 2](https://stackoverflow.com/questions/42323439/how-to-post-comment-using-github-oauth-token-in-angular-2)
> :(
>
> 在这里感谢一下
> [Pedro Nascimento](https://stackoverflow.com/users/1074361/pedro-nascimento),
> 帮我找到了问题所在. :)

得到了 `accessToken` 之后能干的事情就有很多了,
例如在 Solomon 里直接:
添加/修改/删除评论, 添加/删除 Reaction;
此外还可通过 `accessToken` 认证每一次 GitHub API 的调用,
实现增加 GitHub API 的调用上限:
https://developer.github.com/v3/#rate-limiting

存在的问题
---

如果仔细看我上面的代码就会发现我是把 `accessToken` 放在了 `TokenService`,
而没有使用持久化存储, 例如数据库等.
这样的话, 意味着每次浏览完 Solomon,
关闭页面之后, 下次再来的话,
就需要重新登录一遍了.

当然, 也不是没有办法,
Firebase 还提供了 **实时数据库**,
可以把 `accessToken` 存在里面.

不过这样就意味着我可以直接接触到 `accessToken`.
虽然这个 `accessToken` 的权限不多,
只能访问公共仓库, 而且有时限.
但是我还是不希望让整个认证的过程变得不那么透明,
所以目前还是 **保留这个问题**.

后语
---

就像我上一章里介绍了 Firebase Hosting 之后说的那样.
Hosting 和 Authentication 只是 Firebase 众多功能中的两个而已:

![Firebase Feature](https://c1.staticflickr.com/3/2470/32991333905_b1b2a8db29_o.png)

Firebase 还有更多非常使用的功能,
像上图中的
Analytics(用户分析),
Datebase(实时数据库),
Crash Reporting(错误追踪),
Test Lab(测试平台, 测试 Android 应用的兼容性),
Notifications(云推送),
AdMob(广告获利)
等才是 Firebase 的大杀器.

所以, **Google 大法好**. :)
