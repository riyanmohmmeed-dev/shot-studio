# Push Shot Studio to GitHub

## 1. Create the repo on GitHub

- Go to [github.com/new](https://github.com/new)
- **Repository name:** `shot-studio` (recommended — clean and portfolio-friendly)
- Description (optional): `Cinematic AI image generator — director-style controls, film stock presets, voice input`
- Choose **Public**
- Do **not** add a README, .gitignore, or license (we already have them)
- Click **Create repository**

## 2. Push from your machine

In a terminal, run:

```bash
cd /Users/mohammedriyan/Projects/GitTime/ShotStudio

# Initialize git (if not already)
git init

# Add everything ( .env.local is ignored )
git add .
git commit -m "Initial commit: Shot Studio — cinematic AI image generator"

# Use your GitHub username in the URL below
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/shot-studio.git

git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## Alternative repo names

- `shot-studio` — recommended
- `infinite-budget`
- `cinema-studio-ai`
