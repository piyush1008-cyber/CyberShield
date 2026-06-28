<p align="center">
  <img src="https://img.shields.io/badge/CyberShield-v1.0-blueviolet?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge" alt="License" />
</p>

# 🛡️ CyberShield

### Cyber Crime Complaint & Investigation Management System

> A centralized full-stack web platform that bridges the gap between **citizens** and **law enforcement** — digitizing and streamlining the reporting, tracking, and investigation of cyber offenses.

---

## 📌 About

**CyberShield** is a comprehensive web application built as a Final Year Capstone Project. It empowers citizens to securely report cyber crimes, track their complaint status in real-time, and communicate with assigned investigators — all through an intuitive, role-based interface.

### ✨ Why CyberShield?

- 🔐 **Secure** — JWT authentication, bcrypt password hashing, Helmet security headers, rate limiting
- 📊 **Real-time Tracking** — Unique tracking IDs (`CS-2026-XXXXXX`) for every complaint
- 👥 **Role-Based** — Three distinct user roles with tailored dashboards
- 📱 **Responsive** — Fully responsive design that works on desktop, tablet, and mobile
- ⚡ **Modern Stack** — Built with React 19, Express 4, MongoDB, and Tailwind CSS 4

---

## 🎯 Features

### 👤 Citizen Portal
- Register and file cyber crime complaints with categorized forms
- Upload digital evidence (images, documents, screenshots)
- Track complaint status using unique Tracking IDs
- View investigation updates and communicate with investigators
- Receive real-time notifications on case progress

### 🔍 Investigator Dashboard
- View and manage assigned cases in an organized workspace
- Add investigation notes and case logs
- Communicate with victims through a secure messaging system
- Update case status and priority levels
- Track investigation timeline and progress

### ⚙️ Admin Panel
- Comprehensive analytics dashboard with system-wide statistics
- User management — create, edit, activate/deactivate accounts
- Assign investigators to complaints
- Monitor all complaints across the platform
- Generate reports and oversee case distribution

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router 7, Tailwind CSS 4, Axios, React Icons, React Hot Toast |
| **Backend** | Node.js, Express.js 4, Mongoose ODM |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **Security** | Helmet, CORS, express-rate-limit, express-validator |
| **File Upload** | Multer, Cloudinary |
| **Dev Tools** | Vite 8, Nodemon, OxLint |

---

## 📂 Project Structure

```
CyberShield/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Reusable UI (StatsCard, StatusBadge, etc.)
│   │   │   └── layout/              # DashboardLayout with sidebar navigation
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state, login/register/logout
│   │   ├── pages/
│   │   │   ├── auth/                # Login & Register pages
│   │   │   ├── citizen/             # Dashboard, FileComplaint, TrackComplaint, etc.
│   │   │   ├── investigator/        # Dashboard, CaseDetail, AssignedCases
│   │   │   └── admin/               # Dashboard, ManageUsers, AllComplaints
│   │   ├── services/
│   │   │   └── api.js               # Axios instance with JWT interceptors
│   │   ├── App.jsx                  # React Router with ProtectedRoute
│   │   └── index.css                # Tailwind CSS base styles
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Express Backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Register, login, profile
│   │   ├── complaintController.js   # CRUD, tracking, status updates
│   │   ├── investigationController.js # Notes, priority, messaging
│   │   ├── adminController.js       # Users, assignment, stats, reports
│   │   └── notificationController.js # Get, mark read
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification + RBAC
│   │   └── errorMiddleware.js       # Global error handler
│   ├── models/
│   │   ├── User.js                  # Roles, bcrypt hashing
│   │   ├── Complaint.js             # Tracking ID, status lifecycle
│   │   ├── Evidence.js              # File metadata, MIME validation
│   │   ├── Investigation.js         # Embedded notes & communications
│   │   └── Notification.js          # TTL auto-cleanup
│   ├── routes/                      # 5 route modules
│   ├── utils/
│   │   ├── generateToken.js         # JWT generation
│   │   └── generateTrackingId.js    # CS-YYYY-XXXXXX format
│   ├── server.js                    # Entry point
│   └── package.json
│
├── docs/                            # Project Documentation
│   ├── SRS.md                       # Software Requirements Specification
│   ├── architecture.md              # System Architecture & API Design
│   ├── database_schema.md           # MongoDB Schema Design
│   └── wireframes.md                # UI/UX Design System
│
├── .env.example                     # Environment variables template
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| **Node.js** | v18 or higher |
| **MongoDB** | v6+ (local) or MongoDB Atlas |
| **npm** | v9+ |
| **Git** | Latest |

### 1. Clone the Repository

```bash
git clone https://github.com/muqeetbuilds/CyberShield.git
cd CyberShield
```

### 2. Set Up Environment Variables

```bash
# Navigate to the server directory
cd server

# Copy the environment template
cp ../.env.example .env

# Edit .env with your values (MongoDB URI, JWT secret, etc.)
```

Your `.env` should look like:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cybershield
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=24h
CLIENT_URL=http://localhost:5173
ENCRYPTION_KEY=your_32_character_key
```

### 3. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 4. Seed the Database (Optional)

```bash
cd server
npm run seed
```

This creates demo accounts for all three roles.

### 5. Run the Application

Open **two terminals**:

```bash
# Terminal 1 — Start the backend (port 5000)
cd server
npm run dev

# Terminal 2 — Start the frontend (port 5173)
cd client
npm run dev
```

### 6. Open in Browser

