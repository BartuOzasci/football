import { motion } from "framer-motion"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-950 via-green-950 to-slate-950">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Futbol Topu Spinner */}
          <motion.div
            animate={{ rotateZ: 360, rotateX: 180 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="relative h-24 w-24"
            style={{ perspective: "1200px" }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-300 shadow-[0_20px_60px_rgba(34,197,94,0.4)]">
              <div className="absolute inset-3 rounded-full border-4 border-black/25" />
              <div className="absolute left-1/2 top-0 h-1/2 w-1/3 -translate-x-1/2 rounded-full bg-black/15" />
            </div>

            {/* Orbit circles */}
            <motion.div
              animate={{ rotateZ: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-emerald-400/30"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="font-display text-xl font-bold text-white">Oturum kontrol ediliyor</p>
            <p className="mt-2 text-emerald-300 text-sm">Takım temanız yükleniyor...</p>
          </motion.div>

          {/* Loading dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-emerald-400"
              />
            ))}
          </div>
        </motion.div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
