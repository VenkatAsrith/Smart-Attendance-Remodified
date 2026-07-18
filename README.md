# 🚀 AURA — FAANG-Level Enterprise Attendance Management SaaS System

A production-grade, FAANG-level **Enterprise Attendance Management SaaS System** built using the **MERN Stack** (MongoDB Atlas, Express.js, React 19, Node.js), Vite, TypeScript, Tailwind CSS, Framer Motion, and Recharts.

---

## 🎨 Design System & Visual Aesthetics

- **Primary**: `#7C5CFC` (Vibrant Indigo Violet)
- **Secondary**: `#A78BFA` (Soft Purple)
- **Background**: `#090414` (Deep Cosmic Dark)
- **Surface**: `#17112B` (Frosted Violet Dark)
- **Glass Panel**: `rgba(255, 255, 255, 0.06)` with `backdrop-filter: blur(20px)`
- **Border**: `rgba(255, 255, 255, 0.12)`
- **Glassmorphic Glow**: Ambient purple glows with 24–32px rounded floating cards.

---

## 👥 Portals & Credentials

### 👨‍🏫 Faculty Portal
- **Demo Login Email**: `faculty@college.edu`
- **Password**: `password123`
- **Key Features**:
  - Dashboard with today's classes, attendance pending counter, and subject analytics.
  - **Mark Attendance Board**: 7-step cascade filter (Department → Year → Semester → Section → Subject → Hour → Date), live statistics counter, status toggles (Present, Absent, Late, Medical Leave), bulk actions, remarks, and animated confirmation popup.
  - **Show Attendance Module**: Multi-dimensional filtering, Recharts Pie, Bar, Line & Heatmap analytics, and one-click **PDF & Excel** report downloads.

### 👨‍🎓 Student Portal
- **Demo Roll Number**: `23SS1A0535` (KONAM VENKAT ASRITH)
- **Password**: `password123`
- **Key Features**:
  - Animated Circular Progress Gauge for overall attendance percentage.
  - **Detention Risk Warning Engine**: Automatically alerts students if overall attendance drops below 75%.
  - Subject cards with progress bars and credit counts.
  - **30-Day Interactive Attendance Heatmap**.
  - Weekly Timetable view and downloadable personal PDF/Excel transcripts.
  - Profile view with live profile completion meter.

---

## 🧪 Database Seeder

The system automatically populates MongoDB with:
- **66 Real CSE 4th Year Students** (`23SS1A0501` to `23SS1A0566`) from JNTUH Sultanpur.
- **5 Faculty Members** & **6 Core CSE 7th Sem Subjects**.
- **30 Days of Historical Attendance Data** to populate all charts, heatmaps, and stats instantly.

To seed the database:
```bash
cd server
npm install
npm run seed
```

---

## 🛠 Project Structure

```
Updated Version/
├── client/                      # React 19 + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # GlassNavbar, Sidebar
│   │   │   ├── ui/              # GlassCard, GlassButton, GlassInput, StatusBadge, StatCard, CircularProgress, GlassModal
│   │   ├── context/             # AuthContext
│   │   ├── pages/               # Auth, Faculty, Student pages
│   │   ├── services/            # Axios API & Standalone Mock Database fallback
│   │   └── types/               # TypeScript declarations
├── server/                      # Express + Node.js Clean Backend Architecture
│   ├── config/                  # DB connection
│   ├── controllers/             # Auth, Attendance, Student, Analytics, Export
│   ├── middlewares/             # JWT Auth & Role Access Control
│   ├── models/                  # User, Student, Faculty, Subject, Attendance, Notification
│   ├── routes/                  # RESTful API endpoints
│   ├── seeders/                 # Database Seeder script
│   └── utils/                   # Real CSV dataset & PDF/Excel generators
```

---

## 🚀 Local Development Setup

### 1. Launch Backend API
```bash
cd server
npm install
npm start
```

### 2. Launch Frontend Application
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Deployment Configuration

- **Frontend**: Configured for **Vercel** (`vercel.json` included).
- **Backend**: Configured for **Render** / Node environments.
- **Database**: **MongoDB Atlas**.
