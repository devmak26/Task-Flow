# TaskFlow Pro 🚀

TaskFlow Pro is a modern AI-powered task management application built with Next.js, Prisma, PostgreSQL, and Groq AI.

## Features

* ✅ User Authentication (Signup / Login / Logout)
* ✅ Create, Update, Delete Tasks
* ✅ Mark Tasks as Completed
* ✅ Task Priorities (Low, Medium, High)
* ✅ Due Date Management
* ✅ Search Tasks
* ✅ Filter Tasks (All, Pending, Completed)
* ✅ AI-Powered Subtask Generation
* ✅ Secure JWT Authentication
* ✅ PostgreSQL Database with Prisma ORM
* ✅ Responsive Modern UI

## Tech Stack

* Next.js 
* React 
* TypeScript
* Prisma ORM
* PostgreSQL (Supabase)
* Groq AI API
* JWT Authentication
* Tailwind CSS


## Installation

### Clone Repository

```bash
git clone https://github.com/devmak26/Task-Flow.git
cd Task-Flow
```

### Install Dependencies

Using pnpm:

```bash
pnpm install
```

Or using npm:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL_POSTGRES=YOUR_DATABASE_URL
JWT_SECRET=YOUR_SECRET_KEY
GROQ_API_KEY=YOUR_GROQ_API_KEY

```

### Prisma Setup

```bash
npx prisma generate
npx prisma db push
```

### Run Development Server

```bash
npm run dev
```

## Project Structure

```text
app/
├── api/
├── auth/
├── components/
├── actions.ts
├── page.tsx

lib/
├── auth.ts
├── prisma.ts

prisma/
├── schema.prisma
```
