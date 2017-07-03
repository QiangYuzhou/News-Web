#coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )	#解码方式

from urllib import urlopen
from bs4 import BeautifulSoup
from MyPackage import MysqlDriver
import re

#标题列表
theme_url_list = [
    {'name':'即时',   'href':"http://news.ifeng.com/listpage/11502/0/1/rtlist.shtml",'judge':"http://news.ifeng.com/a/\d+"},#18
    {'name':'大陆',   'href':"http://news.ifeng.com/mainland/",           'judge':"http://news.ifeng.com/a/\d+" },#0
    {'name':'国际',   'href':"http://news.ifeng.com/world/",              'judge':"http://news.ifeng.com/a/\d+"},#1
    {'name':'台湾',   'href':"http://news.ifeng.com/taiwan/",             'judge':"http://news.ifeng.com/a/\d+"},#2
    {'name':'社会',   'href':"http://news.ifeng.com/society/",            'judge':"http://news.ifeng.com/a/\d+"},#3
    {'name':'军事',   'href':"http://news.ifeng.com/mil/index.shtml",     'judge':"http://news.ifeng.com/a/\d+"},#4
    {'name':'港澳',   'href':"http://news.ifeng.com/hongkong/index.shtml",'judge':"http://news.ifeng.com/a/\d+"},#5
    {'name':'历史',   'href':"http://news.ifeng.com/history/",            'judge':"http://news.ifeng.com/a/\d+"},#6
    {'name':'财经',   'href':'http://finance.ifeng.com/',                 'judge':"http://finance.ifeng.com/a/"},#7
    {'name':'娱乐',   'href':'http://ent.ifeng.com/',                     'judge':"http://ent.ifeng.com/a/"},#8
    {'name':'体育',   'href':'http://sports.ifeng.com/',                  'judge':"http://sports.ifeng.com/a/"},#9
    {'name':'时尚',   'href':'http://fashion.ifeng.com/',                 'judge':"http://fashion.ifeng.com/a/"},#10
    {'name':'科技',  'href': 'http://tech.ifeng.com/',                   'judge': "http://tech.ifeng.com/a/"},#11
    {'name':'读书',  'href': 'http://book.ifeng.com/',                   'judge': "http://book.ifeng.com/a/"},#12
    {'name':'游戏',  'href': 'http://games.ifeng.com/',                  'judge': "http://games.ifeng.com/a/"},#13
    {'name':'文化',  'href': 'http://culture.ifeng.com/',                'judge': "http://culture.ifeng.com/a/"},#14
    {'name':'公益',  'href': 'http://gongyi.ifeng.com/',                 'judge': "http://gongyi.ifeng.com/a/"},#15
    {'name':'旅游',  'href': 'http://travel.ifeng.com/',                 'judge': "http://travel.ifeng.com/a/"},#16
    {'name':'健康',  'href': 'http://fashion.ifeng.com/health/',         'judge': "http://fashion.ifeng.com/a/"},#17
]

#获得新闻标题以及链接
def getLinkList(theme,judge):
	doc=urlopen(theme.encode('utf8')).read()
	linkSet = set()
	LinkList=[]
	soup=BeautifulSoup(doc,'html.parser',from_encoding='utf-8')	
	allLinks=soup.find_all('a',href=re.compile(judge)) 
	for link in allLinks:
		l=len(link.text.strip())
		Class=link.get('class')
		if(l>0 and (Class == None or Class[0] !='pinl')):	#过滤掉一些图标之类的链接
			if(link.text.strip()!='[详细]' and link.text.strip()!='0' and link.text.strip()!='战报'):	#过滤掉一些非新闻标题链接
				if(len(LinkList)<10):	#最多10个新闻
					if(link['href'] not in linkSet):	#去掉重复链接
							LinkList.append({'title':link.text.strip().replace('\n',''),'href':link['href'].strip().replace('\n','')})
							linkSet.add(link['href'].strip())
	return LinkList

#获得每个新闻的具体内容
def getContent(link):
	url=urlopen(link['href'].encode('utf8'))
	if url.getcode() != 200:
		print 'fail to get to page'
		return None
	doc=url.read()
	soup=BeautifulSoup(doc,'html.parser',from_encoding='utf-8')	
	main_content=soup.find('div',id='main_content')
	titleDiv=soup.find('div',id='titL')
	main_content2=soup.find('div',id='yc_con_txt')	#针对于不同页面的布局

	if main_content is not None:	#针对于第一种页面
		title = soup.find('h1').text.strip()
		meta=soup.find('meta',attrs={'name':'og:time'})
		if(meta is None):
			meta=soup.find('meta',attrs={'name':'og:time '})
			if(meta is None):
				print '%s这个主题没有meta\n' % link['href']
				return None
		date=meta.get('content')
		if(date is None):
			print '%s这个主题没有date\n' % link['href']
			return None
		content=str(main_content)
		return {'title':title,'href':link['href'],'date':date,'content':content}
	elif titleDiv is not None:	#针对于第二种页面
		title = titleDiv.find('h1').text.strip()
		date=titleDiv.find('p').text.strip()
		p=str(soup.find('p',class_='photoDesc'))
		image=str(soup.find('img',id='photoPrevLoading'))
		content=image+p;
		#print '%s\n' % content
		return {'title':title,'href':link['href'],'date':date,'content':content}
	elif main_content2 is not None:
		yc_tit=soup.find('div',class_ = "yc_tit")
		title=yc_tit.find('h1').text.strip()
		date=yc_tit.find('p').find('span').text.strip()
		content=str(main_content2)
		return {'title':title,'href':link['href'],'date':date,'content':content}
	else:
		print '错误的主题：%s\n' % link['title']
		return None


#解析好每个主题的题目
mysql=MysqlDriver.Mysql()
for theme in theme_url_list:
	mysql.delete("delete from "+theme['name']);
	LinkList=getLinkList(theme['href'],theme['judge'])	
	for link in LinkList:
		column=getContent(link)
		if column is not None:
			print "insert ok for %s\n" % column['title']
			mysql.insert('insert into '+theme['name']+' values (%s,%s,%s,%s)',
						(column['title'].encode('utf8'),
						column['href'].encode('utf8'),
						column['date'].encode('utf8'),
						column['content'].encode('utf8')))
mysql.dispose()

