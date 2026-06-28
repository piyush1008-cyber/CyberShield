# UI Wireframes — CyberShield

## CyberShield — Cyber Crime Complaint and Investigation Management System

**Version:** 1.0  
**Date:** June 2026

---

## 1. Design System

### 1.1 Color Palette

| Token | Color | Hex | Usage |
|---|---|---|---|
| **Primary** | Deep Blue | `#1E3A5F` | Headers, primary buttons, sidebar |
| **Primary Light** | Steel Blue | `#4A90D9` | Hover states, active elements |
| **Secondary** | Teal | `#0D9488` | Secondary actions, success states |
| **Accent** | Amber | `#F59E0B` | Warnings, attention items |
| **Danger** | Red | `#EF4444` | Errors, delete actions, critical priority |
| **Background** | Slate Gray | `#0F172A` | Page background (dark mode) |
| **Surface** | Dark Slate | `#1E293B` | Cards, panels |
| **Surface Hover** | Lighter Slate | `#334155` | Hover states on cards |
| **Text Primary** | White | `#F8FAFC` | Primary text |
| **Text Secondary** | Light Gray | `#94A3B8` | Secondary text, labels |
| **Border** | Gray | `#334155` | Card borders, dividers |

### 1.2 Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| **Headings** | Inter | 700 (Bold) | 24–32px |
| **Subheadings** | Inter | 600 (Semibold) | 18–20px |
| **Body** | Inter | 400 (Regular) | 14–16px |
| **Labels** | Inter | 500 (Medium) | 12–14px |
| **Buttons** | Inter | 600 (Semibold) | 14px |

### 1.3 Component Styles

| Component | Style |
|---|---|
| **Cards** | Rounded corners (12px), subtle border, dark background |
| **Buttons** | Rounded (8px), gradient on primary, hover scale effect |
| **Inputs** | Dark background, border on focus, rounded (8px) |
| **Tables** | Striped rows, hover highlight, scrollable on mobile |
| **Badges** | Pill-shaped, color-coded by status/priority |
| **Modals** | Centered, backdrop blur, slide-in animation |

---

## 2. Page Layouts

### 2.1 Authentication Pages

#### Login Page
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────────┐ │
│  │                        │  │                            │ │
│  │   🛡️ CyberShield       │  │     Welcome Back           │ │
│  │                        │  │                            │ │
│  │   Illustration /       │  │  ┌──────────────────────┐  │ │
│  │   Hero Image           │  │  │ Email                │  │ │
│  │                        │  │  └──────────────────────┘  │ │
│  │   "Empowering          │  │  ┌──────────────────────┐  │ │
│  │    Citizens.            │  │  │ Password       👁️    │  │ │
│  │    Enabling             │  │  └──────────────────────┘  │ │
│  │    Justice."            │  │                            │ │
│  │                        │  │  [ ] Remember me            │ │
│  │                        │  │  Forgot Password?           │ │
│  │                        │  │                            │ │
│  │                        │  │  ┌──────────────────────┐  │ │
│  │                        │  │  │     🔒 Login          │  │ │
│  │                        │  │  └──────────────────────┘  │ │
│  │                        │  │                            │ │
│  │                        │  │  Don't have an account?    │ │
│  │                        │  │  Register here →           │ │
│  │                        │  │                            │ │
│  └────────────────────────┘  └────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Registration Page
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────────┐ │
│  │                        │  │                            │ │
│  │   🛡️ CyberShield       │  │     Create Account         │ │
│  │                        │  │                            │ │
│  │   Illustration /       │  │  ┌──────────────────────┐  │ │
│  │   Hero Image           │  │  │ Full Name            │  │ │
│  │                        │  │  └──────────────────────┘  │ │
│  │                        │  │  ┌──────────────────────┐  │ │
│  │                        │  │  │ Email Address        │  │ │
│  │                        │  │  └──────────────────────┘  │ │
│  │                        │  │  ┌──────────────────────┐  │ │
│  │                        │  │  │ Phone Number         │  │ │
│  │                        │  │  └──────────────────────┘  │ │
│  │                        │  │  ┌──────────────────────┐  │ │
│  │                        │  │  │ Password       👁️    │  │ │
│  │                        │  │  └──────────────────────┘  │ │
│  │                        │  │  ┌──────────────────────┐  │ │
│  │                        │  │  │ Confirm Password 👁️  │  │ │
│  │                        │  │  └──────────────────────┘  │ │
│  │                        │  │                            │ │
│  │                        │  │  ┌──────────────────────┐  │ │
│  │                        │  │  │   🔐 Register        │  │ │
│  │                        │  │  └──────────────────────┘  │ │
│  │                        │  │                            │ │
│  │                        │  │  Already have an account?  │ │
│  │                        │  │  Login here →              │ │
│  │                        │  │                            │ │
│  └────────────────────────┘  └────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 2.2 Citizen Dashboard

