> 这篇文章改写自 poi 的计算机网络课论文。

前言
---

自 1991 年，第一个带有文档的 HTTP ── [HTTP V0.9](https://www.w3.org/Protocols/HTTP/AsImplemented.html) 问世以来，HTTP 协议得到了广泛的运用。

> 据 [Cisco 统计](https://www.cisco.com/c/en/us/solutions/collateral/service-provider/visual-networking-index-vni/vni-hyperconnectivity-wp.html#_Toc484556816)，在 2016 年，全球的的网络流量达到了惊人的 **1.2 ZB** 流量，其中视频的流量就达到了 73%。而目前的视频传输协议中最常用的分别是 Apple 的 [HLS（HTTP Live Stream）](https://en.wikipedia.org/wiki/HTTP_Live_Streaming) 和 Google 的 [DASH（Dynamic Adaptive Streaming over HTTP）](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP)，而两者都是基于 HTTP 的协议。

随着互联网的发展，网络通信中的安全性也得到了重视。在 1995 年，[TLS 协议的前身 SSL 协议应运而生](https://web.archive.org/web/19970614020952/http://home.netscape.com/newsref/std/SSL.html)。而我们今天要讨论的就是在 SSL 诞生的 22 年之后，互联网上的 HTTPS 运用到达了什么程度。

总览
---

我收集了目前 Alexa 排名前 1,000 的网站，虽然数量不多但是都是无疑占据了互联网上大多数的流量，通过来一窥互联网当前 HTTPS 的普及程度。部分的数据来自于 [ssllibs](https://www.ssllabs.com)。

> 实际上，我有 Alexa 前 1,000,000 的网站的名单。但是 ssllib 的 API 调用起来极其费时，对一个网站 ssl 配置的查询需要 2~3 分钟的时间，所以只能退而求其次。只考察前 1,000 个网站。

首先，在这 1,000 个网站中，目前有效的网站只有 981 个，其他的网站都无法成功解析其域名，可能是网站己经下线或者迁移到别的域名了，所以其是否支持 HTTPS 就不得而知了。

然后，在这 981 个网站中，支持 HTTPS 的恰好有 800 个，占比约有 81.5%。而在前 100 的网站中，只有 10 个网站不支持 HTTPS。

虽然这 800 个网站都支持 HTTPS 协议，但是他们在协议的实现上的不同也会产生安全性的差异。例如 RC4 加密曾经是 TLS 所采用的加密算法之一，但是在 2015 年遭到了[破解](https://blog.qualys.com/ssllabs/2013/03/19/rc4-in-tls-is-broken-now-what)，因此已经禁止在 TLS 中使用了。可目前仍然有网站使用 RC4 加密，甚至作为唯一的加密手段，那其 HTTPS 就形同虚设了。

TLS 版本
---

我统计了这 800 个网站所支持的最高的 TLS 协议的版本：

![tls version compare](https://c1.staticflickr.com/5/4572/38856004632_ca534df3e3_b.jpg)

绝大多数的网站（98 %）的网站支持了 TLS 1.2 标准。比较遗憾的是，没有看到网站使用了最新的 TLS 1.3 标准，不过考虑到 TLS 1.3 还处在草案阶段，不使用也是合情合理的。
此外，我也发现了还有 37 个网站仍在使用已经被认为是[不安全](https://www.openssl.org/~bodo/ssl-poodle.pdf)的 SSL 3.0。

TLS 握手
---

TLS 中最常见的握手方式两种：一种是基于 RSA 算法的；另外一种是基于 DH（Diffie-Hellman） 算法。RSA 算法历史悠久，兼容性好；DH 算法在加密速度上更有优势，而且拥有前向安全性。
TLS 握手的一个目的就是保证安全性。DH 握手可以使用除了 RSA 以外的证书来提高性能，例如 ECC。ECC 证书内置了 ECDSA 公钥，使用了 ECC（Elliptic curve cryptography）算法，它的密钥更短 ── 256 bit 的 ECC 算法强度和 3072 bit 的 RSA 算法安全性相当 ── 而加密速度更快。
在 800 个支持 HTTPS 的网站中，大多数的网站还是选择了传统的 RSA 证书，只有少量的网站（35 个）选择了 ECC 证书：

![keys](https://c1.staticflickr.com/5/4541/38856004042_0214bd8a9f_b.jpg)

TLS 握手的另外一个目的就是可以验证网站的身份，即需要数字签名。目前主要的签名方式有两者，分别是 RSA 和 ECDSA（Elliptic Curve Digital Signature Algorithms）。
在这 800 个网站中，有 21 个网站使用了 ECDSA 签名：

![signature algorithm](https://c1.staticflickr.com/5/4574/38856004432_91b2e63f77_b.jpg)

从 HTTPS 到 HSTS￼
---

当一个网站部署了 HTTPS 后，当用户再发起 HTTP 请求时，应该主动将用户引导到更安全的 HTTPS。目前有两种方法引导：一是当用户发起 HTTP 请求时，直接将其重定向到 HTTPS；二是设置 HSTS 响应头。

在这 800 个网站中，当我们直接发起 HTTP 请求时，HTTP的状态码分布为：

![http status code](https://c1.staticflickr.com/5/4550/38856004212_6bd501fd5d_b.jpg)

我们知道在 HTTP 的状态码中，20X 的状态码表示资源已经找到；30X 表示重定向；40X 的状态码表示资源不存在；50X 表示服务器发生了错误；因此，我们的粗略的统计为 573 个网站会将用户重定向到安全的 HTTPS 页面。其余的不会。

和直接重定向到 HTTPS相比，HSTS 的方法要好得多：网站在 HTTP 应答头中加入 [HSTS（Strict-Transport-Security）](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)的信息。它指定了一个有效时间，在有效时间内，当浏览器下次访问该域名时将直接使用 HTTPS 协议访问。

![hsts header](https://c1.staticflickr.com/5/4584/38856006462_870de0f664_b.jpg)

上述两种办法都有一个缺陷：都需要先经过一次 HTTP 请求后，才能过渡到 HTTPS 请求。如果第一次的 HTTP 请求就遭到了劫持，那就无能为力了。所以，相比简单的设置 HSTS 应答头，加入 HSTS Preloading List 的意义更大。

HSTS Preloading List 的原理就是在浏览器中内置一张支持 HSTS 网站的列表，当用户访问当中的网站时，如果在有效期内的话，浏览器会直接使用 HTTPS 链接，不会再发起 HTTP 请求。

目前的 HSTS Preloading List 主要由 [Chrome](https://www.chromium.org/hsts) 维护，[Firefox](https://blog.mozilla.org/security/2012/11/01/preloading-hsts/) 和 [IE/Edge](https://blogs.msdn.microsoft.com/ie/2015/02/16/http-strict-transport-security-comes-to-internet-explorer/) 都在使用。截至 2017 年 11 月 30 号，Chrome 的 [HSTS Preloading List](https://cs.chromium.org/chromium/src/net/http/transport_security_state_static.json) 中一共有 41312 个域名。而在这 800 个支持 HTTPS 的域名中，有 124 个网站也在其中。

![hsts preloading list](https://c1.staticflickr.com/5/4526/38856002962_44c14293b4_o.png)

Chrome 的 HSTS Preloading List 支持[申请](https://hstspreload.org/)，所以可以见这个列表来的域名将会越来越多，最后覆盖到我们常用的域名。

维护证书安全
---

HTTPS 链接中，另一个容易受到攻击的地方就是证书。证书是由 CA（证书颁发机构）颁布的，而受信任的 CA 多达上百个。我们先来看看这 800 个网站的证书是由哪些 CA 颁发的：

![ca](https://c1.staticflickr.com/5/4575/38856002802_16d910a73f_b.jpg)

现有的证书信任链还有一个问题就是任意一个受信任的 CA 都可以给任意一个域名颁发证书。所以如果出现了中间证书甚至是根证书被盗签时，对于浏览器来说是无法分辨的。

一种解决办法就是在应答头中加入 [HPKP （HTTP Public Key Pinning）](https://developer.mozilla.org/en-US/docs/Web/HTTP/Public_Key_Pinning)信息：即将自己的证书指纹放在 HTTP 的应答头里，让浏览器记录这些信息。当浏览器下次访问时都会验证该指纹，如果指纹不对的话，即使证书合法，浏览器也会直接断开链接。

![hpkp header](https://c1.staticflickr.com/5/4564/24021301637_3fa4ec01ee_b.jpg)

显然，HPKP 和 HSTS 一样也有 HTTP 被劫持的危险。所以也有相应的 [HPKP Preloading List](https://dxr.mozilla.org/mozilla-central/source/security/manager/tools/PreloadedHPKPins.json)。但是和 HSTS Preloading List 不同，个人用户[无法申请](https://tools.ietf.org/html/rfc7469#section-2.7)将自己的网站加入其中。所以目前的 HPKP Preloading List 的规模还比较小，而在这 800 个网站中也只有 2 个网站设置了 HPKP 的应答头。

此外， Chrome 提出了另外一种解决办法，那就是 [Certificate Transparency](https://www.certificate-transparency.org)：即将整个证书签名的过程透明化，任何证书持有者和 CA 都可以将自己证书的记录提交到相应的 Certificate Logs 服务器中，而这整个记录都是受到审计和监控的；浏览器在访问网站时就会对证书进行校验，进而做出不同的反应。

下面就是一个支持 Certificate Transparency 的页面的例子：

![certificate transparency](https://c1.staticflickr.com/5/4534/38856006142_ecdbb8cec0_b.jpg)

但是，Certificate Transparency 目前只有 Chrome 支持。而 Chrome 知道其利用率还太低，所以即使在 Certificate Logs 服务器中查不到相应的证书也不会有太大影响。

结论
---

从上面的分析我们可以得出：尽管大多数的网站都已经支持 HTTPS 协议了，但是实现还是参差不齐。而面对一些新型的攻击，例如首次 HTTP 协议遭到劫持，证书被盗签等问题准备得还是不够充分。

P.S.
---

很可惜，没有收集到所有 1,000,000 个域名的 HTTPS 信息，不过还是可以统计一下其他的信息。例如，域名的长度：

![domain length](https://c1.staticflickr.com/5/4564/38856003902_ca4fe89508_b.jpg)

和顶级域名的分布：

![tld](https://c1.staticflickr.com/5/4542/38856003072_4b411401b8_b.jpg)
