from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sql.setting import DATABASE_URL
from sqlalchemy.ext.declarative import declarative_base

#Engin　の作成
ENGINE = create_engine(DATABASE_URL, echo=True)

# テーブルを作成するためのスキーマをインポートします。
from .table import Base, User, Progress, Chat, ThreeGoodThings, QuoteOfTheDay, Subscription, Payment

#セッション作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)

