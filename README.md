# OpsPulse — Intelligent Manufacturing Transport & Operations Platform

OpsPulse is a modern MERN stack operational intelligence dashboard designed for manufacturing companies. It provides comprehensive tools for managing transport operations, fleet dispatch workflows, operational incidents, and logistics analytics.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router DOM, Axios, Framer Motion, Recharts, Lucide React
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT Authentication, bcryptjs

## Key Features

- **Authentication Module**: Secure JWT-based registration and login system with role-based access.
- **Dashboard Overview**: Operational metrics, analytics charts, recent activities panel, and quick system overview.
- **Fleet Management**: Track vehicle status, fuel levels, capacities, and driver assignments.
- **Dispatch Workflow**: Manage the end-to-end delivery process from dispatch assignment to delivery.
- **Incident Intelligence**: Semantic categorization of operational issues automatically assessing risk levels and classifying incidents.
- **Analytics Module**: Visual representation of delivery trends and incident distributions.
- **Activity Timeline**: A live feed of system activities for complete operational transparency.

## Folder Structure

The project is structured as a monorepo with `frontend` and `server` directories:

- `/frontend`: Vite React Application
- `/server`: Node.js/Express API Server

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the `/server` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

### 2. Backend Setup

```bash
cd server
npm install
node index.js
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The frontend will start on the port provided by Vite (usually `http://localhost:5173`).

## Deployment

- **Frontend**: Designed to be easily deployed on Vercel. Connect your repository and select Vite as the framework.
- **Backend**: Designed to be easily deployed on Render. Connect your repository, set the build command to `npm install` inside the server directory, and the start command to `node index.js`. Don't forget to add your environment variables.

## Intelligent Incident Categorization

The platform features a lightweight semantic keyword-based engine that automatically parses reported incidents. For example, keywords like "fuel" or "engine" trigger a High-Risk Mechanical categorization, while "weather" or "traffic" fall under Medium-Risk Route Delays. This ensures operational dashboards immediately highlight critical bottlenecks without the overhead of heavy third-party AI APIs.

## Architecture Guidelines

- Minimal Redux, relying on React Context for Auth state.
- Component-driven UI with Tailwind for styling.
- Secure HTTP-only/Bearer Token implementations.
