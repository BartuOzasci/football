import { useAuth } from "../../hooks/useAuth"
import Container from "./Container"

export default function Navbar() {
  const { user, logout } = useAuth()
  const teamLabel = user?.theme === "fenerbahce" ? "Fenerbahçe Teması" : "Beşiktaş Teması"

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-white/45 backdrop-blur-xl">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <img src="/img/icon/logo.png" alt="Futbol Site Logo" className="h-10 w-10 rounded-full object-contain shadow-sm" />
          <div>
            <p className="font-display text-lg font-semibold text-primary drop-shadow-sm md:text-2xl">
              Futbol Lobisine Hoş geldin {user?.name}
            </p>
            <span className="mt-1 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-bold tracking-wide text-primary">
              {teamLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={logout}
            className="btn-neon rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-secondary"
          >
            Çıkış
          </button>
        </div>
      </Container>
    </header>
  )
}
