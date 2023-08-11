from sqlalchemy import Column, Integer, String, Date,ForeignKey
# from sql.setting import ENGINE,Base
from setting import ENGINE,Base
import sys

# from api.db import Base

class User (Base):
    __tablename__ = "user"

    user_id = Column (Integer,primary_key=True)
    user_name = Column(String(50))
    uid = Column(String(50))


# 後で追加予定
#     threeGood = relationship("threeGood",backpopulates= "user",cascade="delete")

class Progress(Base):
    __tablename__="progress"

    progress_id = Column(Integer,primary_key=True)
    goal = Column(String(100))
    degree = Column(Integer)
    user_id = Column(Integer)

    # user= relationship("User",back_populates="user")

class Chat(Base):
    __tablename__="chat"

    chat_id = Column(Integer,primary_key=True)
    comment = Column(String(255))
    user_id = Column(Integer)
    comment_at = Column(Integer)
    reply = Column(String(255))
    prev_chat_id = Column(Integer)
 
class ThreeGood(Base):
    __tablename__="threeGood"

    Threegood_id = Column(Integer,primary_key=True)
    date = Column(Date)
    good1 = Column(Integer)
    good2 = Column(Integer)
    good3 = Column(Integer)
    user_id = Column(Integer)
 
class QuoteOfTheDay(Base):
    __tablename__="quoteOfTheDay"

    id = Column(Integer,primary_key=True)
    quotation = Column(String(50))
    

class Settlement(Base):
    __tablename__="settlement"

    settlement_id = Column(Integer,primary_key=True)
    user_id = Column(String(50))
    # columun3 = Column(String(50))
# 梅ちゃんからの指示もらってデータ型きめる

    
def main(args):
    Base.metadata.create_all(bind=ENGINE)

if __name__ == "__main__":
    main(sys.argv)