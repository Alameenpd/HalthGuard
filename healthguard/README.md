# How to use NextJs AI Boilerplate Code

## To Start
- run `npm install` to install all the required dependecies.
- run `npm run dev` to run nextjs application.

## Update ENV Variables

- Create `.env.local` file and copy all the parameters from `.env.example`
- Update your values in `.env.local` file.

### For User Auth using NextAuth

> NEXTAUTH_URL=YOUR_VALUE

> GOOGLE_CLIENT_ID=YOUR_VALUE
> GOOGLE_CLIENT_SECRET=YOUR_VALUE

> NEXTAUTH_SECRET=YOUR_VALUE

### For Database 

> DATABASE_URL=YOUR_VALUE

### For Emails and Login with Magic Link

> MAILGUN_API_KEY=YOUR_VALUE
> EMAIL_SERVER_HOST=YOUR_VALUE
> EMAIL_SERVER_PORT=YOUR_VALUE
> EMAIL_SERVER_USER=YOUR_VALUE
> EMAIL_SERVER_PASSWORD=YOUR_VALUE
> EMAIL_FROM=YOUR_VALUE

### For Stripe Integration

> NEXT_PUBLIC_STRIPE_PUBLIC_KEY=YOUR_VALUE
> NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET=YOUR_VALUE

### LemonSqueezy Integration

> LEMONSQUEEZY_API_KEY=YOUR_VALUE
> LEMON_SQUEEZY_STORE_ID=YOUR_VALUE
> LEMONS_SQUEEZY_PRODUCT_ID=YOUR_VALUE
> LEMONS_SQUEEZY_SIGNATURE_SECRET=YOUR_VALUE

### OpenAI Integration

> OPENAI_API_KEY=YOUR_VALUE

### For Langchain & Pinecone Integration

> PINECONE_API_KEY=YOUR_VALUE
> PINECONE_ENVIRONMENT=YOUR_VALUE
> PINECONE_INDEX_NAME=YOUR_VALUE

## Database related things
- go to /prisma dir
- `schema.prisma` file has all the table schema.
- run `npx prisma migrate dev --name init` to run the migration and update into database.

## NextAuth related things
- got to /pages/api/auth/[...nextauth].js
- modify next auth config based on your requirements.

## Other APIs
- /chat dir -> chat using Langchain 
- /db dir -> database operation apis
- /payments dir -> lemonsqueezy and stripe apis
- /vector-db -> pinecone apis

## Configs
- You can change the config based on your requirements

## Libs
- Libs dir has all the library files for `lemonsqueezy`, `emails`, `prisma`, `strip checkout`

## Components
- All the reusable components for your SaaS
