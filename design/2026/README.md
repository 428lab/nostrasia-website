# 2026 年版の OGP 画像・favicon の元データ

- `ogp-ja.html` / `ogp-en.html` → `public/2026/ogp-{ja,en}.png`（1200×630）
- `public/favicon.svg`（ロゴマーク `app/icons/2026/Mark.tsx` と同じ図形）→ `public/favicon.ico`（16/32/48）
- `touch.html` → `public/apple-touch-icon.png`（180×180。`public/favicon.svg` を読む）

ダチョウの図形は `app/components/2026/ostrich.ts` の SHAPES と同じ値。日付・会場などが変わったら HTML を直し、
ヘッドレス Chromium で 1200×630 のスクリーンショットを撮って差し替える（Google Fonts を読むのでネット接続が要る）。
