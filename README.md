# Nostrasia 公式サイト

[nostrasia.com](https://nostrasia.com) のソースコードです。Remix（Vite）で作り、Cloudflare Pages で配信しています。

## 開発

bun 1.1.45（`.bun-version`）を使います。

```sh
bun install --frozen-lockfile
bun run dev
```

## 構成

- `/` は最新年のトップページです（`app/routes/_index.tsx`）。
- 過去年は `/<年>` にアーカイブしています（例: `/2024` は `app/routes/2024.*`）。
- 文言は `public/locales/<年>/<言語>/common.json` にあります。
- Cloudflare Pages Functions の入口は `functions/[[path]].ts` です。

## デプロイ

Cloudflare Pages の Git 連携でデプロイします。GitHub Actions は使いません。
master への push で本番に、ほかのブランチはプレビューとしてビルドされます。

| 項目               | 値                                      |
| ------------------ | --------------------------------------- |
| 本番ブランチ       | `master`                                |
| フレームワーク     | None                                    |
| ビルドコマンド     | `bun run build`                         |
| 出力ディレクトリ   | `build/client`                          |
| ルートディレクトリ | （空欄）                                |
| 環境変数           | `BUN_VERSION=1.1.45`、`NODE_VERSION=20` |
| 互換性の日付       | `2023-06-21`                            |

Cloudflare Pages と同じ環境で手元で確かめるときは、次を実行します。

```sh
bun run build
bun run start
```
