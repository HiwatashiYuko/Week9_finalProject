from sqlalchemy import *
from sqlalchemy.orm import *
from sqlalchemy.ext.declarative import declarative_base

Dialect = "mysql"
driver = "pymysql"
username = "admin"
password = "password"
# host = "172.20.0.4"
# host = "172.17.48.1"
host = "localhost"
port = "3308"
database = "teamb"
charset_type = "utf8"
db_url =  f"{Dialect}+{driver}://{username}:{password}@{host}:{port}/{database}?charset={charset_type}"

# DB接続するためのEngineインスタンス
ENGINE = create_engine(db_url, echo=True)

# DBに対してORM操作するときに利用
# Sessionを通じて操作を行う
session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=ENGINE )
)

# 各modelで利用
# classとDBをMapping
Base = declarative_base()   #DB基底クラスの作成
