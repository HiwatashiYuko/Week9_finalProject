# from sqlalchemy import Column, Integer, String, Date
# from sql.setting import Base

# class User(Base):
#     __tablename__ = 'users'

#     id = Column(Integer, primary_key=True, index=True)
#     user_name = Column(String, unique=True, index=True)
#     firebase_uid = Column(String, unique=True, index=True)

# class ThreeGoodThings(Base):
#     __tablename__ = "three_good_things"

#     id = Column(Integer, primary_key=True, index=True)
#     # user_id = Column(String, nullable=False)
#     date = Column(Date, nullable=False)  # DateTime から Date に変更
#     good_thing_1 = Column(String, nullable=False)
#     good_thing_2 = Column(String, nullable=False)
#     good_thing_3 = Column(String, nullable=False)