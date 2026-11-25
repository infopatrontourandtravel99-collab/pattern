"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Check, ChevronDown, ImageIcon, Plus, Trash2, Upload } from "lucide-react";

const inputCls = "mt-1.5 w-full rounded-lg border border-[#d5dbe5] bg-white px-3.5 py-2.5 text-sm font-normal text-[#1c2a3a] outline-none transition focus:border-[#14284b] focus:ring-3 focus:ring-[#14284b]/10";
const iconBtn = "flex h-9 w-9 items-center justify-center rounded-lg text-[#5b6779] transition hover:bg-slate-100 hover:text-[#14284b] disabled:pointer-events-none disabled:opacity-30";

// A change is either a new value or a function of the current value.
const apply = (change, prev) => (typeof change === "function" ? change(prev) : change);
const isWide = (f) => !f.half;

let counter = 0;
const newId = () => `item-${++counter}`;

// Shrinks a photo in the browser (max 1600px, WebP) so it uses far less database space.
async function compress(file) {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d").drawImage(bmp, 0, 0, w, h);
    const blob = await new Promise((r) => canvas.toBlob(r, "image/webp", 0.8));
    return blob && blob.size < file.size ? new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", { type: "image/webp" }) : file;
  } catch {
    return file;
  }
}

function ImageField({ value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function pick(e) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", await compress(file));
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (res.ok) onChange(j.url, true);
      else setErr(j.error || "Upload failed. Try again.");
    } catch {
      setErr("Upload failed. Check your internet connection and try again.");
    }
    setBusy(false);
    input.value = "";
  }

  return (
    <div className="mt-1.5 flex flex-col gap-3 rounded-xl border border-dashed border-[#c9d1de] bg-[#f7f9fc] p-3 sm:flex-row sm:items-center">
      <div className="flex aspect-[16/10] w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-[#9aa5b5] sm:w-44">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value ? <img src={value} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <ImageIcon size={28} aria-label="No photo yet" />}
      </div>
      <div className="min-w-0 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#d5dbe5] bg-white px-3.5 py-2 font-medium text-[#14284b] transition focus-within:ring-3 focus-within:ring-[#14284b]/20 hover:border-[#14284b]">
            <Upload size={16} />
            {busy ? "Uploading…" : value ? "Change photo" : "Upload photo"}
            <input type="file" accept="image/*" className="sr-only" onChange={pick} disabled={busy} />
          </label>
          {value && (
            <button type="button" onClick={() => onChange("")} className="rounded-lg px-3 py-2 font-medium text-red-600 hover:bg-red-50">
              Remove
            </button>
          )}
        </div>
        <p className="mt-2 text-xs font-normal text-[#6b7688]">A new photo is saved as soon as it uploads.</p>
        {err && <p role="alert" className="mt-1 font-normal text-red-600">{err}</p>}
      </div>
    </div>
  );
}

