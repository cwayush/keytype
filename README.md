# Progress Project

This monorepo contains everything you need to run and develop the **Progress** project. It is organized for easy local development and production deployment.

## 📁 Project Structure

```
progress/
├── frontend/     # Next.js app, React components, UI
├── packages/
│   └── db/       # Prisma schema, database client
├── wsredis/      # WebSocket & Redis integration
├── package.json  # Monorepo root config
├── turbo.json    # Turbo monorepo tasks
```

## 🚀 How It Works

- **frontend/**: User interface built with Next.js and React. Handles authentication, UI, and client logic.
- **packages/db/**: Contains Prisma schema and database client for MySQL. Shared by other apps.
- **wsredis/**: Real-time features using WebSocket and Redis, powered by Express and ioredis.

## 🛠️ Local Development

1. **Install dependencies**

   - Run `npm install` in the root folder. This installs all dependencies for every workspace.

2. **Database setup**

   - Edit `packages/db/prisma/schema.prisma` for your DB config.
   - Set your `DATABASE_URL` in `.env` files as needed.
   - Run migrations and generate Prisma client:
     ```sh
     cd packages/db
     npm run db:setup
     ```

3. **Start apps**

   - Frontend: `cd frontend && npm run dev`
   - wsredis: `cd wsredis && npm run dev`

4. **Monorepo tasks**
   - Use Turbo (`turbo.json`) for running tasks across workspaces:
     - `npm run dev` (from root) runs all dev servers in parallel.
     - `npm run build` (from root) builds all apps.

## 🌐 Production Deployment

1. **Build all apps**

   - From the root, run:
     ```sh
     npm run build
     ```

2. **Start production servers**

   - Frontend: `cd frontend && npm start`
   - wsredis: `cd wsredis && npm start`

3. **Environment variables**
   - Ensure all `.env` files are set up for production (e.g., `DATABASE_URL`, Redis connection, etc).

## 🗄️ Database

- Uses MySQL (see `packages/db/prisma/schema.prisma`).
- Manage schema and migrations with Prisma CLI (`npm run db:migrate`, `npm run db:studio`, etc).

## 🤝 Contributing

1. Fork the repo & create a new branch.
2. Follow the code style and structure.
3. Make your changes and commit.
4. Open a pull request with a clear description.

## 📬 Contact

For help or questions, open an issue or contact the maintainer.

---

Feel free to improve this README as the project grows!
