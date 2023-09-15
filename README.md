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

<!-- ![CHEER ME:デモ動画]("C:\Users\sarap\Week9_finalProject\最終_編集後CHEERME動画.mp4") -->

<!-- <video width="320" height="240" controls>
  <source src="C:\Users\sarap\Week9_finalProject\最終_編集後CHEERME動画.mp4" type="video/mp4">
</video> -->

<div><video controls src="C:\Users\sarap\Week9_finalProject\最終_編集後CHEERME動画.mp4" muted="false"></video></div>

## 【説明資料】

![CHEER ME:説明資料]("C:\Users\sarap\Week9_finalProject\発表資料_CHEERME紹介資料.pdf")

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

![CHEER ME:ER図]("C:\Users\sarap\Week9_finalProject\drawSQL-forimpostersyndrome-export-2023-09-15.png")

### 【API設計】

![CHEER ME:API設計]("C:\Users\sarap\Week9_finalProject\CHEER ME API設計.pdf")

### 【デザイン】

![CHEER ME:デザイン]("C:\Users\sarap\Week9_finalProject\CHEER ME デザイン.pdf")

### 【PRD】

"C:\Users\sarap\Week9_finalProject\230729chatgpt-app\PRD.md"#ハイパーリンク



