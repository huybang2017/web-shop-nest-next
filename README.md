# NestJS & Next.js Web Shop Project

This is a full-stack web shop application built with [NestJS](https://nestjs.com/) for the backend and [Next.js](https://nextjs.org/) for the frontend. The backend handles the API, user authentication, and data management, while the frontend provides the user interface for customers to browse products, manage accounts, and make purchases.

## Features

### Backend (NestJS)

- RESTful API for managing products, orders, and users
- JWT authentication with role-based access control (Admin, Customer)
- Integration with MySQL using TypeORM
- CRUD operations for products, orders, and suppliers
- Validation and error handling
- API documentation with Swagger

### Frontend (Next.js)

- Server-side rendering for fast performance and SEO
- Dynamic product pages and order management
- Authentication and protected routes for customer and admin roles
- Responsive design using Tailwind CSS
- State management with React context or Redux (optional)

## Prerequisites

- Node.js (v16+)
- MySQL database
- NestJS CLI and Next.js CLI (optional but recommended)

## Getting Started

### Backend Setup (NestJS)

1. **Clone the repository**:

```bash
 git clone git@github.com:huybang2017/web-shop-nest-next.git
```

2. **Install dependencies**:

```bash
 cd web-shop-nest-next
 cd backend/
 pnpm install
 cd ..
 cd frontend/
 pnpm install
```

3. Configure dotenv in Backend:

```bash
cp backend/.env.example backend/.env
```

4. Configure dotenv:

```bash
cd backend && cp .env.example .env
```

5. Run project in backend:

```bash
pnpm run start:dev
```

6. Run project in frontend:

```bash
pnpm run dev
```
