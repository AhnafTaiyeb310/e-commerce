# Modern E-commerce Starter: Next.js + Django (Professional Auth)

A high-performance, secure, and production-ready starter kit for building modern e-commerce applications. This repo bridges the gap between **Django (REST Framework)** and **Next.js (App Router)** with a seamless, professional authentication flow.

## 🌟 Key Features

-   **Professional Auth Flow**: 
    -   Secure **HttpOnly Cookie-based** JWT Authentication.
    -   Full **Google Social Sign-in** integration.
    -   **REST-based Email Verification**: User clicks link in Gmail -> Auto-logs in via Next.js handshake.
    -   Protected & Guest routing logic with automatic `redirectTo` memory.
-   **Modern Tech Stack**:
    -   **Frontend**: Next.js 15+ (App Router), Zustand (State), React Query (Data Fetching), Tailwind CSS, Sonner (Toasts).
    -   **Backend**: Django 6+, DRF, `dj-rest-auth`, `django-allauth`.
-   **Developer Experience (DX)**:
    -   Full **Docker** setup (Postgres, Redis, Celery, Mailpit).
    -   Standard directory structure for scalable projects.
    -   Comprehensive error handling and debug logging.

---

## 🚀 Getting Started

### 1. Prerequisites
-   Docker and Docker Compose
-   Node.js 18+ (for local frontend development)

### 2. Setup Backend (Docker)
```bash
cd e_commerce
# Copy env example and add your keys
cp .envs/.local/.django.example .envs/.local/.django
docker compose -f docker-compose.local.yml up --build
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Configuration
-   **Email**: Access the local dashboard at `http://localhost:8025` (Mailpit).
-   **Admin**: Access Django Admin at `http://localhost:8000/admin`.
-   **Environment**: Add your Google Client ID/Secret to your `.env` files to enable social login.

---

## 🔒 Advanced Auth Handshake
This starter implements an industry-standard handshake for email verification in decoupled apps:
1.  **Backend** generates a verification link pointing to the **Frontend** (`/verify-email/[key]`).
2.  **Frontend** captures the key and sends a background `POST` to the backend.
3.  **Backend** validates and issues **Secure Cookies** directly to the browser.
4.  **Frontend** updates the global store and redirects the user home.

---

## 🛠️ Tech Stack
-   **Backend**: Python, Django, DRF, Celery, Redis, Postgres.
-   **Frontend**: React, Next.js, Zustand, TanStack Query, Axios.
-   **Dev Tools**: Mailpit (Email testing), Docker.

## ⭐ Show your support
If this starter helps you, please consider giving it a ⭐ on GitHub!

## 📄 License
This project is licensed under the MIT License.
