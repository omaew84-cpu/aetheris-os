# AETHERIS OS - Control Tower

ระบบจัดการ AI Agent แบบครบวงจร | Autonomous Agent Orchestration Platform

[![Built with AI Studio](https://img.shields.io/badge/Built%20with-Google%20AI%20Studio-4285F4)](https://aistudio.google.com)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4)](https://tailwindcss.com)

> Control Tower สำหรับรัน, ควบคุม, และวัดผล AI Agents ในที่เดียว

---

## Features

### [C0] Governance - Policy Engine
- Active Policies: ควบคุม PII, risk, Cost guardrails
- Custom Rule Creation: สร้างกฎแบบ real-time
- Sandbox Decision Evaluator: ทดสอบก่อน deploy จริง
- Evaluation Audit Logs

### [R0] Execution - Task Runner
- Task Partner Sync: จับคู่ Agent อัตโนมัติ
- Live Queue Monitoring: RUNNING / COMPLETED / FAILED
- Simulated Loop & Streaming logs
- Advanced Rollback System with Snapshot Checkpoint

### [E0] Economics - ROI Calculator
- ROI Sliders: Setup Cost, ค่าแรง, automation rate
- Financial Metric Boards
- Interactive SVG Line Graph: Cumulative Cost vs Savings
- Export CSV

### Privacy Shield - SOC v6
- AI Privacy Score
- Risk Interpretation
- Event Log + Export CSV

---

## Tech Stack

- **Frontend:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Theme:** Elegant Dark
- **Build Tool:** Google AI Studio

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/omaew84-cpu/aetheris-os.git
cd aetheris-os

# 2. Install
npm install

# 3. Run dev
npm run dev

# 4. Build
npm run build
