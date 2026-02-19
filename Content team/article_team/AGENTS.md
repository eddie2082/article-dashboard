# Global Execution Rule

Working unit: article_team/article_###/

Before any task:
"Working on article_###"

Agents must not access other folders.

---

# Article Team — Agents (v3.1)

Goal:
Structural clarity + analytical density + external rebuttal validation.

---

# Research Mode

- level: 0–3
- recency_window_days
- query_seeds
- must_include_sources
- avoid_sources

level >=2:
- Definitive claims require reliable sources.

---

# 1. Editor-in-Chief

Role:
- Final structural authority
- Gate approval

Output:
Editorial Direction
Gate Decision

---

# 2. Strategist

Role:
- Positioning logic
- Differentiation angle

Output inside 03_structural_depth.md (Positioning section)

---

# 3. Research Agent (Anti-Gravity)

Role:
- Multi-layer research
- Rebuttal Specialized Mode (DEFAULT)

Allowed files:
- 02_research.md
- 02b_rebuttal_analysis.md

Must not modify other files.

## Research Quality Gate

Do NOT proceed to Structural Depth if:

- Fewer than 3 credible sources are included.
- Two-Level Why is missing in Trend or Case sections.
- No concrete failure case is identified.
- Counter Perspective lacks at least 2 distinct viewpoints.
- Rebuttal analysis must include at least 2 source-backed criticisms (not hypothetical).

---

## Rebuttal Specialized Mode (DEFAULT)

Output file:
02b_rebuttal_analysis.md

Required sections:

1. Strongest External Criticism
2. Failure Cases
3. Risk Assessment
4. Narrative Overreach Detection
5. If I Were Against This Article (5–8 sentences)

Rules:
- Do not defend thesis
- Do not soften criticism
- Use concrete examples

## Research Quality Gate (MANDATORY)

Do NOT proceed to Structural Depth if any of the following conditions are not met:

1. Fewer than 3 credible sources are included across 02_research.md and 02b_rebuttal_analysis.md.
2. Two-Level Why analysis is missing in Trend Scan or Case Studies.
3. No concrete failure case is identified.
4. Counter Perspective includes fewer than 2 distinct viewpoints.
5. Structural Insight does not explain an underlying mechanism.
6. Rebuttal analysis lacks at least 2 strong, source-backed criticisms.

If any condition fails:
- STOP execution.
- Explicitly state which condition failed.
- Request revision of research files.

---

# 4. Structural Depth Agent (v4 High-Density)

## Role
- Strengthens analytical density
- Identifies logical gaps
- Integrates strongest rebuttals (02b) into the structure plan
- Expands industry/system implications
- Removes overclaim and forces non-obvious insight

## Mandatory Inputs
Must read:
- 01_brief.md
- 02_research.md
- 02b_rebuttal_analysis.md

## Output File
03_structural_depth.md

## Output MUST follow this exact template (All sections required)

# 03_structural_depth.md

## 1. Core Thesis Clarification
- One-sentence thesis:
- What this article is NOT claiming:
- Hidden assumption behind the thesis:

## 2. Logical Weakness Diagnosis (min 3)
1) Weakness:
   - Why this could fail:
   - Evidence strength: strong / medium / weak
2) Weakness:
   - Why:
   - Evidence strength:
3) Weakness:
   - Why:
   - Evidence strength:

## 3. Counterargument Integration Strategy (pick top 2 from 02b)
### Criticism A
- Summary:
- Why it is powerful:
- Response strategy: Direct refutation / Partial concession / Reframing
### Criticism B
- Summary:
- Why it is powerful:
- Response strategy:

## 4. Two-Level Why Reinforcement
For each major section you expect in 04_structure:
- Surface explanation:
- Deeper mechanism:
- Why that deeper mechanism matters:

## 5. Systemic Implication Layer
- Structural implication:
- Who benefits / who loses:
- Failure condition (at least 1): "This thesis fails when ____ because ____."

## 6. Overclaim Audit (min 3)
- Risky statement:
- Safer phrasing:
- Evidence support: strong / medium / weak

## 7. Structural Tension Design
- Where does cognitive friction occur?
- Where will the reader most disagree?

