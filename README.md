# E-commerce Application in Next.js

## Description

This e-commerce application, developed in Next.js, offers an intuitive and efficient online shopping experience. Its notable features include:

1. **PayPal Payments**: Users can make secure and convenient payments using PayPal.
2. **Admin Section**: A robust admin section allows efficient management of products, orders, and users.
3. **Server Actions**: Utilizes Server Actions for service management, ensuring optimal performance and a scalable architecture.
4. **PostgreSQL Database**: Implemented with PostgreSQL, a relational database that guarantees data integrity and security.
5. **Prisma ORM**: Prisma manages all database resources, facilitating data interaction and simplifying development.
6. **SEO Optimization**: Leverages Next.js capabilities for SEO management, ensuring the website is easily found and well-positioned in search engines, increasing visibility and attracting more potential customers.

This application is ideal for businesses seeking a modern, secure, and easy-to-manage e-commerce solution with a strong online presence thanks to its optimized SEO management.

## To run in dev

1. Clone de repository
2. Copy the .env.template file and rename to .env and modify variable environment
   - 2.1 Generate a secret key an replace, look the instruction in the .env file
3. Install dependencies

```
npm install
```

4. Up the data base

```
docker compose up -d
```

5. Run the migration of Prisma

```
npx prisma migrate dev
```

6. Execute seed

```
npm run seed
```

7. Clear de local storage of browser
8. Run the project

```
npm run dev
```
