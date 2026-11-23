import Button from "@/components/common/Button";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold-dark">404</p>
      <h1 className="mt-3 font-serif text-5xl">This path leads nowhere</h1>
      <p className="mt-4 max-w-md text-muted">The page you are looking for may have moved. Let us guide you back.</p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Back to Home</Button>
        <Button href="/kashmir-tour-packages" variant="outline">View Packages</Button>
      </div>
    </div>
  );
}
