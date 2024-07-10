# Backend Project Setup

This project provides backend services including user authentication and fetching user details using Node.js, Express, Prisma, and PostgreSQL.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Using Yarn](#using-yarn)
  - [Using npm](#using-npm)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) (v14.x or higher).
- You have installed [PostgreSQL](https://www.postgresql.org/).
- You have a PostgreSQL database created.

## Installation

### Using Yarn

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

   ```

2. **Install dependencies**

```bash
yarn install
```

or

```bash
npm install
```

3. **Configuration**

```bash
    DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
    SECRET_KEY=<your_secret_key>
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

4. **Database Setup**

```bash
npx prisma init
npx prisma migrate dev --name init
```

5. **Running the Project**

```bash
    yarn dev
```

Or

```bash
    npm run dev
```

6. **Swagger Doc**
   <a href="http://localhost:3001/api-docs">API Documentation </a>
