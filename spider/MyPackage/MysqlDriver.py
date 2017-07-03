#coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )	#解码方式
import MySQLdb
from DBUtils.PooledDB import PooledDB


class Mysql(object):
	__pool=None	#连接池对象

	def __init__(self):
		self._conn=Mysql.__getConn()
		self._cursor=self._conn.cursor()

		#设置连接的编码方式
		self._cursor.execute("SET NAMES utf8mb4")
	#静态方法，丛连接池中取出连接
	@staticmethod 
	def __getConn():
		if Mysql.__pool is None:
			__pool = PooledDB(creator=MySQLdb, mincached=1 , maxcached=20 ,  
                              host='115.159.190.25', port=3306 , user='BSWeb', passwd='5323383' ,  
                              db='news',charset="utf8")
		return __pool.connection()

	def insert(self,sql,value):
		self._cursor.execute(sql,value)

	#结束事务
	def end(self,option='commit'):
		if option=='commit':
			self._conn.commit()
		else:
			self._conn.rollback()

	#释放连接池资源
	def dispose(self,isEnd=1):
		if isEnd==1:
			self.end('commit')
		else:
			self.end('rollback')
		self._cursor.close()
		self._conn.close()

	def delete(self,sql):
		self._cursor.execute(sql);
