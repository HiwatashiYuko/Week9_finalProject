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

# 3 Umechanさんのフロントとの連携を図るべく修正。

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import openai
from fastapi.responses import JSONResponse
import stripe

app = FastAPI()

# CORSミドルウェアを追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)

@app.get("/")
async def root():
    return {"message": "Hello python!"}

@app.get("/chat")
async def chat_with_gpt3(request_data: str):
    api_token = "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"  # OpenAIのAPIトークンを設定してください

    # GPT-3.5 Turboモデルに対話を依頼
    client = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Prompt: 命令\n\n[コンテンツの詳細]\n\nこのコンテンツは、会話の応答です。あなたはインポスター症候群に詳しい心理カウンセラーです。\n\n[アバター]20代~50代の女性\n\n[お悩み]自己否定、パフォーマンスの低下、期待した結果が出ない\n\n(コマンド)\n\n[アバター]がつぶやく内容にアドバイスするのではなく、共感して、気持ちに寄り添ってください。\n\n[アバター]がつぶやいた内容の中から、行動や感情を傾聴したり、感謝の気持ちを伝えてください。\n\n[返答NGワード]頑張る、共感\n\n[返答文字数]50字以内"},
            {"role": "user", "content": request_data},
        ],
        api_key=api_token
    )

    # 応答を返す
    return client.choices[0].message['content']

# フロントで入力されたデータを受け取る
@app.post("/chat")
async def chat_endpoint(request: Request):
    request_data = await request.json()
    response = await chat_with_gpt3(request_data.get('request_data', ''))
    print("応答：", response)  # responseをターミナルに表示
    return {"response": response}

# GPT-3.5 Turboモデルと対話
# response = chat_with_gpt3(request_data)


stripe.api_key = 'sk_test_51NcIHqILFuiHCcLQPIMyGAHMF55bwNPZacJEMkZOnQgIns1gsP7Cb5QQIlcX6zuqmKPZiSZcFPFOoTxZeF7Wptcx00UwshPAWS'

# This is your Stripe CLI webhook secret for testing your endpoint locally.
endpoint_secret = 'whsec_adf2e988827e9ffdac29330253ee0cb76cd992af2f22742f0b496a9a55e8cccc'

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
        # ... イベントの処理
        print('Payment Intent Succeeded:', payment_intent)
    else:
        print('Unhandled event type {}'.format(event['type']))

    return JSONResponse(content={'message': 'Success'}, status_code=200)