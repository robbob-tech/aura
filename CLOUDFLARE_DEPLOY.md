# Deploy to Cloudflare Pages with Custom Domain

## Step 1: Connect GitHub Repo to Cloudflare Pages

1. **Go to Cloudflare Dashboard:**
   - https://dash.cloudflare.com
   - Navigate to "Pages" in the sidebar

2. **Create a project:**
   - Click "Create a project"
   - Select "Connect to Git"
   - Authorize GitHub if needed
   - Select repository: `robbob-tech/aura`

3. **Configure build settings:**
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `.` (root directory)
   - **Root directory:** `/` (or leave default)

4. **Deploy:**
   - Click "Save and Deploy"
   - Wait for deployment to complete

## Step 2: Add Custom Domain

1. **In your Pages project:**
   - Go to "Custom domains" tab
   - Click "Set up a custom domain"

2. **Add your domain:**
   - Enter: `aura-api.yourdomain.com` (or your preferred subdomain)
   - Cloudflare will automatically:
     - Add DNS record
     - Configure SSL certificate
     - Set up routing

3. **Verify:**
   - Wait for SSL certificate to provision (usually < 1 minute)
   - Check that domain shows as "Active"

## Step 3: Use Custom Domain

Claude can now use:
```
POST https://aura-api.yourdomain.com/api/think
```

## File Structure for Cloudflare Pages

- `functions/api/think.js` - Cloudflare Pages Function
- `index.html` - Static page (optional)
- All other files are fine

Cloudflare Pages will automatically:
- Detect `functions/` directory
- Route `/api/think` to `functions/api/think.js`
- Handle CORS and SSL

## Testing

After deployment:

```bash
curl -X POST "https://aura-api.yourdomain.com/api/think" \
  -H "Content-Type: application/json" \
  -d '{
    "content": {"text": "Test message"},
    "owner_id": "test",
    "thread_id": "test"
  }'
```

## Advantages of Cloudflare Pages

✅ **Custom domain** - Use your own domain  
✅ **Free SSL** - Automatic Let's Encrypt certificates  
✅ **Fast** - Cloudflare's global CDN  
✅ **GitHub integration** - Auto-deploys on push  
✅ **Functions** - Serverless functions (like Vercel)  
✅ **No build needed** - Just deploy the functions  

---

**Last Updated:** December 3, 2025

