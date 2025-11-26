# Staysia - Property Renting App Interface

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

A modern, responsive web application for property renting, built with Next.js. Staysia allows users to browse, search, and book properties seamlessly, with integrated payment processing and user authentication.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🏠 **Property Browsing**: Explore a wide range of properties including houses, apartments, hotels, villas, and rooms.
- 🔍 **Advanced Search & Filtering**: Filter properties by location, category, price, amenities, and more.
- 📅 **Booking System**: Easy-to-use booking flow with date selection and room availability checking.
- 💳 **Payment Integration**: Secure payment processing via Midtrans payment gateway.
- ⭐ **Review System**: Read and write reviews for properties.
- ❤️ **Wishlist**: Save favorite properties for later.
- 🔐 **User Authentication**: Firebase-based authentication with role-based access (guest, tenant).
- 📱 **Responsive Design**: Optimized for desktop and mobile devices.
- 🗺️ **Location Integration**: Google Maps integration for property locations.
- 📊 **Dashboard**: Manage bookings, properties, and user profiles.

## Technology Stack

### Frontend

- **Framework**: Next.js 15.3.1
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.1.14
- **UI Components**: Radix UI
- **State Management**: Zustand 5.0.8
- **Data Fetching**: TanStack React Query 5.90.2
- **Forms**: Formik 2.4.6 with Yup validation
- **Charts**: Recharts 2.15.4

### Backend & Database

- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Payment Gateway**: Midtrans

### Development Tools

- **Linting**: ESLint 9
- **Code Formatting**: Prettier
- **Commit Linting**: Husky + Commitlint
- **Package Manager**: npm

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/property-renting-app-interface.git
   cd property-renting-app-interface
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env.local` and fill in the required values (see [Environment Variables](#environment-variables) section).

4. **Set up the database:**
   - Ensure PostgreSQL is running
   - Update the `DIRECT_URL` in your environment variables
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```

5. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_BASE_URL=your_base_url

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Payment Gateway (Midtrans)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
NEXT_PUBLIC_MIDTRANS_API_URL=your_midtrans_api_url

# Database
DIRECT_URL=your_postgresql_connection_string
```

## Usage

1. **Development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Build for production:**

   ```bash
   npm run build
   npm start
   ```

3. **Linting:**
   ```bash
   npm run lint
   ```

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── (landing-page)/           # Landing page route group
│   ├── (explore-properties)/     # Property exploration pages
│   ├── (properties)/             # Property-specific pages (details, booking, payment)
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable UI components
│   ├── providers/                # Context providers
│   └── ui/                       # Base UI components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries and configurations
└── types/                        # TypeScript type definitions

public/                           # Static assets
├── data/                         # Static data files
├── logo/                         # Logo assets
└── background/                   # Background images

prisma/                           # Database schema (if separate)
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages (enforced by commitlint)
- Add tests for new features
- Update documentation as needed
- Ensure all linting passes: `npm run lint`

### Git & GitHub Collaboration Guidelines

#### Branch Structure

- `main`: Production branch (no direct development)
- `develop`: Integration branch for features
- `feat/*`: New features (e.g., `feat/login-page`)
- `bugfix/*`: Non-critical bug fixes (e.g., `bugfix/fix-validation`)
- `hotfix/*`: Critical production fixes

#### Git Flow

1. Checkout to develop: `git checkout develop`
2. Create feature branch: `git checkout -b feat/your-feature`
3. Work on feature and commit with conventional commits
4. Push: `git push origin feat/your-feature`
5. Create Pull Request to develop
6. After approval, merge via Squash and Merge

#### Conventional Commits

Use format: `<type>(scope): description`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:

- `feat(auth): add JWT middleware`
- `fix(schedule): fix timezone bug`
- `docs(readme): update setup instruction`

#### Pull Request Rules

- Clear title and description
- Add screenshots if relevant
- Assign reviewers
- Keep PRs small and focused

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Next.js and TypeScript.
© 2025 Staysia - Forentino Haryanto
