Provisioning a Neon Postgres for this project

1) Create a Neon account
   - Go to https://neon.tech and sign up / sign in.

2) Create a project and a database branch
   - In the Neon dashboard, create a new project and then create a database (branch).

3) Get the connection string
   - From the Neon dashboard, copy the Postgres connection string.
   - It will look like: `postgresql://<user>:<password>@<host>:<port>/<db>?sslmode=require`

4) Configure local `.env`
   - Copy `.env.example` to `.env` at the project root and paste the Neon connection string:

     DATABASE_URL=postgresql://user:password@host:5432/dbname
     SESSION_SECRET=some_long_random_value

5) Run migrations (optional)
   - This project uses `drizzle-kit`. To push the schema to your Neon DB run:

     npm run db:push

6) Start the app
   - Start the dev server (loads `.env` automatically):

     npm run dev

Notes and troubleshooting
- If Neon requires SSL, the provided connection string should include the necessary parameters. The `pg` library will handle SSL if the connection string includes `sslmode=require` or equivalent.
- For CI / production, store `DATABASE_URL` and `SESSION_SECRET` securely (e.g., GitHub Secrets, environment variables on your host provider).
- If you prefer CLI creation, install Neon CLI and follow Neon docs. This file purposefully gives dashboard steps to avoid CLI versioning differences.