#### Main Dashboard View
```
┌────────────────────────────────────────────────────────────────────────────┐
│  🛡️ CyberShield                                    🔔(3)  👤 Abdul  ▼   │
├──────────────┬─────────────────────────────────────────────────────────────┤
│              │                                                             │
│  📊 Dashboard│  Welcome back, Abdul                                       │
│              │                                                             │
│  📝 File     │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│   Complaint  │  │  Total    │ │  Active   │ │  Resolved │ │  Pending  │  │
│              │  │  Cases    │ │  Cases    │ │  Cases    │ │  Review   │  │
│  📋 My       │  │    12     │ │    5      │ │    6      │ │    1      │  │
│   Complaints │  └───────────┘ └───────────┘ └───────────┘ └───────────┘  │
│              │                                                             │
│  🔍 Track    │  Recent Complaints                          [View All →]   │
│   Complaint  │  ┌─────────────────────────────────────────────────────┐  │
│              │  │ ID          │ Title        │ Category │ Status     │  │
│  🔔 Notifi-  │  ├─────────────────────────────────────────────────────┤  │
│   cations    │  │ CS-2026-... │ Banking...   │ Fraud    │ 🟢 Assigned │  │
│              │  │ CS-2026-... │ Phishing...  │ Phishing │ 🟡 Review   │  │
│  👤 Profile  │  │ CS-2026-... │ Harass...    │ Harass.  │ 🔵 Resolved │  │
│              │  └─────────────────────────────────────────────────────┘  │
│  🚪 Logout   │                                                             │
│              │  Quick Actions                                              │
│              │  ┌─────────────────────┐  ┌─────────────────────┐         │
│              │  │ 📝 File New         │  │ 🔍 Track by ID      │         │
│              │  │    Complaint        │  │                     │         │
│              │  └─────────────────────┘  └─────────────────────┘         │
│              │                                                             │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

#### File Complaint Form
```
┌────────────────────────────────────────────────────────────────────────────┐
│  🛡️ CyberShield                                    🔔(3)  👤 Abdul  ▼   │
├──────────────┬─────────────────────────────────────────────────────────────┤
│              │                                                             │
│  ◀ Back      │  📝 File New Complaint                                     │
│              │  ─────────────────────────────────────                      │
│  SIDEBAR     │                                                             │
│              │  Step 1 of 3: Complaint Details                             │
│              │  ●───────○───────○                                          │
│              │                                                             │
│              │  ┌──────────────────────────────────────────────────────┐  │
│              │  │                                                      │  │
│              │  │  Complaint Title *                                   │  │
│              │  │  ┌──────────────────────────────────────────────┐   │  │
│              │  │  │ e.g., Unauthorized transaction from bank... │   │  │
│              │  │  └──────────────────────────────────────────────┘   │  │
│              │  │                                                      │  │
│              │  │  Crime Category *                                    │  │
│              │  │  ┌──────────────────────────────────────────────┐   │  │
│              │  │  │ ▼ Select a category                          │   │  │
│              │  │  └──────────────────────────────────────────────┘   │  │
│              │  │                                                      │  │
│              │  │  Date of Incident *                                  │  │
│              │  │  ┌──────────────────────────────────────────────┐   │  │
│              │  │  │ 📅 dd/mm/yyyy                                │   │  │
│              │  │  └──────────────────────────────────────────────┘   │  │
│              │  │                                                      │  │
│              │  │  Description *                                       │  │
│              │  │  ┌──────────────────────────────────────────────┐   │  │
│              │  │  │                                              │   │  │
│              │  │  │ Describe the incident in detail...           │   │  │
│              │  │  │                                              │   │  │
│              │  │  └──────────────────────────────────────────────┘   │  │
│              │  │                                                      │  │
│              │  │               [ Cancel ]  [ Next Step → ]           │  │
│              │  │                                                      │  │
│              │  └──────────────────────────────────────────────────────┘  │
│              │                                                             │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

