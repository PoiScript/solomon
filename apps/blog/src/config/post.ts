import { PostDict } from '@solomon/models';

export const posts: PostDict = {
  'introduce-angular-package-format': {
    title: 'Angular Package Format 简介',
    slug: 'introduce-angular-package-format',
    tags: ['angular'],
    date: '2018-03-15T15:21:28.264Z',
    prior: {
      title: '2017 HTTPS 调查',
      slug: 'https-in-2017',
    },
  },
  'https-in-2017': {
    title: '2017 HTTPS 调查',
    slug: 'https-in-2017',
    tags: ['https'],
    date: '2017-12-07T07:42:27.752Z',
    next: {
      title: 'Angular Package Format 简介',
      slug: 'introduce-angular-package-format',
    },
    prior: {
      title: 'NgModule 的作用域',
      slug: 'ngmodule-and-its-scope',
    },
  },
  'ngmodule-and-its-scope': {
    title: 'NgModule 的作用域',
    slug: 'ngmodule-and-its-scope',
    tags: ['angular'],
    date: '2017-10-16T06:10:47.147Z',
    next: {
      title: '2017 HTTPS 调查',
      slug: 'https-in-2017',
    },
    prior: {
      title: 'Spacemacs 和 Org-mode 和 LaTeX',
      slug: 'spacemacs-plus-org-mode-plus-latex',
    },
  },
  'spacemacs-plus-org-mode-plus-latex': {
    title: 'Spacemacs 和 Org-mode 和 LaTeX',
    slug: 'spacemacs-plus-org-mode-plus-latex',
    tags: ['emacs', 'latex', 'org-mode'],
    date: '2017-06-27T07:32:10.831Z',
    next: {
      title: 'NgModule 的作用域',
      slug: 'ngmodule-and-its-scope',
    },
    prior: {
      title: '基于 React 的 SEO 友好的博客',
      slug: 'make-a-react-based-blog-seo-friendly',
    },
  },
  'make-a-react-based-blog-seo-friendly': {
    title: '基于 React 的 SEO 友好的博客',
    slug: 'make-a-react-based-blog-seo-friendly',
    tags: ['blog', 'react', 'seo'],
    date: '2017-06-15T13:35:03.930Z',
    next: {
      title: 'Spacemacs 和 Org-mode 和 LaTeX',
      slug: 'spacemacs-plus-org-mode-plus-latex',
    },
    prior: {
      title: 'Solomon 现已支持 AMP',
      slug: 'solomon-now-supports-amp',
    },
  },
  'solomon-now-supports-amp': {
    title: 'Solomon 现已支持 AMP',
    slug: 'solomon-now-supports-amp',
    tags: ['amp', 'blog'],
    date: '2017-03-26T11:54:06.296Z',
    next: {
      title: '基于 React 的 SEO 友好的博客',
      slug: 'make-a-react-based-blog-seo-friendly',
    },
    prior: {
      title: '同步你的 JetBrains 设置',
      slug: 'sync-your-jetbrains-settings',
    },
  },
  'sync-your-jetbrains-settings': {
    title: '同步你的 JetBrains 设置',
    slug: 'sync-your-jetbrains-settings',
    tags: ['github', 'jetbrains'],
    date: '2017-03-18T05:36:11.165Z',
    next: {
      title: 'Solomon 现已支持 AMP',
      slug: 'solomon-now-supports-amp',
    },
    prior: {
      title: '入手 PS4 Slim',
      slug: 'bought-ps4-slim',
    },
  },
  'bought-ps4-slim': {
    title: '入手 PS4 Slim',
    slug: 'bought-ps4-slim',
    tags: ['game', 'ps4', 'sony'],
    date: '2017-03-01T05:57:14.898Z',
    next: {
      title: '同步你的 JetBrains 设置',
      slug: 'sync-your-jetbrains-settings',
    },
    prior: {
      title: '通过 Firebase Authentication 进行 OAuth 授权',
      slug: 'oauth-via-firebase-authentication',
    },
  },
  'oauth-via-firebase-authentication': {
    title: '通过 Firebase Authentication 进行 OAuth 授权',
    slug: 'oauth-via-firebase-authentication',
    tags: ['firebase', 'github', 'oauth'],
    date: '2017-02-19T15:36:31.925Z',
    next: {
      title: '入手 PS4 Slim',
      slug: 'bought-ps4-slim',
    },
    prior: {
      title: '部署博客到 GitHub Pages & Firebase',
      slug: 'deploy-blog-via-gh-pages-and-firebase',
    },
  },
  'deploy-blog-via-gh-pages-and-firebase': {
    title: '部署博客到 GitHub Pages & Firebase',
    slug: 'deploy-blog-via-gh-pages-and-firebase',
    tags: ['angular', 'firebase', 'github'],
    date: '2017-02-05T13:57:17.024Z',
    next: {
      title: '通过 Firebase Authentication 进行 OAuth 授权',
      slug: 'oauth-via-firebase-authentication',
    },
    prior: {
      title: '新的博客系统 Solomon',
      slug: 'introducing-solomon',
    },
  },
  'introducing-solomon': {
    title: '新的博客系统 Solomon',
    slug: 'introducing-solomon',
    tags: ['angular', 'blog'],
    date: '2017-01-15T16:04:11.888Z',
    next: {
      title: '部署博客到 GitHub Pages & Firebase',
      slug: 'deploy-blog-via-gh-pages-and-firebase',
    },
    prior: {
      title: 'Hello World!',
      slug: 'hello-world',
    },
  },
  'hello-world': {
    title: 'Hello World!',
    slug: 'hello-world',
    tags: ['thought'],
    date: '2017-01-05T08:30:55.961Z',
    next: {
      title: '新的博客系统 Solomon',
      slug: 'introducing-solomon',
    },
  },
};
