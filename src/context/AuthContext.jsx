import { createContext, useEffect, useMemo, useState } from "react"
import { USERS } from "../data/users"
import { clearAuthSession, readAuthSession, saveAuthSession } from "../utils/storage"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const activeUser = readAuthSession()
    setUser(activeUser)
    setIsLoading(false)
  }, [])

  function login(username, password) {
    const account = USERS[username]

    if (!account || account.password !== password) {
      return { success: false, message: "Kullanıcı adı veya şifre hatalı." }
    }

    const userPayload = {
      name: username,
      theme: account.theme,
      primaryColor: account.primaryColor,
      secondaryColor: account.secondaryColor,
    }

    saveAuthSession(userPayload)
    setUser(userPayload)

    return { success: true, user: userPayload }
  }

  function logout() {
    clearAuthSession()
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [isLoading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
