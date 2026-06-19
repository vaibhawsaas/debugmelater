# DebugMeLater Backend

Premium source code marketplace API server built with Express.js, TypeScript, and MongoDB.

## Setup

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env .env.local  # edit with your credentials

# Development
npm run dev

# Production
npm run build && npm start
```

## Environment Variables

See `.env` file for all required variables.

## API Endpoints

### Auth
- `POST /api/auth/admin/login` — Admin login
- `POST /api/auth/admin/logout` — Admin logout
- `GET /api/auth/admin/me` — Get current admin

### Projects
- `GET /api/projects` — List published projects (with search/filter/pagination)
- `GET /api/projects/featured` — Get 6 latest featured projects
- `GET /api/projects/:slug` — Get project by slug
- `GET /api/projects/admin/all` — Admin: list all projects
- `POST /api/projects` — Admin: create project
- `PUT /api/projects/:id` — Admin: update project
- `DELETE /api/projects/:id` — Admin: delete project

### Orders
- `POST /api/orders` — Submit order (public)
- `GET /api/orders` — Admin: list orders
- `PATCH /api/orders/:id/approve` — Admin: approve order + send download link
- `PATCH /api/orders/:id/reject` — Admin: reject order

### Downloads
- `GET /api/downloads/:downloadId` — Public: download file (redirects to Cloudinary)
- `GET /api/downloads` — Admin: list all downloads
- `POST /api/downloads/:orderId/regenerate` — Admin: regenerate download link

### Analytics
- `GET /api/analytics/dashboard` — Dashboard stats + charts data
- `GET /api/analytics/orders-by-status` — Orders grouped by status
