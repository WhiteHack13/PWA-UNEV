export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-soft" />
      <div className="leading-tight">
        <div className="font-extrabold tracking-tight">Anime Quiz Pro</div>
        <div className="text-xs text-slate-500">Prepárate para la aventura</div>
      </div>
    </div>
  );
}
