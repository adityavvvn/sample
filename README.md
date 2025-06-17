# 🔹 SkillPlot: Visual Resume & Career Mapper

> A modern portfolio and career tracking app that transforms resumes into interactive, visual experiences.

---

## ✅ Overview

SkillPlot is a web app that visualizes a user's skills, projects, and career journey. It replaces the static PDF resume with a dynamic, interactive portfolio that grows with the user. Features include skill graphs, timelines, job matching, and PDF/portfolio export.

---

## 🛠️ Tech Stack

- **Frontend:** React.js + Tailwind CSS + D3.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)
- **Other Tools:** React Router, react-to-print, JWT, Jest

---

## 🧭 Development Phases

### ✅ Phase 1: Project Setup
- Set up full-stack structure (React + Express)
- Install concurrently, nodemon, and CORS
- Configure `.env` for Mongo URI and ports

### 🔄 Phase 2: Frontend Layout
- Create layout with sidebar + main area
- Add navigation (React Router)
- Pages: `/dashboard`, `/skills`, `/projects`, `/job-matches`, `/resume-export`

### ⏳ Phase 3: Interactive Skill Graphs
- Component: `<SkillGraph />`
- Visualize proficiency over time using D3.js

### ⏳ Phase 4: Project Timeline
- Component: `<ProjectTimeline />`
- Scrollable, visual timeline of experience

### ⏳ Phase 5: Backend API
- RESTful endpoints for skills and projects
- Mongoose models for data persistence

### ⏳ Phase 6: Job Matching Board
- Component: `<JobMatchBoard />`
- Match jobs based on skills/tags

### ⏳ Phase 7: Resume Export
- PDF generation and public share links

### ⏳ Phase 8: Comparison Dashboard
- Compare user skills vs job requirements

### ⏳ Phase 9: Authentication
- JWT-based login/register system

### ⏳ Phase 10: Testing & Deployment
- Jest tests and CI/CD pipeline

---

## 📦 Install & Run

```bash
# Install all dependencies
npm run install-all

# Start both client and server
npm run dev

# Or run individually
npm run server  # Backend only
npm run client  # Frontend only
```

---

## 🌐 Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Docs:** http://localhost:5000/api

---

## 📁 Project Structure

```
skillplot/
├── client/          # React frontend
├── server/          # Express backend
├── package.json     # Root package.json
└── README.md        # This file
``` 