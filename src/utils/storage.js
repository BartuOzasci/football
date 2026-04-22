const AUTH_STORAGE_KEY = "futbol-site-auth"

export const AUTH_TTL_MS = 7 * 24 * 60 * 60 * 1000

export function saveAuthSession(user) {
  const payload = {
    user,
    expiresAt: Date.now() + AUTH_TTL_MS,
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload))
}

export function readAuthSession() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)

    if (!parsed?.user || !parsed?.expiresAt) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }

    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }

    return parsed.user
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
