# Vegan-Restaurant-Forum
使用 Node.js + Express 建構的後端，搭配Handlbars 模板引擎和 MySQL 關連式資料庫，創建的餐廳論壇
* [Live Demo of Restaurant-Forum](https://vegan-restaurant-forum.onrender.com/)

![### Restaurant-Forum](https://i.imgur.com/bsINO7N.png)
# 專案功能簡介

### 前台使用者

使用者可以註冊帳號並登入論壇，可以對餐廳發表評論、喜歡餐廳、加入最愛，並查看論壇最新動態、美食達人、Top10餐廳。

### 後台使用者

可以使用前台所有功能，並且可以對餐廳、餐廳種類進行增刪改查，管理所有前台使用者，及更改使用者的角色。

# 使用 Docker Compose 快速啟動專案
首先，請確保您的機器已經安裝了 Docker和 Docker Compose。如果尚未安裝，可以參照以下官方文件進行安裝：
* [Docker installation guide](https://docs.docker.com/get-docker/)
* [Docker Compose installation guide](https://docs.docker.com/compose/install/)
1. 啟動您的終端機或命令提示字元，然後將此專案克隆到您的電腦上：
```
git clone https://github.com/Lanways/vegan-restaurant-forum.git
```
2. 依照[.env.example](https://github.com/Lanways/vegan-restaurant-forum/blob/master/.env.example)環境變數建立.env檔案
```
touch .env
```
3. 啟動 Docker Compose
在終端機中，進入到專案的根目錄，並使用以下命令啟動專案：
```
docker-compose up -d
```
* 此命令將啟動並運行所有的服務。預設情況下，您的應用會在 http://localhost:3000 上運行。
4. 查詢container name。 
```
docker container ls
```
5. 進入資料庫容器。
```
docker exec -it <your_container_name> mysql -u root -p
```
6. 輸入預設密碼，成功登入後即可開始使用CLI
```
password
```
7. 建立資料庫。
```
CREATE DATABASE vegan_restaurant_forum;
```
使用Ctrl + D 或輸入以下指令退出CLI
```
exit
```
8. 進入應用容器。
```
docker exec -it <your_container_name> /bin/bash
```
9. 建立資料庫模型
```
npx sequelize db:migrate
```
10. 建立資料庫種子資料
```
npx sequelize db:seed:all
```
11. 此時資料庫已經有完整的種子資料，可以開始使用應用，在瀏覽器輸入
```
http://localhost:3000
```
12. 停止 Docker Compose
想要停止專案時，只需在專案的根目錄終端機中執行：
```
docker-compose down
```

# 本地部屬說明
1. 請先確認有安裝 Node.js 與 npm
2. 啟動您的終端機或命令提示字元，然後將此專案克隆到您的電腦上
```
git clone https://github.com/Lanways/vegan-restaurant-forum.git
```
3. 進入專案資料夾
```
cd vegan-restaurant-forum
```
4. 安裝所需套件
```
npm install
```
5. 確認本地資料庫的使用者名稱、密碼和資料庫名稱是否與config/config.json中的設置匹配
6. 在 MySQL Workbench 建立資料庫
```
create database vegan-restaurant-forum;
```
7. 建立資料庫模型
```
npx sequelize db:migrate
```
8. 建立資料庫種子資料
```
npx sequelize db:seed:all
```
9. 依照[.env.example](https://github.com/Lanways/vegan-restaurant-forum/blob/master/.env.example)建立.env檔案
```
touch .env
```
10. 迅速啟動伺服器，請執行以下命令（如果想以開發模式啟動，使用npm run dev，確保您已安裝nodemon）
```
npm run start
```
11. 伺服器將在 http://localhost:3000 上啟動運行
```
express server is running on locahost:3000
```
12. 若要暫停使用伺服器，請在終端機按下 Ctrl + C (macOS: Command + C)

# 測試帳號
* 前台帳號：
  * email: user1@example.com
  * password: 12345678
* 後台帳號有 admin 權限：
  * email: root@example.com
  * password: 12345678

# 開發工具
* node.js 14.16.0
* express 4.18.2
* bcryptjs 2.4.3
* connect-flash 0.1.1
* connect-redis 4.0.3
* dayjs 1.11.9
* dotenv 16.3.1
* express-handlebars 5.3.3
* express-session 1.17.3
* faker 5.5.3
* imgur 1.0.2
* method-override 3.0.0
* multer 1.4.3
* mysql2 3.5.2
* passport 0.4.1
* passport-google-oauth20 2.0.0
* passport-facebook 3.0.0
* passport-local 1.0.0
* redis 3.1.2
* sequelize 6.32.1
* sequelize-cli 6.6.1