# Codegnan Ecosystem CRM

Welcome to the Codegnan CRM! This repository houses the custom-built, high-performance Customer Relationship Management software specifically tailored for handling modern operations, sales pipelines, lead conversions, and analytics.

---

## 🏗️ Architecture Stack

This project is built using a **Monorepo** pattern, separated into two decoupled applications working in tandem:

### 1. Frontend (`/frontend`)
The user interface is powered by **Next.js** and **React**, styled with **Tailwind CSS**. It provides a beautifully crafted modern dashboard for managing everything from Contacts to Kanban Pipeline boards.
- **Port**: `3000`
- **Key Modules**: Leads Table, Deals Kanban drag-and-drop board, Contacts list, Dynamic Dashboards.

### 2. Backend (`/backend`)
The data layer is built on **Node.js** with **Express**, utilizing **Prisma ORM** for safe, typed database interactions.
- **Port**: `4000`
- **Database**: SQLite (`dev.db` for local development)
- **Functions**: Serves JSON APIs, processes Lead Conversion transactions, aggregates live dashboard metrics.

---

## 🚀 Getting Started

This repository uses **pnpm workspaces** as its package manager. This automatically links common dependencies and allows you to boot the entire stack with a single command!

### Prerequisites:
- Ensure [Node.js](https://nodejs.org/) is installed.
- Ensure [pnpm](https://pnpm.io/installation) is installed (`npm install -g pnpm`).

### Installation & Initialization
1. **Install all dependencies:**
   From the root folder, run:
   ```bash
   pnpm install
   ```

2. **Initialize the Database:**
   Generate the Prisma client and seed the dummy data into the SQLite database.
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push --force-reset
   npx prisma db seed
   cd ..
   ```

### Running the Application Structure
To start both the Frontend UI and Backend API concurrently, run the following from the **root** directory:
```bash
pnpm dev
```
- Open `http://localhost:3000` to view the beautiful User Interface.
- The Backend server will silently run on `http://localhost:4000`.

---

## 📂 Features Implemented (Phases 1-3)

- **Dashboards:** Live aggregated data showing total leads, statuses, and sources fetched from the database.
- **Leads Module:** Robust table displaying raw prospects with real-time text debounced searching.
- **Contacts Module:** Permanent customer records created seamlessly from raw Leads.
- **Deals Kanban Pipeline:** Interactive Drag-and-Drop board to shift deals between stages (`Qualified` ➔ `Proposal` ➔ `Closed Won`).
- **Conversion Transaction API:** Atomic database logic to convert a Lead into a Contact without losing its associated Deals and Activities.

*Developed by the Codegnan Team.*
