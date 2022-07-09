# discord-stamp-bot

## 必要なもの

### FirebaseAdminSDK

Firebaseコンソールの設定 > サービスアカウントから取得する

key.jsonとしてリポジトリ直下に配置する

```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```

### .env

TOKENはdiscordのtoken、DATABASE_URLはfirestoreのURL

```
TOKEN=
DATABASE_URL=
```

## run

develop: `yarn dev`

start: `yarn run compile`→`yarn start`