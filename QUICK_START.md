# 🚀 Quick Start Guide - Better Auth Setup

## Prerequisites
- PostgreSQL database running
- Node.js installed
- Your database credentials ready

## Step-by-Step Setup

### 1️⃣ Create Environment File

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your PostgreSQL database URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dharmic_jobs"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Example:**
```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/dharmic_jobs"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2️⃣ Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name add-better-auth
```

This will create all necessary tables including:
- ✅ users
- ✅ sessions  
- ✅ accounts
- ✅ verifications
- ✅ profiles
- ✅ employer_profiles
- ✅ jobs
- ✅ applications
- ✅ And all other tables

### 3️⃣ Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## 🧪 Testing the Authentication

### Test User Registration
1. Click "Login" button in navbar
2. Switch to "Register" tab
3. Fill in:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+91 9876543210` (optional)
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Create Account"
5. You should be logged in automatically!

### Test Job Application (as Job Seeker)
1. Browse to a job listing
2. Click "Apply" button
3. If not logged in, login modal will appear
4. After login, application modal opens
5. Fill in application details
6. Submit application ✅

### Test Job Posting (as Employer)
1. Click "Post Job" button in navbar
2. If not logged in, login modal will appear
3. After login, you may need to complete employer profile
4. Go to Profile → Employer tab
5. Fill in organization details
6. Now you can post jobs ✅

### Test Profile Management
1. Click on user icon in navbar (when logged in)
2. Select "Profile"
3. Try updating information in each tab:
   - Basic Info
   - Job Seeker Profile
   - Employer Profile
4. Changes save automatically!

## 🔍 Verifying Database

Check if tables were created:

```bash
# Open Prisma Studio to view database
npx prisma studio
```

This opens a visual database browser at http://localhost:5555

## ⚠️ Common Issues

### Issue: "Missing required environment variable: DATABASE_URL"
**Solution:** Create `.env` file with DATABASE_URL

### Issue: "Can't reach database server"
**Solution:** 
- Ensure PostgreSQL is running
- Check DATABASE_URL credentials
- Try: `postgresql://localhost:5432/dharmic_jobs`

### Issue: "Migration failed"
**Solution:**
```bash
# Reset database and start fresh
npx prisma migrate reset --force
npx prisma migrate dev --name init
```

### Issue: "Authentication not working"
**Solution:**
- Clear browser cookies
- Check browser console for errors
- Verify NEXT_PUBLIC_APP_URL matches your dev URL

## 📊 Default Database Credentials (if using default PostgreSQL)

If you installed PostgreSQL with defaults:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dharmic_jobs"
```

**Note:** Create the database first:
```sql
CREATE DATABASE dharmic_jobs;
```

Or use Prisma to create it:
```bash
npx prisma db push
```

## ✅ Success Checklist

After setup, you should be able to:
- [ ] Register new users
- [ ] Login existing users
- [ ] See user menu in navbar when logged in
- [ ] Logout
- [ ] Browse jobs without login
- [ ] Apply for jobs (requires login)
- [ ] Post jobs (requires login + employer profile)
- [ ] Update profile information
- [ ] View profile page

## 🎉 You're Ready!

If all the above works, your authentication system is fully functional!

## 📚 More Information

- Full setup guide: `AUTH_SETUP.md`
- Implementation details: `IMPLEMENTATION_SUMMARY.md`
- Prisma schema: `prisma/schema.prisma`
- Auth config: `src/lib/auth.ts`

## 🆘 Need Help?

1. Check `AUTH_SETUP.md` for detailed troubleshooting
2. Review browser console for errors
3. Check terminal for server errors
4. Verify `.env` file exists and has correct DATABASE_URL

---

Happy coding! 🎊