Navigate to **http://localhost:5173**

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| 🛡️ Admin | `admin@cybershield.com` | `Admin@123` |
| 🔍 Investigator | `investigator@cybershield.com` | `Invest@123` |
| 👤 Citizen | `citizen@cybershield.com` | `Citizen@123` |

> **Note:** Run `npm run seed` in the `server` directory first to create these accounts.

---

## 📡 API Reference

**Base URL:** `http://localhost:5000/api`

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new citizen account | Public |
| `POST` | `/auth/login` | Login & get JWT token | Public |
| `GET` | `/auth/profile` | Get current user profile | Private |
| `PUT` | `/auth/profile` | Update user profile | Private |

### Complaints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/complaints` | File a new complaint | Citizen |
| `GET` | `/complaints` | Get all complaints (filtered by role) | Private |
| `GET` | `/complaints/:id` | Get complaint details | Private |
| `GET` | `/complaints/track/:trackingId` | Track complaint by Tracking ID | Citizen |
| `PUT` | `/complaints/:id` | Update a complaint | Citizen |
| `PUT` | `/complaints/:id/status` | Update complaint status | Investigator / Admin |

### Investigation

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/investigations/:complaintId` | Get investigation details | Private |
| `POST` | `/investigations/:complaintId/notes` | Add investigation note | Investigator |
| `PUT` | `/investigations/:complaintId/priority` | Update case priority | Investigator |
| `POST` | `/investigations/:complaintId/communicate` | Send a message | Investigator / Citizen |

### Admin

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/admin/users` | Get all users | Admin |
| `POST` | `/admin/users` | Create a new user | Admin |
| `PUT` | `/admin/users/:id` | Update a user | Admin |
| `DELETE` | `/admin/users/:id` | Delete a user | Admin |
| `PUT` | `/admin/complaints/:id/assign` | Assign investigator to case | Admin |
| `GET` | `/admin/stats` | Get system-wide statistics | Admin |
| `GET` | `/admin/reports` | Generate reports | Admin |

### Notifications

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/notifications` | Get user notifications | Private |
| `PUT` | `/notifications/:id/read` | Mark notification as read | Private |
| `PUT` | `/notifications/read-all` | Mark all as read | Private |

---

## 🔒 Security Features

- **JWT Authentication** — Stateless token-based auth with configurable expiry
- **Password Hashing** — bcryptjs with salt rounds
- **Role-Based Access Control (RBAC)** — Middleware-level role enforcement
- **Helmet** — HTTP security headers (XSS protection, content security policy)
- **Rate Limiting** — Prevents brute-force attacks on auth endpoints
- **Input Validation** — express-validator on all API inputs
- **CORS** — Configured origin restrictions
- **Data Encryption** — Sensitive fields encrypted at rest

---

## 📊 Complaint Lifecycle

```
  ┌──────────┐     ┌──────────────┐     ┌──────────┐     ┌─────────────────────┐     ┌──────────┐
  │Submitted │────▶│ Under Review │────▶│ Assigned │────▶│ Under Investigation │────▶│ Resolved │
  └──────────┘     └──────────────┘     └──────────┘     └─────────────────────┘     └──────────┘
                          │                                                               │
                          ▼                                                               ▼
                     ┌──────────┐                                                    ┌──────────┐
                     │ Rejected │                                                    │  Closed  │
                     └──────────┘                                                    └──────────┘
```

### Crime Categories

| Category | Icon |
|---|---|
| Financial Fraud | 💰 |
| Identity Theft | 🆔 |
| Online Harassment / Cyberbullying | 😤 |
| Phishing / Social Engineering | 🎣 |
| Ransomware / Malware Attack | 🦠 |
| Data Breach | 📂 |
| Online Scam | 🕵️ |
| Other | 📋 |

---

## 📄 Documentation

Detailed project documentation is available in the [`docs/`](./docs) directory:

| Document | Description |
|---|---|
| [SRS.md](./docs/SRS.md) | Software Requirements Specification — 43 functional & 12 non-functional requirements |
| [architecture.md](./docs/architecture.md) | System architecture, component diagrams, API design, auth flow |
| [database_schema.md](./docs/database_schema.md) | MongoDB collections, ER diagram, indexing strategy |
| [wireframes.md](./docs/wireframes.md) | Design system, page layouts, responsive breakpoints |

---

## 👥 User Roles

| Role | Dashboard | Key Capabilities |
|---|---|---|
| **Citizen** | Citizen Portal | File complaints, upload evidence, track cases, receive notifications |
| **Investigator** | Case Workspace | Manage assigned cases, add notes, update status/priority, communicate with victims |
| **Admin** | Admin Panel | User management, assign investigators, analytics, system oversight |

---

## 🛣️ Roadmap

- [ ] Deploy frontend to **Vercel**
- [ ] Deploy backend to **Render**
- [ ] Migrate to **MongoDB Atlas** for cloud database
- [ ] Add unit tests with **Jest** and **React Testing Library**
- [ ] Integrate Python ML microservice for auto-categorization of complaints
- [ ] Add Socket.io for real-time push notifications
- [ ] Email notifications via Nodemailer integration

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Abdul Muqeet**
Final Year Student

[![GitHub](https://img.shields.io/badge/GitHub-muqeetbuilds-181717?style=flat-square&logo=github)](https://github.com/muqeetbuilds)

---

<p align="center">
  <em>"Empowering citizens. Enabling justice. One complaint at a time."</em>
</p>
