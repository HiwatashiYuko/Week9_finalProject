#!/usr/bin/python
# -*- coding: utf-8 -*-

# # ➀いったんこの状態で、応答が返るようになっている。（ターミナルで python main.py で起動）⇨ターミナルに応答が返る。

# import openai

# def chat_with_gpt3(request_data):
#     api_token = "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"  # OpenAIのAPIトークンを設定してください

#     # GPT-3.5 Turboモデルに対話を依頼
#     client = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "Prompt: 命令\n\n[コンテンツの詳細]\n\nこのコンテンツは、会話の応答です。あなたはインポスター症候群に詳しい心理カウンセラーです。\n\n[アバター]20代~50代の女性\n\n[お悩み]自己否定、パフォーマンスの低下、期待した結果が出ない\n\n(コマンド)\n\n[アバター]がつぶやく内容にアドバイスするのではなく、共感して、気持ちに寄り添ってください。\n\n[アバター]がつぶやいた内容の中から、行動や感情を傾聴したり、感謝の気持ちを伝えてください。\n\n[返答NGワード]頑張る、共感\n\n[返答文字数]50字以内"},
#             {"role": "user", "content": request_data},
#         ],
#         api_key=api_token
#     )

#     # 応答を返す
#     return client.choices[0].message['content']

# # リクエストデータ
# request_data = "誰にも頼れない。"

# # GPT-3.5 Turboモデルと対話
# response = chat_with_gpt3(request_data)

# # 応答を表示
# print("応答：", response)

# ２　localhost:8000 に、{Hello python!}が、http://localhost:8000/chat?request_data=誰にも頼れない。に、"辛い気持ち、分かります。孤独を感じることは辛いですね。あなたの気持ちを受け止めます。いつでも話を聞いています。"応答が返った。

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# import openai

# app = FastAPI()

# # CORSミドルウェアを追加
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # すべてのオリジンを許可
#     allow_methods=["*"],  # すべてのHTTPメソッドを許可
#     allow_headers=["*"],  # すべてのヘッダーを許可
# )

# @app.get("/")
# async def root():
#     return {"message": "Hello python!"}

# @app.get("/chat")

# def chat_with_gpt3(request_data):
#     api_token = "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"  # OpenAIのAPIトークンを設定してください

#     # GPT-3.5 Turboモデルに対話を依頼
#     client = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "Prompt: 命令\n\n[コンテンツの詳細]\n\nこのコンテンツは、会話の応答です。あなたはインポスター症候群に詳しい心理カウンセラーです。\n\n[アバター]20代~50代の女性\n\n[お悩み]自己否定、パフォーマンスの低下、期待した結果が出ない\n\n(コマンド)\n\n[アバター]がつぶやく内容にアドバイスするのではなく、共感して、気持ちに寄り添ってください。\n\n[アバター]がつぶやいた内容の中から、行動や感情を傾聴したり、感謝の気持ちを伝えてください。\n\n[返答NGワード]頑張る、共感\n\n[返答文字数]50字以内"},
#             {"role": "user", "content": request_data},
#         ],
#         api_key=api_token
#     )

#     # 応答を返す
#     return client.choices[0].message['content']

# # リクエストデータ
# request_data = "プログラミングの勉強したくない。"

# # GPT-3.5 Turboモデルと対話
# response = chat_with_gpt3(request_data)

# # 応答を表示
# print("応答：", response)

# 3 Umechanさんのフロントとの連携を図るべく修正→処理部分を別ファイルへ転記。
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# import firebase_admin
import pymysql
from fastapi.responses import JSONResponse
import stripe
from api.api import router as api_router    #.api.apiではエラーが出たので、api.apiに変更した。
from firebase_admin import credentials
from api.config import STRIPE_API_KEY, STRIPE_ENDPOINT_SECRET
from sqlalchemy.orm import Session
from sql.setting import session
from sql.table import User, Subscription, Payment, QuoteOfTheDay
import random


app = FastAPI()

# Firebase Admin SDK初期化
# cred = credentials.Certificate("teamb-a39e7-firebase-adminsdk-mabvn-cdf66d7193.json")
# firebase_admin.initialize_app(cred)
# default_app = firebase_admin.initialize_app(cred)
# print(default_app.name)  # "[DEFAULT]"

app.include_router(api_router, prefix="/api")

pymysql.install_as_MySQLdb()


# # CORSミドルウェアを追加
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # すべてのオリジンを許可
#     allow_credentials=True,
#     allow_methods=["*"],  # すべてのHTTPメソッドを許可
#     allow_headers=["*"],  # すべてのヘッダーを許可
# )

