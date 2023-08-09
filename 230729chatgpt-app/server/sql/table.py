from sqlalchemy import Column, Integer, String, ForeignKey
# from sql.setting import ENGINE,Base
from setting import ENGINE,Base
import sys
# from api.db import Base

class User (Base):
    # """
    # UserModel
    # """
    __tablename__ = "user"

    user_id = Column (Integer,primary_key=True)
    user_name = Column(String(50))
    uid = Column(String(50))

def main(args):
    Base.metadata.create_all(bind=ENGINE)

if __name__ == "__main__":
    main(sys.argv)



# 後で以下を追加予定
#     threeGood = relationship("threeGood",backpopulates= "user",cascade="delete")

# class ThreeGood(Base):
#     __tablename__="threeGood"

#     progress_id = Column(Integer,primary_key=True)
#     gmail = Column(String)
#     degree = Column(Integer)
#     user_id = Column(Integer)

#     user= relationship("User",back_populates="user")
