import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Button from "../components/common/Button"
import Input from "../components/common/Input"
import LetterTile from "../components/game/LetterTile"
import Container from "../components/layout/Container"
import { useAuth } from "../hooks/useAuth"
import { fisherYatesShuffle } from "../utils/shuffle"

function createLetterItems(word) {
  return Array.from(word).map((letter, index) => ({
    id: `${letter}-${index}`,
    letter,
  }))
}

function sanitizeTurkishWord(value) {
  return value.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ\s]/g, "")
}

export default function WordShuffle() {
  const { user } = useAuth()
  const [inputWord, setInputWord] = useState("")
  const [originalWord, setOriginalWord] = useState("")
  const [shuffledLetters, setShuffledLetters] = useState([])

  const themeStyles = useMemo(() => {
    if (user?.theme === "fenerbahce") {
      return {
        pageBg: "bg-[linear-gradient(180deg,_#fff7cd,_#dbe8ff)]",
        orbA: "bg-yellow-300/35",
        orbB: "bg-blue-500/25",
        panel: "border-blue-900/20 bg-[#fffeef]/75",
        lettersWrap: "border-blue-900/20 bg-white/75",
        input: "border-blue-900/30",
        tile: "border-[#001e62]/35 text-[#001e62] shadow-[0_10px_20px_rgba(0,30,98,0.28)]",
      }
    }

    if (user?.theme === "besiktas") {
      return {
        pageBg: "bg-[linear-gradient(180deg,_#f9f9f9,_#dbdbdb)]",
        orbA: "bg-slate-600/25",
        orbB: "bg-white/40",
        panel: "border-black/20 bg-white/80",
        lettersWrap: "border-black/20 bg-white/70",
        input: "border-black/30",
        tile: "border-black/35 text-black shadow-[0_10px_20px_rgba(0,0,0,0.22)]",
      }
    }

    return {
      pageBg: "bg-[linear-gradient(180deg,_#e9f8ef,_#fff6d9)]",
      orbA: "bg-primary/25",
      orbB: "bg-yellow-200/30",
      panel: "border-primary/20",
      lettersWrap: "border-primary/10 bg-white/60",
      input: "border-primary/20",
      tile: "",
    }
  }, [user?.theme])

  const hasValue = useMemo(() => inputWord.trim().length > 0, [inputWord])

  function handleWordChange(event) {
    const nextWord = sanitizeTurkishWord(event.target.value)
    setInputWord(nextWord)
  }

  function handleShuffle() {
    const cleanWord = inputWord.trim()

    if (!cleanWord) {
      return
    }

    const letterItems = createLetterItems(cleanWord)
    setOriginalWord(cleanWord)
    setShuffledLetters(fisherYatesShuffle(letterItems))
  }

  return (
    <main className={`relative min-h-screen overflow-hidden py-8 ${themeStyles.pageBg}`}>
      <span className={`floating-orb left-[6%] top-[20%] h-40 w-40 ${themeStyles.orbA}`} />
      <span className={`floating-orb right-[9%] top-[64%] h-32 w-32 ${themeStyles.orbB}`} style={{ animationDelay: "0.8s" }} />

      <Container>
        <Link to="/" className="glass-panel inline-block rounded-lg border-primary/30 px-4 py-2 font-medium text-primary">
          Geri Dön
        </Link>

        <section className={`glass-panel mx-auto mt-10 max-w-2xl rounded-3xl p-8 ${themeStyles.panel}`}>
          <div className="mb-4 flex items-center gap-3">
            <img src="/img/icon/name_mix.png" alt="Harf Karıştırma İkonu" className="h-12 w-12 rounded-2xl object-contain" />
            <div>
              <h1 className="font-display text-3xl font-bold text-primary">Futbolcu Harf Karıştırma</h1>
              <p className="mt-1 text-sm text-slate-700">Kelimeyi inputa yaz, butona bas ve aşağıda karışık halini gör.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <Input
              type="text"
              placeholder="Örnek: Çağlar, Rüştü, İrfan"
              className={`${themeStyles.input} bg-white !text-black caret-black placeholder:!text-slate-500`}
              value={inputWord}
              onChange={handleWordChange}
            />
            <Button onClick={handleShuffle} disabled={!hasValue} className="sm:px-8">
              Karıştır
            </Button>
          </div>

          <motion.div layout className={`mt-8 flex min-h-20 flex-wrap gap-3 rounded-2xl border p-4 ${themeStyles.lettersWrap}`}>
            {shuffledLetters.map((item) => (
              <LetterTile
                key={item.id}
                letter={item.letter === " " ? "_" : item.letter.toLocaleUpperCase("tr-TR")}
                className={themeStyles.tile}
              />
            ))}
          </motion.div>

          <p className="mt-6 text-sm font-medium text-primary/60">Orijinal Kelime: {originalWord || "-"}</p>
        </section>
      </Container>
    </main>
  )
}
