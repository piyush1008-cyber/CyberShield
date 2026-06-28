# 🛡️ CyberShield

### Cyber Crime Complaint and Investigation Management System

> A centralized platform that bridges the gap between citizens (victims) and law enforcement (investigators) — digitizing and streamlining the reporting process for cyber offenses.

---

## 📌 Project Overview

**CyberShield** is a full-stack web application designed to modernize how cyber crime complaints are filed, tracked, and investigated. It provides role-based dashboards for **Citizens**, **Investigators**, and **System Admins**, ensuring a secure, transparent, and efficient workflow from complaint registration to case resolution.

---

## 🎯 Key Features

| Feature | Description |
|---|---|
| **Role-Based Access Control** | Distinct dashboards for Citizens, Investigators, and System Admins |
| **Complaint Registration** | Secure form to log details, categorize crimes (financial fraud, identity theft, harassment, etc.), and upload digital evidence |
| **Case Tracking** | Unique Tracking ID per complaint with real-time status updates |
| **Investigation Management** | Workspace for police to assign cases, update investigation logs, communicate with victims, and mark cases resolved |
| **Data Security** | Encryption for sensitive user details and evidence logs |
| **Auto-Categorization** *(Optional)* | Python microservice to auto-categorize complaints and predict case priority using ML |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — Dynamic single-page application
- **Tailwind CSS** — Utility-first styling framework

### Backend
- **Node.js** with **Express.js** — API routing and server logic

### Database
- **MongoDB** — Flexible document storage for evidence logs and user profiles

### Advanced / Optional
- **Python (FastAPI / Flask)** — Microservice for ML-based complaint categorization
- **Pandas & Scikit-Learn** — Data processing and prediction

---

## 👥 User Roles

| Role | Capabilities |
|---|---|
| **Citizen** | Register complaints, upload evidence, track case status |
| **Investigator** | View assigned cases, update investigation logs, communicate with victims, resolve cases |
| **System Admin** | Manage users, oversee all cases, assign investigators, system configuration |

---

## 📅 Development Phases

### ⏱️ Timeline: 16 Weeks (3–4 Months)

> **Estimated effort:** 10–15 hours/week alongside regular coursework

---

### 🔷 Phase 1 — Planning & Design `Weeks 1–3`

| # | Task | Status |
|---|---|:---:|
| 1.1 | Finalize project requirements and scope | ✅ |
| 1.2 | Define user actors and use cases | ✅ |
| 1.3 | Create component diagrams (architecture) | ✅ |
| 1.4 | Design database schemas (MongoDB collections) | ✅ |
| 1.5 | Design UI wireframes for all dashboards | ✅ |
| 1.6 | Set up project repository and folder structure | ✅ |

**Deliverables:**
- Software Requirements Specification (SRS)
- ER Diagrams / Database Schema
- UI/UX Wireframes (Figma / hand-drawn)
- System Architecture Diagram

---

### 🔷 Phase 2 — Backend Development `Weeks 4–7`

| # | Task | Status |
|---|---|:---:|
| 2.1 | Initialize Node.js + Express.js project | ✅ |
| 2.2 | Set up MongoDB connection and define Mongoose models | ✅ |
| 2.3 | Implement user registration and login (JWT authentication) | ✅ |
| 2.4 | Build role-based authorization middleware | ✅ |
| 2.5 | Build REST APIs — Complaint submission & retrieval | ✅ |
| 2.6 | Build REST APIs — Case assignment & investigation updates | ✅ |
| 2.7 | Build REST APIs — Admin management endpoints | ✅ |
| 2.8 | Implement file upload for digital evidence (Multer / Cloudinary) | ✅ |
| 2.9 | Implement data encryption for sensitive fields | ✅ |
| 2.10 | Generate unique Tracking IDs for complaints | ✅ |

**Deliverables:**
- Fully functional REST API
- API documentation (Postman collection / Swagger)
- Database seeded with test data

---

### 🔷 Phase 3 — Frontend Development `Weeks 8–11`

| # | Task | Status |
|---|---|:---:|
| 3.1 | Initialize React.js project with Tailwind CSS | ✅ |
| 3.2 | Build authentication pages (Login / Register) | ✅ |
| 3.3 | Build Citizen Dashboard — complaint form, case tracker | ✅ |
| 3.4 | Build Investigator Dashboard — case list, investigation log editor | ✅ |
| 3.5 | Build Admin Dashboard — user management, case overview | ✅ |
| 3.6 | Implement state management (Context API / Redux) | ✅ |
| 3.7 | Connect all frontend components to backend APIs | ✅ |
| 3.8 | Implement responsive design for mobile/tablet | ✅ |
| 3.9 | Add real-time notifications (optional — Socket.io) | ✅ |

**Deliverables:**
- Fully interactive frontend connected to backend
- Responsive across all screen sizes
- Smooth UX with loading states and error handling

---

### 🔷 Phase 4 — Integration, Testing & Refinement `Weeks 12–14`

| # | Task | Status |
|---|---|:---:|
| 4.1 | End-to-end testing: complaint filing → case closure flow | ✅ |
| 4.2 | Unit testing for backend APIs (Jest / Mocha) | ⬜ |
| 4.3 | Frontend component testing (React Testing Library) | ⬜ |
| 4.4 | Security audit — check for XSS, CSRF, SQL injection | ✅ |
| 4.5 | Performance optimization and bug fixes | ✅ |
| 4.6 | *(Optional)* Integrate Python ML microservice for auto-categorization | ⬜ |
| 4.7 | User acceptance testing with sample users | ✅ |

**Deliverables:**
- Test reports and bug fix log
- Security vulnerability assessment
- Optimized, production-ready application

---

### 🔷 Phase 5 — Deployment & Documentation `Weeks 15–16`

| # | Task | Status |
|---|---|:---:|
| 5.1 | Deploy frontend on **Vercel** | ⬜ |
| 5.2 | Deploy backend on **Render** | ⬜ |
| 5.3 | Set up MongoDB Atlas for cloud database | ⬜ |
| 5.4 | Configure environment variables and production settings | ✅ |
| 5.5 | Write final project report | ⬜ |
| 5.6 | Prepare project presentation / demo | ⬜ |
| 5.7 | Record a demo video walkthrough | ⬜ |

**Deliverables:**
- Live deployed application (with URLs)
- Final project report
- Presentation slides
- Demo video

---

## 📂 Planned Folder Structure

```
CyberShield/
├── client/                  # React.js Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── context/         # State management
│   │   ├── services/        # API call functions
│   │   ├── utils/           # Helper functions
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                  # Node.js + Express Backend
│   ├── config/              # DB connection, env config
│   ├── controllers/         # Route handlers
│   ├── middleware/           # Auth, role-check middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route definitions
│   ├── utils/               # Helpers (encryption, ID gen)
│   ├── server.js
│   └── package.json
│
├── ml-service/              # (Optional) Python microservice
│   ├── app.py
│   ├── model/
│   └── requirements.txt
│
├── docs/                    # Documentation & diagrams
├── .gitignore
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **MongoDB** (local or Atlas)
- **Git**
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cybershield.git
cd cybershield

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Running Locally

```bash
# Start the backend server
cd server
npm run dev

# Start the frontend (in a new terminal)
cd client
npm run dev
```

---

## 📄 License

This project is developed as a **Final Year Capstone Project** for academic purposes.

---

## 👨‍💻 Author

**Abdul**
Final Year Student

---

> *"Empowering citizens. Enabling justice. One complaint at a time."*
