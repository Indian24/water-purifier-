# AquaShield Solutions

## Overview

AquaShield Solutions is a full-stack e-commerce web application for water purification products and services. The platform serves as an online store for RO purifiers, water purifiers, and related solutions targeting Delhi NCR and all of India. Key features include product catalog, shopping cart, order management, service booking (leads), technician directory, and blog functionality.

Brand: "AquaShield Solutions"  
Tagline: "Pure Water. Pure Life — Delhi's trusted RO experts"

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state management with local storage for cart persistence
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and UI animations
- **SEO**: React Helmet for dynamic meta tags and titles

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for validation
- **Authentication**: Replit Auth integration using OpenID Connect with Passport.js
- **Session Management**: Express sessions stored in PostgreSQL via connect-pg-simple

### Data Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` contains all database models (products, orders, leads, technicians, blog posts, reviews)
- **Migrations**: Drizzle Kit for database migrations (`drizzle.config.ts`)

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    hooks/        # Custom React hooks (auth, cart, products, etc.)
    pages/        # Page components
    lib/          # Utilities and query client
server/           # Express backend
  replit_integrations/auth/  # Authentication logic
shared/           # Shared types, schemas, and API definitions
  models/         # Database models (auth tables)
  schema.ts       # Drizzle schema definitions
  routes.ts       # API route definitions with Zod validation
```

### Key Design Patterns
- **Shared Schema**: Database schemas are defined once in `shared/` and used by both frontend (for types) and backend (for database operations)
- **Type-Safe API**: API routes defined with Zod schemas ensure end-to-end type safety
- **Storage Abstraction**: `server/storage.ts` provides an interface for all database operations
- **Component Library**: shadcn/ui components in `client/src/components/ui/` provide consistent styling

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable

### Authentication
- **Replit Auth**: OpenID Connect integration for user authentication
- **Sessions**: Stored in PostgreSQL `sessions` table

### Required Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session encryption
- `ISSUER_URL`: OpenID Connect issuer (defaults to Replit's OIDC)
- `REPL_ID`: Replit environment identifier

### Frontend Libraries
- TanStack React Query for data fetching
- Radix UI primitives (via shadcn/ui) for accessible components
- Framer Motion for animations
- React Hook Form with Zod resolver for form handling

### Build Tools
- Vite for frontend development and building
- esbuild for server bundling
- TypeScript for type checking