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

ソースコードの保存にFirebaseを用いています。
[こちらから](https://console.firebase.google.com/)
Firebaseの接続情報を取得し、firebaseの接続情報を設定します

```javascript
// src/constants/firebase.ts
export const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
```

### 3. 起動

開発環境
```
yarn dev
```

本番環境
```
yarn build && yarn start
```