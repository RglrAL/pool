# 🎱 Pool Tournament — Live Shared PWA

One HTML file. No database. No backend. Everyone sees live results.

## How It Works

Tournament data is stored as a JSON file in a GitHub Gist (free).
The admin enters results → Gist updates → everyone's app refreshes every 30 seconds.

## Setup (5 minutes)

### 1. Get a GitHub Token (one time only)
1. Go to https://github.com/settings/tokens/new
2. Sign in or create a free account
3. Name it "Pool Tournament"
4. Tick ONLY the "gist" checkbox
5. Generate → copy the token

### 2. Deploy the App
1. Go to https://app.netlify.com/drop
2. Drag the `pwa-live` folder onto the page
3. You get a URL like `https://sunny-name-12345.netlify.app`

### 3. Create Your Tournament
1. Open your Netlify URL
2. Tap "Create New Tournament"
3. Paste your GitHub token
4. Done! You get a shareable link

### 4. Share With Players
- Copy the link from Admin → Share
- Send it to everyone via WhatsApp, text, email
- They open it and tap "Add to Home Screen" to install as an app

## Who Can Do What

| Role    | Can See | Can Edit | Needs Token |
|---------|---------|----------|-------------|
| Admin   | Everything | Everything | Yes |
| Players | Standings, fixtures, schedule, profiles | Nothing | No |

## Files

```
pwa-live/
├── index.html       ← The entire app
├── manifest.json    ← PWA config
├── sw.js            ← Offline support
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## Important Notes

- The GitHub token is stored ONLY on the admin's device (localStorage)
- Players never see or need the token
- The Gist is public (so anyone with the link can read it) — fine for a pool tournament!
- GitHub allows 5,000 API calls/hour with a token, 60/hour without
- With 30-second refresh, ~120 calls/hour per viewer (unauthenticated)
- For 8 players all watching = ~960/hour, well within limits
- Data persists forever on GitHub — you can always access it later
