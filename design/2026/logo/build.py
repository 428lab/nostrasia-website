import re, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

F = {600: TTFont('f1.ttf'), 900: TTFont('f2.ttf')}
INK, BG, PU, OR, YE, TE, WHITE = '#161616', '#E9ECEF', '#8E30EB', '#F2542D', '#F6C324', '#0E7C7B', '#FFFFFF'

def cap(w):
    f = F[w]; return f['OS/2'].sCapHeight / f['head'].unitsPerEm

def text(s, w, size, x, y, ls=0.0, fill=INK):
    """y はベースライン。ls は em 単位の字間。(path 要素, 幅) を返す"""
    f = F[w]; upm = f['head'].unitsPerEm; gs = f.getGlyphSet(); cmap = f.getBestCmap()
    k = size / upm; out = []; cx = x
    for i, ch in enumerate(s):
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, (k, 0, 0, -k, cx, y)))
        d = pen.getCommands()
        if d: out.append(d)
        cx += gs[g].width * k
        if i < len(s) - 1: cx += ls * size
    return f'<path fill="{fill}" d="{" ".join(out)}"/>', cx - x

def width(s, w, size, ls=0.0):
    return text(s, w, size, 0, 0, ls)[1]

def mark(x, y, h):
    k = h / 30
    return (f'<g transform="translate({x} {y}) scale({k})">'
            '<circle cx="9" cy="9" r="8" fill="#8E30EB"/><path d="M22 2l7 13H15z" fill="#F2542D"/>'
            '<rect x="2" y="18" width="10" height="10" fill="#F6C324"/><path d="M16 28a7 7 0 0 1 14 0z" fill="#0E7C7B"/></g>')

def svg(w, h, body, bg=None):
    b = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" width="{w:.0f}" height="{h:.0f}">{b}{body}</svg>\n'

def year(x, y, size, fg):
    """2026（26 は紫）。字間 -0.04em"""
    p1, w1 = text('20', 900, size, x, y, -0.04, fg)
    p2, w2 = text('26', 900, size, x + w1 - 0.04 * size, y, -0.04, PU)
    return p1 + p2, w1 - 0.04 * size + w2

def lockup(fg, band_text, pad=24):
    """縦組み: 黒帯の NOSTRASIA / 2026 / 罫線 + NOSTR CONFERENCE IN ASIA（サイトのヒーローと同じ組み）"""
    n_size, y_size, t_size = 64, 190, 19
    nw = width('NOSTRASIA', 900, n_size, 0.01)
    bx, by, bpx, bpy = pad, pad, 16, 13
    band_h = cap(900) * n_size + bpy * 2
    body = f'<rect x="{bx}" y="{by}" width="{nw + bpx*2:.1f}" height="{band_h:.1f}" fill="{fg}"/>'
    body += text('NOSTRASIA', 900, n_size, bx + bpx, by + bpy + cap(900) * n_size, 0.01, band_text)[0]
    yy = by + band_h + 16 + cap(900) * y_size
    yp, yw = year(pad - 6, yy, y_size, fg)
    body += yp
    ry = yy + 22
    tw = width('NOSTR CONFERENCE IN ASIA', 600, t_size, 0.14)
    rw = max(nw + bpx * 2, tw)
    body += f'<rect x="{pad}" y="{ry:.1f}" width="{rw:.1f}" height="5" fill="{fg}"/>'
    body += text('NOSTR CONFERENCE IN ASIA', 600, t_size, pad, ry + 5 + 12 + cap(600) * t_size, 0.14, fg)[0]
    W = pad * 2 + max(rw, yw - 6)
    H = ry + 5 + 12 + cap(600) * t_size + pad
    return W, H, body

def horizontal(fg, pad=16):
    """横組み: マーク + NOSTRASIA 2026。ヘッダー・バナー用"""
    size = 80; ch = cap(900) * size
    mh = ch * 1.25; mx = pad; my = pad
    base = my + (mh + ch) / 2
    tx = mx + mh + 0.32 * size
    p1, w1 = text('NOSTRASIA', 900, size, tx, base, 0.01, fg)
    yp, yw = year(tx + w1 + 0.3 * size, base, size, fg)
    W = tx + w1 + 0.3 * size + yw + pad
    H = my * 2 + mh
    return W, H, mark(mx, my, mh) + p1 + yp

