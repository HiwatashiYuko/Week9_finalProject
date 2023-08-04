import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between bg-green-510">
      <div>
        <Link href="/home">ほめてもらう</Link>
      </div>
      {/* リンク要修正 */}
      <div>
        <Link href="/3good">今日の良かったことを記録する</Link>
      </div>
      <div>
        <Link href="/chat">今までの良かったことを見る</Link>
      </div>
      <div>
        <Link href="/progress">「小さな目標」の進みを確認</Link>
      </div>
    </header>
  );
};

export default Header;

