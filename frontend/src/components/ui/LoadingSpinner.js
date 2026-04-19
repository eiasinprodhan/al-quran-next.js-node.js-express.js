export default function LoadingSpinner({ message = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <span className="relative flex h-12 w-12">
        <span className="absolute inset-0 rounded-full border-4 border-emerald-100" />
        <span className="absolute inset-0 rounded-full border-4 border-t-emerald-600 border-transparent animate-spin" />
      </span>
      {message && (
        <p className="text-sm text-stone-400 tracking-wide">{message}</p>
      )}
    </div>
  );
}