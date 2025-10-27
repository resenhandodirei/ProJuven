"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="h-8 w-8 border-4 border-[var(--golden)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
