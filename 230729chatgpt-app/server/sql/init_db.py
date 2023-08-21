from sql.table import User, Progress, Chat, ThreeGoodThings, Subscription, Payment
from sql.database import session, Base, ENGINE

def init_db():
    Base.metadata.create_all(bind=ENGINE)

    # 初期データを追加する場合はここに追加コードを記述

if __name__ == "__main__":
    init_db()
