export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none backdrop-blur-md transition focus:border-secondary focus:ring-2 focus:ring-secondary/40 ${className}`}
      {...props}
    />
  )
}
