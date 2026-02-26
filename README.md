# MoJo — Mood Tracker

MoJo is a modern, visually appealing mood tracking application designed to help users monitor their emotional wellbeing and identify patterns over time.

## 🌟 Features

-   **Daily Mood Logging**: Capture how you feel with a simple, intuitive interface.
-   **Personalized Advice**: Get tailored suggestions and quotes based on your reported mood.
-   **Mood Trends**: Visualize your emotional journey with interactive charts.
-   **Secure Authentication**: Personal accounts powered by NextAuth.js.
-   **Responsive Design**: A beautiful, "playful" aesthetic that works across desktop and mobile devices.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/) (hosted on [Supabase]
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Key Improvements

Recently updated for increased reliability and production readiness:
-   **Robust Error Handling**: Implemented comprehensive `try-catch` blocks across all Server Actions to gracefully handle transient database connection issues (e.g., Prisma `P1017`).
-   **Resilient Database Pooling**: Optimized `pg.Pool` configuration for better handling of idle connections and timeouts, specifically tuned for serverless environments.
-   **Standardized API Responses**: All server actions now return a consistent `{ success, data, error }` format, improving frontend error state management.
-   **Custom Branding**: Integrated a custom SVG favicon for a more polished user experience.

## 🏁 Getting Started

### Prerequisites

-   Node.js 18+
-   A PostgreSQL database (Neon recommended)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd mood-tracker
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up your environment variables:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="your-postgresql-connection-string"
    NEXTAUTH_SECRET="your-secret"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  Run Prisma migrations:
    ```bash
    npx prisma migrate dev
    ```

5.  Start the development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
