import { useMemo, useState } from "react";
import "./pixel.css";

const TILE = 24;

// 좌표(타일 기준)로 룸 배치: 진짜 던전 맵 느낌
const AGENTS = [
  { id: "strategist", name: "Strategist", role: "목적/독자/전략", x: 2, y: 2 },
  { id: "research", name: "Research", role: "자료/출처", x: 7, y: 2 },
  { id: "architect", name: "Structure", role: "구조/목차", x: 12, y: 2 },

  { id: "drafter", name: "Drafter", role: "초안", x: 2, y: 8 },
  { id: "skeptic", name: "Skeptic", role: "반박/약점", x: 7, y: 8 },
  { id: "fact", name: "Fact-check", role: "팩트 검증", x: 12, y: 8 },

  { id: "editor", name: "Editor", role: "최종 편집", x: 7, y: 14 },
];

function biome(status = "unknown") {
  const s = (status || "").toLowerCase();
  if (s === "published" || s === "completed") return { label: "TREASURE", cls: "qTreasure" };
  if (s === "reviewing") return { label: "FOG", cls: "qFog" };
  if (s === "draft") return { label: "CAVE", cls: "qCave" };
  if (s === "blocked") return { label: "TRAP", cls: "qTrap" };
  if (s === "archived") return { label: "RUINS", cls: "qRuins" };
  return { label: "UNKNOWN", cls: "" };
}

function recommend(status = "unknown") {
  const s = (status || "").toLowerCase();
  if (s === "draft") return "→ Research/Structure 진행";
  if (s === "reviewing") return "→ Skeptic/Fact-check → Editor";
  if (s === "blocked") return "→ Blocker 해결(출처/논리/범위)";
  if (s === "published" || s === "completed") return "→ 파생 콘텐츠 생성(옵션)";
  return "→ Brief 확인";
}

function Corridor({ from, to }) {
  const x1 = from.x * TILE + 40;
  const y1 = from.y * TILE + 28;
  const x2 = to.x * TILE + 40;
  const y2 = to.y * TILE + 28;

  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  const width = Math.max(6, Math.abs(x2 - x1));
  const height = Math.max(6, Math.abs(y2 - y1));

  return <div className="corridor" style={{ left, top, width, height }} />;
}

export default function DungeonBoard({ projects = [], lastUpdated = "" }) {
  const [selectedRoom, setSelectedRoom] = useState(AGENTS[0]);
  const [selectedQuest, setSelectedQuest] = useState(null);

  const quests = useMemo(() => {
    return (projects || []).slice(0, 12).map((p, i) => {
      const b = biome(p.status);
      return {
        id: `${p.type || "unknown"}-${p.name || p.slug || i}`,
        title: p.title || p.name || p.slug || "Untitled",
        type: (p.type || "unknown").toUpperCase(),
        status: (p.status || "unknown").toUpperCase(),
        updated: p.updated_at || p.last_updated || "",
        notion: p.notion_url || "",
        wordCount: p.word_count || 0,
        biome: b,
      };
    });
  }, [projects]);

  const playerX = (selectedRoom?.x ?? 7) * TILE + 18;
  const playerY = (selectedRoom?.y ?? 14) * TILE + 18;

  return (
    <div className="crt">
      <div className="container">
        <div className="hudbar px-panel">
          <div>
            <div className="px-title">AI AGENT DUNGEON BOARD</div>
            <div className="px-sub">8-bit mode • Last updated: {lastUpdated || "-"}</div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="badge">RPG • DUNGEON</span>
          </div>
        </div>

        <div className="grid2">
          {/* MAP */}
          <div className="px-panel">
            <div style={{ padding: 12, borderBottom: "2px solid var(--line)" }}>
              <div className="px-title" style={{ fontSize: 12 }}>DUNGEON MAP</div>
              <div className="px-sub">Click rooms to move the operator</div>
            </div>

            <div className="map">
              <div className="mapGrid" />
              
              {/* torches (decor) */}
<div className="torch" style={{ left: 24, top: 24 }} />
<div className="torch" style={{ left: 24, top: 340 }} />

{/* door (decor) */}
<div className="door" style={{ left: 12 * 24, top: 15 * 24 }} />


              {/* corridors */}
              <Corridor from={AGENTS[0]} to={AGENTS[2]} />
              <Corridor from={AGENTS[3]} to={AGENTS[5]} />
              <Corridor from={AGENTS[1]} to={AGENTS[6]} />

              {/* rooms */}
              {AGENTS.map((a) => (
                <div
                  key={a.id}
                  className={`room ${selectedRoom?.id === a.id ? "roomSelected" : ""}`}
                  style={{ left: `${a.x * TILE}px`, top: `${a.y * TILE}px` }}
                  onClick={() => { setSelectedRoom(a); setSelectedQuest(null); }}
                  title={`${a.name} • ${a.role}`}
                >
                  <div className="roomName">{a.name}</div>
                  <div className="roomRole">{a.role}</div>
                </div>
              ))}

              {/* player */}
              <div className="player" style={{ left: playerX, top: playerY }} title="Operator">
                <img src="/operator_pixel.svg" alt="operator" />
              </div>
            </div>

            <div className="inspector">
              <div className="px-title" style={{ fontSize: 12 }}>INSPECTOR</div>
              <div className="hr" />

              {!selectedQuest ? (
                <>
                  <div style={{ fontWeight: 900 }}>{selectedRoom.name}</div>
                  <div className="muted">{selectedRoom.role}</div>
                  <div className="hr" />
                  <div className="muted">Quick prompts</div>
                  <div className="mono">{`"${selectedRoom.name} 역할로 현재 프로젝트를 점검해줘."
"다음 단계 파일을 workflow_rules 순서대로 갱신해줘."`}</div>
                </>
              ) : (
                <>
                  <div style={{ fontWeight: 900 }}>{selectedQuest.title}</div>
                  <div className="muted">{selectedQuest.type} • {selectedQuest.status} • {selectedQuest.biome.label}</div>
                  <div className="hr" />
                  <div className="muted">Next action</div>
                  <div className="mono">{recommend(selectedQuest.status)}</div>
                  <div className="hr" />
                  <div className="muted">Meta</div>
                  <div className="mono">{`Updated: ${selectedQuest.updated || "-"}
Word count: ${selectedQuest.wordCount || 0}`}</div>
                  <div className="hr" />
                  <div className="muted">Links</div>
                  {selectedQuest.notion ? (
                    <a href={selectedQuest.notion} target="_blank" rel="noreferrer">Open in Notion →</a>
                  ) : (
                    <div className="muted">No Notion URL yet.</div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* QUESTS */}
          <div className="px-panel">
            <div style={{ padding: 12, borderBottom: "2px solid var(--line)" }}>
              <div className="px-title" style={{ fontSize: 12 }}>QUEST LOG</div>
              <div className="px-sub">Projects as quests (click to inspect)</div>
            </div>

            <div className="questList">
              {quests.length === 0 ? (
                <div className="muted">No projects found in state.json</div>
              ) : (
                quests.map((q) => (
                  <button
                    key={q.id}
                    className={`btn quest ${q.biome.cls} ${selectedQuest?.id === q.id ? "btn-on" : ""}`}
                    onClick={() => { setSelectedQuest(q); setSelectedRoom(null); }}
                  >
                    <div className="questTop">
                      <span className="questTitle">{q.title}</span>
                      <span className="badge">{q.type}</span>
                    </div>
                    <div className="questMeta">
                      {q.status} • {q.biome.label} • {q.updated || "-"}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}