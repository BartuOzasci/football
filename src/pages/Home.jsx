import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Card from "../components/common/Card"
import { useAuth } from "../hooks/useAuth"
import Container from "../components/layout/Container"
import Navbar from "../components/layout/Navbar"

const GAME_CARDS = [
  {
    title: "Tic-Tac-Toe Lobisi",
    to: "/tic-tac-toe",
    image: "/img/icon/tic-tac-toe.png",
  },
  {
    title: "Futbolcu Harf Karıştırma",
    to: "/word-shuffle",
    image: "/img/icon/name_mix.png",
  },
]

export default function Home() {
  const { user } = useAuth()
  const teamSubtitle =
    user?.theme === "fenerbahce"
      ? "Sarı lacivert enerjisi aktif"
      : user?.theme === "besiktas"
        ? "Siyah beyaz güç modu aktif"
        : "Takım modu aktif"

  const homeStyles = {
    fenerbahce: {
      main: "bg-[linear-gradient(135deg,_#001e62_0%,_#004999_25%,_#ffed00_100%)]",
      orbA: "bg-yellow-300/45",
      orbB: "bg-blue-600/35",
    },
    besiktas: {
      main: "bg-[linear-gradient(135deg,_#000000_0%,_#1a1a1a_50%,_#ffffff_100%)]",
      orbA: "bg-white/40",
      orbB: "bg-slate-500/35",
    },
    default: {
      main: "bg-[linear-gradient(135deg,_#0f7d2a_0%,_#1ead5c_50%,_#f0fff4_100%)]",
      orbA: "bg-emerald-400/35",
      orbB: "bg-green-200/30",
    },
  }

  const themeStyle = homeStyles[user?.theme] || homeStyles.default

  return (
    <main className={`relative min-h-screen overflow-hidden pb-12 ${themeStyle.main}`}>
      {/* Futbol Sahası Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="field" x="100" y="100" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="200" height="200" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="2" />
              <line x1="100" y1="0" x2="100" y2="200" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#field)" />
        </svg>
      </div>

      {/* Animated Football Orbs */}
      <motion.span
        animate={{ y: [0, -30, 0], x: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`floating-orb left-[-70px] top-[90px] h-44 w-44 rounded-full ${themeStyle.orbA} shadow-[0_20px_60px_rgba(0,0,0,0.3)]`}
      />
      <motion.span
        animate={{ y: [0, 20, 0], x: [10, -10, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className={`floating-orb right-[5%] top-[22%] h-36 w-36 rounded-full ${themeStyle.orbB} shadow-[0_15px_50px_rgba(0,0,0,0.25)]`}
      />

      {/* Floating Football */}
      <motion.div
        animate={{ rotate: 360, y: [0, -40, 0] }}
        transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute right-[15%] top-[60%] h-16 w-16"
      >
        <div className="relative h-full w-full rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-300 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-2 rounded-full border-2 border-black/25" />
        </div>
      </motion.div>

      <Navbar />
      <Container className="relative pt-10">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel mb-8 rounded-3xl p-6 backdrop-blur-xl md:p-8"
        >
          <div className="mb-4 flex items-center gap-4">
            <motion.img
              whileHover={{ scale: 1.1, rotate: 5 }}
              src="/img/icon/logo.png"
              alt="App Icon"
              className="h-16 w-16 rounded-3xl object-contain shadow-lg"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/70">Premium Oyun Merkezi</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-primary md:text-5xl">
                Futbol Temalı Mini Oyun Lobisi
              </h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 md:text-base">
            3D kart efektleri, cam yüzeyler ve akıcı geçişlerle modern bir oyun deneyimi.
          </p>
          <div className="theme-ribbon mt-5 rounded-2xl p-4 text-white">
            <p className="relative z-10 font-display text-xl font-bold">{user?.name} için özel tema hazır</p>
            <p className="relative z-10 mt-1 text-sm font-medium text-white/90">{teamSubtitle}</p>
          </div>
        </motion.section>

        <section className="grid gap-7 md:grid-cols-2">
          {GAME_CARDS.map((card) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <Link to={card.to}>
                <Card className="group">
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="card-3d-media h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${card.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      Oyun Modu
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="font-display text-2xl font-semibold text-primary">{card.title}</h2>
                    <p className="mt-2 text-sm text-slate-700">
                      Oyunu açmak için karta tıkla. Kart üstünde 3D hover efekti aktiftir.
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </section>
      </Container>
    </main>
  )
}
