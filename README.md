# 餐廳清單網站 (加入 CRUD & 資料庫 & 登入註冊)

使用 Node.js + Express + Express-handlebars + mongodb + mongoose + passport 所打造的餐廳清單網站

## 專案畫面

**首頁**
![專案畫面](/public/images/screenshot_1.png)

**登入頁面**
![專案畫面](/public/images/screenshot_2.png)

**註冊頁面**
![專案畫面](/public/images/screenshot_3.png)

## 安裝&使用

#### 下載專案

```
git clone https://github.com/waiting33118/restaurant-list-CRUD.git
```

#### 1.安裝 Package

```
npm install
```

#### 2.產生 Dummy 資料

```
npm run seed
```

#### 3.使用 nodemon 啟動伺服器

```
npm run dev
```

#### 或正常啟動

```
npm start
```

## 環境建置

- Node.js v12.17.0 -執行環境
- Express V4.17.1 -框架
- Express-handlebars V4.0.3 -模板引擎
- Express-session V1.17.1 -儲存當前狀態
- Body-Parser V1.19.0 -解析 POST 資料
- Bcryptjs V2.4.3 -密碼保護
- Connect-flash V0.1.1 -一次性提示訊息
- Method-Override V3.0.0 改寫 POST Method
- Mongoose V5.9.14 -mongoDB ODM
- Passport V0.4.1 -使用者認證
- Passport-local V1.0.0 -本地策略
- Passport-facebook V3.0.0 -FB 策略

## 產品功能(User Story)

- 使用者可以瀏覽自己所有的餐廳
- 使用者可以瀏覽各家餐廳資訊
- 使用者可以利用**餐廳名稱**或**類別**查詢特定店家
- 使用者可以修改自己餐廳的資訊
- 使用者可以刪除自己的餐廳
- 使用者可以依照**評價**或**類別**進行排序
- 遊客可以登入或註冊帳號
- 遊客可以透過 FB 帳號登入

## Contributor

- [x] TonyChung
