import styles from '../styles/Signup.module.css';

export default function Signup() {
  return (
    <div>
      <h1 className={styles.title}><strong>CHEER ME</strong></h1>
      <h2 className={styles.copy}>まいにち頑張っている私を、ほめてあげて、いたわってあげましょう。</h2>
      <div className={styles.container}>
        <p>自分の能力に自信が持てず、毎日が不安…。</p>
        <p>いつか怠けている自分に周囲が気付くのではないか…。</p>
        <p>家事、仕事、育児。自分なりに考えて一生懸命に頑張っているけど、感謝されない…。</p>
        <p>自分のことを褒めるのは苦手…。</p>
        <p>そんなあなたに。</p>
      </div>  
      <h2 className={styles.copy}>明日いちにち、自信をもって過ごせますように。</h2>

      <div className={styles.container}>
        <p>今日いちにちの出来事をつぶやいて、AIにほめてもらえます。</p>
        <p>今日の「いいこと」を、３つふりかえってみましょう。</p>
        <p>毎日がんばってきたことが記録できるので、ふりかえってみましょう。</p>
        <p>「ちいさな目標」を立てて、進んでいく自分を確認してみましょう。</p>
      </div>
      <h2 className={styles.copy}>私って、がんばってるかも。</h2>
      <div className={styles.container}>
      <p>あなたのこころが少しでも軽くなってくれたらうれしいです。</p>
      <p>お試し期間の7日後に、有料期間がはじまります。(月額料金300円)</p>
      
    
      <h3>会員登録はこちらから</h3>
      <input type="text" placeholder="ユーザー名" />
      <input type="email" placeholder="メールアドレス" />
      <input type="email" placeholder="メールアドレス(確認用)" />
      <input type="password" placeholder="パスワード" />
      <button>登録する</button>
      <button>Googleアカウントで登録</button>
      </div>
    </div>
  )
}
