# バックエンドのDockerfile
# FROM python:3.9-slim-buster

# WORKDIR /usr/src/app

# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

# RUN pip install --no-cache-dir openai

# RUN pip install --no-cache-dir SQLAlchemy

# COPY . .

# EXPOSE 8000

# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# ホットリロードのための修正
# FROM python:3.9

# WORKDIR /usr/src/app

# RUN pip install --no-cache-dir fastapi uvicorn SQLAlchemy watchdog

# COPY . .

# RUN npm install -g nodemon

# # FastAPIをuvicornサーバーで実行（ホットリロードあり）
# CMD ["nodemon", "--exec", "uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]

# # 再びchatGPTだ！

# # ベースイメージとしてPythonイメージを使用
# FROM python:3.9

# # 作業ディレクトリを/appに設定
# WORKDIR /usr/src/app

# # 必要なパッケージをインストール
# RUN pip install fastapi uvicorn sqlalchemy watchdog

# # アプリケーションのコードをコンテナ内にコピー
# COPY . /usr/src/app

# # FastAPIをuvicornサーバーで実行（ホットリロードあり）
# CMD ["nodemon", "--exec", "uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]

# バックエンドのDockerfile

# ベースイメージを指定
FROM python:3.9

# ワーキングディレクトリを設定
WORKDIR /app

# requirements.txtをコピー
COPY requirements.txt .

# Pythonパッケージをインストール
RUN pip install --no-cache-dir -r requirements.txt

# watchmedoをインストール
RUN pip install watchdog

# ソースコードをコピー
COPY . .

# watchmedoを使ってバックエンドのサーバーアプリケーションを実行
CMD ["watchmedo", "auto-restart", "--recursive", "--pattern", "*.py", "--", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
