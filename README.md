This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
todo
├─ app
│  ├─ (auth)
│  │  ├─ login
│  │  │  └─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ (protected)
│  │  ├─ layout.tsx
│  │  ├─ profile
│  │  │  └─ page.tsx
│  │  └─ todo
│  │     ├─ components
│  │     │  ├─ TodoCard.tsx
│  │     │  ├─ TodoEmptyState.tsx
│  │     │  ├─ TodoFilter.tsx
│  │     │  ├─ TodoForm.tsx
│  │     │  ├─ TodoHeader.tsx
│  │     │  ├─ TodoList.tsx
│  │     │  └─ TodoSearch.tsx
│  │     └─ page.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  ├─ common
│  │  └─ EmptyState.tsx
│  ├─ layout
│  │  ├─ Navbar.tsx
│  │  └─ Sidebar.tsx
│  └─ ui
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ input.tsx
│     ├─ modal.tsx
│     └─ spinner.tsx
├─ context
│  └─ Context.tsx
├─ eslint.config.mjs
├─ hooks
│  ├─ useAuth.ts
│  ├─ useDragDrop.ts
│  └─ useToast.ts
├─ lib
│  ├─ axios.ts
│  ├─ constants.ts
│  ├─ cookies.ts
│  ├─ protectedRoutes.ts
│  └─ utils.ts
├─ modules
│  ├─ auth
│  │  ├─ api.ts
│  │  ├─ hooks.ts
│  │  ├─ type.ts
│  │  ├─ utils.ts
│  │  └─ validations.ts
│  ├─ profile
│  │  ├─ api.ts
│  │  ├─ hooks.ts
│  │  ├─ types.ts
│  │  └─ validations.ts
│  └─ todo
│     ├─ api.ts
│     ├─ hooks.ts
│     ├─ types.ts
│     └─ utils.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ img.jpg
│  ├─ login.png
│  ├─ logo.png
│  ├─ next.svg
│  ├─ profile.png
│  ├─ signUp.png
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ services
│  └─ storage.service.ts
├─ tsconfig.json
├─ types
│  └─ global.d.ts
└─ validations
   └─ index.ts

```