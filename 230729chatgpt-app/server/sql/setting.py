# from sqlalchemy import *
# from sqlalchemy.orm import *
# from sqlalchemy.ext.declarative import declarative_base
# import os
# import pymysql

# DATABASE_URL = "mysql+pymysql://admin:password@mysql_data:3306/teamb"
# # DATABASE_URL = "mysql+pymysql://admin:password@230729chatgpt-app-db-1:3308/teamb"

# Dialect = "mysql"
# driver = "pymysql"
# username = "admin"
# password = "password"
# # host = "172.20.0.4"
# # host = "172.17.48.1"
# # host = "localhost"
# host = "mysql_data"
# host = "db"
# # host = "mysql_data"
# # host = "230729chatgpt-app-db-1"
# port = "3308"
# # port = "3306"
# database = "teamb"
# charset_type = "utf8"
# db_url =  f"{Dialect}+{driver}://{username}:{password}@{host}:{port}/{database}?charset={charset_type}"

# # DB接続するためのEngineインスタンス
# ENGINE = create_engine(db_url, echo=True)


# # DBに対してORM操作するときに利用
# # Sessionを通じて操作を行う
# session = scoped_session(
#     sessionmaker(autocommit=False, autoflush=False, bind=ENGINE )
# )

# # 各modelで利用
# # classとDBをMapping
# Base = declarative_base()   #DB基底クラスの作成
# # Base.metadata.create_all(bind=engine)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

DATABASE_URL = "mysql+pymysql://admin:password@mysql_data:3306/teamb"

Dialect = "mysql"
driver = "pymysql"
username = "admin"
password = "password"
# host = "mysql_data"
host = "db"
port = "3306"
database = "teamb"
charset_type = "utf8"
db_url = f"{Dialect}+{driver}://{username}:{password}@{host}:{port}/{database}?charset={charset_type}"

# DB接続するためのEngineインスタンス
ENGINE = create_engine(db_url, echo=True)

# DBに対してORM操作するときに利用
# Sessionを通じて操作を行う
session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)
)

# 各modelで利用
# classとDBをMapping
Base = declarative_base()  # DB基底クラスの作成
