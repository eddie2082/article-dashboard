import { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import dashboardState from "../../state.json";

const essaysFinal = import.meta.glob(
  "../../../Essay_team/Essay_*/final.md",
  { query: "?raw", import: "default", eager: true }
);
const essaysLegacy = import.meta.glob(
  "../../../Essay_team/Essay_*/07_final.md",
  { query: "?raw", import: "default", eager: true }
);

function parseEssay(path, raw) {
  const parts = path.split("/");
  const folder = parts[parts.length - 2];
  const idLower = folder.toLowerCase();

  const titleMatch = typeof raw === "string" ? raw.match(/^#\s+(.+)$/m) : null;
  let title = (titleMatch?.[1] || folder).trim();
  let date = folder.replace("Essay_", "");

  const meta = dashboardState.essays?.find((e) => e.id === idLower);
  if (meta) {
    if (meta.title && meta.title !== "07 Final") title = meta.title;
    if (meta.published_at) date = meta.published_at.split(" ")[0];
  }

  const num = parseInt(folder.split("_")[1] || "0", 10);
  return { id: folder, num, title, raw, date };
}

function stripInternalNotes(md) {
  if (typeof md !== "string") return "";

  const cutMarkers = [
    "Key improvements:",
    "Reinforcement of specific examples",
    "strengthening of logical connections",
    "expansion of practice frame",
  ];

  const lines = md.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (cutMarkers.some((m) => line.includes(m))) {
      return lines.slice(0, i).join("\n").trim();
    }
  }
  return md.trim();
}

function toPlaybackData(raw) {
  const cleaned = stripInternalNotes(raw);
  const titleMatch = cleaned.match(/^#\s+(.+)$/m);
  const title = titleMatch?.[1]?.trim() || "Untitled";

  const body = cleaned.replace(/^#\s+.+$/m, "").trim();
  const lines = body
    .split(/\n\s*\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return { title, lines };
}

export default function App() {
  const items = useMemo(() => {
    const merged = new Map();

    Object.entries(essaysLegacy).forEach(([path, raw]) => {
      const folder = path.split("/").slice(-2)[0];
      merged.set(folder, { path, raw });
    });

    Object.entries(essaysFinal).forEach(([path, raw]) => {
      const folder = path.split("/").slice(-2)[0];
      merged.set(folder, { path, raw });
    });

    return Array.from(merged.values())
      .map(({ path, raw }) => parseEssay(path, raw))
      .filter((x) => typeof x.raw === "string" && x.raw.trim().length > 0)
      .sort((a, b) => b.num - a.num);
  }, []);

  const [selectedId, setSelectedId] = useState(null);
  const [phase, setPhase] = useState("idle");
  const [typedTitle, setTypedTitle] = useState("");
  const [typedBody, setTypedBody] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const panelRef = useRef(null);

  const selected = useMemo(() => {
    return items.find((item) => item.id === selectedId) || null;
  }, [items, selectedId]);

  const playback = useMemo(() => {
    if (!selected) return null;
    return toPlaybackData(selected.raw);
  }, [selected]);

  useEffect(() => {
    if (!selected || !playback) return undefined;

    setPhase("typing_title");
    setTypedTitle("");
    setTypedBody("");
    setLineIndex(0);
    setCharIndex(0);

    return undefined;
  }, [selected, playback]);

  useEffect(() => {
    if (!selected || !playback) return undefined;

    const titleSpeed = 85;
    const bodySpeed = 82;
    const deleteSpeed = 18;
    let timer;

    if (phase === "typing_title") {
      if (typedTitle.length < playback.title.length) {
        timer = setTimeout(() => {
          setTypedTitle(playback.title.slice(0, typedTitle.length + 1));
        }, titleSpeed);
      } else {
        timer = setTimeout(() => setPhase("typing_body"), 250);
      }
    } else if (phase === "typing_body") {
      if (!playback.lines.length) {
        setPhase("pause");
      } else {
        const currentLine = playback.lines[lineIndex] || "";

        if (charIndex < currentLine.length) {
          timer = setTimeout(() => {
            setTypedBody((prev) => prev + currentLine[charIndex]);
            setCharIndex((prev) => prev + 1);
          }, bodySpeed);
        } else if (lineIndex < playback.lines.length - 1) {
          timer = setTimeout(() => {
            setTypedBody((prev) => `${prev}\n\n`);
            setLineIndex((prev) => prev + 1);
            setCharIndex(0);
          }, 140);
        } else {
          setPhase("pause");
        }
      }
    } else if (phase === "pause") {
      timer = setTimeout(() => setPhase("deleting_body"), 5000);
    } else if (phase === "deleting_body") {
      if (typedBody.length > 0) {
        timer = setTimeout(() => {
          setTypedBody((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      } else {
        setPhase("deleting_title");
      }
    } else if (phase === "deleting_title") {
      if (typedTitle.length > 0) {
        timer = setTimeout(() => {
          setTypedTitle((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      } else {
        setPhase("idle");
        setSelectedId(null);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [selected, playback, phase, typedTitle, typedBody, lineIndex, charIndex]);

  useEffect(() => {
    if (phase !== "typing_body") return;
    const panel = panelRef.current;
    if (!panel) return;

    const hasOverflow = panel.scrollHeight > panel.clientHeight + 2;
    if (!hasOverflow) return;

    panel.scrollTo({ top: panel.scrollHeight, behavior: "auto" });
  }, [typedBody, phase]);

  if (!items.length) {
    return (
      <div className="page">
        <div className="archive">
          <h1 className="masthead">Writings</h1>
          <p style={{ opacity: 0.6 }}>
            No essays found. Check essay_###/final.md (or 07_final.md).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="archive">
        <h1 className="masthead">Writings</h1>

        <div className="list">
          {items.map((item) => (
            <div
              key={item.id}
              className="entry"
              onClick={() => setSelectedId(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedId(item.id);
              }}
            >
              <div className="title">{item.title}</div>
              <div className="meta">{item.date}</div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label={selected.title}>
          <div className="overlay-panel" ref={panelRef}>
            <div className="typed-title">
              {typedTitle}
              {phase !== "idle" && <span className="caret" />}
            </div>

            <div className="typed-body">{typedBody}</div>
          </div>
        </div>
      )}
    </div>
  );
}
