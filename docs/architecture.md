# System Architecture — CyberShield

## CyberShield — Cyber Crime Complaint and Investigation Management System

**Version:** 1.0  
**Date:** June 2026

---

## 1. High-Level Architecture

CyberShield follows a **3-Tier Architecture** with a clear separation between the presentation layer, business logic layer, and data layer.

```mermaid
graph TB
    subgraph Presentation Layer
        WEB["React.js + Tailwind CSS<br/>(Single Page Application)"]
    end

    subgraph Business Logic Layer
        API["Node.js + Express.js<br/>(REST API Server)"]
        AUTH["JWT Authentication<br/>+ RBAC Middleware"]
        UPLOAD["File Upload Service<br/>(Multer / Cloudinary)"]
    end

    subgraph Data Layer
        DB["MongoDB<br/>(Document Database)"]
        CLOUD["Cloudinary<br/>(Evidence Storage)"]
    end

    subgraph Optional
        ML["Python ML Microservice<br/>(FastAPI)"]
    end

    WEB -->|"HTTP/HTTPS<br/>REST API Calls"| API
    API --> AUTH
    API --> UPLOAD
    API -->|"Mongoose ODM"| DB
    UPLOAD -->|"File Storage"| CLOUD
    API -.->|"HTTP Request"| ML
    ML -.->|"Category & Priority"| API
```

---

## 2. Architecture Pattern

### Client-Server with REST API

| Layer | Technology | Responsibility |
|---|---|---|
| **Frontend** | React.js + Tailwind CSS | User interface, form handling, routing, state management |
| **Backend** | Node.js + Express.js | API routing, business logic, authentication, authorization |
| **Database** | MongoDB (Mongoose ODM) | Data persistence, querying, indexing |
| **File Storage** | Cloudinary / Local uploads | Secure evidence file storage and retrieval |
| **ML Service** | Python FastAPI *(optional)* | Complaint auto-categorization and priority prediction |

---

## 3. Component Diagram

### 3.1 Frontend Components

```mermaid
graph TB
    subgraph React Application
        APP["App.jsx<br/>(Root Component)"]
        
        subgraph Auth Pages
            LOGIN["LoginPage"]
            REGISTER["RegisterPage"]
        end

        subgraph Citizen Dashboard
            CIT_DASH["CitizenDashboard"]
            CIT_FILE["FileComplaint"]
            CIT_TRACK["TrackComplaint"]
            CIT_LIST["MyComplaints"]
            CIT_DETAIL["ComplaintDetail"]
            CIT_NOTIF["Notifications"]
        end

        subgraph Investigator Dashboard
            INV_DASH["InvestigatorDashboard"]
            INV_CASES["AssignedCases"]
            INV_DETAIL["CaseDetail"]
            INV_NOTES["InvestigationNotes"]
            INV_COMM["Communication"]
        end

        subgraph Admin Dashboard
            ADM_DASH["AdminDashboard"]
            ADM_USERS["ManageUsers"]
            ADM_CASES["AllCases"]
            ADM_ASSIGN["AssignInvestigator"]
            ADM_STATS["Analytics"]
        end

        subgraph Shared Components
            NAVBAR["Navbar"]
            SIDEBAR["Sidebar"]
            CARD["StatusCard"]
            TABLE["DataTable"]
            MODAL["Modal"]
            LOADER["LoadingSpinner"]
            ALERT["AlertBanner"]
        end

        subgraph Services
            API_SVC["apiService.js"]
            AUTH_SVC["authService.js"]
        end

        subgraph Context
            AUTH_CTX["AuthContext"]
            NOTIF_CTX["NotificationContext"]
        end
    end

    APP --> AUTH_CTX
    APP --> NOTIF_CTX
    APP --> LOGIN
    APP --> REGISTER
    APP --> CIT_DASH
    APP --> INV_DASH
    APP --> ADM_DASH

    CIT_DASH --> CIT_FILE
    CIT_DASH --> CIT_TRACK
    CIT_DASH --> CIT_LIST
    CIT_DASH --> CIT_NOTIF
    CIT_LIST --> CIT_DETAIL

    INV_DASH --> INV_CASES
    INV_CASES --> INV_DETAIL
    INV_DETAIL --> INV_NOTES
    INV_DETAIL --> INV_COMM

    ADM_DASH --> ADM_USERS
    ADM_DASH --> ADM_CASES
    ADM_CASES --> ADM_ASSIGN
    ADM_DASH --> ADM_STATS
```

