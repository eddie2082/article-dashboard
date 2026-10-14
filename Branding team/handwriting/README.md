# 손글씨 PNG 생성기

한글 텍스트를 분필 손글씨 느낌의 **배경 투명 PNG**로 만듭니다.

## 기본 스타일 (확정)

- 폰트: 나눔손글씨 펜체 (SIL OFL 1.1, `fonts/nanum-pen-script/LICENSE`)
- 흘림 있는 성인 손글씨: 자간 0, 우측 기울기 약 3.4°(0.06), 가로 폭 100%
- 가는 분필 질감, 글자별 미세 흔들림(회전 ±2°, 높낮이 ±2%)
- 색 `#F8F8F4`(분필 흰색), 크기 190px, 가운데 정렬

예시: `samples/museum.png`, `samples/museum_preview.jpg`

## 사용법

```bash
pip install pillow numpy fonttools
python3 handwriting.py "뮤지엄은 우리 사회에서\n어떤 공간이 되어야 할까" out.png --preview
```

`--preview`를 붙이면 어두운 배경에 얹은 미리보기 JPG(`out_preview.jpg`)도 함께 저장합니다.

## 옵션

| 옵션 | 기본값 | 설명 |
|---|---|---|
| `--size` | 190 | 글자 크기(px). 썸네일용 고해상도는 240~320 |
| `--color` | `#F8F8F4` | 글자 색 (HEX) |
| `--track` | 0.0 | 자간. 음수일수록 촘촘 |
| `--slant` | 0.06 | 우측 기울기. 0이면 똑바로 |
| `--condense` | 1.0 | 가로 폭 비율 |
| `--thin` | 3 | 획 가늘게(0이면 원래 굵기, 5면 더 가늘게) |
| `--rot` / `--jit` | 2.0 / 0.02 | 글자별 회전·높낮이 흔들림 |
| `--line` | 1.2 | 줄 간격 |
| `--align` | center | `center` 또는 `left` |
| `--seed` | 7 | 흔들림 패턴. 바꾸면 같은 문장도 조금 다르게 나옴 |
