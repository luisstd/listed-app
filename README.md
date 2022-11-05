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

<img src="https://github.com/luisstd/listed-app/raw/main/public/login.png" alt="listed.fyi login page" title="listed.fyi login page" style="border-radius: 6px"/>

### Features

- Automatic light/dark mode
- Add to homescreen
- Quick login via e-mail link
- Ready for self-hosting

### Built With

- [React](https://reactjs.org/)
- [Mantine](https://mantine.dev/)
- [Tailwind](https://tailwindcss.com/)
- [Vite](https://vite.dev/)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com)

<!-- GETTING STARTED -->

## Getting Started

### Create Supabase Database

Sign up to Supabase - <https://app.supabase.io> and create a new project. Wait for your database to start.

In your Supabase project, make sure to create the `items` table with the following fields:

<img src="https://github.com/luisstd/listed-app/raw/main/public/db.png" alt="Supabase DB Setup" title="Supabase DB Setup" style="border-radius: 6px"/>

### Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fluisstd%2Flisted-app&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY&envDescription=These%20variables%20are%20needed%20for%20connecting%20to%20your%20Supabase%20DB&envLink=https%3A%2F%2Fgithub.com%2Fluisstd%2Flisted-app%23setup&project-name=listed-app&repo-name=listed-app&demo-title=Listed%20Preview&demo-description=This%20is%20the%20public%20instance%20at%20listed.fyi&demo-url=https%3A%2F%2Flisted.fyi&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fluisstd%2Flisted-app%2Fmain%2Fpublic%2Flogin.png)

### Local Setup

1. Clone the repo

   ```bash
   git clone https://github.com/luisstd/listed-app.git
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the dev server

   ```bash
   pnpm dev
   ```

4. Go to the API section in your supabase project settings and get the project API key and url. Then fill the .env file like this:

   ```bash
   VITE_SUPABASE_URL=https://example.supabase.com
   VITE_SUPABASE_ANON_KEY=<your_key>
   ```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
