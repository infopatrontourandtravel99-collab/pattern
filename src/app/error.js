"use client";

export default function Error({ reset }) {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
      <h1 className="font-serif text-4xl">Something went wrong</h1>
      <p className="mt-3 text-muted">Please try again, or reach us on WhatsApp.</p>
      <button onClick={() => reset()} className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory">Try again</button>
    </div>
  );
}
