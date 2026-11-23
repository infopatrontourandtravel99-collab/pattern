"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import EnquiryForm from "./EnquiryForm";

// Popup enquiry form. Rendered in a portal so the header's backdrop blur cannot clip it.
export default function EnquiryModal({ open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label="Get in touch" className="relative my-4 w-full max-w-md">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close form"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-sand text-ink transition-colors hover:bg-ink hover:text-white"
        >
          <X size={18} />
        </button>
        <EnquiryForm title="Get in touch" dense />
      </div>
    </div>,
    document.body
  );
}
