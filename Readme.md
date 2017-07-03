# Readme

### 使用方式：

1. 服务器访问：

直接在URL中输入115.159.190.25:3000访问。

测试的用户名和密码可以为testuser2, 1234567。

(正常情况下数据库不会出现问题，如果访问失败可能是服务器网页部署的问题，这时可以在/code/newsWeb下运行npm start，之后访问localhost:3000来访问)

2. 本地访问：

数据库和网站都部署到了服务器上，但如果服务器出现故障，可以换为本地访问。

	1. 根据sql语句在本地建表。
	2. 将/code/spider/mypackage中的MysqlDriver.py中的数据库变换为本地数据库。
	3.  运行/code/spider/main.py来爬数据。
	4. 将/code/newsWeb/routes/mysql.js中的数据库变为本地数据库
	5. 在newsWeb文件夹下，运行npm start，之后即可访问localhost:3000来访问网页。

### APP使用：

源代码文件code下有一个apk包，可以在安卓手机上安装，安装之后即可如同网页一般访问。

### tips:

1. 为了保证验收实验时候数据库稳定，暂时停止了爬虫的定时爬取。如果要现爬数据，可以运行code/spider/main.py来爬取数据。
2. 不同浏览器的界面显示可能不同，例如倒计时插件我在谷歌浏览器上测试正确，但safari上就测试错误。

---

最后，如果有任务问题，请和我联系：qyzqyx@163.com