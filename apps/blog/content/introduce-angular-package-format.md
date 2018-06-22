```yaml
title: Angular Package Format 简介
slug: introduce-angular-package-format
tags:
  - angular
date: 2018-03-15T15:21:28.264Z
```

[Angular Package Format（APF）](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview#) 指的是 Angular 框架中的包的结构和规范。该规范的作者是 [IgorMinar](https://github.com/IgorMinar) 和 [Jason Aden](https://github.com/jasonaden)，两者都是 Angular 的 Contributor。

它详细地介绍了 Angular 的核心库，例如 `@angular/core` 和 `@angular/common` 的 npm 包的结构和原因，同时还涉及到了在开发自己的库的时候如何优化编译结果，适配各种的优化工具等等。了解这方面的内容不仅有助于我们在写自己的 Angular 库，同时也可以我们了解 Angular 的编译器是如何工作的。

目前知道和了解这个文档的人还不多，而且恰巧今天（2018-3-15）该文档也更新到了 v6 版本（虽然目前看起来和 v5 长得一模一样）。于是我萌生了写一遍简单的关于 APF 的介绍，内容基本沿袭自上述的文档和[这个视频](https://youtu.be/QfvwQEJVOig)。

# 为什么需要 APF？

最大的因为就是需要兼容各种各样的运行环境和工具。

在 Angular 4 中加入了 `@angular/platform-server` 被并入 Angular 的核心 repo，说明 Angular 的 Sever-side rending 得到越来越多的重视，所以 Angular 的库不仅要兼容浏览器环境，还要能兼容 Nodejs 的服务器环境。

此外，不是所有的 Angular 项目都是基于 Angular CLI 的，Angular 的用户有可能使用各式各样的编译器和优化工具，例如 Webpack，Rollup，Uglify 和 Google Closure 等等，而且每种编译器和优化工具都有不同的需求。

所以仅仅只提供一种编译格式是不可能满足上述所有的需求，所以我们就需要一个包的规范来实现上述需求，这就是 APF。

# APF 中规定了什么？

**JavaScript 的模块规范**

要能过完美的兼容各种运行环境，第一个需要考虑的问题是使用 JavaScript 模块规范。例如，很多打包工具和优化工具基本只针对 ECMAScript Module (ESM) 有效（例如 Angular AoT 就只对 ESM 有效，而不能用于 CommonJS）。而在服务器端 Nodejs 上运行的时候需要对符合 CommonJS 规范的。

> 在最新的 nodejs 中已经支持了 ESM，但是这个功能目前处在实验阶段，需要单独的 `--experimental-modules` flag。而且也并非每个人都能用上最新的 nodejs。所以这个让 nodejs 使用 ESM 还不是目前最佳的解决方法。

APF 使用的是更加通用的 UMD 的模块规范，该规范可以同时满足 CommonJS 和 AMD 的规范。这样该模块就既可在 Nodejs 使用，也可以在浏览器中通过 script tag 使用。

此外，APF 还推荐在打包的时候还打包 Flat ES Module (FESM)，即将所有的独立的 Module 打包成一个文件。这样可以降低用户使用独立 Module 时的所需体积。

根据上面的描述，似乎只要提供 ESM，FESM 和 UMD 三种格式的编译后的文件就行了吗？其实不止，另外一个重要的要素是编译后的 JavaScript 的版本。

**JavaScript 的版本**

虽然目前很多打包工具默认都是输出 ECMAScript 5 (ES5)。但是考虑到所有的 evergreen browsers （一般来说，指可以脱离系统独立更新的浏览器）都已经提供原生的 ES2015(ES6) 支持。所以 APF 推荐提供 ES2015 版本的编译结果，这样可以满足部分不需要支持旧浏览器的用户。

另外一个原因就是不同的优化工具对不同语言版本支持情况也不一样。例如 Uglify 目前只支持 ES5。

**其他**

最后，因为 Angular 官方支持的第一开发语言为 TypeScript，所以提供 TypeScript 需要的 `.d.ts` (Type Declaration File) 也是有必要的。同时，因为 `.d.ts` 提供的信息不足以给 Angular 的编译器使用，还需要一个提供额外的包含每个 decorator 中 元数据的 `metadata.json`。

> 目前，Angular AoT 模式中会将所有的元数据编译成类的静态类型，所以也就不需要像以前那样通过 Metadata Reflection API 获取元数据了。

# APF 的具体实现

下面我们以一个具体的遵循 APF 的包 `@angular/material` 为例子，描述具体的文件结构。

首先是整体的文件结构, 主要分成了 `esm2015/`，`esm5/`，`bundles/` 和其他各自的独立的 module 的文件夹。其中 `esm2015/`，`esm5/` 和 `bundles/` 就分别表示了 esm+es2015，esm+es5 和 umd+es5 的编译结果。

```
.
├── esm2015
├── esm5
├── bundles
├── autocomplete
└── ...others
```

而在 `esm2015`，`esm5` 和 `bundles` 中则包括了该库中所有编译结果：每个独立的 module 的编译结果和整个库的 module 的都在其中。而每一个独立的 module 而编译结果都是一个 Flat Module。

```
.
├── material-tooltip.umd.js
├── material-tooltip.umd.min.js
├── ...others
├── material.umd.js
└── material.umd.min.js
```

而在每个独立的 module 中都包含的各自该 module 的 `package.json`，`metadata.json` 和 `.d.ts` 文件：

```
.
├── index.d.ts
├── index.metadata.json
├── package.json
└── typings
    ├── button.d.ts
    ├── button-module.d.ts
    ├── index.d.ts
    ├── index.metadata.json
    └── public-api.d.ts
```

最后，在每个 `package.json` 中，无论是根层级的，还是独立的 module 中的，都含有以下几个字段：

```
"main": "./bundles/material.umd.js",
"module": "./esm5/material.es5.js",
"es2015": "./esm2015/material.js",
"typings": "./material.d.ts",
```

`main` 字段指向 UMD+ES5 的编译结果，主要用于 Nodejs 的环境；`module` 字段指向 ESM+ES5 的编译结果，主要用于 Webpack 等；`es2015` 字段指向 ESM+ES2015 的编译结果，主要用于配置过的 Webpack 和 Google Closure 等；最后 `typings` 指向 `.d.ts` 文件，用于 TypeScript。

最后，在包的根目录里还有根整个 module 和每个独立的 module 的 `metadata.json` 和 `.d.ts` 文件。

# 更多

这篇文章只是对 APF 的一个简单的介绍和一个典型的例子的分析，还有更多的细节没有提及：例如，如何提供多个 entry point 这样可与成让用户只导入需要的模块，降低编译后的体积。如果感兴趣的话可以查看[原文档](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview#)，以及 Juri Strumpflohner 在 ng-be 上的[发言视频](https://youtu.be/K4YMmwxGKjY)。
