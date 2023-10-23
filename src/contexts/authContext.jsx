'use client'
import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react'

const AuthContext = createContext({
  login: (authTokens) => {},
  logout: () => {},
  isLoggedIn: false,
  authTokens: null
})

const AUTH_TOKEN_KEY = 'NEXT_JS_AUTH'

export default function AuthContextProvider ({ children }) {
  const [authTokens, setAuthTokens] = useState(null)

  useEffect(() => {
    const authTokensInLocalStorage = window.localStorage.getItem(AUTH_TOKEN_KEY)
    if (authTokensInLocalStorage) {
      setAuthTokens(JSON.parse(authTokensInLocalStorage))
    }
  }, []) // Este efecto se ejecutará solo en el lado del cliente después del montaje del componente

  const login = useCallback(function (authTokens) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(authTokens))
    setAuthTokens(authTokens)
  }, [])

  const logout = useCallback(function () {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
    setAuthTokens(null)
  }, [])

  const value = useMemo(
    () => ({
      login,
      logout,
      authTokens,
      isLoggedIn: authTokens !== null
    }),
    [authTokens, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext () {
  return useContext(AuthContext)
}
