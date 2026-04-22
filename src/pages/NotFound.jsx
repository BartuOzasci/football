import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-900 p-4 text-white">
      <div className="text-center">
        <h1 className="font-display text-5xl font-bold">404</h1>
        <p className="mt-3 text-slate-300">Aradığın sayfa bulunamadı.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl border border-white/40 px-5 py-3 font-semibold text-white"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  )
}
