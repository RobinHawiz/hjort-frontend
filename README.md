# Hjort Restaurant Frontend

This is the public facing website for Hjort Restaurant. Visitors can explore the concept, browse menus, and make table reservations.

## ✨ Features

- 🏠 Multi-page static site (Home, Meny, Reservera)
- 📆 Reservation form with client-side validation
- 🥂 Dynamic rendering of course and drink menus from backend CMS
- 🔄 Animated UI components (burger menu, loading states)
- 📱 Fully responsive layout for both desktop and mobile users

## 🛠 Tech Stack

- **TypeScript**
- **SCSS**
- **HTML** (multi-page)
- **Vite** (build tool and dev server)

## 🧱 Project Structure

```plaintext
src/
├── pages/             # HTML pages: homepage, menus, reservations
├── ts/                # TypeScript source files
│   ├── booking/       # Reservation logic
│   ├── home/          # Landing page logic
│   ├── menu/          # Menu display logic
│   ├── types/         # Shared type definitions
│   └── utils/         # Shared helpers (API, DOM, errors, UI)
├── styles/            # SCSS styles
└── assets/            # Images and icons
```

## 🧪 Running Locally

### 🧰 Prerequisites

- [Node.js](https://nodejs.org/)
- Git

### 🔧 Step 1: Clone the project

```bash
git clone https://github.com/RobinHawiz/hjort-frontend.git
cd hjort-frontend
```

### 🚀 Step 2: Run the application
```bash
npm install
npm run dev
```
The Frontend now runs locally on [http://localhost:5173](http://localhost:5173) via Vite.
> 🔐 **Note:** The Frontend expects an active backend API running separately on `localhost:4000`.  
> You can find the backend repository here: [hjort-backend](https://github.com/RobinHawiz/hjort-backend).