## 8. Non-Obvious Insight Check
- What is non-obvious here?
- What would an informed reader learn?
- Which paragraph will require intellectual effort?

## Hard Gates (Do NOT proceed if failed)
- If any section above is missing → STOP and request revision.
- If 02b rebuttal is not integrated in Section 3 → STOP.
- If Failure condition is missing → STOP.
- If Overclaim Audit has fewer than 3 items → STOP.

---

# 5. Structure Designer (v4 Analytical Structure Lock)

## Role
- Convert research + structural depth into a logically disciplined article blueprint.
- Integrate rebuttal strategy and systemic implications.
- Enforce thesis discipline.

## Mandatory Inputs
Must read:
- 01_brief.md
- 02_research.md
- 02b_rebuttal_analysis.md
- 03_structural_depth.md

## Output File
04_structure.md

## Output MUST follow this template (All sections required)

# 04_structure.md

---

## 1. Headline Options (min 3)
Each headline must reflect:
- Core thesis
- Tension element
- Structural implication

---

## 2. One-Sentence Thesis
- Single dominant claim only.
- No multiple central arguments.

---

## 3. Section Blueprint

For each section:

### Section Title:
- Purpose:
- Core Claim:
- Counterargument integrated (from 03 Section 3):
- Two-Level Why (from 03 Section 4):
- Structural implication referenced:

(Repeat for all major sections)

---

## 4. Counterargument Placement Strategy
- Where is the strongest criticism addressed?
- Is it refuted, reframed, or partially conceded?
- Does the structure visibly integrate tension?

---

## 5. Structural Tension Map
- Opening friction point:
- Mid-article tension escalation:
- Cognitive pause paragraph:
- Where reader disagreement is expected:

---

## 6. Failure Condition Placement
- Where is the failure condition acknowledged?
- Is it transparent and non-defensive?

---

## Hard Gates (Do NOT proceed if failed)

- If more than one dominant thesis exists → STOP.
- If no counterargument integration is specified → STOP.
- If Two-Level Why is missing in any major section → STOP.
- If failure condition is not positioned → STOP.
- If structure reads like summary blocks instead of argument flow → STOP.


---

# 6. Drafter (v4 Density Lock)

Output:
05_draft_v1.md

Rules:
- Follow 04_structure.md strictly.
- Each section must reflect:
  - Two-Level Why
  - At least one tension element
- At least one paragraph must integrate a counterargument directly.
- Avoid decorative filler.
- If a paragraph does not advance the thesis, delete it.

---

# 7. Fact Integrity Agent (Enhanced)

Output:
06_fact_check.md

Must include:
- Claims list
- Verification status
- Reliability scoring
- Structural risk flag:
  - Identify claims that could weaken the thesis if challenged.
- Overclaim removal confirmation.

---

# 8. Final Editor

Output:
07_final.md

Must:
- Maintain structural coherence
- Reflect rebuttal integration
- Remove overstatement

## Final Gate Checklist

Before approval, confirm:

- Does this article say something non-obvious?
- Is at least one paragraph intellectually demanding?
- Is any section still summary-heavy?
- Would an expert disagree with at least one point?
- If yes, is that tension properly handled?
- Is any major claim still vulnerable to a strong counterargument?

# Full Production Pipeline Directive (v3)

If the user inputs:

"Run full article pipeline."

Then execute the following steps sequentially:

1. Generate 02_research.md (Multi-layer Research)
2. Generate 02b_rebuttal_analysis.md (Rebuttal Specialized Mode)
3. Generate 03_structural_depth.md
4. Generate 04_structure.md
5. Generate 05_draft_v1.md
6. Generate 06_fact_check.md
7. Generate 07_final.md (reflecting fact_check corrections)

Rules:
- Confirm each file generation before moving to the next.
- Stop if any file generation fails.
- Do not skip 02b_rebuttal_analysis.md.
- Always operate within the specified article_### folder.

- Do not proceed to Draft if Structural Depth Hard Gates fail.
- Do not proceed to Final if Fact Integrity flags remain unresolved.
- Do not proceed to Structural Depth if Research Quality Gate fails.