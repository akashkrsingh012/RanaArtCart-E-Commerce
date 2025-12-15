import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT secrets are not set. Please configure JWT_SECRET and JWT_REFRESH_SECRET in .env.local")
}

export const createAccessToken = (user) =>
  jwt.sign(
    {
      sub: user._id?.toString(),
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  )

export const createRefreshToken = (user) =>
  jwt.sign(
    {
      sub: user._id?.toString(),
      email: user.email,
    },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  )

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const verifyPassword = (password, hash) => bcrypt.compare(password, hash)
















