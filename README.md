# Project Setup

## Prerequisites

- Node.js v22.x
- pnpm v9.x

## Steps

1. Clone the repository

2. Create a `.env` file in the root taking the `.env.example` as a reference

3. Install dependencies

   ```bash
   pnpm install
   ```

4. Start the server

   ```bash
   pnpm run dev
   ```

# Design decisions

Implemented the following screens:

- Authentication flow
  - register
  - login
- Auctions:
  - general auctions list
  - current user auctions list
  - create auction
  - auction details

Missing features:

- Notifications section for auctions and bids
- Edit auctions