#### Track Complaint
```
┌────────────────────────────────────────────────────────────────────────────┐
│  🛡️ CyberShield                                    🔔(3)  👤 Abdul  ▼   │
├──────────────┬─────────────────────────────────────────────────────────────┤
│              │                                                             │
│  SIDEBAR     │  🔍 Track Your Complaint                                   │
│              │  ─────────────────────────                                  │
│              │                                                             │
│              │  ┌──────────────────────────────────────┐  ┌──────────┐   │
│              │  │ Enter Tracking ID (e.g., CS-2026-...)│  │ 🔍 Track │   │
│              │  └──────────────────────────────────────┘  └──────────┘   │
│              │                                                             │
│              │  ┌──────────────────────────────────────────────────────┐  │
│              │  │  Case: CS-2026-A7B3K9                               │  │
│              │  │  Title: Online Banking Fraud                         │  │
│              │  │  Category: Financial Fraud  │  Priority: 🔴 High    │  │
│              │  │                                                      │  │
│              │  │  Status Timeline:                                    │  │
│              │  │                                                      │  │
│              │  │  ✅ Submitted ─── ✅ Under Review ─── ✅ Assigned    │  │
│              │  │  June 28          June 28              June 28       │  │
│              │  │                                                      │  │
│              │  │  ─── 🔵 Under Investigation ─── ○ Resolved          │  │
│              │  │       June 29                                        │  │
│              │  │                                                      │  │
│              │  │  Assigned Investigator: Officer Khan                 │  │
│              │  │  Last Updated: June 29, 2026 at 2:30 PM             │  │
│              │  │                                                      │  │
│              │  │  ┌──────────────────────────────────────────────┐   │  │
│              │  │  │ 💬 Send Message to Investigator              │   │  │
│              │  │  └──────────────────────────────────────────────┘   │  │
│              │  └──────────────────────────────────────────────────────┘  │
│              │                                                             │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

---

### 2.3 Investigator Dashboard

#### Main Dashboard View
```
┌────────────────────────────────────────────────────────────────────────────┐
│  🛡️ CyberShield                                  🔔(5)  👤 Officer ▼   │
├──────────────┬─────────────────────────────────────────────────────────────┤
│              │                                                             │
│  📊 Dashboard│  Investigation Dashboard                                   │
│              │                                                             │
│  📋 My Cases │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│              │  │  Assigned │ │ Active    │ │ Resolved  │ │ Critical  │  │
│  📁 All Cases│  │  Cases    │ │ Cases     │ │ Cases     │ │ Priority  │  │
│              │  │    15     │ │    8      │ │    5      │ │    2      │  │
│  💬 Messages │  └───────────┘ └───────────┘ └───────────┘ └───────────┘  │
│              │                                                             │
│  👤 Profile  │  Active Cases                    Filter: [▼ All]  🔍      │
│              │  ┌─────────────────────────────────────────────────────┐  │
│  🚪 Logout   │  │ ID          │ Title      │ Priority │ Status     │  │
│              │  ├─────────────────────────────────────────────────────┤  │
│              │  │ CS-2026-... │ Banking... │ 🔴 Crit  │ Active     │  │
│              │  │ CS-2026-... │ ID Theft...│ 🟠 High  │ Active     │  │
│              │  │ CS-2026-... │ Phishing...│ 🟡 Med   │ Active     │  │
│              │  │ CS-2026-... │ Scam...    │ 🟢 Low   │ On Hold    │  │
│              │  └─────────────────────────────────────────────────────┘  │
│              │                                                             │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

