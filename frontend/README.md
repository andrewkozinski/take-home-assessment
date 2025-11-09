This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Before anything, the frontend requires a `.env` file under the frontend directory. In this environment file, all that is required is the URL to the Go backend. If running the Go backend locally, simply put the local host url there. 

Example:
```
API_URL=http://localhost:8080
```

To then run the development server:

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

## Libraries:

This project makes use of the [ShadCN](https://ui.shadcn.com/) component library for some of the design and the react-loading-spinner library for loading state.

The frontend uses Jest for unit testing. To run unit tests, simply do `npm test` or `npx jest` in the terminal.