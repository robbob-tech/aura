# Deploy AURA API Public Repo

## Step 1: Create Public GitHub Repo

1. Go to GitHub
2. Create a new **public** repository named `aura` (or `aura-api`)
3. **Do NOT** initialize with README (we'll push files)

## Step 2: Push Files

```bash
cd public-aura-repo
git init
git add .
git commit -m "Initial commit: AURA API relay"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aura.git
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import the `aura` repository
5. **No build settings needed** - Vercel will auto-detect
6. Click "Deploy"

## Step 4: Get Your URL

Vercel will give you:
```
https://aura.vercel.app
```

Or if repo name is different:
```
https://aura-api.vercel.app
```

## Step 5: Use the API

Claude can now use:
```
POST https://aura.vercel.app/api/think
```

## Testing

```bash
curl -X POST "https://aura.vercel.app/api/think" \
  -H "Content-Type: application/json" \
  -d '{
    "content": {"text": "Test message"},
    "owner_id": "test",
    "thread_id": "test"
  }'
```

## That's It!

The repo is public, deployed via GitHub, and Claude can access it.

