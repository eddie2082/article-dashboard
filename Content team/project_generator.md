# Project Generator (Content Team) — v3

---

## How to use (User trigger)

사용자가 아래 중 하나를 말하면, 해당 프로젝트 폴더와 템플릿 파일을 자동 생성한다.

- "새 에세이 프로젝트 생성: <프로젝트명>"
- "새 아티클 프로젝트 생성: <프로젝트명>"

---

## Naming Rule

- 프로젝트 폴더명은 소문자/언더스코어 사용
- 예: "AI 시대의 인간성" → "ai_era_humanity"

---

## Output Location (v3 Updated)

- Essay: content_team/essay_team/essay_###/
- Article: content_team/article_team/article_###/

※ projects/ 폴더 구조는 더 이상 사용하지 않는다.
※ 누적형 article_### / essay_### 구조를 따른다.

---

# 🟣 Essay Project Template (v3)

## Create these files

- 00_voice_reference.md
- 01_brief.md
- 02_thought_map.md
- 03_depth_expansion.md
- 04_flow_design.md
- 05_draft_v1.md
- 06_refinement.md
- 07_final.md
- notes.md

---

# 🔵 Article Project Template (v3.1)

## Create these files

- 01_brief.md
- 02_research.md
- 02b_rebuttal_analysis.md
- 03_structural_depth.md
- 04_structure.md
- 05_draft_v1.md
- 06_fact_check.md
- 07_final.md

---

# Article Research Rule (Default)

모든 Article 프로젝트는 기본적으로:

- Multi-layer research 수행
- Rebuttal Specialized Mode 수행

02b_rebuttal_analysis.md는 필수이다.

---

## Dashboard Update Rule (v3)

새 프로젝트 생성 시 ops_dashboard/state.json에 추가:

{
  "name": "article_### 또는 essay_###",
  "type": "essay | article",
  "status": "brief",
  "path": "content_team/...",
  "last_updated": ""
}

진행 단계에 따라 상태 업데이트:

brief → research → depth → structure → draft → fact_check → final → published