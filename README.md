This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install Node.js, version 10.13 or later, if you haven't already.

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## App Organization

The main directories of the app are /pages, /components and /styles.

/pages includes all the main routed layouts of the app. There are only two for our purposes:

- index.js, the initial screen with a Start button
- gameboard.js, the parent view of the game which will toggle between the boardFields.js and boardGrid.js components

/components are the individual pieces that make up the views

- components/boardFields.js houses the form with the input fields for grid height and width
- components/boardGrid.js is the main grid of the game, generated once a user enters the parameters in boardFields
- components/modal.js is a reusable modal that shows a message to the user in a full screen takeover

the /styles folder contains the styles of individual components, as well as a global stylesheet (globals.css)
