from fastapi import APIRouter, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import openai

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Hello python!"}

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

@router.post("/3good")
async def record_good_things(good_things: list[str]):
    # goodThings をデータベースに格納する処理などを追加する
    # ここではデータベースの設定がまだ行われていないため、一時的に受け取ったデータを表示するだけの処理とします
    return {"message": f"受け取った goodThings: {good_things}"}
