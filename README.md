# 💧 Water Purifier Full-Stack Application

A modern, production-ready **full-stack web application** for showcasing, managing, and selling water purifiers and related services.  
Built with **React + Vite + Express + PostgreSQL (Neon)** following scalable and industry-standard architecture.

---

## 🚀 Features

### 🌐 Frontend
- React 18 with TypeScript
- Vite for fast development & builds
- Tailwind CSS + ShadCN UI components
- Responsive & mobile-friendly UI
- Product listing & product detail pages
- Cart management
- Service request & lead forms
- API integration via React Query

### 🧠 Backend
- Node.js + Express (TypeScript)
- REST API architecture
- PostgreSQL database (Neon)
- Drizzle ORM
- Modular routing & controllers
- Auth-ready (Replit Auth disabled locally)
- Server-side rendering support via Vite middleware

### 🗄️ Database
- PostgreSQL (Neon Cloud)
- Schema management with Drizzle
- Seeded product data
- Scalable relational structure

---

## 🧱 Tech Stack

| Layer | Technology |
|-----|-----------|
Frontend | React, Vite, TypeScript |
Styling | Tailwind CSS, ShadCN UI |
Backend | Node.js, Express |
Database | PostgreSQL (Neon) |
ORM | Drizzle ORM |
State / Data | React Query |
Build Tool | Vite |
Auth | Replit Auth (optional) |

---

## 📂 Project Structure

```text
📦 water-purifier/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page-level components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utilities & helpers
│   │   └── main.tsx            # App entry point
│   └── index.html              # HTML template
├── server/                     # Express backend
│   ├── index.ts                # Server bootstrap
│   ├── routes.ts               # API routes
│   ├── db.ts                   # Database connection
│   ├── storage.ts              # Storage & data helpers
│   └── replit_integrations/    # Authentication & integrations
├── shared/                     # Shared schemas & types
├── drizzle.config.ts           # Drizzle ORM configuration
├── vite.config.ts              # Vite configuration
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation

````


## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
DISABLE_REPLIT_AUTH=true
NODE_ENV=development
=development
````

> ⚠️ Never commit `.env` to GitHub

---

## 🛠️ Local Development

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Indian24/water-purifier-.git
cd water-purifier-
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Push database schema

```bash
npm run db:push
```

### 4️⃣ Start the application

```bash
npm run dev
```

### 5️⃣ Open in browser

```
http://localhost:5000
```

> The frontend and backend run on the **same port** using Vite middleware.

---

## 📡 API Endpoints (Examples)

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| GET    | `/api/products`       | Fetch all products             |
| GET    | `/api/products/:slug` | Product details                |
| POST   | `/api/leads`          | Service / enquiry form         |
| GET    | `/api/auth/user`      | Current user (stubbed locally) |

---

## 🔐 Authentication Notes

* Replit Auth is **disabled for local development**
* Controlled via `DISABLE_REPLIT_AUTH=true`
* Can be enabled in production with proper credentials

---

## 📦 Build for Production

```bash
npm run build
```

The output will be optimized and production-ready.

---

## ☁️ Deployment Ready

This project can be deployed on:

* **Render**
* **Railway**
* **Vercel (frontend) + Render (backend)**
* **AWS / GCP / Azure**

PostgreSQL is already cloud-compatible via Neon.

---

## 🧪 Code Quality & Standards

* TypeScript throughout
* Modular folder structure
* Environment-based configuration
* Clean Git history
* Production-safe defaults

---

## 📄 License

MIT License
You are free to use, modify, and distribute this project.

---

## 👨‍💻 Author

**Manish Ranjan**
Full-Stack Developer

GitHub: [https://github.com/Indian24](https://github.com/Indian24)

```
