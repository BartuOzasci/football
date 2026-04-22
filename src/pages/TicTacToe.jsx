import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Button from "../components/common/Button"
import Container from "../components/layout/Container"
import { TEAM_LOGOS } from "../data/logos"
import { useAuth } from "../hooks/useAuth"
import { getRandomUniqueItems } from "../utils/shuffle"
import { useMemo, useState } from "react"

function LogoCell({ src, alt }) {
  return (
    <div className="glass-panel card-3d grid h-24 place-items-center rounded-xl">
      {src ? <img src={src} alt={alt} className="card-3d-media h-14 w-14 rounded-full object-contain" /> : null}
    </div>
  )
}

function GameCell({ theme }) {
  const gradients = {
    fenerbahce: "from-blue-900/25 via-yellow-300/15 to-blue-100/35",
    besiktas: "from-black/20 via-slate-400/10 to-white/30",
    default: "from-primary/20 via-emerald-100/20 to-primary/10",
  }

  const borders = {
    fenerbahce: "border-blue-900/30 shadow-[0_8px_20px_rgba(0,30,98,0.2),inset_0_1px_2px_rgba(255,237,0,0.3)]",
    besiktas: "border-black/25 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)]",
    default: "border-primary/25 shadow-[0_8px_20px_rgba(31,143,77,0.15),inset_0_1px_2px_rgba(231,255,240,0.4)]",
  }

  const themeName = theme || "default"
  const gradient = gradients[themeName] || gradients.default
  const border = borders[themeName] || borders.default

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative h-24 cursor-pointer overflow-hidden rounded-2xl border ${border} bg-gradient-to-br ${gradient} backdrop-blur-sm transition-all duration-300`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_transparent_1px,_rgba(255,255,255,0.05)_1px),linear-gradient(0deg,_transparent_1px,_rgba(255,255,255,0.05)_1px)] bg-[size:12px_12px] opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
    </motion.div>
  )
}

export default function TicTacToe() {
  const { user } = useAuth()
  const [pickedLogos, setPickedLogos] = useState(() => getRandomUniqueItems(TEAM_LOGOS, 6))

  const themeStyles = useMemo(() => {
    if (user?.theme === "fenerbahce") {
      return {
        pageBg: "bg-[radial-gradient(circle_at_top,_#fff9d6,_#d7e7ff)]",
        orb: "bg-yellow-300/40",
        board: "border-blue-900/25 bg-[#fffef0]/85 shadow-[0_20px_50px_rgba(0,30,98,0.15)] rounded-3xl",
      }
    }

    if (user?.theme === "besiktas") {
      return {
        pageBg: "bg-[radial-gradient(circle_at_top,_#ffffff,_#dddddd)]",
        orb: "bg-slate-500/35",
        board: "border-black/25 bg-white/85 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl",
      }
    }

    return {
      pageBg: "bg-[radial-gradient(circle_at_top,_#ffffff,_#dbeecf)]",
      orb: "bg-primary/25",
      board: "border-primary/25 bg-white/85 shadow-[0_20px_50px_rgba(31,143,77,0.12)] rounded-3xl",
    }
  }, [user?.theme])

  const topRow = useMemo(() => pickedLogos.slice(0, 3), [pickedLogos])
  const leftCol = useMemo(() => pickedLogos.slice(3, 6), [pickedLogos])

  function reshuffle() {
    setPickedLogos(getRandomUniqueItems(TEAM_LOGOS, 6))
  }

  return (
    <main className={`relative min-h-screen overflow-hidden py-8 ${themeStyles.pageBg}`}>
      <span className={`floating-orb right-[10%] top-[18%] h-40 w-40 ${themeStyles.orb}`} />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between gap-4"
        >
          <Link to="/" className="rounded-lg border border-primary/30 px-4 py-2 font-medium text-primary transition hover:bg-primary/10">
            Geri Dön
          </Link>
          <div className="flex flex-col items-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary/70">Takım Logoları</p>
            <Button onClick={reshuffle}>Yeniden Dağıt</Button>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`mx-auto grid max-w-3xl grid-cols-4 grid-rows-4 gap-5 border p-7 backdrop-blur-xl ${themeStyles.board}`}
        >
          {Array.from({ length: 16 }).map((_, index) => {
            const row = Math.floor(index / 4)
            const col = index % 4

            if (row === 0 && col === 0) {
              return <LogoCell key={index} src="/img/icon/tic-tac-toe.png" alt="Tic Tac Toe İkonu" />
            }

            if (row === 0 && col > 0) {
              return <LogoCell key={index} src={topRow[col - 1]} alt={`Üst Logo ${col}`} />
            }

            if (col === 0 && row > 0) {
              return <LogoCell key={index} src={leftCol[row - 1]} alt={`Sol Logo ${row}`} />
            }

            return (
              <GameCell key={index} theme={user?.theme} />
            )
          })}
        </motion.section>
      </Container>
    </main>
  )
}
