# PC Asset Storeについて
PlayCanvasのスクリプトを保存・管理を容易にするためのツールです。

### 1. インストール

リポジトリをクローン

```bash
git clone git@github.com:gmocloud-adp/pc-asset-store.git
cd pc-asset-store.git
```

パッケージをインストール

```
yarn install
```

### 2. データーベースの設定をする

このプロジェクトでは、データのFirebaseを用いています。
[こちらから](https://console.firebase.google.com/)
Firebaseの接続情報を取得し、firebaseの接続情報を設定します

```.env
// .env.example
apiKey=xxxxxxxxxxxx
authDomain=xxxxxxxxxxxx
databaseURL=xxxxxxxxxxxx
projectId=xxxxxxxxxxxx
storageBucket=xxxxxxxxxxxx
messagingSenderId=xxxxxxxxxxxx
appId=xxxxxxxxxxxx
measurementId=xxxxxxxxxxxx
```
### 3 ファイル名を変更

`.env.examples`　→ `.env`へファイル名を変更します。

### 4. 起動

開発環境
```
yarn dev
```

本番環境
```
yarn build && yarn start
```