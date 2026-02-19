# Article Team Workflow Rules (v3)

# Article Team Workflow Rules (v3.1)

---

## 0. Core Principle

- Article은 정보 전달이 아니라 구조 설계다.
- 단순 요약을 금지한다.
- 분석적 밀도와 논지의 명확성을 우선한다.
- 독자의 이해 구조를 설계하는 것이 목적이다.
- 모든 기사는 기본적으로 외부 반론 검증을 거친다.

---

## 1. Folder Structure Rule (Mandatory)

모든 기사는 반드시 다음 구조로 생성한다:

article_team/article_###/

상위 article_team 폴더에는 다음만 존재해야 한다:

- workflow_rules.md
- AGENTS.md
- article_### 폴더들

01~07 파일을 상위 폴더에 직접 생성하는 것을 금지한다.

---

## 2. Execution Unit Rule (Very Important)

작업 단위는 항상 하나의 article_### 폴더이다.

작업 시작 전 반드시 명시한다:

"Working on article_###"

다른 article_### 폴더 접근 금지.

---

## 3. Standard File Structure (v3.1)

각 article_### 폴더에는 다음 파일이 존재해야 한다:

01_brief.md
02_research.md
02b_rebuttal_analysis.md
03_structural_depth.md
04_structure.md
05_draft_v1.md
06_fact_check.md
07_final.md

---

## 4. Production Order (Strict Order)

1. 01_brief.md 읽기
2. 02_research.md 생성 (Multi-layer Research)
3. 02b_rebuttal_analysis.md 생성 (Rebuttal Specialized Mode — DEFAULT)
4. 03_structural_depth.md 생성
5. 04_structure.md 설계
6. 05_draft_v1.md 작성
7. 06_fact_check.md 검증
8. 07_final.md 작성

단계 건너뛰기 금지.

---

## 5. Research Rule (Multi-Layer)

02_research.md는 다음 구조를 따른다:

1. Trend Scan
2. Case Studies
3. Counter Perspective
4. Data & Evidence
5. Structural Insight

단순 요약 금지.

---

## 6. Rebuttal Specialized Mode Rule (DEFAULT)

02b_rebuttal_analysis.md는 모든 기사에서 필수이다.

목적:
- 외부 세계 기반 반론 수집
- 실패 사례 탐색
- 위험 요소 분석
- 과장 감지

이 단계 없이 Structural Depth로 진행 금지.

---

## 7. Structural Depth Rule

03_structural_depth.md는 반드시 다음 파일을 참조한다:

- 01_brief.md
- 02_research.md
- 02b_rebuttal_analysis.md

수행 내용:
- 논리 공백 진단
- 반론 시뮬레이션
- 구조적 확장
- 과장 제거

---

## 8. Draft Rule

- 반론 반영 필수
- 과장 금지
- 장식적 문장 최소화
- 구조 기반 서술

---

## 9. Fact Integrity Rule

- 모든 주장 리스트화
- 출처 매핑
- 검증 불가 문장 표시
- 과장 수정

---

## 10. Finalization Rule

07_final.md는:

- 논리적 일관성
- 반론 반영
- 과도한 단정 제거
- 분석 밀도 유지
- 정보 나열 금지

---

## 11. Notion Publishing Rule

특정 article_### 폴더의 07_final.md가 완료되면:

- 해당 article_### 폴더명을 페이지 제목으로 사용한다.
- Notion의 "Published Articles" 페이지 하위에 새 페이지를 생성한다.
- 본문에는 07_final.md 전체 내용을 삽입한다.
- 생성된 페이지 URL을 state.json에 저장한다.

---

## 12. CMS Publish Rule (Unified DB)

사용자가 다음과 같이 입력하면:

"article_### final 완료. 게시해줘."

다음 절차를 수행한다:

1. 해당 article_### 폴더의 07_final.md를 읽는다.
2. 단어 수를 계산한다.
3. 3~4줄 요약을 생성한다.
4. Notion의 "Content Master DB"에 새 항목을 생성한다.
5. 필드를 다음과 같이 설정한다:

   Title = article_### 폴더명
   Type = Article
   Status = Published
   Slug = article_### 폴더명
   Published Date = 오늘 날짜
   Project Path = 해당 로컬 경로
   Word Count = 계산된 값
   Summary = 자동 생성 요약

6. 07_final.md 전체 내용을 페이지 본문에 삽입한다.
7. 생성된 Notion URL을 ops_dashboard/state.json에 저장한다.
8. dashboard를 갱신한다.
