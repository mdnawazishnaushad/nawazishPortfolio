# MD Nawazish Naushad — Full-Stack Developer Portfolio

A modern, recruiter-ready, high-performance developer portfolio built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Live GitHub API Integration**, and **Google Sheets Contact Capture**.

---

## 🚀 Key Highlights & Architecture

1. **⚡ Full-Stack Next.js (App Router)**
   - Deploys seamlessly to **Vercel** in 1 click.
   - Serverless API routes:
     - `/api/github`: Dynamically fetches your live repositories, stars, forks, and tags directly from your GitHub profile (`@mdnawazishnaushad`) with Edge caching to stay within rate limits.
     - `/api/contact`: Collects recruiter inquiries and forwards them in real-time to your **Google Sheet**.

2. **📊 Google Sheets Recruiter Dashboard Integration**
   - Automatically appends every message submitted via the "Contact Me" form directly into a Google Spreadsheet (Timestamp, Name, Email, Subject, Message).
   - Zero database setup required; see [`GOOGLE_SHEETS_SETUP.md`](file:///c:/Users/mdnaw/OneDrive/Desktop/nawazish/GOOGLE_SHEETS_SETUP.md) for the 2-minute setup.

3. **🎨 Recruiter-Focused Brutalist / Cyberpunk Aesthetics**
   - Live India Standard Time (IST) indicator.
   - Built-in ambient cyber synth audio using the **Web Audio API** (zero external mp3 file dependencies!).
   - Interactive project category filters (`ALL`, `WEB`, `PYTHON`, `API`).
   - Terminal typewriter headline and technical metrics.

---

## 🛠️ How to Run Locally

In your terminal / PowerShell:

```bash
# Start local development server
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## 🌐 Deploy to Vercel (Step-by-Step)

1. Push this directory to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete fullstack nextjs portfolio"
   git branch -M main
   git remote add origin https://github.com/mdnawazishnaushad/portfolio.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **Add New** > **Project** and select your `portfolio` repository.
4. (Optional) Add your Environment Variable:
   - Key: `GOOGLE_SHEETS_WEBHOOK_URL`
   - Value: Your Google Apps Script deployment URL (from [`GOOGLE_SHEETS_SETUP.md`](file:///c:/Users/mdnaw/OneDrive/Desktop/nawazish/GOOGLE_SHEETS_SETUP.md))
5. Click **Deploy**. Vercel will build and deploy your portfolio live in ~30 seconds with a free `.vercel.app` domain and HTTPS!
