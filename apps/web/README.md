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

## Streamdown Custom Components

`Streamdown` now understands MDX-style, self-closing components with JSX props:

```mdx
<FileTree files={{
	core: {
		domain: { entities: {} },
		application: { interfaces: {} },
	},
	infrastructure: { data: {}, http: {} },
	presentation: { controllers: {}, routes: {} },
	main: 'ts',
}} />
```

Author markdown exactly as you would in MDX and pass the backing React components through the `components` prop:

```tsx
<Streamdown components={{ FileTree }}>
	{markdown}
</Streamdown>
```

`Streamdown` normalizes component names (e.g. `FileTree` → `filetree`) and rewrites any JSX expressions (like `prop={{ ... }}` or `prop={false}`) into safe placeholders before they reach `react-markdown`. At render time those placeholders are resolved back into your React components with the evaluated props, so custom UI like file trees shows up inline just like MDX.

> **Note:** Only self-closing components are supported right now. If you need slot/children support, wrap your content into a dedicated component and pass it through props.
