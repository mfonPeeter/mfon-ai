This is a [Next.js](https://nextjs.org/) and TypeScript project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<img width="1440" alt="mfon-ai" src="https://github.com/mfonPeeter/mfon-ai/assets/105684251/b65caeac-b71e-4aa0-88e5-61e46ad0d5f2">

## Getting Started

### Installing Packages

To install the necessary Node.js modules, run:

```bash
npm install
```

### Adding Environment Variables and using them

This project utilizes the [Claude API](https://docs.anthropic.com/claude/reference/getting-started-with-the-api). If you intend to clone the project for customization, you'll need to generate an API key on the platform and add it to your headers.

#### Step 1: Add environment variables in a file named `.env.local` at the root of your directory:

```bash
CLAUDE_API_KEY=${API_KEY}
```

#### Step 2: Include the following headers when making a request to the Claude API:

```bash
    headers: {
      "x-api-key": process.env.CLAUDE_API_KEY as string,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    }
```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm
# or
bun dev
```

![test](https://github.com/mfonPeeter/mfon-ai/blob/main/public/close.svg)
Image:
<img width="1440" alt="mfon-ai" src="https://github.com/mfonPeeter/mfon-ai/assets/105684251/53eb5394-5f35-41f2-bc60-fd1a6575ce8f.png">

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
