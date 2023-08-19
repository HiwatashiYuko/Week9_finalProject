from fastapi import APIRouter, Depends, HTTPException, status, Request
from firebase_admin import auth
from sqlalchemy.orm import Session
from models.models import User
from models.models import ThreeGoodThings  
from sql.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
import openai
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ValidationError
from sql import database
# import models

router = APIRouter()

# @router.exception_handler(ValidationError)
# async def validation_exception_handler(request: Request, exc: ValidationError):
#     return JSONResponse(
#         status_code=422,
#         content={"detail": exc.errors()},
#     )

# データベースに接続するためのセッションオブジェクトを取得する依存関係を定義する
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# IDトークンからユーザーIDを取得する関数
def get_user_id(id_token):
    decoded_token = auth.verify_id_token(id_token)
    return decoded_token['uid']

# /signupエンドポイントの実装
# @router.get("/signup")
# async def get_firebase_uid(request_data: str):
#     uid = 

    
@router.post("/signup")
async def signup(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    user_name = data.get("user_name")
    id_token = data.get("id_token")
    uid = get_user_id(id_token)
    # user_nameとuidを使用して、ユーザーを登録する処理を実行する
    db_user = models.User(user_name=user_name, firebase_uid=uid)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User registered successfully."}

@router.get("/")
async def root():
    return {"message": "Hello python!"}

@router.get("/healthCheck")
async def health_check():
    return {"status": "success"}

@router.get("/chat")
async def chat_with_gpt3(request_data: str):
    api_token = "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"  # OpenAIのAPIトークンを設定してください

    # GPT-3.5 Turboモデルに対話を依頼
    client = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Prompt: 命令\n\n[コンテンツの詳細]\n\nこのコンテンツは、会話の応答です。あなたはインポスター症候群に詳しい友達です。あなたの悩める親友は高校1年生です。\n\n[お悩み]自己否定、パフォーマンスの低下、期待した結果が出ない\n\n(コマンド)\n\n親友がつぶやく内容をほめてください。\n\nつぶやいた内容の中から、行動や感情を傾聴したり、感謝の気持ちを伝えてください。\n\n[返答NGワード]頑張る、共感\n\n[返答文数]3文以内"},
            {"role": "user", "content": request_data},
        ],
        api_key=api_token
    )

    # 応答を返す
    return client.choices[0].message['content']

# フロントで入力されたデータを受け取る
@router.post("/chat")
async def chat_endpoint(request: Request):
    request_data = await request.json()
    response = await chat_with_gpt3(request_data.get('request_data', ''))
    print("応答：", response)  # responseをターミナルに表示
    return {"response": response}


# TODO: データベース設定後に、格納コードを修正する。
# # データベースに格納する　モデルの定義とデータベースのセッションをインポートするためのコード
#     from models import PraiseMessage, SessionLocal

#     db = SessionLocal()
#     db_message = PraiseMessage(comment=request_data, praise=response)
#     db.add(db_message)
#     db.commit()
#     db.refresh(db_message)
#     db.close()

#     return {"response": response}


# @router.get("/3good")
# async def update_3good(data: dict):
#     # データを処理してデータベースに保存するコードをここに書く
#     return {"result": "success"}

@router.post("/3good")
async def record_good_things(request: Request, db: Session = Depends(get_db)):  # 引数を追加
    data = await request.json()  # JSONデータを取得
    print(data)
    user_id = data.get("user_id")  # user_id を取得
    date = data.get("date")  # date を取得
    good_things = data.get("good_thing_1")  # good_thing_1 を取得
    good_thing_2 = data.get("good_thing_2")  # good_thing_2 を取得
    good_thing_3 = data.get("good_thing_3")  # good_thing_3 を取得

    if good_things is None:
        return {"message": "goodThingsフィールドが存在しません"}
    
    # ThreeGoodThings オブジェクトを作成し、データベースに保存
    good_things_record = ThreeGoodThings(
        user_id=user_id,
        date=date,
        good_thing_1=good_things[0],
        good_thing_2=good_things[1],
        good_thing_3=good_things[2],
    )
    db.add(good_things_record)
    db.commit()
    db.refresh(good_things_record)

     response_data = {
        "message": f"受け取ったデータ: {data}"  # ここでレスポンスの内容を指定
    }
    return response_data

# 最後にルーターを返す
def get_router():
    return router