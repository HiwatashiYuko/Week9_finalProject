from sqlalchemy import Column, Integer, String, Date,ForeignKey
# from sql.setting import ENGINE,Base
from setting import ENGINE,Base
import sys
from sqlalchemy.orm import relationship


# from api.db import Base

class User (Base):
    __tablename__ = "user"

    user_id = Column (Integer,primary_key=True, index=True)
    user_name = Column(String(50))
    firebase_uid = Column(String(50))
    stripe_customer_id = Column(String(50), index=True)

    progress = relationship("Progress", back_populates="user")
    chat = relationship("Chat", back_populates="user")
    three_good = relationship("ThreeGood", back_populates="user")
    subscription = relationship("Subscription", back_populates="user")
    payment = relationship("Payment", back_populates="user")

class Progress(Base):
    __tablename__="progress"

    progress_id = Column(Integer,primary_key=True)
    goal = Column(String(100))
    degree = Column(Integer,unique=False)
    # user_id = Column(Integer)
    user_id = Column(Integer,ForeignKey("user.user_id")) #親テーブルのuserのuser_idに紐づけ

    user = relationship("User", back_populates="progress")
    #リレーション：userテーブルのuser_idにひもづけ
    # user_id= relationship("User",back_populates="user_id")

class Chat(Base):
    __tablename__="chat"

    chat_id = Column(Integer,primary_key=True)
    comment = Column(String(255))
    user_id = Column(Integer,ForeignKey("user.user_id"))
    comment_at = Column(Integer)
    reply = Column(String(255))
    prev_chat_id = Column(Integer)
 
    user = relationship("User", back_populates="chat")

class ThreeGoodThings(Base):
    __tablename__="threeGood"

    threeGood_id = Column(Integer,primary_key=True)
    date = Column(Date)
    good1 = Column(String(100))
    good2 = Column(String(100))
    good3 = Column(String(100))
    user_id = Column(Integer,ForeignKey("user.user_id"))

    user = relationship("User", back_populates="three_good")

class QuoteOfTheDay(Base):
    __tablename__="quoteOfTheDay"

    quote_id = Column(Integer,primary_key=True)
    quotation = Column(String(50))
    

class Subscription(Base):
    __tablename__="subscription"

    subscription_id = Column(Integer,primary_key=True)
    stripe_customer_id = Column(String(50), ForeignKey("user.stripe_customer_id"))
    stripe_subscription_id = Column(String(50))
    stripe_status = Column(String(50))
    started_at = Column(Integer)
    validty_date = Column(Integer)
   
    user = relationship("User", back_populates="subscription")

#まだ不要とのコメントあったけど以下を一応paymentテーブルも作成だけしておく

class Payment(Base):
    __tablename__ = "payment"

    payment_id = Column(Integer,primary_key=True)
    stripe_customer_id = Column(String(50), ForeignKey("user.stripe_customer_id"))
    stripe_payment_id = Column(String)

    user = relationship("User", back_populates="payment")

def main(args):
    Base.metadata.create_all(bind=ENGINE)

if __name__ == "__main__":
    main(sys.argv)


