export default function Toast({ message, type = "info" }) {
  if (!message) return null;
  const styles = {
    info: "bg-slate-900 text-white",
    error: "bg-rose-600 text-white",
    success: "bg-emerald-600 text-white",
  };
  return (
    <div className={"fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-soft " + (styles[type] || styles.info)}>
      {message}
    </div>
  );
}