#### Case Detail / Investigation Workspace
```
┌────────────────────────────────────────────────────────────────────────────┐
│  🛡️ CyberShield                                  🔔(5)  👤 Officer ▼   │
├──────────────┬─────────────────────────────────────────────────────────────┤
│              │                                                             │
│  ◀ Back      │  Case: CS-2026-A7B3K9                    Priority: 🔴 High│
│              │  ─────────────────────────────────────────────────────────  │
│  SIDEBAR     │                                                             │
│              │  ┌─────────────────────────┐  ┌────────────────────────┐  │
│              │  │  Complaint Details       │  │  Evidence Files (3)   │  │
│              │  │                          │  │                        │  │
│              │  │  Title: Banking Fraud    │  │  📎 screenshot.png    │  │
│              │  │  Category: Financial     │  │  📎 email_proof.pdf   │  │
│              │  │  Filed: June 28, 2026    │  │  📎 chat_log.txt      │  │
│              │  │  Citizen: Abdul Rahman   │  │                        │  │
│              │  │                          │  │  [Download All]        │  │
│              │  │  Description:            │  │                        │  │
│              │  │  Rs. 50,000 debited...   │  └────────────────────────┘  │
│              │  └─────────────────────────┘                               │
│              │                                                             │
│              │  Investigation Notes                      [ + Add Note ]  │
│              │  ┌──────────────────────────────────────────────────────┐  │
│              │  │  🕐 June 29, 2:30 PM                                │  │
│              │  │  Bank confirmed unauthorized access from IP...       │  │
│              │  │                                                      │  │
│              │  │  🕐 June 28, 11:00 AM                               │  │
│              │  │  Contacted the bank for transaction logs...          │  │
│              │  └──────────────────────────────────────────────────────┘  │
│              │                                                             │
│              │  ┌──────────────────────────────────────────┐             │
│              │  │  Update Status: [▼ Under Investigation]  │             │
│              │  │  [ Mark as Resolved ]  [ Request Info ]  │             │
│              │  └──────────────────────────────────────────┘             │
│              │                                                             │
│              │  Communication with Citizen                                │
│              │  ┌──────────────────────────────────────────────────────┐  │
│              │  │  👮 Officer: Please share any OTP messages...        │  │
│              │  │  👤 Abdul: I received a call asking for OTP...       │  │
│              │  │                                                      │  │
│              │  │  ┌──────────────────────────┐  ┌──────┐             │  │
│              │  │  │ Type a message...         │  │ Send │             │  │
│              │  │  └──────────────────────────┘  └──────┘             │  │
│              │  └──────────────────────────────────────────────────────┘  │
│              │                                                             │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

---

### 2.4 Admin Dashboard

#### Main Dashboard View
```
┌────────────────────────────────────────────────────────────────────────────┐
│  🛡️ CyberShield                                    🔔(2)  👤 Admin  ▼  │
├──────────────┬─────────────────────────────────────────────────────────────┤
│              │                                                             │
│  📊 Dashboard│  Admin Control Center                                      │
│              │                                                             │
│  📋 All      │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│   Complaints │  │  Total    │ │  Total    │ │  Pending  │ │  Resolved │  │
│              │  │  Users    │ │ Complaints│ │  Review   │ │  Today    │  │
│  👥 Manage   │  │   156     │ │   342     │ │    23     │ │    8      │  │
│   Users      │  └───────────┘ └───────────┘ └───────────┘ └───────────┘  │
│              │                                                             │
│  📊 Analytics│  Complaints by Category            Complaints Over Time    │
│              │  ┌─────────────────────────┐  ┌─────────────────────────┐  │
│  📄 Reports  │  │                         │  │                         │  │
│              │  │   [PIE CHART]            │  │   [LINE CHART]          │  │
│  ⚙️ Settings │  │                         │  │                         │  │
│              │  │  Fraud: 35%              │  │  Monthly trend showing  │  │
│  🚪 Logout   │  │  Phishing: 22%          │  │  complaint volumes      │  │
│              │  │  Harassment: 18%         │  │                         │  │
│              │  │  Other: 25%              │  │                         │  │
│              │  └─────────────────────────┘  └─────────────────────────┘  │
│              │                                                             │
│              │  Recent Complaints (Pending Review)         [View All →]   │
│              │  ┌─────────────────────────────────────────────────────┐  │
│              │  │ ID          │ Citizen    │ Category │ Action       │  │
│              │  ├─────────────────────────────────────────────────────┤  │
│              │  │ CS-2026-... │ Abdul R.   │ Fraud    │ [Review ▼]   │  │
│              │  │ CS-2026-... │ Sara K.    │ Phishing │ [Review ▼]   │  │
│              │  │ CS-2026-... │ Raj M.     │ Scam     │ [Review ▼]   │  │
│              │  └─────────────────────────────────────────────────────┘  │
│              │                                                             │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

