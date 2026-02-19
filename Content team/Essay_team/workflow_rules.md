# Essay Team Workflow Rules (v4)

---

## 0. Core Principle

- Essay는 사유와 깊이를 중심으로 한다.
- 정보 나열보다 통찰을 우선한다.
- 표현보다 구조, 구조보다 질문의 밀도를 우선한다.
- 이 시스템의 목적은 “글 생산”이 아니라 “사유의 확장”이다.

---

## 1. Folder Structure Rule (Mandatory)

모든 에세이는 반드시 다음 구조로 생성한다:

essay_team/essay_###/

상위 essay_team 폴더에는 다음만 존재해야 한다:

- workflow_rules.md
- AGENTS.md
- essay_### 폴더들

01~07 파일 및 final.md를 상위 폴더에 직접 생성하는 것을 금지한다.

---

## 2. Execution Unit Rule (Very Important)

- 작업 단위는 항상 하나의 essay_### 폴더이다.
- 에이전트는 작업 시작 전 반드시 다음과 같이 명시한다:

"Working on essay_###"

- 모든 읽기/쓰기 작업은 해당 essay_### 폴더 내부에서만 수행한다.
- 다른 essay_### 폴더 파일을 참조하거나 수정하는 것을 금지한다.

---

## 3. Standard File Structure (v4)

각 essay_### 폴더에는 다음 파일이 존재해야 한다:

00_voice_reference.md
01_brief.md
02_thought_map.md
03_depth_expansion.md
04_flow_design.md
05_draft_v1.md
06_refinement.md
final.md

---

## 4. Production Order (Strict Order)

작업은 반드시 아래 순서를 따른다:

1. 00_voice_reference.md를 읽는다.
2. 01_brief.md를 읽는다.
3. 02_thought_map.md에 개념 확장을 수행한다.
4. 03_depth_expansion.md (Gu Gua 단계)를 생성한다.
5. 04_flow_design.md에 감정 흐름과 구조를 설계한다.
6. 05_draft_v1.md에 초안을 작성한다.
7. 06_refinement.md에서 깊이와 문장 밀도를 강화한다.
8. final.md에 최종본을 작성한다.
9. final.md 작성 직후 자동 게시 절차를 즉시 수행한다.

단계 건너뛰기 금지.

---

## 5. Voice Lock Rule

- Draft 이전 단계에서 반드시 00_voice_reference.md를 참조한다.
- Voice Reference와 다른 문체/톤으로 작성하는 것을 금지한다.
- 과장, 설명 과잉, 감정 과잉을 피한다.
- 기존 에디의 문장 리듬과 밀도를 유지한다.

---

## 6. Depth Integrity Rule

- 03_depth_expansion.md 없이 draft 작성 금지.
- Depth Expansion 단계에서 최소 3개의 확장 질문을 생성해야 한다.
- 사유의 한계와 잠재적 반론을 반드시 명시한다.
- 개념 간 연결을 최소 2개 이상 생성한다.

---

## 7. Intellectual Tension Rule

- 에세이는 최소 1개의 자기비판적 질문을 포함해야 한다.
- 독자를 안심시키는 결론으로 마무리하는 것을 금지한다.
- 명확한 해결책 제시보다 질문의 잔여감을 남긴다.

---

## 8. Refinement Rule

06_refinement.md에서는 다음을 수행한다:

- 불필요한 설명 제거
- 문장 밀도 강화
- 반복 개념 축약
- 감정 과잉 제거
- 리듬 조정

Refinement 없이 final.md 작성 금지.

---

## 9. Finalization Rule

final.md는 다음을 만족해야 한다:

- 구조적 일관성
- Voice Reference와의 정합성
- 최소 1개의 철학적 긴장 유지
- 과도한 요약 결론 금지

---

## 10. Automatic Dashboard Sync Rule (Mandatory)

final.md가 생성되면, 사용자의 추가 요청 없이 즉시 아래 순서를 수행한다.
수동 게시/수동 동기화 프롬프트를 기다리면 안 된다.

### Step 1) final.md 제목 추출
- final.md의 첫 번째 H1(`# `로 시작) 라인을 공식 제목으로 사용한다.
- H1이 없으면 즉시 중단하고 정확히 다음 문구를 보고한다:
  - `Missing H1 title in final.md`
- 제목을 추측하거나 자동 생성하지 않는다.

### Step 2) ops_dashboard/state.json 동기화
- `projects` 내 `Essay_team` summary entry는 유지한 채 다음 필드를 갱신한다:
  - `last_published_essay = "<현재 essay 폴더명>"`
  - `last_published_title = "<추출한 H1 제목>"`
  - `last_updated = <현재 KST timestamp>`
- per-essay entry(`essays` 배열 권장)는 현재 essay에 대해 add/update 한다:
  - `id`, `title`, `status`, `final_path`, `published_at`
- 다른 unrelated entry는 수정하지 않는다.
- JSON 유효성을 반드시 유지한다.
- Notion 게시는 수행하지 않는다.

### Step 3) dashboard.md 갱신
- `ops_dashboard/state.json` 기준으로 `ops_dashboard/dashboard.md`를 갱신한다.
- 마지막 게시 에세이 제목/폴더명이 반영되어야 한다.

### Step 4) 웹 게시 반영 (Dashboard App)
- 웹 게시는 Notion이 아니라 `ops_dashboard/dashboard_app`을 기준으로 한다.
- 새 에세이는 `Essay_team/Essay_###/final.md` 생성 시 자동 게시 대상으로 간주한다.
- 대시보드 목록 노출 순서는 essay 번호 기준 최신순(내림차순)으로 유지한다.
- 에이전트는 추가 수동 게시 요청 없이, final.md 완료 직후 상태 동기화로 웹 반영까지 완료해야 한다.

### Step 5) 종료
- state.json + dashboard.md + 웹 반영 조건 확인 완료 직후 작업을 종료한다.
- 추가 수동 프롬프트를 요구하지 않는다.
