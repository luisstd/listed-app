<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/luisstd/listed-app">
    <img src="public/apple-touch-icon.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">listed.fyi</h3>

  <p align="center">
    A simple web app for creating lists
    <br />
    <br />
    <a href="https://github.com/luisstd/listed-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/luisstd/listed-app/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About the project

### Preview

[![listed.fyi login page](https://github.com/luisstd/listed-app/raw/main/public/login.png)]

### Built With

- [React](https://reactjs.org/)
- [Mantine](https://mantine.dev/)
- [Tailwind](https://tailwindcss.com/)
- [Vite](https://vite.dev/)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com)

<!-- GETTING STARTED -->

## Getting Started

### Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world)

### Create Supabase Database

Sign up to Supabase - <https://app.supabase.io> and create a new project. Wait for your database to start.

In your Supabase project, make sure to create the `items` table with the following fields:
[![DB Setup](https://github.com/luisstd/listed-app/raw/main/public/db.png)]

### Setup

1. Clone the repo

   ```
   git clone https://github.com/luisstd/listed-app.git
   ```

2. Install dependencies

   ```
   pnpm install
   ```

3. Start the dev server

   ```
   pnpm dev
   ```

4. Go to the API section in your supabase project settings and get the project API key and url. Then fill the .env file like this:

   ```
   VITE_SUPABASE_URL=https://example.supabase.com
   VITE_SUPABASE_ANON_KEY=<your_key>
   ```

<!-- USAGE EXAMPLES -->

## Usage

After login there is a the list view where you can create items, check them off and also remove them from the database. That's it.
[![listed.fyi list view](https://github.com/luisstd/listed-app/raw/main/public/list.png)]

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