SHAPES = []
src = open(os.path.join(os.path.dirname(__file__), '../../../app/components/2026/ostrich.ts')).read()
for k, c, w, h, fx, fy, fr in re.findall(r"\{ k: '(\w)', c: '(#\w+)', w: ([\d.]+), h: ([\d.]+), fx: ([-\d.]+), fy: ([-\d.]+), fr: ([-\d.]+)", src):
    SHAPES.append((k, c, *map(float, (w, h, fx, fy, fr))))

def ostrich(cx, cy, u, eye=INK):
    """ヒーローと同じ 14 ピース。cx, cy はサイトの中心（fy - 8 が 0 の点）"""
    out = []
    for k, c, w, h, fx, fy, fr in SHAPES:
        if c == '#161616': c = eye
        # 太もも（h 12）を 0.8 だけ下へ伸ばし、すねとの継ぎ目に隙間が見えないようにする
        if k == 'q' and h == 12: h, fy = 12.8, fy + 0.4
        x, y = cx + fx * u, cy + (fy - 8) * u
        W, H = w * u, h * u
        t = f'transform="translate({x:.2f} {y:.2f}) rotate({fr})"'
        if k == 'c': out.append(f'<ellipse {t} rx="{W/2:.2f}" ry="{H/2:.2f}" fill="{c}"/>')
        elif k == 'q': out.append(f'<rect {t} x="{-W/2:.2f}" y="{-H/2:.2f}" width="{W:.2f}" height="{H:.2f}" fill="{c}"/>')
        elif k == 't': out.append(f'<path {t} d="M0 {-H/2:.2f}L{W/2:.2f} {H/2:.2f}H{-W/2:.2f}Z" fill="{c}"/>')
        elif k == 'h':  # 上が丸い半円（幅 W・高さ H）
            r = W / 2
            out.append(f'<path {t} d="M{-r:.2f} {H/2:.2f}A{r:.2f} {H:.2f} 0 0 1 {r:.2f} {H/2:.2f}Z" fill="{c}"/>')
    return ''.join(out)

def emblem(fg, bg, size=1024):
    """正方形: ダチョウ + NOSTRASIA 2026。SNS のアイコン・ステッカー用"""
    u = size / 125
    # ダチョウの左右（尾 -30 〜 くちばし 26）の中心が真ん中に来るよう 2u 右へ
    body = ostrich(size * 0.5 + 2 * u, size * 0.40, u, fg)
    gy = size * 0.40 + 41 * u
    body += f'<rect x="{size*0.16:.1f}" y="{gy:.1f}" width="{size*0.68:.1f}" height="{size*0.008:.1f}" fill="{fg}"/>'
    ts = size * 0.07
    nw = width('NOSTRASIA', 900, ts, 0.01)
    yp1, yw = year(0, 0, ts, fg)
    total = nw + 0.3 * ts + yw
    x0 = (size - total) / 2; base = gy + size * 0.075 + cap(900) * ts
    body += text('NOSTRASIA', 900, ts, x0, base, 0.01, fg)[0]
    body += year(x0 + nw + 0.3 * ts, base, ts, fg)[0]
    return size, size, body

os.makedirs('out', exist_ok=True)
def save(name, wh_body, bg=None):
    W, H, body = wh_body
    open(f'out/{name}.svg', 'w').write(svg(W, H, body, bg))

save('nostrasia2026-logo', lockup(INK, BG))
save('nostrasia2026-logo-white', lockup(WHITE, INK))
save('nostrasia2026-logo-horizontal', horizontal(INK))
save('nostrasia2026-logo-horizontal-white', horizontal(WHITE))
save('nostrasia2026-emblem', emblem(INK, BG), BG)
save('nostrasia2026-emblem-dark', emblem(WHITE, INK), INK)
open('out/nostrasia2026-mark.svg', 'w').write(svg(30, 30, mark(0, 0, 30)))
print(sorted(os.listdir('out')))
