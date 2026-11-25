"use client";
import { useEffect, useState } from "react";

const inputCls = "mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#14284b]";

function ImageField({ value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function pick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const j = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) onChange(j.url, true);
    else setErr(j.error || "Upload failed");
    e.target.value = "";
  }

  return (
    <div className="mt-1 flex items-center gap-4">
      <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-slate-50 text-xs text-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : "No image"}
      </div>
      <div className="min-w-0 text-sm">
        <label className="inline-block cursor-pointer rounded-full border border-line bg-white px-4 py-2 font-medium hover:bg-slate-50">
          {busy ? "Uploading…" : value ? "Change image" : "Upload image"}
          <input type="file" accept="image/*" className="hidden" onChange={pick} disabled={busy} />
        </label>
        {value && (
          <button type="button" onClick={() => onChange("")} className="ml-3 text-red-600 hover:underline">
            Remove
          </button>
        )}
        {err && <p className="mt-1 text-red-600">{err}</p>}
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

function Field({ field, value, onChange }) {
  if (field.type === "csv") return <TextList value={value} onChange={onChange} sep="csv" rows={1} />;
  if (field.type === "lines") return <TextList value={value} onChange={onChange} sep="lines" rows={5} />;
  if (field.type === "number")
    return <input type="number" min="0" className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} />;
  if (field.type === "image") return <ImageField value={value} onChange={onChange} />;
  if (field.type === "textarea")
    return <textarea rows={4} className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  if (field.type === "list") {
    const list = value ?? [];
    const blank = Object.fromEntries(field.items.map((f) => [f.name, ["list", "csv", "lines"].includes(f.type) ? [] : ""]));
    const setItem = (i, k, v, c) => onChange(list.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)), c);
    const move = (i, d) => {
      const j = i + d;
      if (j < 0 || j >= list.length) return;
      const c = [...list];
      [c[i], c[j]] = [c[j], c[i]];
      onChange(c);
    };
    return (
      <div className="mt-2 space-y-4">
        {list.map((item, i) => (
          <div key={i} className="rounded-2xl border border-line bg-slate-50 p-4">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#14284b]">
              <span>{item[field.itemLabel] || `Item ${i + 1}`}</span>
              <span className="flex gap-3 text-xs font-medium">
                <button type="button" onClick={() => move(i, -1)} className="hover:underline">Up</button>
                <button type="button" onClick={() => move(i, 1)} className="hover:underline">Down</button>
                <button type="button" onClick={() => confirm("Delete this item?") && onChange(list.filter((_, idx) => idx !== i))} className="text-red-600 hover:underline">Delete</button>
              </span>
            </div>
            <div className="space-y-3">
              {field.items.map((f) => (
                <label key={f.name} className="block text-sm font-medium">
                  {f.label}
                  <Field field={f} value={item[f.name]} onChange={(v, c) => setItem(i, f.name, v, c)} />
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...list, blank])} className="rounded-full border border-dashed border-[#14284b] px-5 py-2 text-sm font-medium text-[#14284b] hover:bg-white">
          + Add new
        </button>
      </div>
    );
  }
  return <input className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
}

export default function SectionEditor({ sectionKey, fields, initial }) {
  const [data, setData] = useState(initial);
  const [state, setState] = useState({ busy: false, msg: "", ok: true });

  async function save(payload = data) {
    setState({ busy: true, msg: "", ok: true });
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: sectionKey, data: payload }),
    });
    const j = await res.json().catch(() => ({}));
    setState(res.ok ? { busy: false, msg: "Saved. Website updated.", ok: true } : { busy: false, msg: j.error || "Save failed", ok: false });
  }

  return (
    <div className="mt-6 space-y-5 rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-7">
      {fields.map((f) => (
        <div key={f.name}>
          <label className="block text-sm font-semibold text-[#1c2a3a]">{f.label}</label>
          <Field field={f} value={data[f.name]} onChange={(v, c) => { const next = { ...data, [f.name]: v }; setData(next); if (c) save(next); }} />
        </div>
      ))}
      <div className="flex items-center gap-4 border-t border-line pt-5">
        <button onClick={() => save()} disabled={state.busy} className="rounded-full bg-[#14284b] px-7 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
          {state.busy ? "Saving…" : "Save changes"}
        </button>
        {state.msg && <span className={`text-sm ${state.ok ? "text-green-700" : "text-red-600"}`}>{state.msg}</span>}
      </div>
    </div>
  );
}
