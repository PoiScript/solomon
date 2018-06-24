```yaml
category: machine learning
entry: support vector machine
```

支持向量机
---

间隔于支持向量

样本空间中, 划分超平面壳通过如下线性方程来描述:

$$
\omega^Tx+b=0
$$

任意点到超平面 $(\omega,b)$ 的距离为

$$
r=\frac{| \omega^Tx+b|}{||\omega||}
$$

假设超平面 $(\omega,b)$ 能将训练样本正确分类, 即对于 $(x_i,y_i)\in D$, 若 $y_i=+1$ 则有 $\omega^Tx_i+b>0$; 若 $y_i=-1$, 则有 $\omega^Tx_i+b<0$.

$$
\begin{cases}
\omega^Tx_i+b & y_i=+1\\
\omega^Tx_i+b & y_i=-1
\end{cases}
$$

距离超平面最近的几个训练样本点使上式成立, 它们被称为 "支持向量"(support vector), 两个异类支持向量到超平面的距离之和为

$$\gamma=\frac{2}{||\omega|\vert}$$

它们被成为 "间隔"(margin)

找到具有最大间隔的划分超平面, 也就是找到能满足式中约束的参数 $\omega$ 和 $b$ 使得 $\gamma$ 最大, 即

$$\begin{array}{rl}
\max_{\omega,b} & \frac{2}{||\omega||} \\
\text{s.t.} & y_i(\omega^Tx_i+b)\ge1,i=1,2,\dots,m.
\end{array}$$

上式可以等价于

$$\begin{array}{rl}
\min_{\omega,b} & \frac{1}{2}||\omega||^2 \\
\text{s.t.} & y_i(\omega^Tx_i+b)\ge1,i=1,2,\dots,m.
\end{array}$$

这就是支持向量机(Support Vector Machine, 简称 SVM)的基本型

核函数
---

原始样本空间内可以能不存在一个能正确划分两类样本的超平面, 对这样的问题, 可将样本从原始空间映射到一个更高维的特征空间, 使得样本在这个特征空间内线性可分.

如果原始空间有限维,即属性数有限,那么一定存在一个高维特征空间使样本可分