### 3.2 Backend Components

```mermaid
graph TB
    subgraph Express Server
        SERVER["server.js<br/>(Entry Point)"]
        
        subgraph Middleware
            MW_AUTH["authMiddleware.js<br/>(JWT Verification)"]
            MW_ROLE["roleMiddleware.js<br/>(RBAC Check)"]
            MW_UPLOAD["uploadMiddleware.js<br/>(Multer Config)"]
            MW_ERROR["errorMiddleware.js<br/>(Global Error Handler)"]
            MW_RATE["rateLimiter.js<br/>(Rate Limiting)"]
        end

        subgraph Routes
            RT_AUTH["authRoutes.js"]
            RT_COMP["complaintRoutes.js"]
            RT_INV["investigationRoutes.js"]
            RT_USER["userRoutes.js"]
            RT_ADMIN["adminRoutes.js"]
            RT_NOTIF["notificationRoutes.js"]
        end

        subgraph Controllers
            CT_AUTH["authController.js"]
            CT_COMP["complaintController.js"]
            CT_INV["investigationController.js"]
            CT_USER["userController.js"]
            CT_ADMIN["adminController.js"]
            CT_NOTIF["notificationController.js"]
        end

        subgraph Models
            MD_USER["User.js"]
            MD_COMP["Complaint.js"]
            MD_INV["Investigation.js"]
            MD_EVID["Evidence.js"]
            MD_NOTIF["Notification.js"]
        end

        subgraph Config
            CFG_DB["db.js<br/>(MongoDB Connection)"]
            CFG_CLOUD["cloudinary.js"]
        end

        subgraph Utils
            UT_TOKEN["generateToken.js"]
            UT_TRACK["generateTrackingId.js"]
            UT_ENCRYPT["encryption.js"]
        end
    end

    SERVER --> MW_AUTH
    SERVER --> MW_ERROR
    SERVER --> RT_AUTH
    SERVER --> RT_COMP
    SERVER --> RT_INV
    SERVER --> RT_USER
    SERVER --> RT_ADMIN

    RT_AUTH --> CT_AUTH
    RT_COMP --> CT_COMP
    RT_INV --> CT_INV
    RT_USER --> CT_USER
    RT_ADMIN --> CT_ADMIN
    RT_NOTIF --> CT_NOTIF

    CT_AUTH --> MD_USER
    CT_COMP --> MD_COMP
    CT_COMP --> MD_EVID
    CT_INV --> MD_INV
    CT_ADMIN --> MD_USER
    CT_ADMIN --> MD_COMP
    CT_NOTIF --> MD_NOTIF
```

---

## 4. API Endpoint Design

### 4.1 Authentication APIs

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new citizen account | Public |
| POST | `/api/auth/login` | Login and receive JWT token | Public |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| POST | `/api/auth/reset-password` | Reset password with token | Public |
| GET | `/api/auth/profile` | Get current user profile | Authenticated |
| PUT | `/api/auth/profile` | Update current user profile | Authenticated |

### 4.2 Complaint APIs

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/complaints` | File a new complaint | Citizen |
| GET | `/api/complaints` | Get all complaints (filtered by role) | Authenticated |
| GET | `/api/complaints/:id` | Get complaint details by ID | Authenticated |
| GET | `/api/complaints/track/:trackingId` | Track complaint by Tracking ID | Citizen |
| PUT | `/api/complaints/:id` | Update complaint details | Citizen (own) |
| PUT | `/api/complaints/:id/status` | Update complaint status | Investigator / Admin |
| POST | `/api/complaints/:id/evidence` | Upload evidence files | Citizen |
| GET | `/api/complaints/:id/evidence` | Get evidence list | Authenticated |

### 4.3 Investigation APIs

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/investigations` | Get all investigations | Investigator / Admin |
| GET | `/api/investigations/:complaintId` | Get investigation for a complaint | Authenticated |
| POST | `/api/investigations/:complaintId/notes` | Add investigation note | Investigator |
| PUT | `/api/investigations/:complaintId/priority` | Set case priority | Investigator |
| POST | `/api/investigations/:complaintId/communicate` | Send message to citizen | Investigator |

