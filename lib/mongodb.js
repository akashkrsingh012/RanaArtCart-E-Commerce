import mongoose from "mongoose"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

if (!dbName) {
  throw new Error("Please define the MONGODB_DB environment variable inside .env.local")
}

let cached = globalThis._mongoose

if (!cached) {
  cached = globalThis._mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    // Use dbName option to ensure we connect to the exact database provided in env
    cached.promise = mongoose
      .connect(uri, { dbName })
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        // Surface a clear error to help diagnose Atlas connection issues
        throw new Error(`MongoDB connection failed: ${err.message}`)
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}

