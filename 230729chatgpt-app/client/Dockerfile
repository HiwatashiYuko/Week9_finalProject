

# フロントエンドのDockerfile
FROM node:latest

WORKDIR /usr/src/app

# Firebase関連のパッケージをインストール
RUN npm install firebase @firebase/auth @firebase/app

# Chakra UIを使っている場合、Chakra UIのパッケージもインストール（必要な場合のみ）
# RUN npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
