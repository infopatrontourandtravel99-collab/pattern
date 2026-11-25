// Shown instantly while an admin page loads its data.
export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse" role="status" aria-label="Loading">
      <div className="h-8 w-44 rounded-lg bg-slate-200" />
      <div className="mt-3 h-4 w-72 max-w-full rounded bg-slate-200" />
      <div className="mt-6 h-80 rounded-3xl border border-line bg-white" />
    </div>
  );
}