#### User Management Page
```
┌────────────────────────────────────────────────────────────────────────────┐
│  🛡️ CyberShield                                    🔔(2)  👤 Admin  ▼  │
├──────────────┬─────────────────────────────────────────────────────────────┤
│              │                                                             │
│  SIDEBAR     │  👥 User Management                    [ + Add User ]     │
│              │  ────────────────────                                       │
│              │                                                             │
│              │  🔍 Search: [________________]  Role: [▼ All]  Status: [▼] │
│              │                                                             │
│              │  ┌─────────────────────────────────────────────────────┐  │
│              │  │ Name        │ Email        │ Role    │ Status │ ⚙️  │  │
│              │  ├─────────────────────────────────────────────────────┤  │
│              │  │ Abdul R.    │ abdul@...    │ Citizen │ 🟢 Act │ ✏️🗑│  │
│              │  │ Officer K.  │ khan@...     │ Invest. │ 🟢 Act │ ✏️🗑│  │
│              │  │ Sara K.     │ sara@...     │ Citizen │ 🔴 Ina │ ✏️🗑│  │
│              │  │ Insp. Raj   │ raj@...      │ Invest. │ 🟢 Act │ ✏️🗑│  │
│              │  └─────────────────────────────────────────────────────┘  │
│              │                                                             │
│              │  Showing 1-10 of 156 users       [◀ Prev]  [Next ▶]      │
│              │                                                             │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

#### Assign Investigator Modal
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  ╔═══════════════════════════════════════════╗   │   │
│  │  ║  Assign Investigator                   ✕  ║   │   │
│  │  ╠═══════════════════════════════════════════╣   │   │
│  │  ║                                           ║   │   │
│  │  ║  Case: CS-2026-A7B3K9                     ║   │   │
│  │  ║  Category: Financial Fraud                ║   │   │
│  │  ║                                           ║   │   │
│  │  ║  Select Investigator:                     ║   │   │
│  │  ║  ┌───────────────────────────────────┐    ║   │   │
│  │  ║  │ ○ Officer Khan (3 active cases)   │    ║   │   │
│  │  ║  │ ● Insp. Raj  (1 active case)     │    ║   │   │
│  │  ║  │ ○ SI Priya   (5 active cases)     │    ║   │   │
│  │  ║  └───────────────────────────────────┘    ║   │   │
│  │  ║                                           ║   │   │
│  │  ║  Priority:                                ║   │   │
│  │  ║  [▼ High                              ]   ║   │   │
│  │  ║                                           ║   │   │
│  │  ║       [ Cancel ]  [ ✅ Assign Case ]      ║   │   │
│  │  ║                                           ║   │   │
│  │  ╚═══════════════════════════════════════════╝   │   │
│  │                                                   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Status Badge Colors

| Status | Background | Text | Icon |
|---|---|---|---|
| Submitted | `#3B82F6` (Blue) | White | 📩 |
| Under Review | `#F59E0B` (Amber) | Dark | 🔍 |
| Rejected | `#EF4444` (Red) | White | ❌ |
| Assigned | `#8B5CF6` (Purple) | White | 📌 |
| Under Investigation | `#F97316` (Orange) | White | 🔎 |
| Resolved | `#10B981` (Green) | White | ✅ |
| Closed | `#6B7280` (Gray) | White | 📁 |

## 4. Priority Badge Colors

| Priority | Background | Text |
|---|---|---|
| Low | `#10B981` (Green) | White |
| Medium | `#F59E0B` (Amber) | Dark |
| High | `#F97316` (Orange) | White |
| Critical | `#EF4444` (Red) | White |

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Layout Change |
|---|---|---|
| **Mobile** | < 640px | Sidebar collapses to hamburger menu, single column layout |
| **Tablet** | 640–1024px | Sidebar as overlay, 2-column stats grid |
| **Desktop** | > 1024px | Full sidebar visible, multi-column layout |

---

## 6. Navigation Structure

### Citizen Navigation
```
├── Dashboard (Home)
├── File Complaint
├── My Complaints
│   └── Complaint Detail
├── Track Complaint
├── Notifications
├── Profile
└── Logout
```

### Investigator Navigation
```
├── Dashboard (Home)
├── My Cases
│   └── Case Detail
│       ├── Investigation Notes
│       └── Communication
├── Messages
├── Profile
└── Logout
```

### Admin Navigation
```
├── Dashboard (Home)
├── All Complaints
│   └── Complaint Detail
│       └── Assign Investigator
├── Manage Users
│   ├── Add User
│   └── Edit User
├── Analytics
├── Reports
├── Settings
└── Logout
```
