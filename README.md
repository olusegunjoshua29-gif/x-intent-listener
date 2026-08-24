# X Intent Listener

A plug-and-play social-listening web app for finding high-intent posts on X/Twitter. It accepts natural-language intent or keywords, converts the request into an X Recent Search query, scores returned posts for likely buyer/help-seeking intent, and presents a reviewable feed.

## What it does

- Natural-language search, e.g. `Find people on X looking for someone to build a custom AI workflow`
- Keyword search
- Near-real-time X Recent Search integration
- Relevance/intent scoring
- Author, post content, timestamp, engagement and direct X link
- Configurable search criteria through the UI
- Manual-review only; no automatic outreach
- Demo mode so the interface can be tested before X credentials are added

## Requirements

- Node.js 18+
- An X Developer account/app with a Bearer Token for live searches

## Run locally

1. Extract the project.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

4. Copy `.env.example` to `.env`.
5. Add your X Bearer Token:

```env
X_BEARER_TOKEN=YOUR_TOKEN_HERE
DEMO_MODE=false
```

6. Start:

```bash
npm start
```

7. Open `http://localhost:3000`.

### Demo without X credentials

Set:

```env
DEMO_MODE=true
```

Then run `npm start`. Click **Try example**. The demo posts are clearly labeled as demo data and must not be presented as live X results.

## Natural-language query

Example:

> Find people on X looking for someone to build a custom AI workflow for their business.

The server translates the intent into X search operators and adds high-intent phrases plus `-is:retweet lang:en`.

## Live X API

The live implementation calls X API v2 Recent Search:

`GET https://api.x.com/2/tweets/search/recent`

It requests post text, author information, creation time and public metrics. Recent Search covers recent posts; historical/full-archive access is not assumed.

## Submission demo

For the competition/demo requirement:

1. Run the app with a valid X Bearer Token.
2. Enter a natural-language query.
3. Capture a screen recording showing:
   - the query,
   - the generated X query,
   - returned posts,
   - intent scores,
   - clicking a result's `View on X` link.
4. Include this README/repository link in the submission.

Do not use demo-mode results as evidence of live X API functionality.

## Architecture

Browser → Express API → X Recent Search API → intent scoring → review feed.

The Bearer Token stays server-side and is never sent to the browser.

## Safety / outreach

This tool only surfaces posts. It does not automatically DM, reply, follow, like, or contact users.

## Deployment

This is compatible with Node hosting such as Render, Railway, Fly.io, or a VPS. Set `X_BEARER_TOKEN` and `DEMO_MODE=false` as server environment variables.

## Source

Keep the repository public or provide reviewer access, depending on the submission rules.
