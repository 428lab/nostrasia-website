# Nostrasia 2026 ロゴ

書き出したファイルは `public/2026/logo/` にあり、サイトの `/2026/logo/<ファイル名>` から直接ダウンロードできる。
SVG の文字はアウトライン化してあるので、フォントが入っていない環境でも同じ見た目になる。PNG は背景が透明（エンブレムだけ背景色つき）。

| ファイル | 用途 | PNG の大きさ |
|---|---|---|
| `nostrasia2026-logo` | 縦組み。サイトのヒーローと同じ組み。明るい背景用 | 2000×963 |
| `nostrasia2026-logo-white` | 同じ組みの暗い背景用 | 2000×963 |
| `nostrasia2026-logo-horizontal` | 横組み（マーク + NOSTRASIA 2026）。ヘッダー・バナー用。明るい背景用 | 2400×242 |
| `nostrasia2026-logo-horizontal-white` | 横組みの暗い背景用 | 2400×242 |
| `nostrasia2026-emblem` | 正方形。ダチョウ + NOSTRASIA 2026。SNS のアイコン・ステッカー用（背景 #E9ECEF） | 1024×1024 |
| `nostrasia2026-emblem-dark` | エンブレムの暗い版（背景 #161616） | 1024×1024 |
| `nostrasia2026-mark` | マーク単体（円・三角・四角・半円） | 512×512 |

色: 紫 #8E30EB / 朱 #F2542D / 黄 #F6C324 / 青緑 #0E7C7B / 墨 #161616 / 背景 #E9ECEF。
書体: Unbounded（Black 900・SemiBold 600）。

## 作り直すとき
`build.py` が SVG を出力する。Unbounded の TTF が必要（Google Fonts の css2 API で `wght@600;900` を取得し、
SemiBold を `f1.ttf`、Black を `f2.ttf` として置く）。fonttools を入れた Python で実行すると `out/` に SVG ができる。

```
python -m venv venv && ./venv/bin/pip install fonttools
./venv/bin/python build.py
```

ダチョウの図形は `app/components/2026/ostrich.ts` の SHAPES をそのまま読む。PNG はヘッドレス Chromium で
SVG を所定の幅に描き、背景を透明にしてスクリーンショットを撮って書き出した。
