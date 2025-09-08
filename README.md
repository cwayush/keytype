# KeyType - Multiplayer Typing Speed Test Application

A modern, real-time multiplayer typing speed test application built with Next.js, featuring user authentication, real-time multiplayer rooms, and comprehensive performance analytics.

## 🏗️ Project Architecture

This is a **monorepo** project using **Turborepo** for efficient build orchestration and workspace management. The project consists of three main packages:

- **Frontend** - Next.js React application
- **Database Package** - Prisma ORM with PostgreSQL
- **WebSocket Service** - Real-time communication server

## 🚀 Technologies Used & Why

### **Frontend Technologies**

#### **Next.js 15.4.5** - React Framework

- **Why**: Provides server-side rendering, API routes, and excellent developer experience
- **Purpose**: Powers the main web application with modern React features
- **Benefits**: SEO optimization, fast page loads, built-in API routes

#### **React 19.1.0** - UI Library

- **Why**: Industry standard for building interactive user interfaces
- **Purpose**: Creates responsive and dynamic typing test interface
- **Benefits**: Component reusability, virtual DOM, large ecosystem

#### **TypeScript 5** - Type Safety

- **Why**: Prevents runtime errors and improves code maintainability
- **Purpose**: Type-safe development across the entire frontend
- **Benefits**: Better IDE support, catch errors at compile time

#### **Tailwind CSS 4** - Styling Framework

- **Why**: Utility-first CSS framework for rapid UI development
- **Purpose**: Consistent, responsive design system
- **Benefits**: Fast development, consistent spacing, responsive design

### **Authentication & Security**

#### **NextAuth.js 4.24.11** - Authentication

- **Why**: Secure, flexible authentication solution for Next.js
- **Purpose**: Handles user login, registration, and session management
- **Features**:
  - Google OAuth integration
  - Credentials-based authentication
  - Session management
  - CSRF protection

#### **bcryptjs 3.0.2** - Password Hashing

- **Why**: Secure password storage and verification
- **Purpose**: Encrypts user passwords before database storage
- **Benefits**: Industry-standard hashing, salt rounds for security

#### **Zod 4.0.17** - Schema Validation

- **Why**: Runtime type validation and parsing
- **Purpose**: Validates user input, API requests, and form data
- **Benefits**: Type-safe validation, automatic error handling

### **Database & ORM**

#### **Prisma 6.14.0** - Database ORM

- **Why**: Type-safe database access with excellent developer experience
- **Purpose**: Database schema management, migrations, and queries
- **Features**:
  - Type-safe database client
  - Database migrations
  - Prisma Studio for database management
  - PostgreSQL integration

#### **PostgreSQL** - Database

- **Why**: Robust, scalable relational database
- **Purpose**: Stores user data, test results, and room information
- **Benefits**: ACID compliance, JSON support, excellent performance

### **Real-time Communication**

#### **WebSocket (ws 8.18.3)** - Real-time Communication

- **Why**: Low-latency bidirectional communication
- **Purpose**: Powers real-time multiplayer typing sessions
- **Benefits**: Instant updates, low overhead, persistent connections

#### **Redis (ioredis 5.7.0)** - Caching & Session Store

- **Why**: High-performance in-memory data store
- **Purpose**: Caches session data and manages real-time room state
- **Benefits**: Fast data access, pub/sub messaging, session storage

### **State Management**

#### **Zustand 5.0.8** - State Management

- **Why**: Lightweight, simple state management solution
- **Purpose**: Manages WebSocket connections and real-time state
- **Benefits**: Minimal boilerplate, TypeScript support, small bundle size

### **UI Components & Design**

#### **Radix UI** - Headless UI Components

- **Why**: Accessible, unstyled UI primitives
- **Components Used**:
  - `@radix-ui/react-avatar` - User avatars
  - `@radix-ui/react-dropdown-menu` - Dropdown menus
  - `@radix-ui/react-label` - Form labels
  - `@radix-ui/react-scroll-area` - Custom scrollbars
  - `@radix-ui/react-select` - Select components
  - `@radix-ui/react-slot` - Component composition
  - `@radix-ui/react-tabs` - Tab navigation

#### **Lucide React 0.536.0** - Icons

- **Why**: Beautiful, consistent icon library
- **Purpose**: Provides icons throughout the application
- **Benefits**: Tree-shakable, customizable, consistent design

#### **Framer Motion 12.23.12** - Animations

- **Why**: Powerful animation library for React
- **Purpose**: Smooth transitions and micro-interactions
- **Benefits**: Declarative animations, gesture support, layout animations

### **Form Handling**

#### **React Hook Form 7.62.0** - Form Management

