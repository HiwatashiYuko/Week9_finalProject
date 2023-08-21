-- init.sql

-- テーブルの作成
CREATE TABLE user (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(50),
    firebase_uid VARCHAR(50),
    stripe_customer_id VARCHAR(50)
);

CREATE TABLE progress (
    progress_id INT PRIMARY KEY,
    goal VARCHAR(100),
    degree INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE chat (
    chat_id INT PRIMARY KEY,
    comment VARCHAR(255),
    user_id INT,
    comment_at INT,
    reply VARCHAR(255),
    prev_chat_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE threeGoodThing (
    threeGood_id INT PRIMARY KEY,
    date DATE,
    good1 VARCHAR(100),
    good2 VARCHAR(100),
    good3 VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE quoteOfTheDay (
    quote_id INT PRIMARY KEY,
    quotation VARCHAR(50)
);

CREATE TABLE subscription (
    subscription_id INT PRIMARY KEY,
    stripe_customer_id VARCHAR(50),
    stripe_subscription_id VARCHAR(50),
    stripe_status VARCHAR(50),
    started_at INT,
    validty_date INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE payment (
    payment_id INT PRIMARY KEY,
    stripe_customer_id VARCHAR(50),
    stripe_payment_id VARCHAR(50),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- 初期データの挿入 stripe_customer_idは現時点で除外
INSERT INTO user (user_id, user_name, firebase_uid )
VALUES
    (1, 'User1', 'uid123'),
    (2, 'User2', 'uid456');

-- 他のテーブルの初期データも同様に挿入
INSERT INTO progress (progress_id, goal, degree, user_id)
VALUES
    (1, 'Goal1', 1, 1),
    (2, 'Goal2', 2, 2);
    

