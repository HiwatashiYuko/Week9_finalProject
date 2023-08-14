from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sql.setting import DATABASE_URL

#Engin　の作成
ENGINE = create_engine(DATABASE_URL, echo=True)

#セッション作成
Session = sessionmaker(bind = ENGINE)
session = scoped_session(Session)