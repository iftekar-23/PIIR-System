# 🏙️ Public Infrastructure Issue Reporting System

A full-stack web application that allows citizens to report public infrastructure issues such as broken streetlights, potholes, water leakage, garbage overflow, and damaged footpaths. The system enables admins and staff to manage, track, and resolve issues efficiently with full transparency and role-based access control.

---

## 🌐 Live Website
🔗 **Live Site URL:** https://cityfix1.netlify.app

---

## 🔐 Admin Credentials
> Use the following credentials to access the Admin Dashboard

- **Admin Email:** admin@gmail.com  
- **Admin Password:** @Admin1

---

## 👥 Test User Credentials

### 🧑‍🔧 Staff Account
- **Email:** rifat@gmail.com  
- **Password:** @rifat1

> This staff account already has assigned issues and can update issue status.

### 🧑 Citizen Account
- **Email:** adnan@gmail.com  
- **Password:** @adnan1 

> This citizen account is a **non-premium user** and has already reported **2 issues**.

---

## 📂 GitHub Repositories
- **Client Repository:** https://github.com/iftekar-23/PIIR-System  
- **Server Repository:** https://github.com/iftekar-23/PIIR-System-Server.git

---

## ✨ Key Features

- ✅ Citizens can report public infrastructure issues with images, category, and location.
- 🔐 Secure authentication using **Firebase (Email/Password & Google Sign-In)**.
- 🧑‍💼 **Role-based dashboards** for Admin, Staff, and Citizens.
- 📌 Complete **issue lifecycle tracking** (Pending → In-Progress → Resolved → Closed).
- 🕒 **Issue Timeline / Activity Log** showing all actions with date, time, and user role.
- 🚀 **Boost Issue Priority** via Stripe payment (100 TK per issue).
- 💎 **Premium Subscription System** for citizens (1000 TK for unlimited issue reporting).
- 👍 Public **Upvote system** (one upvote per user, own issue upvote restricted).
- 📊 Interactive **dashboard analytics & charts** using real-time data.
- 🧾 **Downloadable Invoice PDFs** for payments (Admin & User).
- 🔎 **Server-side pagination, search, and filtering** on All Issues page.
- 🛡️ **JWT token verification & role-based middleware** for API security.
- 🔔 SweetAlert & Toast notifications for all CRUD actions.
- 📱 Fully **responsive design** (mobile, tablet, desktop).
- 🌗 Optional UI enhancements like animations and interceptors implemented.

---

## 🛠️ Technologies Used

### Frontend
- React.js
- Tailwind CSS / DaisyUI
- TanStack Query
- Axios
- Firebase Authentication
- Stripe Payment Gateway
- Framer Motion
- React PDF

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe API
- Firebase Admin SDK

---

## 🔒 Security & Best Practices
- Environment variables used to hide Firebase & MongoDB credentials
- Private routes remain logged in after refresh
- Admin-only actions protected with role-based authorization
- No Lorem Ipsum text used anywhere in the application

---

## 📌 Notes
- Images are hosted using third-party image hosting.
- Staff passwords are created by admin for assignment simplicity (not recommended in real-world apps).
- Project follows proper commit history:
  - ✔️ 20+ meaningful client-side commits
  - ✔️ 12+ meaningful server-side commits

---

## 📞 Contact
If you have any questions or feedback, feel free to reach out.

**Author:** Md Iftakar Ahmed  
**Project Type:** Full Stack MERN Application  
