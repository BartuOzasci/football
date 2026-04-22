import { createContext, useEffect, useMemo, useState } from "react"

const DEFAULT_THEME = {
  name: "default",
  primaryColor: "#1f8f4d",
  secondaryColor: "#e7fff0",
  surfaceColor: "#f4fff8",
}

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULT_THEME)

  useEffect(() => {
    document.body.setAttribute("data-theme", theme.name)
    document.documentElement.style.setProperty("--color-primary", theme.primaryColor)
    document.documentElement.style.setProperty("--color-secondary", theme.secondaryColor)
    document.documentElement.style.setProperty("--color-surface", theme.surfaceColor)
  }, [theme])

  function applyTheme(nextTheme) {
    const surfaceColor =
      nextTheme.name === "besiktas"
        ? "#f4f4f4"
        : nextTheme.name === "fenerbahce"
          ? "#fff8cc"
          : DEFAULT_THEME.surfaceColor

    setTheme({
      name: nextTheme.name,
      primaryColor: nextTheme.primaryColor,
      secondaryColor: nextTheme.secondaryColor,
      surfaceColor,
    })
  }

  function resetTheme() {
    setTheme(DEFAULT_THEME)
  }

  const value = useMemo(() => ({ theme, applyTheme, resetTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
