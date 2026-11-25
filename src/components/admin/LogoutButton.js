"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton({ className = "", compact = false }) {
  const router = useRouter();
  return (
    <button
      type="button"
      aria-label={compact ? "Log out" : undefined}
      className={className}
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
      }}
    >
      <LogOut size={18} aria-hidden="true" /> {!compact && "Log out"}
    </button>
  );
}
