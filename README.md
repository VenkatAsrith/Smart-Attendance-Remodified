#  Smart Attendance — Enterprise Attendance Management Platform

> **FAANG-Grade Attendance SaaS for JNTUH R22 CSE 4th Year Curriculum**  
> Built with **MongoDB, Express.js, React 18, Node.js (MERN Stack)**, **TypeScript**, and styled using the **Obsidian Chrome Design System**.

---

##  Problem Statement

In traditional educational institutions and engineering colleges:
1. **Manual Paper Registers**: Attendance marking in paper registers is slow, prone to proxy attendance, physical record damage, and human calculation errors.
2. **Lack of Real-Time Regulations & Risk Alerts**: Under **JNTUH R22 Regulations**, students must maintain a mandatory minimum of **75% attendance** across subjects to be eligible for university semester examinations and hall ticket generation. Traditional systems fail to warn students before they fall into the **Detention Risk Zone**.
3. **Cumbersome Monthly Report Generation**: Faculty spend hours manually computing attendance percentages, total lectures conducted, and student eligibility for monthly departmental submissions.
4. **Lack of Hour-by-Hour Session Tracking**: Generic attendance software tracks attendance per day rather than per subject hour (1st–8th hour slots), leading to ambiguity in lab sessions vs theory lectures.

---

##  Our Engineering Approach

To address these challenges, **Smart Attendance** was architected from scratch as a production-ready SaaS application:

* **MERN Stack Architecture**: Express.js RESTful API endpoints coupled with a MongoDB Atlas database (`smart_attendance`) and a high-performance React 18 + Vite frontend.
* **Exact University Dataset Seeding**: Populated all **66 Students** (`23SS1A0501` to `23SS1A0566`) sourced directly from official college registers (`smart_attendance.CSV`) along with real JNTUH R22 CSE 4th Year subjects (`CS701PC`, `CS702PC`, `CS703PE`, `CS704PE`, `CS705OE`, `CS711PC`, `CS801PC`, `CS802PE`).
* **Animated Status Pills (No Checkboxes!)**: Replaced outdated checkboxes with animated interactive status pills (🟢 **Present**, 🔴 **Absent**, 🟡 **Late**, 🔵 **Medical Leave**).
* **Automated Export Engine**: Built server-side Excel generation via `exceljs` and PDF certificate generation via `pdfkit` for one-click master class register exports.
* **Obsidian Chrome Design Language**: Designed with a high-contrast dark aesthetic (`#0A0A0A` Onyx, `#536878` Blue Slate, `#E5E4E2` Alabaster Grey), crisp surface panels (`#14171E`), rounded pill buttons, and readable Plus Jakarta Sans typography.

---

##  Key Features & Capabilities

###  Faculty Portal
* **Hour-by-Hour Session Marking**: Selectable 1st–8th hour slots (e.g., *3rd Hour: 11:30 AM - 12:30 PM*) with subject code mapping.
* **Live KPI Counters**: Instant visual feedback on total present, absent, late, medical leave, and class percentage ratio.
* **One-Click Master Excel Export**: Download `Attendance_Report_CSE_IV_Year_Sec_A.xlsx` containing total lectures, present counts, percentage, and detention status for all 66 students.
* **Interactive Analytics Dashboard**: Recharts-powered Pie Chart (status ratio), Bar Chart (subject comparison), Area Chart (daily attendance trends), and Line Charts.
* **Bulk Attendance Actions**: One-click *Mark All Present*, *Mark All Absent*, and *Reset* triggers.

###  Student Portal
* **Subject Progress Breakdown**: Visual progress bars showing percentage and attended sessions for every R22 subject.
* **SVG Circular Attendance Ring**: Live gauge illustrating overall attendance percentage.
* **JNTUH 75% Detention Warning Alert**: Dynamic warning banner displayed if attendance drops below 75%, indicating exact consecutive hours required to regain eligibility.
* **30-Day Heatmap Grid**: Visual calendar tracking present and absent days.
* **Official Attendance Transcript & Downloads**: One-click **Download Personal Excel Log** and **Download PDF Report**.

###  Authentication & Security
* **Split-Screen Authentication**: Role selector tabs (**Faculty Portal** vs **Student Portal**) with quick demo login shortcuts.
* **JWT & Role-Based Access Control (RBAC)**: Secure authorization for `FACULTY`, `STUDENT`, and `ADMIN` roles.

