# Project Overview

This is a full-stack task management application.

- **Frontend:** The frontend is a React application built with Vite and written in TypeScript. It uses Zustand for global state management, TanStack Query for handling server state, and React Router for navigation. The UI is styled with Chakra UI and Tailwind CSS.
- **Backend:** The backend is a Node.js/Express server written in TypeScript. It provides a REST API for the frontend and uses a SQLite database for data storage. Authentication is handled using JWT.
- **Architecture:** The project follows the Feature-Sliced Design (FSD) methodology for code organization.

## Building and Running

The project is containerized using Docker.

### Running the application
To run the entire application (both frontend and backend), use Docker Compose:
```bash
sudo docker-compose up
```

To stop the application:
```bash
sudo docker-compose down
```

### Development Scripts

You can also run the frontend and backend services individually in development mode.

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd server
npm install
npm run dev
```

### Testing

**Frontend:**
```bash
cd frontend
npm test
```

## Development Conventions

- **Code Style:** The project uses ESLint to enforce a consistent code style. Run `npm run lint` in the `frontend` directory to check for issues.
- **Type-checking:** TypeScript is used in both the frontend and backend for static type-checking.
- **Branching Strategy:** (TODO: Please document the branching strategy, e.g., GitFlow)
- **Commit Messages:** (TODO: Please document the convention for commit messages)
