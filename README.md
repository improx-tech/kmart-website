# K Mart — Customer Website

This is the customer-facing website: Home, Search, Product pages, Cart, Checkout, Orders, Profile.

## Setup (first time only)

1. Install [Node.js](https://nodejs.org) if you haven't already (LTS version).
2. Open this folder in VS Code.
3. Open a terminal in VS Code (Terminal → New Terminal) and run:
   ```
   npm install
   ```
4. Copy `.env.local.example` to a new file called `.env.local`.
5. Fill in `.env.local` with the real Supabase Project URL and anon public key
   (ask the lead for these — never use the service_role key here).
6. Run the site locally:
   ```
   npm run dev
   ```
7. Open http://localhost:3000 in your browser.

## Rules for this project

- Never write raw SQL or touch the database schema directly — always go through
  functions provided by the lead.
- Never add the `service_role` key anywhere in this project, including `.env.local`
  committed to git (it's already gitignored, keep it that way).
- All prices, delivery fees, and stock availability come from the backend —
  never calculate or hardcode them here.
- Work in your own branch, never push directly to `main`.

## Folder structure

- `app/` — pages (Next.js App Router: each folder = one URL)
- `components/` — reusable UI pieces (Header, ProductCard, etc.)
- `lib/supabaseClient.ts` — the one place the app connects to Supabase (public key only)
