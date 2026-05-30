# Beginner's Deployment Guide (Vercel & Firebase)

Follow this step-by-step guide to push your code to GitHub and deploy it live on **Vercel** while linking your **Firebase database**.

---

## Phase 1: Upload Your Code to GitHub

### 1. Log in to GitHub
Go to [GitHub](https://github.com/) and log in (or create a new free account).

### 2. Create a New Repository
1. On GitHub, click the green **New** button (or click the **+** sign in the top-right and select **New repository**).
2. Set your repository name to: `nasr-infrastructure`
3. Set the repository to **Private** (or Public if you prefer, our configurations make sure your private keys in `.env` are secure and will not leak).
4. Do **NOT** check "Add a README file", "Add .gitignore", or "Choose a license" (we already have these in your project).
5. Click the green **Create repository** button.

### 3. Link Your Local Folder and Push
Once created, GitHub will show a page with some terminal commands. Run these exact commands in your project directory:

```bash
# 1. Navigate to your project folder
cd /Users/farooquifurqanahmed/Desktop/nasr-infrastructure

# 2. Rename your main branch (standard naming)
git branch -M main

# 3. Copy the link command from your GitHub page (replace with your actual GitHub link)
git remote add origin https://github.com/YOUR_USERNAME/nasr-infrastructure.git

# 4. Push your code to GitHub
git push -u origin main
```
*Refresh your GitHub webpage; you should now see all your folders and files there!*

---

## Phase 2: Sign Up and Import to Vercel

### 1. Log in to Vercel
Go to [Vercel](https://vercel.com/) and click **Sign Up**. Choose **Continue with GitHub** to link your accounts.

### 2. Import Your Project
1. On the Vercel dashboard, click **Add New...** and select **Project**.
2. You will see a list of your GitHub repositories. Find `nasr-infrastructure` and click **Import**.

### 3. Configure and Enter Environment Variables
1. **Framework Preset**: Vercel will automatically detect **Vite** as the build configuration. Keep the defaults.
2. Scroll down and expand the **Environment Variables** section. This is where you connect your Firebase database.
3. Open your project's `.env` file (copy from `.env.example` if you haven't filled it in yet) and copy-paste each key and value:
   - Key: `VITE_FIREBASE_API_KEY` | Value: *Your API key*
   - Key: `VITE_FIREBASE_AUTH_DOMAIN` | Value: *Your Auth domain*
   - Key: `VITE_FIREBASE_PROJECT_ID` | Value: *Your Project ID*
   - Key: `VITE_FIREBASE_STORAGE_BUCKET` | Value: *Your Storage bucket*
   - Key: `VITE_FIREBASE_MESSAGING_SENDER_ID` | Value: *Your Messaging ID*
   - Key: `VITE_FIREBASE_APP_ID` | Value: *Your App ID*
   - Key: `VITE_FIREBASE_MEASUREMENT_ID` | Value: *Your Measurement ID*
   *(Click "Add" after entering each pair)*

### 4. Deploy!
Click the blue **Deploy** button. Vercel will install dependencies, build your React files, and deploy your site in less than 2 minutes.

---

## Phase 3: Setup Firebase Services (Firestore & Auth)

To make sure the Contact Form and Admin Dashboard function on your live site, configure the following in the [Firebase Console](https://console.firebase.google.com/):

### 1. Create a Firebase Project
1. Click **Add Project** and give it a name (e.g. `nasr-infra`).
2. Register a new **Web App** (click the `</>` icon in the console) to get the config values for Phase 2, Step 3 above.

### 2. Enable Firestore Database
1. In the Firebase sidebar, click **Firestore Database** ➜ **Create Database**.
2. Set location preference and start in **Production mode**.
3. Under the **Rules** tab, paste the rules from your local [firestore.rules](file:///Users/farooquifurqanahmed/Desktop/nasr-infrastructure/firestore.rules) file and click **Publish**.

### 3. Enable Email/Password Authentication
1. In the sidebar, click **Authentication** ➜ **Get Started**.
2. Select the **Sign-in method** tab.
3. Click **Email/Password**, toggle it to **Enabled**, and save.
4. Go to **Users** ➜ **Add User**.
5. Set email to: `admin@nasr.com`
6. Set password to: `admin123` (or any custom password, update your login details accordingly).

*Congratulations! Your Nasr Infrastructure application is now live on Vercel and fully syncs with Firestore database and Authentication secure logins!*
