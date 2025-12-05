# AURA API - Public Relay

Public GitHub repository that provides a relay to the AURA API. Claude can access this via GitHub.

## Quick Deploy

### Option 1: Cloudflare Pages with Custom Domain (Recommended)

1. **Connect to Cloudflare Pages:**
   - Go to Cloudflare Dashboard → Pages
   - "Create a project" → "Connect to Git"
   - Select `robbob-tech/aura` repository
   - Build settings:
     - **Framework preset:** None
     - **Build command:** (leave empty)
     - **Build output directory:** `.` (root)
   - Click "Save and Deploy"

2. **Add Custom Domain:**
   - In Pages project → "Custom domains"
   - Add your custom domain (e.g., `aura-api.yourdomain.com`)
   - Cloudflare will automatically configure SSL

3. **Get your URL:**
   ```
   https://aura-api.yourdomain.com/api/think
   ```

### Option 2: Vercel

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - "Add New Project" → Import `robbob-tech/aura` repo
   - Deploy (no build needed)
3. **Get your URL:**
   ```
   https://aura.vercel.app/api/think
   ```

### Option 3: Netlify

1. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - "Add new site" → Import `robbob-tech/aura` repo
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

