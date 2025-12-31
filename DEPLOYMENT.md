# Deploy Nick's Street Eats to Vercel

## ✅ GitHub Repository Created!

Your code is now at: **https://github.com/jcaruso666-rgb/nicks-street-eats**

---

## Deploy to Vercel (Choose One Method)

### Method 1: Deploy via Vercel Dashboard (Easiest - Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select **jcaruso666-rgb/nicks-street-eats** from your repos
5. Vercel will auto-detect Next.js settings
6. Click **"Deploy"** 

That's it! Vercel will build and deploy automatically. You'll get a live URL in ~2 minutes.

---

### Method 2: Deploy via Vercel CLI

1. Open terminal in `/home/user/nicks-street-eats`

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to production:
   ```bash
   vercel --prod
   ```

4. Your site will be live at a URL like: `https://nicks-street-eats.vercel.app`

---

## What's Deployed

✅ **Full Restaurant Website:**
- Hero section with appetizing food images
- About section (cart to brick-and-mortar story)
- Complete menu (hot dogs & loaded baked potatoes)
- Hours: Wednesday-Saturday, 11am-4pm
- Location: 1616 N Bell Street, Fremont, NE
- Catering information
- Contact form

✅ **Online Ordering System:**
- Browse menu with category filters
- Item customization (toppings, special instructions)
- Shopping cart with quantity adjustments
- Checkout flow with customer details
- Order confirmation with order number

✅ **Mobile Responsive Design**

---

## After Deployment

### Add Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `nicksstreeteats.com`)
4. Follow DNS instructions

### Monitor Orders
The current ordering system stores orders in the browser. To receive real orders, you'll need to:
- Add a backend (Vercel Serverless Functions)
- Connect to email service (SendGrid, Resend, etc.)
- Or integrate with a restaurant POS system

---

## Local Development

Run locally anytime:
```bash
cd /home/user/nicks-street-eats
npm run dev
```

Visit `http://localhost:3000`

---

## GitHub Repository
https://github.com/jcaruso666-rgb/nicks-street-eats
