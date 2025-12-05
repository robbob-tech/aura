# AURA API - Public Relay

Public GitHub repository that provides a relay to the AURA API. Claude can access this via GitHub.

## Quick Deploy

### Option 1: Vercel (Recommended)

1. **Fork or create this repo** (make it public)
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - "Add New Project" → Import this GitHub repo
   - Deploy (no build needed)
3. **Get your URL:**
   ```
   https://aura.vercel.app/api/think
   ```

### Option 2: Netlify

1. **Fork or create this repo** (make it public)
2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - "Add new site" → Import this GitHub repo
   - Deploy
3. **Get your URL:**
   ```
   https://aura.netlify.app/api/think
   ```

## API Endpoint

```
POST /api/think
```

**Request:**
```json
{
  "content": {
    "text": "Hi AURA, can you help?"
  },
  "owner_id": "user-123",
  "thread_id": "session-456"
}
```

**Response:** Same as AURA API

## Usage

Claude can use:
```
POST https://aura.vercel.app/api/think
```

Or your deployed URL.

