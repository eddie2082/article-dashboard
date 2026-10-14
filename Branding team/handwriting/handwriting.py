"""한글 텍스트 → 분필 손글씨 PNG (배경 투명).

기본 설정: 나눔손글씨 펜체 기반 흘림 손글씨 스타일 (살짝 우측 기울기, 가는 분필 질감).

사용법:
    python3 handwriting.py "뮤지엄은 우리 사회에서\\n어떤 공간이 되어야 할까" out.png
    python3 handwriting.py "텍스트" out.png --size 240 --color "#1E1E23" --align left --preview

필요 패키지: pip install pillow numpy fonttools
"""
import argparse, glob, os, random
import numpy as np
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))

# 기본 설정 (2026-10 확정: 나눔손글씨 펜체 B 버전)
DEFAULTS = dict(
    font="nanum-pen-script",    # fonts/<name>/ 아래의 woff 서브셋 묶음
    size=190,            # 글자 크기(px)
    color="#F8F8F4",     # 글자 색 (분필 흰색)
    track=0.0,           # 자간 (글자 크기 대비 비율, 음수=좁게)
    slant=0.06,          # 우측 기울기 (shear 비율, 0.06 ≈ 3.4°)
    condense=1.0,        # 가로 폭 비율
    thin=3,              # 획 가늘게 (MinFilter 크기, 0=끄기)
    rot=2.0,             # 글자별 회전 흔들림(±도)
    jit=0.02,            # 글자별 높낮이 흔들림 (크기 대비)
    line=1.2,            # 줄 간격 (크기 대비)
    align="center",
    seed=7,
)


def hex_rgb(s):
    s = s.lstrip("#")
    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))


def render(text, font=DEFAULTS["font"], size=DEFAULTS["size"], color=DEFAULTS["color"],
           track=DEFAULTS["track"], slant=DEFAULTS["slant"], condense=DEFAULTS["condense"],
           thin=DEFAULTS["thin"], rot=DEFAULTS["rot"], jit=DEFAULTS["jit"], line=DEFAULTS["line"],
           align=DEFAULTS["align"], seed=DEFAULTS["seed"]):
    rnd = random.Random(seed)
    rng = np.random.default_rng(seed)
    color = hex_rgb(color) if isinstance(color, str) else color

    # 폰트가 유니코드 범위별 서브셋으로 나뉘어 있어 글자마다 해당 파일을 찾는다
    cmap = {}
    for f in sorted(glob.glob(os.path.join(HERE, "fonts", font, "*.woff"))):
        for cp in TTFont(f).getBestCmap():
            cmap.setdefault(cp, f)
    if not cmap:
        raise SystemExit(f"폰트를 찾을 수 없음: fonts/{font}/")
    fonts = {}

    def fo(c):
        f = cmap.get(ord(c)) or next(iter(cmap.values()))
        return fonts.setdefault(f, ImageFont.truetype(f, size))

    lines = text.split("\n")
    pad, lh = size, int(size * line)
    adv = lambda c: fo(c).getlength(c) + size * track
    widths = [sum(adv(c) for c in l) for l in lines]
    W, H = int(max(widths)) + 2 * pad, lh * len(lines) + 2 * pad

    mask = Image.new("L", (W, H), 0)
    for i, l in enumerate(lines):
        x = pad + ((max(widths) - widths[i]) / 2 if align == "center" else 0)
        for c in l:
            g = Image.new("L", (size * 2, size * 2), 0)
            ImageDraw.Draw(g).text((size // 2, size // 2), c, font=fo(c), fill=255)
            g = g.rotate(rnd.uniform(-rot, rot), resample=Image.BICUBIC)
            y = int(pad + i * lh + rnd.uniform(-size * jit, size * jit))
            mask.paste(Image.new("L", g.size, 255), (int(x) - size // 2, y - size // 2), g)
            x += adv(c)

    # 가로 폭 축소 → 우측 기울기
    mask = mask.resize((int(W * condense), H), Image.LANCZOS)
    W = mask.width
    extra = int(H * slant)
    mask = mask.transform((W + extra, H), Image.AFFINE, (1, slant, -extra, 0, 1, 0), resample=Image.BICUBIC)
    W += extra
    if thin:
        mask = mask.filter(ImageFilter.MinFilter(thin))

    # 분필 질감: 고운 알갱이 + 가로 결
    a = np.asarray(mask.filter(ImageFilter.GaussianBlur(0.8))).astype(np.float32) / 255
    noise = lambda h, w: Image.fromarray((rng.random((h, w)) * 255).astype(np.uint8))
    grain = np.asarray(noise(H, W).filter(ImageFilter.GaussianBlur(0.6))).astype(np.float32) / 255
    streak = np.asarray(noise(H // 2 + 1, W // 8 + 1).resize((W, H), Image.BILINEAR)).astype(np.float32) / 255
    tex = np.clip((grain * 0.6 + streak * 0.4 - 0.25) * 2.4, 0, 1)
    a = np.clip(a * 1.3 - 0.1, 0, 1) * (0.45 + 0.55 * tex)
    a = np.where(a < 0.1, 0, a)

    rgba = np.zeros((H, W, 4), np.uint8)
    rgba[..., :3] = color
    rgba[..., 3] = (a * 255).astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")
    img = img.crop(img.getbbox())
    p = size // 4
    out = Image.new("RGBA", (img.width + 2 * p, img.height + 2 * p), (0, 0, 0, 0))
    out.paste(img, (p, p))
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("text", help="줄바꿈은 실제 줄바꿈 또는 \\n")
    ap.add_argument("out", help="출력 PNG 경로")
    for k, v in DEFAULTS.items():
        ap.add_argument(f"--{k}", type=type(v), default=v)
    ap.add_argument("--preview", action="store_true", help="어두운 배경 미리보기 JPG도 저장")
    args = vars(ap.parse_args())
    text, out, preview = args.pop("text").replace("\\n", "\n"), args.pop("out"), args.pop("preview")
    im = render(text, **args)
    im.save(out)
    print(out, im.size)
    if preview:
        bg = Image.new("RGBA", im.size, (45, 40, 36, 255))
        bg.alpha_composite(im)
        p = os.path.splitext(out)[0] + "_preview.jpg"
        bg.convert("RGB").save(p, quality=92)
        print(p)


if __name__ == "__main__":
    main()
