# 餐廳清單網站 (加入 CRUD 功能 & 資料庫)

使用 Node.js + Express + Express-handlebars + mongodb + mongoose 所打造的餐廳清單網站

## 專案畫面

![專案畫面](/public/images/餐廳預覽圖.png)

## 安裝&使用

#### 下載專案

```
git clone https://github.com/waiting33118/restaurant-list-CRUD.git
```

#### 安裝 Package

```
npm install
```

#### 使用 nodemon 啟動伺服器

```
npm run dev
```

#### 或正常啟動

```
npm start
```

#### 建立預設種子

```
npm run seed
```

_資料庫預設位置: localhost/my-restaurant_

## 環境建置

- Node.js v12.16.3 -執行環境
- Express V4.17.1 -框架
- Express-handlebars V4.0.3 -模板引擎
- Body-Parser V1.19.0 -解析 POST 資料
- Mongoose V5.9.14 -mongoDB ODM

## 產品功能(User Story)

- 使用者可以瀏覽所有餐廳
- 使用者可以瀏覽各家餐廳資訊
- 使用者可以利用**餐廳名稱**或**類別**查詢特定店家
- 使用者可以修改餐廳資訊
- 使用者可以刪除餐廳

## Contributor

- [x] TonyChung
