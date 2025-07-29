# JustOnePlease

A simple, elegant gift list application where anyone can create and share gift wish lists. Recipients can mark items as bought to avoid duplicates.

## Features

- 🎁 Create gift lists with custom names
- 📝 Add multiple gift items to each list
- 🔗 Share lists with a unique, shareable link
- ✅ Mark items as bought/claimed
- 🌙 Dark mode support
- 📱 Responsive design
- 🚀 No login required

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Styling:** Tailwind CSS v4 with dark mode

## Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure database**
   Update `.env` with your PostgreSQL connection string:
   ```
   DATABASE_URL="postgresql://username:password@hostname:5432/database_name"
   ```

3. **Set up database**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Usage

### Creating a List
1. Go to the homepage
2. Enter a list name (e.g., "Diego's Birthday List")
3. Add gift items one by one
4. Click "Create & Share List"
5. Copy the generated share link

### Viewing a Shared List
1. Open the shared link
2. View all gift items
3. Mark items as "bought" to claim them
4. Others can see what's already claimed

### Pre-seeded List
The app comes with a pre-seeded list "Vale & Diego depashower" with 19 items.

## Database Schema

### GiftList
- `id` - Unique identifier
- `name` - List name
- `shareId` - Unique shareable identifier
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### GiftItem
- `id` - Unique identifier
- `name` - Item name/description
- `isBought` - Boolean flag for bought status
- `boughtAt` - Timestamp when marked as bought
- `giftListId` - Foreign key to GiftList
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:seed` - Seed database with initial data
