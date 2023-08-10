# firebaseの設定を追加
# import firebase_admin
# from firebase_admin import credentials
# from firebase_admin import db
from fastapi import FastAPI, HTTPException
from .auth import verify_id_token
from firebase_admin import auth

# cred = credentials.Certificate("C:\Users\sarap\OneDrive\デスクトップ\Week9_finalProject\.git\teamb-a39e7-firebase-adminsdk-mabvn-55eb35fded.json")
# firebase_admin.initialize_app(cred)

# Firebase Realtime Databaseの参照を作成し、データを書き込む
# ref = db.reference('path/to/data')
# ref.set({
#     'key1': 'value1',
#     'key2': 'value2'
# })

app = FastAPI()

# Firebaseの認証情報を検証する
# def verify_id_token(id_token):
#     try:
#         decoded_token = auth.verify_id_token(id_token)
#         uid = decoded_token['uid']
#         return uid
#     except:
#         return None

# @app.post("/signup")
# def signup(email: str, password: str):
#     try:
#         # メールアドレスとパスワードを受け取り、Firebaseでの会員登録を行う
#         user_credential = createUserWithEmailAndPassword(auth, email, password)
#         # ...

#         # ログインに成功した場合、ユーザーIDを返す
#         return {'message': '会員登録が完了しました！'}
#     except:
#         # ログインに失敗した場合、エラーを返す
#         raise HTTPException(status_code=401, detail='会員登録に失敗しました。')

# @app.post("/login")
# def login(id_token: str):
#     try:
#         decoded_token = auth.verify_id_token(id_token)
#         uid = decoded_token['uid']
#         # ログインに成功した場合、ユーザーIDを返す
#         return {'uid': uid}
#     except:
#         # ログインに失敗した場合、エラーを返す
#         raise HTTPException(status_code=401, detail='Invalid ID token')

