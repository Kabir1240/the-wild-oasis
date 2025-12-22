# The Wild Oasis - Hotel Management Dashboard

![React](https://img.shields.io/badge/React-18-blue)
![Supabase](https://img.shields.io/badge/Backend-Supabase-green)
![Style](https://img.shields.io/badge/Styling-Styled%20Components-pink)

## 📋 Project Overview
**The Wild Oasis** is a comprehensive internal SaaS tool designed for hotel staff to manage cabin bookings, guests, and operational metrics. It features a real-time dashboard, complex data filtering, and a secure authentication system.

This project was engineered to implement advanced **State Management patterns** (React Query) and robust **Server-Side Rendering** integration.

## ✨ Key Features

* **📊 Business Dashboard:** Visualizes sales statistics, occupancy rates, and activity logs using Recharts.
* **🏨 Cabin Management:** Complete CRUD operations for hotel cabins with image upload capabilities.
* **📅 Booking System:** Status management (Check-in/Check-out) with server-side logic to handle payment confirmation.
* **🔐 Authentication:** Secure staff login via Supabase Auth (JWT) with row-level security (RLS).
* **🌙 Dark Mode:** Fully responsive UI with toggleable dark/light themes.

## 🛠 Tech Stack

* **Framework:** React.js (Vite)
* **State Management:** React Query (TanStack Query) for remote state, Context API for UI state.
* **Backend / DB:** Supabase (PostgreSQL).
* **Styling:** Styled Components.
* **Forms:** React Hook Form.

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Kabir1240/the-wild-oasis.git](https://github.com/Kabir1240/the-wild-oasis.git)
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_KEY=your_supabase_anon_key
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