// Edits an array of strings as comma-separated text or one-per-line text.
function TextList({ value, onChange, sep, rows }) {
  const list = Array.isArray(value) ? value : [];
  const splitter = sep === "lines" ? "\n" : ",";
  const joiner = sep === "lines" ? "\n" : ", ";
  const parse = (t) => t.split(splitter).map((x) => x.trim()).filter(Boolean);
  const [text, setText] = useState(list.join(joiner));
  useEffect(() => {
    if (JSON.stringify(parse(text)) !== JSON.stringify(list)) setText(list.join(joiner));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const change = (t) => {
    setText(t);
    onChange(parse(t));
  };
  return rows > 1 ? (
    <textarea rows={rows} className={inputCls} value={text} onChange={(e) => change(e.target.value)} />
  ) : (
    <input className={inputCls} value={text} onChange={(e) => change(e.target.value)} />
  );
}

const blankItem = (fields) =>
  Object.fromEntries(
    fields.map((f) => [f.name, ["list", "csv", "lines"].includes(f.type) ? [] : f.type === "select" ? f.options[0].value : ""]),
  );

// A list of cards. Only the opened cards render their inputs, which keeps long lists quick.
function ListField({ field, value, onChange }) {
  const list = value ?? [];
  const idsRef = useRef([]);
  while (idsRef.current.length < list.length) idsRef.current.push(newId());
  const ids = idsRef.current;
  const [open, setOpen] = useState(() => new Set());
  const noun = field.itemName || "item";
  const imageName = field.items.find((f) => f.type === "image")?.name;

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  // Looks the item up by id when the change arrives, so an upload finishing after a reorder lands on the right card.
  const setItem = (id, name, change, commit) =>
    onChange((current) => {
      const index = idsRef.current.indexOf(id);
      return (current ?? []).map((it, i) => (i === index ? { ...it, [name]: apply(change, it[name]) } : it));
    }, commit);

  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= list.length) return;
    const nextIds = [...idsRef.current];
    [nextIds[i], nextIds[j]] = [nextIds[j], nextIds[i]];
    idsRef.current = nextIds;
    onChange((current) => {
      const c = [...current];
      [c[i], c[j]] = [c[j], c[i]];
      return c;
    });
  };

  const remove = (i, title) => {
    if (!confirm(`Delete "${title}"? It is removed from the website after you save.`)) return;
    idsRef.current = idsRef.current.filter((_, idx) => idx !== i);
    onChange((current) => current.filter((_, idx) => idx !== i));
  };

  const add = () => {
    const id = newId();
    idsRef.current = [...idsRef.current.slice(0, list.length), id];
    setOpen((prev) => new Set(prev).add(id));
    onChange((current) => [...(current ?? []), blankItem(field.items)]);
  };

  return (
    <div className="mt-2 space-y-3">
      {list.map((item, i) => {
        const id = ids[i];
        const isOpen = open.has(id);
        const title = item[field.itemLabel] || `New ${noun}`;
        const meta = field.itemMeta && item[field.itemMeta];
        return (
          <div key={id} className={`overflow-hidden rounded-xl border bg-white transition-colors ${isOpen ? "border-[#14284b]/40 shadow-md" : "border-[#e1e6ee]"}`}>
            <div className="flex items-center gap-1 pr-2">
              <button type="button" onClick={() => toggle(id)} aria-expanded={isOpen} className="flex min-w-0 flex-1 items-center gap-3 p-3 text-left">
                <ChevronDown size={18} className={`shrink-0 text-[#6b7688] transition-transform ${isOpen ? "" : "-rotate-90"}`} />
                {imageName && (
                  <span className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#eef1f6] text-[#9aa5b5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {item[imageName] ? <img src={item[imageName]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : <ImageIcon size={18} />}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-[#14284b]">{title}</span>
                  {meta && <span className="block truncate text-xs font-normal text-[#6b7688]">{meta}</span>}
                </span>
              </button>
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${title} up`} title="Move up" className={iconBtn}><ArrowUp size={16} /></button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === list.length - 1} aria-label={`Move ${title} down`} title="Move down" className={iconBtn}><ArrowDown size={16} /></button>
              <button type="button" onClick={() => remove(i, title)} aria-label={`Delete ${title}`} title="Delete" className={`${iconBtn} hover:!bg-red-50 hover:!text-red-600`}><Trash2 size={16} /></button>
            </div>
            {isOpen && (
              <div className="grid gap-4 border-t border-[#e1e6ee] p-4 sm:grid-cols-2">
                {field.items.map((f) => (
                  <Labelled key={f.name} field={f} value={item[f.name]} onChange={(v, c) => setItem(id, f.name, v, c)} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      {list.length === 0 && <p className="rounded-xl bg-white p-5 text-sm font-normal text-[#6b7688]">Nothing here yet. Add your first {noun}.</p>}
      <button type="button" onClick={add} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#14284b]/40 px-5 py-3 text-sm font-semibold text-[#14284b] transition hover:border-[#14284b] hover:bg-white">
        <Plus size={17} /> Add {noun}
      </button>
    </div>
  );
}

function Field({ field, value, onChange }) {
  if (field.type === "csv") return <TextList value={value} onChange={onChange} sep="csv" rows={1} />;
  if (field.type === "lines") return <TextList value={value} onChange={onChange} sep="lines" rows={5} />;
  if (field.type === "number")
    return <input type="number" min="0" className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} />;
  if (field.type === "select")
    return (
      <select className={inputCls} value={value || field.options[0].value} onChange={(e) => onChange(e.target.value)}>
        {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    );
  if (field.type === "image") return <ImageField value={value} onChange={onChange} />;
  if (field.type === "list") return <ListField field={field} value={value} onChange={onChange} />;
  if (field.type === "textarea")
    return <textarea rows={4} className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  return <input className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
}

// Image and list fields contain buttons, so they must not sit inside a <label>.
function Labelled({ field, value, onChange }) {
  const Tag = ["image", "list"].includes(field.type) ? "div" : "label";
  return (
    <Tag className={`block min-w-0 text-sm font-medium text-[#33415a] ${isWide(field) ? "sm:col-span-2" : ""}`}>
      {field.label}
      <Field field={field} value={value} onChange={onChange} />
    </Tag>
  );
}

export default function SectionEditor({ sectionKey, fields, initial }) {
  const [data, setData] = useState(initial);
  const dataRef = useRef(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [state, setState] = useState({ busy: false, error: "" });
  const dirty = JSON.stringify(data) !== saved;

  // Warn before closing or reloading the tab with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function save(payload = dataRef.current) {
    setState({ busy: true, error: "" });
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: sectionKey, data: payload }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) return setState({ busy: false, error: j.error || "Save failed. Try again." });
      setSaved(JSON.stringify(payload));
      setState({ busy: false, error: "" });
    } catch {
      setState({ busy: false, error: "Save failed. Check your internet connection and try again." });
    }
  }

  function change(name, next, commit) {
    const updated = { ...dataRef.current, [name]: apply(next, dataRef.current[name]) };
    dataRef.current = updated;
    setData(updated);
    if (commit) save(updated);
  }

  const lists = fields.filter((f) => f.type === "list");
  const simple = fields.filter((f) => f.type !== "list");

  return (
    <div className="mt-6">
      {simple.length > 0 && (
        <div className="grid gap-5 rounded-2xl border border-[#e1e6ee] bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-7">
          {simple.map((f) => (
            <Labelled key={f.name} field={f} value={data[f.name]} onChange={(v, c) => change(f.name, v, c)} />
          ))}
        </div>
      )}
      {lists.map((f) => (
        <section key={f.name} aria-label={f.label}>
          <h2 className="text-sm font-semibold text-[#33415a]">
            {f.label} <span className="font-normal text-[#6b7688]">({data[f.name]?.length ?? 0})</span>
          </h2>
          <ListField field={f} value={data[f.name]} onChange={(v, c) => change(f.name, v, c)} />
        </section>
      ))}

      <div className="sticky bottom-3 z-20 mt-6 flex items-center justify-between gap-4 rounded-2xl border border-[#e1e6ee] bg-white/95 py-3 pl-5 pr-3 shadow-[0_12px_32px_-12px_rgba(20,40,75,0.35)] backdrop-blur">
        <p role="status" className={`min-w-0 text-sm ${state.error ? "text-red-600" : dirty ? "text-[#8a6420]" : "text-green-700"}`}>
          {state.error ? state.error : state.busy ? "Saving your changes…" : dirty ? "You have unsaved changes" : (
            <span className="inline-flex items-center gap-1.5"><Check size={16} /> All changes saved</span>
          )}
        </p>
        <button type="button" onClick={() => save()} disabled={state.busy || (!dirty && !state.error)} className="shrink-0 rounded-xl bg-[#14284b] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d1d38] disabled:opacity-40">
          {state.busy ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
