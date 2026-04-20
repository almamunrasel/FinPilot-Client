# FinEase — Personal Finance Management App

### 🌐 Live Site: [https://finease-app.netlify.app](https://finease-app.netlify.app)
### 🔗 Backend API: [https://finease-server.vercel.app](https://finease-server.vercel.app)

---

## 📌 About The Project

**FinEase** is a full-stack personal finance management web application that helps users take control of their money. Users can record income and expense transactions, view financial summaries, track spending by category, and get insightful reports with beautiful charts — all from a clean, responsive dashboard.

---

## ✨ Features

- 🔐 **Secure Authentication** — Email/password registration and login with full JWT-based session management. Google Sign-In supported via Firebase. Private routes are protected and persist correctly on page reload.

- 💸 **Transaction Management** — Add, view, edit, and delete income and expense transactions. Each entry includes type, category, amount, description, and date. All data is stored securely in MongoDB and scoped to the logged-in user.

- 📊 **Financial Reports & Charts** — Visual breakdown of finances using Recharts. Includes a donut Pie Chart for expense categories and a Bar Chart for monthly income vs expense comparison. Filter reports by any month of the year.

- 🧮 **Live Financial Overview** — The home page and transactions dashboard show real-time balance, total income, and total expenses fetched directly from the database — always up to date.

- 👤 **User Profile Management** — Users can view and update their display name and photo URL from their profile page. Changes reflect instantly across the app.

- 📱 **Fully Responsive Design** — Clean, mobile-first UI built with Tailwind CSS. Works seamlessly on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| HTTP Client | Axios (with interceptors) |
| Auth (Google) | Firebase Client SDK |
| Charts | Recharts |
| Alerts | React Toastify, SweetAlert2 |
| State | React Context API |

---

## 📦 Key Dependencies

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "firebase": "^10.x",
  "recharts": "^2.x",
  "react-toastify": "^10.x",
  "sweetalert2": "^11.x",
  "tailwindcss": "^3.x"
}
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/finease-client.git
cd finease-client

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root with:

```bash
VITE_API_BASE_URL=http://localhost:5000/api

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Run Development Server

```bash
npm run dev
```

App runs on `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── assets/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PrivateRoute.jsx
│   ├── GoogleButton.jsx
│   └── LoadingSpinner.jsx
├── config/
│   └── firebase.js
├── context/
│   └── AuthContext.jsx
├── hooks/
│   ├── useAuth.js
│   └── useAxiosSecure.js
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── AddTransaction.jsx
│   ├── AllTransactions.jsx
│   ├── TransactionDetails.jsx
│   ├── Reports.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
└── App.jsx
```

---

## 🔒 Private Routes

The following routes require authentication. Unauthenticated users are redirected to `/login`:

| Route | Page |
|---|---|
| `/transactions` | Transactions Dashboard |
| `/add-transaction` | Add Transaction |
| `/transactionDetails/:id` | Transaction Details & Edit |
| `/reports` | Financial Reports |
| `/profile` | User Profile |

---

## 🌍 Deployment

This project is deployed on **Netlify**.

Add a `_redirects` file inside the `public/` folder to prevent 404 on page reload:
```
/* /index.html 200
```

After deploying, add your Netlify domain to **Firebase Console → Authentication → Authorized Domains**.

---

## 👨‍💻 Author

**Mr. A.M.R**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your@email.com
