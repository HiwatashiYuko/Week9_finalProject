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

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.api import router as api_router    
from firebase_admin import credentials, firestore, initialize_app

app = FastAPI()

# Firebase Admin SDK初期化
cred = credentials.Certificate("teamb-a39e7-firebase-adminsdk-mabvn-cdf66d7193.json")
firebase_admin.initialize_app(cred)

app.include_router(api_router, prefix="/api")

# CORSミドルウェアを追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)