origins = ["*"]  
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのHTTPヘッダーを許可
)





stripe.api_key = STRIPE_API_KEY

# This is your Stripe CLI webhook secret for testing your endpoint locally.
endpoint_secret = STRIPE_ENDPOINT_SECRET

def update_stripe_customer_id(client_reference_id, customer_id):
    # client_reference_id が user_id と一致するユーザーを検索
    user = session.query(User).filter_by(user_id=client_reference_id).first()

    if user:
        # ユーザーが見つかった場合、stripe_customer_id を customer_id で上書き
        user.stripe_customer_id = customer_id
        session.commit()
        print(f"Updated stripe_customer_id for user {user.user_id}")
    else:
        print("User not found")

def update_subscription_info(client_reference_id, subscription_id):
    user = session.query(User).filter_by(user_id=client_reference_id).first()

    if user:
        subscription = Subscription()
        subscription.stripe_subscription_id = subscription_id
        subscription.stripe_customer_id = user.stripe_customer_id
        session.add(subscription)
        session.commit()
        print(f"Subscription info updated for user {user.user_id}")
    else:
        print("User not found")

def update_subscription_status(customer_id, subscription_status):
    subscription = session.query(Subscription).filter_by(stripe_customer_id=customer_id).first()
    if subscription:
        subscription.stripe_status = subscription_status
        session.commit()
    else:
        print("Subscription not found")

def save_payment_info(customer_id, payment_intent_id):
    payment = Payment()
    payment.stripe_customer_id = customer_id
    payment.stripe_payment_id = payment_intent_id
    session.add(payment)
    session.commit()
    print(f"Payment info saved for customer {customer_id}")

@app.post('/webhook')
async def webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers['stripe-signature']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        raise HTTPException(status_code=400, detail=str(e))
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise HTTPException(status_code=400, detail=str(e))

    # イベントを処理
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        customer_id = payment_intent['customer']
        payment_intent_id = payment_intent['id']
        # ... イベントの処理
        save_payment_info(customer_id, payment_intent_id)
        print('Payment Intent Succeeded:', payment_intent)
    elif event['type'] == 'checkout.session.completed':
        client_reference_id = event['data']['object']['client_reference_id']
        customer_id = event['data']['object']['customer']
        subscription_id = event['data']['object']['subscription']
        update_stripe_customer_id(client_reference_id, customer_id)
        update_subscription_info(client_reference_id, subscription_id)
    elif event['type'] == 'customer.subscription.created':
        subscription = event['data']['object']
        customer_id = subscription['customer']
        subscription_status = subscription['status']
        print('customer_id:', customer_id, 'status:', subscription_status)
        # TODO DBにstatusを登録
        update_subscription_status(customer_id, subscription_status)
    elif event['type'] == 'customer.subscription.updated':
        subscription = event['data']['object']
        customer_id = subscription['customer']
        subscription_status = subscription['status']
        print('customer_id:', customer_id, 'status:', subscription_status)
        # TODO DBにstatusを登録
        update_subscription_status(customer_id, subscription_status)
    elif event['type'] == 'customer.subscription.deleted':
        subscription = event['data']['object']
        customer_id = subscription['customer']
        subscription_status = subscription['status']
        print('customer_id:', customer_id, 'status:', subscription_status)
        # TODO DBにstatusを登録
        update_subscription_status(customer_id, subscription_status)   
    else:
        print('Unhandled event type {}'.format(event['type']))

    return JSONResponse(content={'message': 'Success'}, status_code=200)


def get_random_quote(session: Session):
    quotes_count = session.query(QuoteOfTheDay).count()
    random_offset = random.randint(0, quotes_count - 1)
    random_quote = session.query(QuoteOfTheDay).offset(random_offset).first()
    return random_quote.quotation if random_quote else "No quotes available"

@app.get('/quotes')
async def get_quote():
    random_quote = get_random_quote(session)    
    # レスポンスとしてJSONを返す
    return JSONResponse(content={"quote": random_quote})
    # print("quote":"身の回りの小さな幸せに気づいてください")
    # return JSONResponse(content={"quote":"身の回りの小さな幸せに気づいてください"})

def get_user_info(uid):
    user = session.query(User).filter_by(firebase_uid=uid).first()
    return user

@app.get('/users/{uid}')
async def get_user_name(uid):
    user_info = get_user_info(uid)
    print(uid)
    if user_info:
        return JSONResponse(content={"user_name": user_info.user_name})
    else:
        return {"error": "User not found１"}