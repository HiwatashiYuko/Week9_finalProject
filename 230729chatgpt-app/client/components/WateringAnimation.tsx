// components/WateringAnimation.tsx

import React from 'react';
import styles from '../styles/animation.module.css'; // CSS スタイルのインポート先を修正

const WateringAnimation = () => {
  return (
    <div className={`${styles.wateringCan} ${styles.wateringAnimation}`}> 
      <img src="/images/img1.jpg" alt="小さなじょうろ" className={styles.smallImage}/>
    </div>
  );
};

export default WateringAnimation;
