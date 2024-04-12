# Next.js Project Template

- Next.js
- TailwindCSS
- Typescript
- ESLint
- Prettier
- Prisma with Postgres
- Shadcn/UI

## Update all packages

```
npm install -g npm-check-updates
ncu --upgrade
```

## Prisma

```
# create a new prisma project initially, only done once
npx prisma generate

# create a new migration
npx prisma db push

# open prisma studio
npx prisma studio
```

## Postgres

```
# spin up a postgres container locally with docker
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

```
// change the datasoure in `schema.prisma` to use postgres
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

```
# add .env file with DATABASE_URL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

## TODOs

- Add generic favicon setup
- Add dependabot
