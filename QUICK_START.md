# Quick Start - Public AURA Repo

## Step 1: Create GitHub Repo

Go to: https://github.com/new

- **Repository name:** `aura`
- **Make it PUBLIC** ✅
- **Do NOT** initialize with README
- Click "Create repository"

## Step 2: Push Files

```bash
cd public-aura-repo
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. "Add New Project" → Import `robbob-tech/aura` repo
4. Deploy (no build settings needed)

## Step 4: Get URL

Vercel gives you:
```
https://aura.vercel.app/api/think
```

## Step 5: Claude Uses It

```
POST https://aura.vercel.app/api/think
```

That's it! 🎉

