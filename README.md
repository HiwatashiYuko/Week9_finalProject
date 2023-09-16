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

https://github.com/HiwatashiYuko/Week9_finalProject/assets/122708536/110ddf28-ee04-4513-bfe9-5721c594dd93

### 【説明資料】

<object data='"C:\Users\sarap\Week9_finalProject\CHEER ME API設計.pdf"' 
        type='application/pdf' 
        width='100%' 
        height='100%'>
<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href=""C:\Users\sarap\Week9_finalProject\CHEER ME API設計.pdf"">Download PDF</a></p>
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

![drawSQL-forimpostersyndrome-export-2023-09-15](https://github.com/HiwatashiYuko/Week9_finalProject/assets/122708536/6bfdf7be-d773-4ca8-a38a-ff78023292eb)

### 【API設計】

[CHEER ME API設計.pdf](https://github.com/HiwatashiYuko/Week9_finalProject/files/12640053/CHEER.ME.API.pdf)

### 【デザイン】

[CHEER ME デザイン.pdf](https://github.com/HiwatashiYuko/Week9_finalProject/files/12617735/CHEER.ME.pdf)

### 【PRD】

1. **プロジェクトメンバー**  
Yuko（リーダー） / Ako / Umechan / Wakayo
  
2. **概要/Summary**  
インポスター症候群に陥りがちな女性をターゲットに、自分の行いを可視化し、さらにChatGPTに投げかけて褒めてもらうことにより、自己肯定感を高めることができるアプリを開発する。  
     
- 課題：生産性の低下、メンタル不調（自己否定）  
- 解決方法：インポスターの克服メソッドを参照したアプリ設計およびChatGPTとの
会話で褒められ心を軽やかに変化させる。  
- ベネフィット：自己肯定感を上げて、自信をもって進む自分に近づける。  
- 新規性：ChatGPT、LLMなどのシステムで完結。

          
3. **背景/Background**  
プログラミングを学習する中で、自分が頑張っていることを素直に褒められずしんどい思いを抱えた経験から、インポスター症候群を防ぐための「褒められアプリ」を作りたいと考えた。

4. **製品原則/Product Principles**  
今日一日の「がんばった！」を褒めてもらえる（会話する）  
毎日のがんばった行動について振り返ることができる（記録する）

5. **スコープ**  
対象年齢　20〜50代女性  
対象機能
  (1) ChatGPTを組み込み、会話をすると褒めて返してくれる機能  
  (2) 今日の良かったこと３つ入力し、記録する機能（自分の頑張りの可視化）  
  (3) ログインするたびに褒めてくれる（定型文の中からランダムに表示）  
  (4) 決済機能（１週間お試し期間終了後、サブスクへ移行）  
  (5) 目標設定して達成できたことが見える機能

6. **対象ユーザー/Target Users**  
- 20〜50代の女性
- 仕事が辛すぎて心が折れかけている人（症候群の人）
- 自分を褒められるのが苦手な人
- 頑張り屋さん　「自分を褒めるなんて、自分に優しすぎる」と思ってしまう人

7. **ユースケース/Use Cases**  
インポスター症候群に陥りそうな20〜50代女性が一日の振り返りとして利用する。

8. **市場分析/Market Analysis**  
2021年福井県鯖江市調査による「自己肯定感が低い」女性の割合は8％と多くはないが、男性4％に比べると優位に高く、女性の悩みとして深刻であること、「インポスター症候群」の認知度が低く。まだまだ市場が伸長する可能性があることから、ポテンシャルが高いと考えている。

9. **競合分析/Competitive Analysis**  
LLMを搭載したアプリケーションは存在するが、「インポスター症候群」の対処としてのアプリケーションは、現時点では存在しないため、優位性があると考える。

10. **機能要求/Functional Requirements**

11. **UX要求/UX Requirements**

12. **その他技術的要求**



