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
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Things to Note

1. In the request body, the `max_tokens` parameter is set to `100` to limit the number of tokens returned by the Claude API. This is because I'm currently using the free tier of the Claude API and want to avoid exceeding my usage limits for this personal project

   ```bash
      body: JSON.stringify({
     model: "claude-3-opus-20240229",
     max_tokens: 100,
     temperature: 0,
     system: "Respond in short and clear sentences.",
     messages: [{ role: "user", content: message }],
   }),
   ```

   **NOTE:** _Your prompt is also considered when calculating the number of tokens._

2. Setting `max_tokens` to `100` means that the Claude API will not return the complete answer if the token limit is exceeded. In such cases, an error message stating "Max token reached. Please simplify your prompt." will be returned. Refer to the `claude-provider.tsx` file for the corresponding code:
   ```bash
         if (data.stop_reason === "max_tokens")
           throw new Error("Max token reached. Please simplify your prompt.");
   ```

## Testing

I'm still in the process of implementing unit and integration tests using React Testing Library, Jest and Mock Service Worker

## Deployment

The project is deployed on Vercel. You can access the live version at [mfon-ai.vercel.app](https://mfon-ai.vercel.app/)

## Future Plans

- Implement streaming of the response from the Claude API instead of returning it all at once.
- I'm considering saving the response in a database to persist the data upon reload.
