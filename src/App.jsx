import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/layout/ProtectedRoute"
import { useAuth } from "./hooks/useAuth"
import { useTheme } from "./hooks/useTheme"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import TicTacToe from "./pages/TicTacToe"
import WordShuffle from "./pages/WordShuffle"

function App() {
  const { user } = useAuth()
  const { applyTheme, resetTheme } = useTheme()

  useEffect(() => {
    if (user) {
      applyTheme({
        name: user.theme,
        primaryColor: user.primaryColor,
        secondaryColor: user.secondaryColor,
      })
      return
    }

    resetTheme()
  }, [applyTheme, resetTheme, user])

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tic-tac-toe"
        element={
          <ProtectedRoute>
            <TicTacToe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/word-shuffle"
        element={
          <ProtectedRoute>
            <WordShuffle />
          </ProtectedRoute>
        }
      />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default App
