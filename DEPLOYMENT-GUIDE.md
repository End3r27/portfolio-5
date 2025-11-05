# GitHub Pages Deployment Guide

## Overview
This guide will help you deploy your VOLTEX electric car website to GitHub Pages using automated GitHub Actions.

---

## Prerequisites

1. **GitHub Account**: You need a GitHub account
2. **Git Installed**: Make sure Git is installed on your computer
3. **Repository**: Your code needs to be in a GitHub repository

---

## Configuration Summary

Your project has been configured with:

✅ **Next.js Static Export**: Configured in `next.config.mjs`
✅ **GitHub Actions Workflow**: Automated deployment in `.github/workflows/deploy.yml`
✅ **Build Scripts**: Added to `package.json`
✅ **Jekyll Bypass**: `.nojekyll` file added

---

## Deployment Steps

### Step 1: Push Your Code to GitHub

If you haven't already, initialize Git and push to GitHub:

```bash
# Initialize Git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - VOLTEX website ready for deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

**Replace:**
- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPO-NAME` with your repository name

---

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Save the settings

---

### Step 3: Automatic Deployment

The deployment will happen automatically:

1. Every time you push to the `main` branch
2. The GitHub Actions workflow will:
   - ✅ Install dependencies
   - ✅ Build the Next.js static site
   - ✅ Deploy to GitHub Pages

**First deployment** will start automatically after you push your code!

---

## Repository Configuration

### Option A: User/Organization Site (username.github.io)

If your repository is named `username.github.io`:

**No additional configuration needed!**

Your site will be available at:
```
https://YOUR-USERNAME.github.io
```

---

### Option B: Project Site (project repository)

If your repository has a different name (e.g., `portfolio-5`):

**Update `next.config.mjs`:**

```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/portfolio-5',  // Uncomment and change to your repo name
  assetPrefix: '/portfolio-5/',  // Uncomment and change to your repo name
  trailingSlash: true,
};
```

Your site will be available at:
```
https://YOUR-USERNAME.github.io/portfolio-5
```

**Important:** Replace `portfolio-5` with your actual repository name!

---

## Monitoring Deployment

### Check Deployment Status

1. Go to your GitHub repository
2. Click the **Actions** tab
3. You'll see the deployment workflow running
4. Wait for it to complete (usually 2-3 minutes)

### View Deployment

Once complete, visit your site at:
- **User site**: `https://YOUR-USERNAME.github.io`
- **Project site**: `https://YOUR-USERNAME.github.io/REPO-NAME`

---

## Local Testing Before Deployment

Test the static export locally:

```bash
# Build the static site
npm run build

# The output will be in the 'out' folder
# You can preview it with:
npx serve out
```

Then visit `http://localhost:3000` to preview.

---

## Updating Your Site

After the initial deployment, updates are automatic:

```bash
# Make your changes
git add .
git commit -m "Update: describe your changes"
git push origin main
```

GitHub Actions will automatically rebuild and redeploy!

---

## Troubleshooting

### Build Fails

**Check the Actions tab** for error messages.

Common issues:
- **Missing dependencies**: Run `npm install` locally first
- **Build errors**: Run `npm run build` locally to test
- **TypeScript errors**: Run `npm run lint` to check

### Site Not Showing Up

1. **Wait 2-3 minutes** after deployment completes
2. **Check GitHub Pages settings** are correct
3. **Clear browser cache** and refresh
4. **Check the Actions tab** - deployment must show green checkmark

### Images Not Loading

If using external images, make sure:
- Images are in the `public` folder, or
- External image URLs are accessible

### 404 Errors on Refresh

This is normal for client-side routing. GitHub Pages serves static files, so:
- The homepage works fine
- Direct navigation works
- Page refreshes might show 404

**Solution**: Configure `trailingSlash: true` in `next.config.mjs` (already done!)

---

## Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file** to `public` folder:
   ```
   yourdomain.com
   ```

2. **Update GitHub Pages settings**:
   - Go to Settings > Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

3. **Configure DNS** with your domain provider:
   - Add A records pointing to GitHub's IPs
   - Or add CNAME record pointing to `YOUR-USERNAME.github.io`

[GitHub Custom Domain Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## Important Notes

### What Works on GitHub Pages:
✅ Static HTML/CSS/JS
✅ Client-side React/Next.js
✅ All animations and interactions
✅ 3D models (Three.js)
✅ Framer Motion animations
✅ GSAP animations
✅ Lenis smooth scrolling

### What Doesn't Work:
❌ Server-side rendering (SSR)
❌ API routes
❌ Next.js Image Optimization (we use `unoptimized: true`)
❌ Dynamic routing with getServerSideProps
❌ Incremental Static Regeneration (ISR)

**Your site uses only client-side features, so everything will work perfectly!**

---

## File Structure After Build

```
out/
├── index.html          # Homepage
├── models.html         # Models page
├── configurator.html   # Configurator page
├── about.html          # About page
├── contact.html        # Contact page
├── _next/              # Next.js assets
│   ├── static/
│   └── chunks/
├── models/             # 3D model files
└── .nojekyll          # GitHub Pages config
```

---

## Performance Tips

### Optimize Before Deployment

1. **Compress Images**: Use tools like TinyPNG
2. **Optimize 3D Models**: Use GLTF compression
3. **Remove Console Logs**: Clean up development code
4. **Test Performance**: Use Lighthouse in Chrome DevTools

### After Deployment

1. **Enable Caching**: GitHub Pages automatically caches assets
2. **Use CDN**: GitHub Pages serves from a global CDN
3. **Monitor Performance**: Use Google Analytics or similar

---

## Costs

**GitHub Pages is FREE** for public repositories!

- ✅ Unlimited bandwidth
- ✅ SSL/HTTPS included
- ✅ Global CDN
- ✅ No hosting fees

---

## Support & Resources

### Documentation
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions](https://docs.github.com/en/actions)

### Your Project Documentation
- `DESIGN-SYSTEM.md` - Color palette and design system
- `3D-SCROLL-ANIMATION.md` - 3D car animation details
- `SCROLL-IMPROVEMENTS.md` - Smooth scrolling enhancements

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Build for production (test locally)
npm run build

# Preview production build
npx serve out

# Deploy (automatic via push)
git add .
git commit -m "Your message"
git push origin main
```

---

## Need Help?

If you encounter issues:

1. **Check GitHub Actions logs** in the Actions tab
2. **Test build locally** with `npm run build`
3. **Review error messages** carefully
4. **Check GitHub Pages documentation** for specific errors

---

## Success Checklist

Before considering deployment complete:

- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled in settings
- [ ] GitHub Actions workflow completed successfully
- [ ] Site loads at the correct URL
- [ ] All pages navigate correctly
- [ ] Images load properly
- [ ] 3D car model appears and rotates
- [ ] Animations work smoothly
- [ ] Mobile responsive
- [ ] No console errors

---

**🎉 Congratulations!** Your VOLTEX electric car website is now live on GitHub Pages!

---

**Version**: 1.0
**Last Updated**: 2025-11-05
**Created By**: Claude Code Assistant for Rylee