- **Why**: Performant forms with minimal re-renders
- **Purpose**: Handles user registration, login, and settings forms
- **Benefits**: Uncontrolled components, built-in validation, small bundle

#### **@hookform/resolvers 5.2.1** - Form Validation

- **Why**: Integrates validation libraries with React Hook Form
- **Purpose**: Connects Zod validation with form handling
- **Benefits**: Type-safe validation, error handling

### **Data Visualization**

#### **Recharts 3.1.2** - Charts & Graphs

- **Why**: Composable charting library built on D3
- **Purpose**: Displays typing performance analytics and progress charts
- **Benefits**: Responsive charts, customizable, React-friendly

### **HTTP Client**

#### **Axios 1.11.0** - HTTP Requests

- **Why**: Promise-based HTTP client with interceptors
- **Purpose**: Handles API calls to backend services
- **Benefits**: Request/response interceptors, automatic JSON parsing

### **Email Service**

#### **Resend 6.0.1** - Email Delivery

- **Why**: Developer-friendly email API
- **Purpose**: Sends verification emails and notifications
- **Benefits**: Simple API, good deliverability, React components

### **Development Tools**

#### **Turborepo 2.5.6** - Monorepo Management

- **Why**: Fast, efficient build system for monorepos
- **Purpose**: Orchestrates builds across multiple packages
- **Benefits**: Parallel execution, intelligent caching, dependency management

#### **ESLint 9** - Code Linting

- **Why**: Catches code quality issues and enforces standards
- **Purpose**: Maintains code quality and consistency
- **Benefits**: Catches bugs, enforces coding standards

#### **PostCSS** - CSS Processing

- **Why**: Transforms CSS with JavaScript plugins
- **Purpose**: Processes Tailwind CSS and other CSS transformations
- **Benefits**: Plugin ecosystem, CSS optimization

## 📁 Project Structure

```
keytype/
├── frontend/                 # Next.js React application
│   ├── app/                 # App Router pages and API routes
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utility functions and configurations
│   ├── hooks/               # Custom React hooks
│   ├── store/               # Zustand state management
│   └── UI/                  # UI component library
├── packages/
│   └── db/                  # Database package with Prisma
│       └── prisma/          # Database schema and migrations
├── wsredis/                 # WebSocket server for real-time features
└── turbo.json              # Turborepo configuration
```

## 🎯 Key Features

### **Typing Test Modes**

- **Solo Mode**: Individual typing practice
- **Multiplayer Mode**: Real-time competitive typing
- **Custom Rooms**: Create and join private typing rooms

### **User Management**

- **Authentication**: Google OAuth + Email/Password
- **User Profiles**: Performance tracking and statistics
- **Leaderboards**: Global and room-specific rankings

### **Real-time Features**

- **Live Typing**: Real-time progress updates
- **Chat System**: In-room communication
- **Room Management**: Create, join, and manage typing rooms

### **Analytics & Reporting**

- **Performance Metrics**: WPM, accuracy, consistency
- **Progress Tracking**: Historical performance data
- **Visual Reports**: Charts and graphs for analysis

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis server

### Installation

```bash
# Install dependencies
npm install

# Set up database
cd packages/db
npm run db:setup

# Start development servers
npm run dev
```

### Environment Variables

Create `.env` files in each package with required environment variables:

**Frontend (.env.local)**:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `REDIS_URL` - Redis connection string
- `RESEND_API_KEY` - Resend email service API key

**WebSocket Service (.env)**:

- `REDIS_URL` - Redis connection string
- `PORT` - WebSocket server port

## 🚀 Deployment

The application is designed for deployment on modern platforms:

- **Frontend**: Vercel, Netlify, or any Node.js hosting
- **Database**: PostgreSQL (Supabase, Railway, or self-hosted)
- **Redis**: Redis Cloud, Railway, or self-hosted
- **WebSocket**: Railway, Render, or any Node.js hosting

## 📊 Performance Considerations

- **Code Splitting**: Next.js automatic code splitting
- **Image Optimization**: Next.js built-in image optimization
- **Caching**: Redis for session and real-time data
- **Database Optimization**: Prisma query optimization
- **Bundle Size**: Tree-shaking and minimal dependencies

## 🔒 Security Features

- **Authentication**: Secure session management with NextAuth
- **Password Security**: bcrypt hashing with salt rounds
- **Input Validation**: Zod schema validation
- **CSRF Protection**: Built-in NextAuth CSRF protection
- **Environment Variables**: Secure configuration management

## 🎨 Design System

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Radix UI components with built-in accessibility
- **Consistent Styling**: Design tokens and utility classes
- **Dark/Light Mode**: Ready for theme switching implementation

This project demonstrates modern full-stack development practices with a focus on real-time features, user experience, and scalable architecture.
