# Casagrande Integrate

Área administrativa com página pública, login do administrador e painel inicial.

## Requisitos

- Node.js 22.12+ ou 24+
- PostgreSQL, local com `npx prisma dev` ou uma `DATABASE_URL` já existente

## Configuração

1. Copie `.env.example` para `.env`.
2. Preencha `DATABASE_URL`, `SESSION_SECRET` (mínimo de 32 caracteres), `ADMIN_EMAIL` e `ADMIN_PASSWORD` (de 12 a 72 caracteres).
3. Instale as dependências:

```bash
npm install
```

4. Se ainda não houver um Postgres local, suba um com o Prisma e use a URL que o comando informar:

```bash
npx prisma dev
```

5. Crie as tabelas e o administrador:

```bash
npx prisma migrate dev
npm run db:seed
```

6. Inicie a aplicação:

```bash
npm run dev
```

A home fica em `/`, o login em `/login` e o painel em `/dashboard`.

## Vercel

Defina `DATABASE_URL` e `SESSION_SECRET` no projeto da Vercel. O script `postinstall` gera o Prisma Client durante o build. Aplique as migrations no banco de produção com `npx prisma migrate deploy` e rode o seed uma vez, com `ADMIN_EMAIL` e `ADMIN_PASSWORD` disponíveis só nesse comando. Não commite o arquivo `.env`.
