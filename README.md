# 🎨 RanaArtCart — Handmade Arts E-Commerce Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge\&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=for-the-badge\&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge\&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge\&logo=vercel)

<br/>

### 🛍 A Full-Stack Handmade Arts Marketplace

A modern multi-role e-commerce platform for handmade and artisan products — connecting creative sellers with buyers across India.

</div>

---

# 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [User Roles](#-user-roles)
* [Screenshots](#-screenshots)
* [Project Structure](#-project-structure)
* [Installation](#-installation)
* [Environment Variables](#-environment-variables)
* [API Reference](#-api-reference)
* [Authentication Flow](#-authentication-flow)
* [Database Models](#-database-models)
* [Deployment](#-deployment)
* [Contributing](#-contributing)
* [License](#-license)

---

# 🖼 About the Project

**RanaArtCart** is a production-ready full-stack e-commerce platform built specifically for handmade and artisan products.

Unlike traditional marketplaces, the platform supports:

* 🛍 Buyers purchasing unique handmade items
* 🎨 Sellers managing their own artisan stores
* 🛡 Admins moderating the entire platform

The application includes secure authentication, OTP verification, seller approval workflows, analytics dashboards, order management, and responsive UI support.

---

# ✨ Features

## 🔐 Authentication & Security

* JWT Authentication (Access + Refresh Tokens)
* Secure `httpOnly` cookies
* OTP Email Verification
* Forgot Password & Reset Password
* Middleware Route Protection
* Role-Based Access Control

---

## 🛒 Shopping Features

* Product Browsing
* Search & Category Filtering
* Wishlist System
* Shopping Cart
* Checkout Flow
* Multiple Payment Methods
* Order Tracking
* Seller Selection at Checkout

---

## 🧑‍🎨 Seller Features

* Seller Registration Portal
* Admin Approval Workflow
* Product Management
* Order Management
* Dashboard Analytics
* Image Upload Support

---

## 🛡 Admin Features

* Seller Approval / Rejection
* Revenue Analytics
* User Management
* Order Management
* Category Management
* Platform Statistics Dashboard

---

# 🛠 Tech Stack

## Frontend

| Technology      | Purpose                        |
| --------------- | ------------------------------ |
| Next.js 16      | Full-stack React Framework     |
| React 19        | UI Library                     |
| TypeScript      | Type Safety                    |
| Tailwind CSS v4 | Styling                        |
| shadcn/ui       | UI Components                  |
| Radix UI        | Accessible Headless Components |
| Recharts        | Analytics Charts               |
| React Hook Form | Form Management                |
| Zod             | Schema Validation              |
| Sonner          | Toast Notifications            |

---

## Backend

| Technology         | Purpose          |
| ------------------ | ---------------- |
| Next.js API Routes | Backend APIs     |
| MongoDB            | Database         |
| Mongoose           | ODM              |
| JWT / JOSE         | Authentication   |
| bcryptjs           | Password Hashing |
| Nodemailer         | Email Service    |

---

## Deployment & Tooling

| Tool    | Purpose              |
| ------- | -------------------- |
| Vercel  | Hosting & Deployment |
| ESLint  | Linting              |
| PostCSS | CSS Processing       |

---

# 👥 User Roles

## 🛍 Buyer

* Register/Login with OTP verification
* Browse products
* Add to cart & wishlist
* Checkout with payment methods
* Track orders
* Cancel orders

---

## 🎨 Seller

* Create seller account
* Wait for admin approval
* Add/Edit/Delete products
* Manage incoming orders
* Monitor sales dashboard

---

## 🛡 Admin

* Approve sellers
* Manage users & products
* View analytics
* Monitor orders
* Manage categories

---

# 📸 Screenshots

> Add screenshots here later

```md
/screenshots/home.png
/screenshots/dashboard.png
/screenshots/admin.png
```

---

# 📁 Project Structure

```bash
handmade-arts-e-commerce/
│
├── app/
│   ├── admin/
│   ├── api/
│   ├── seller/
│   ├── dashboard/
│   ├── products/
│   └── ...
│
├── components/
├── contexts/
├── hooks/
├── lib/
├── models/
├── public/
├── middleware.js
├── package.json
└── README.md
```

---

# 🚀 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/akashkrsingh012/RanaArtCart-E-Commerce.git
```

---

## 2️⃣ Navigate to Project

```bash
cd RanaArtCart-E-Commerce
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

---

## 4️⃣ Configure Environment Variables

Create `.env.local`

```env
MONGODB_URI=

JWT_SECRET=
JWT_REFRESH_SECRET=

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 5️⃣ Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# 🔑 Environment Variables

| Variable             | Description               |
| -------------------- | ------------------------- |
| `MONGODB_URI`        | MongoDB Connection String |
| `JWT_SECRET`         | JWT Access Secret         |
| `JWT_REFRESH_SECRET` | JWT Refresh Secret        |
| `EMAIL_USER`         | SMTP Email                |
| `EMAIL_PASS`         | Gmail App Password        |

---

# 📡 API Reference

## 🔐 Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/auth/signup` |
| POST   | `/api/auth/login`  |
| POST   | `/api/auth/logout` |
| GET    | `/api/auth/me`     |

---

## 🛍 Products

| Method | Endpoint        |
| ------ | --------------- |
| GET    | `/api/products` |
| POST   | `/api/products` |

---

## 📦 Orders

| Method | Endpoint      |
| ------ | ------------- |
| GET    | `/api/orders` |
| POST   | `/api/orders` |

---

## ❤️ Wishlist

| Method | Endpoint        |
| ------ | --------------- |
| GET    | `/api/wishlist` |
| POST   | `/api/wishlist` |

---

# 🔒 Authentication Flow

```text
Buyer Signup
   ↓
OTP Verification
   ↓
JWT Token Generated
   ↓
Access Protected Routes
```

---

# 🗃 Database Models

## User Model

```ts
{
  name: String,
  email: String,
  password: String,
  wishlist: [ObjectId],
  isVerified: Boolean
}
```

---

## Seller Model

```ts
{
  businessName: String,
  category: String,
  isApproved: Boolean
}
```

---

## Product Model

```ts
{
  name: String,
  price: Number,
  stock: Number,
  category: String
}
```

---

# 🚀 Deployment

## Deploy on Vercel

```bash
npm run build
```

Push project to GitHub and import into Vercel.

---

# 🤝 Contributing

Contributions are welcome!

## Steps

```bash
# Fork Repository

# Create Branch
git checkout -b feature-name

# Commit Changes
git commit -m "feat: added feature"

# Push Changes
git push origin feature-name
```

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### ⭐ Support the Project

If you found this project helpful, please give it a star on GitHub.

### 👨‍💻 Developed By

**Akash Kumar Singh**

</div>

