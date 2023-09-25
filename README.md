# Ms.Engineer コーディングブートキャンプ　Week9_finalProject

### 課題：今まで身につけた全ての要素を使ってチームでプロダクト・サービスをリリースまで完成させましょう。　　　　

### 【作成したアプリ名】CHEER　ME

### 【アプリ概要】

インポスター症候群で、自己否定して辛い人に、AIに褒めてもらえたり、よかったことの記録をつけて対処することで、自己肯定感をアップさせる。

### 【開発環境】

フロント：nextjs13.4 　 typescript5.1 　css：tailwind3.3

バック：python3.9  フレームワーク：FastAPI0.100   

web サーバー：uvicorn0.23

データベース：MySQL8.0　　認証：firebase10.1　　

決済機能：stripe5.5 

プロダクション：AWS　　SCM:Git　環境構築：Docker

### 【開発期間】2023年7月24日～8月25日

### 【デモ動画】

https://github.com/HiwatashiYuko/Week9_finalProject/assets/122708536/7bf68713-76b9-442c-bccd-07d8b8fb5d59

### 【説明資料】

<object data="./%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99_CHEERME%E7%B4%B9%E4%BB%8B%E8%B3%87%E6%96%99.pdf" type="application/pdf" width="100%" height="100%">
    <p>PDFを表示するには、<a href="./%E7%99%BA%E8%A1%A8%E8%B3%87%E6%96%99_CHEERME%E7%B4%B9%E4%BB%8B%E8%B3%87%E6%96%99.pdf">ここをクリック</a>してください。</p>
</object>


### 【要件定義】

1．会話をすると褒めて返してくれる（LLMを使用する）

2．日付を選んで、その日の良かったことを３つ書いて記録できる（自分の頑張ったことを見える化する。その日に記録できないこともあるので、日付が選べるようにする）

3．良かったことの記録を振り返ることができる

4．ログインするたび、偉人の名言や格言を「ひとこと」返してくれる

5．決済機能を持たせる

### 【URI設計】

サイト紹介　→　決済　/signup 

ログイン　/login

ほめてもらうページ　/home

良かったことを記録する　/3good

記録されました　/3good/done

記録を振り返る　/calendarpage

### 【ER図】

![drawSQL-forimpostersyndrome-export-2023-09-15](https://github.com/HiwatashiYuko/Week9_finalProject/assets/122708536/f8212b5f-a86f-4410-ad9a-91a005c74db7)

### 【API設計】

<object data="./CHEER ME API設計.pdf" type="application/pdf" width="100%" height="100%">
    <p>PDFを表示するには、<a href="./CHEER ME API設計.pdf">ここをクリック</a>してください。</p>
</object>

### 【デザイン】

<object data="./CHEER%20ME%20デザイン.pdf" type="application/pdf" width="100%" height="100%">
    <p>PDFを表示するには、<a href="./CHEER%20ME%20デザイン.pdf">ここをクリック</a>してください。</p>
</object>

### 【PRD】

"C:\Users\sarap\Week9_finalProject\230729chatgpt-app\PRD.md"#ハイパーリンク



