title: 使用Hexo + GitHub搭建你的静态blog
date: 2015-09-02 11:46:30
tags: [Hexo, GitHub, NodeJs]

---
[hexo](https://github.com/tommy351/hexo)是一款基于Node.js的静态blog框架.  
特点
===
---
<ul><li>搭建速度快</li><li>支持markdown语法</li><li>扩展性好</li></ul>
快速入门
===
---
<strong>前置需求</strong>
<blockquote>NodeJs + GitHub</blockquote>  
<strong>安装hexo</strong>
<pre>npm install hexo -g</pre>
<strong>创建根目录</strong>
<pre>$ mkdir [your foldername]</pre>
<strong>初始化</strong>
<pre>
$ hexo init [your foldername]
$ cd [your foldername]
$ npm install
</pre>
<strong>新建一篇日志</strong>
<pre>$ hexo new "My first post"</pre>
<strong>生成静态文件</strong>
<pre>$ hexo generate</pre>
<strong>打开本地服务器</strong>
<pre>$ hexo server</pre>

>好了，现在你已经建好了你的静态blog，是不是很方便很快速？让我们打开localhost:4000看一下吧！(默认端口4000)

部署
===
---
<strong>##在你的Git上创建repository##</strong>
![hexo-git](/img/hexo-git1.png)
<strong>##名字应和你自己的用户名保持一致##</strong>
![hexo-git](/img/hexo-git2.png)
<strong>##REDME选项勾选比较正规，当然不选也是没问题的##</strong>
![hexo-git](/img/hexo-git3.png)
<strong>修改配置文件_config.yml(在你的根目录下)</strong>
<pre>deploy:
  type: git
  repository: https://github.com/JuniorJser/JuniorJser.github.io.git
  branch: master
</pre>
<strong>执行以下命令</strong>
<pre>
$ hexo generate
$ hexo deploy
</pre>
<strong>##如果报错(Error: Deployer not found : git),执行以下命令后再执行上述命令##</strong>
<pre>
$ npm install hexo-deployer-git --save
</pre>

结语
===
---
>大功告成，赶快访问看看吧: http://JuniorJser.github.io/ (名称改成自己的)


<strong>PS:</strong>
&emsp;&emsp;打开配置文件，一键换肤，更多玩法，等你发现！~
&emsp;&emsp;命令行可用首字母简写 `server --> s`  `generate --> g` 以此类推哦~
&emsp;&emsp;注意,每次修改本地文件后，需要 ` $ hexo generate `才能保存。每次使用命令时，都要在根目录下!