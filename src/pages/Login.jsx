import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/common/Button"
import Input from "../components/common/Input"
import { useAuth } from "../hooks/useAuth"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [welcomeName, setWelcomeName] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const result = login(username.trim(), password.trim())

    if (!result.success) {
      setError(result.message)
      return
    }

    setError("")
    setWelcomeName(result.user.name)
    setIsTransitioning(true)

    setTimeout(() => {
      navigate("/")
    }, 2500)
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 bg-[linear-gradient(135deg,_#0a2e1a_0%,_#061512_50%,_#0a1f14_100%)]">
      {/* Futbol Sahası Pattern SVG */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="football-field" x="200" y="200" width="400" height="400" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="400" height="400" fill="none" stroke="white" strokeWidth="1" />
              <line x1="200" y1="0" x2="200" y2="400" stroke="white" strokeWidth="1" />
              <circle cx="200" cy="200" r="50" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="200" cy="200" r="5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#football-field)" />
        </svg>
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(34,197,94,0.15),_transparent_50%)]" />

      {/* Animated Background Orbs */}
      <motion.div
        animate={{ y: [0, -40, 0], x: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[5%] top-[10%] h-56 w-56 rounded-full bg-gradient-to-br from-emerald-400/30 via-emerald-500/20 to-transparent blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [20, -20, 20] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-[8%] bottom-[15%] h-52 w-52 rounded-full bg-gradient-to-tl from-cyan-400/25 via-blue-500/15 to-transparent blur-3xl"
      />

      {/* Top Floating Football */}
      <motion.div
        animate={{ rotate: 360, y: [0, -30, 0] }}
        transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute right-[20%] top-[8%] h-20 w-20"
      >
        <div className="relative h-full w-full rounded-full bg-gradient-to-br from-white via-slate-50 to-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-2 rounded-full border-2 border-black/30" />
        </div>
      </motion.div>

      {/* Bottom Right Football */}
      <motion.div
        animate={{ rotate: -360, y: [0, 20, 0] }}
        transition={{ rotate: { duration: 6, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 } }}
        className="absolute bottom-[12%] left-[15%] h-16 w-16"
      >
        <div className="relative h-full w-full rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-300 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-1.5 rounded-full border-1.5 border-black/25" />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative mx-auto flex min-h-[85vh] items-center justify-center">
        <AnimatePresence mode="wait">
          {!isTransitioning ? (
            <motion.div
              key="login-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              {/* Glow Background */}
              <div className="absolute -inset-4 rounded-4xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.form
                onSubmit={handleSubmit}
                className="relative space-y-6 rounded-3xl border border-white/15 bg-white/[0.08] p-8 shadow-[0_25px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ boxShadow: "0_25px_60px_rgba(34,197,94,0.2)" }}
              >
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-lg">⚽</div>
                    <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent">
                      Futbol Site
                    </h1>
                  </div>
                  <p className="text-sm text-emerald-200/80">Takım temanı aktif etmek için giriş yap</p>
                </motion.div>

                {/* Input Fields */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
                  <div className="relative group">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">Kullanıcı Adı</label>
                    <div className="relative">
                      <Input
                        placeholder="Kağan veya Bartu1903"
                        className="text-white caret-emerald-400 placeholder:text-white/40 border-white/20 focus:border-emerald-400/50"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        onFocus={() => setFocusedField("username")}
                        onBlur={() => setFocusedField(null)}
                      />
                      {focusedField === "username" && (
                        <motion.div
                          layoutId="input-focus"
                          className="absolute -inset-1 rounded-xl border border-emerald-400/40 bg-emerald-400/5 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">Şifre</label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="text-white caret-emerald-400 placeholder:text-white/40 border-white/20 focus:border-emerald-400/50"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                      />
                      {focusedField === "password" && (
                        <motion.div
                          layoutId="input-focus"
                          className="absolute -inset-1 rounded-xl border border-emerald-400/40 bg-emerald-400/5 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Error Message */}
                {error ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="rounded-lg border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200"
                  >
                    {error}
                  </motion.div>
                ) : null}

                {/* Submit Button */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
                  >
                    Giriş Yap
                  </Button>
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 border-t border-white/10"
                >
                  <p className="text-center text-xs text-white/40">
                    © 2026 Futbol Site. Takım temanız ile oyun oynayın.
                  </p>
                </motion.div>
              </motion.form>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Loading Transition */}
      <AnimatePresence>
        {isTransitioning ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-[#040f08]/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="flex flex-col items-center gap-8"
            >
              {/* 3D Football Spinner */}
              <motion.div
                animate={{ rotateZ: 360, rotateX: 180 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative h-28 w-28"
                style={{ perspective: "1000px" }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-300 shadow-[0_20px_60px_rgba(34,197,94,0.5)]">
                  <div className="absolute inset-3 rounded-full border-4 border-black/25" />
                </div>
                <motion.div
                  animate={{ rotateZ: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-emerald-400/40"
                />
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <p className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent">
                  Hoş geldin {welcomeName}
                </p>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-3 text-emerald-300 font-medium"
                >
                  Sana özel tema hazırlanıyor...
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  )
}