---

##  Folder Structure

```text
Updated Version/
├── client/                           # React 18 + Vite + TypeScript Frontend
│   ├── public/                       # Static public assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/               # Layout elements (GlassNavbar.tsx, Sidebar.tsx)
│   │   │   └── ui/                   # UI Library (GlassCard, GlassButton, GlassInput, CircularProgress, GlassModal)
│   │   ├── context/                  # Global Auth Context (AuthContext.tsx)
│   │   ├── pages/
│   │   │   ├── auth/                 # Login Screen (Login.tsx)
│   │   │   ├── faculty/              # Faculty Dashboard, Attendance, Show Attendance, Profile
│   │   │   └── student/              # Student Dashboard, Attendance, Reports, Profile
│   │   ├── services/                 # Axios API Service & Fallback Data (api.ts, mockData.ts)
│   │   ├── types/                    # TypeScript Declarations (index.ts)
│   │   ├── App.tsx                   # React Router Routing & App Wrapper
│   │   ├── main.tsx                  # Application Entry Point
│   │   └── index.css                 # Global CSS & Obsidian Chrome Utility Classes
│   ├── index.html                    # HTML5 Template & Google Fonts
│   ├── tailwind.config.js            # Tailwind Custom Palette Tokens
│   ├── tsconfig.json                 # TypeScript Configuration
│   └── vite.config.ts                # Vite Bundler & Server Proxy Settings
│
├── server/                           # Node.js + Express REST API Backend
│   ├── config/                       # Database Configuration (db.js)
│   ├── controllers/                  # Route Controllers (auth, attendance, student, analytics, export)
│   ├── middleware/                   # Authentication Middleware (authMiddleware.js)
│   ├── models/                       # Mongoose Schemas (User, Student, Faculty, Subject, Attendance, Notification)
│   ├── routes/                       # Express API Routers
│   ├── seeders/                      # MongoDB Seeder Script (seedDatabase.js)
│   ├── utils/                        # Initial Seed Dataset (seedData.js)
│   ├── .env                          # Environment Variables (MONGO_URI, PORT, JWT_SECRET)
│   └── server.js                     # Express Server Entry Point
│
├── smart_attendance.CSV              # Official Student Dataset (66 Students: 23SS1A0501 - 566)
└── README.md                         # Full-Length Project Documentation Guide
```

---

##  Repository & Deployment Links

* **GitHub Repository**: [https://github.com/VenkatAsrith/Smart-Attendance-Remodified.git](https://github.com/VenkatAsrith/Smart-Attendance-Remodified.git)
* **Default Branch**: `main`
* **Deployed Link **: https://smartattendance2.netlify.app/login

---

##  Installation & Local Setup Guide

### Prerequisites
* **Node.js**: v18.x or higher
* **MongoDB**: Local MongoDB instance or MongoDB Atlas Connection String
* **Git**: Installed on system

### 1. Clone Repository
```bash
git clone https://github.com/VenkatAsrith/Smart-Attendance-Remodified.git
cd Smart-Attendance-Remodified
```

### 2. Backend Setup (`server/`)
```bash
cd server
npm install
```

Create `.env` file inside `server/`:
These env details are for the education purpose only
You can just clone and run on your local machine 
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart_attendance
JWT_SECRET=smart_attendance_jwt_secret_key_2026
NODE_ENV=development
```

Run MongoDB Database Seeding:
```bash
node seeders/seedDatabase.js
```

Start Express Server:
```bash
npm start
```


### 3. Frontend Setup (`client/`)
In a new terminal tab:
```bash
cd client
npm install
npm run dev
```


---

##  Quick Demo Credentials

| Role | Email / Identifier | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Faculty** | `faculty@college.edu` | `password123` | Full Class Attendance Operations, Analytics & Exports |
| **Student** | `23ss1a0535@college.edu` *(or `23SS1A0535`)* | `password123` | Personal Attendance Transcript & Detention Alert |

---

##  Connect With Me

> **Developed for demonstration purposes only — not fully functional in production.**


Feel free to connect for a deeper technical understanding of the architecture, database design, or SaaS integrations!

* **GitHub**: [@VenkatAsrith](https://github.com/VenkatAsrith)
* **Repository**: [Smart-Attendance-Remodified](https://github.com/VenkatAsrith/Smart-Attendance-Remodified.git)

---
