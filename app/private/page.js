"use client"

import { useEffect, useState } from "react"

export default function PrivatePage() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken")
        const res = await fetch("/api/auth/me", {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || "Unauthorized")
          return
        }
        setUser(data.user)
      } catch (err) {
        setError("Failed to load session.")
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Private Area</h1>
        {user ? (
          <p className="text-lg">Welcome back, {user.name || user.email}!</p>
        ) : (
          <p className="text-muted-foreground">{error || "Loading..."}</p>
        )}
      </div>
    </div>
  )
}
