### 4.4 Admin APIs

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/admin/users` | Get all users | Admin |
| POST | `/api/admin/users` | Create user (investigator) | Admin |
| PUT | `/api/admin/users/:id` | Update user details/role | Admin |
| DELETE | `/api/admin/users/:id` | Deactivate user account | Admin |
| PUT | `/api/admin/complaints/:id/assign` | Assign investigator to case | Admin |
| GET | `/api/admin/stats` | Get system statistics | Admin |
| GET | `/api/admin/reports` | Generate reports | Admin |

### 4.5 Notification APIs

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/notifications` | Get user's notifications | Authenticated |
| PUT | `/api/notifications/:id/read` | Mark notification as read | Authenticated |
| PUT | `/api/notifications/read-all` | Mark all as read | Authenticated |

---

## 5. Authentication & Authorization Flow

```mermaid
sequenceDiagram
    participant User
    participant React as React Frontend
    participant Express as Express API
    participant JWT as JWT Service
    participant DB as MongoDB

    Note over User, DB: Registration Flow
    User->>React: Fill registration form
    React->>Express: POST /api/auth/register
    Express->>DB: Save user (password hashed)
    DB-->>Express: User created
    Express-->>React: Success response
    React-->>User: Redirect to login

    Note over User, DB: Login Flow
    User->>React: Enter credentials
    React->>Express: POST /api/auth/login
    Express->>DB: Find user by email
    DB-->>Express: User data
    Express->>JWT: Generate token (userId, role)
    JWT-->>Express: JWT token
    Express-->>React: Token + user data
    React-->>User: Redirect to dashboard

    Note over User, DB: Authenticated Request
    User->>React: Access protected feature
    React->>Express: GET /api/complaints (Bearer token)
    Express->>JWT: Verify token
    JWT-->>Express: Decoded payload (userId, role)
    Express->>Express: Check role permissions
    Express->>DB: Query data
    DB-->>Express: Results
    Express-->>React: JSON response
    React-->>User: Display data
```

### Role-Based Middleware Logic

```
Request → authMiddleware (verify JWT) → roleMiddleware (check role) → Controller

Roles Hierarchy:
  - Admin    → Full access to all endpoints
  - Investigator → Access to investigation + own profile endpoints
  - Citizen  → Access to complaint filing + tracking + own profile
```

---

## 6. Deployment Architecture

```mermaid
graph LR
    subgraph Client
        BROWSER["User's Browser"]
    end

    subgraph Vercel
        REACT["React App<br/>(Static Build)"]
    end

    subgraph Render
        NODE["Node.js Server<br/>(Express API)"]
    end

    subgraph MongoDB Atlas
        MONGO["MongoDB Cluster<br/>(Cloud Database)"]
    end

    subgraph Cloudinary
        CDN["Media Storage<br/>(Evidence Files)"]
    end

    BROWSER -->|"HTTPS"| REACT
    REACT -->|"API Calls"| NODE
    NODE -->|"Mongoose"| MONGO
    NODE -->|"Upload SDK"| CDN
```

| Service | Platform | Purpose |
|---|---|---|
| Frontend | Vercel | Static site hosting with CDN |
| Backend | Render | Node.js server hosting |
| Database | MongoDB Atlas | Cloud database (Free Tier available) |
| File Storage | Cloudinary | Evidence file uploads (Free Tier available) |

---

## 7. Security Architecture

| Security Measure | Implementation |
|---|---|
| **Password Hashing** | bcrypt with salt rounds = 12 |
| **Authentication** | JWT with 24h expiry, HTTP-only cookies |
| **Authorization** | Role-based middleware (RBAC) |
| **Data Encryption** | AES-256 for sensitive fields |
| **HTTPS** | TLS/SSL enforced in production |
| **Input Validation** | Express-validator for all inputs |
| **XSS Protection** | Helmet.js security headers |
| **CSRF Protection** | CSRF tokens for state-changing requests |
| **Rate Limiting** | express-rate-limit (100 req/15min for auth) |
| **File Validation** | MIME type checking, file size limits (10MB) |
| **CORS** | Restricted to frontend domain only |
