# Better Auth Implementation Guide

This project now uses **Better Auth** for authentication with email/password support.

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database - Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/dharmic_jobs"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Better Auth (optional, Better Auth will generate defaults)
BETTER_AUTH_SECRET="your-secret-key-here-change-in-production"
BETTER_AUTH_URL="http://localhost:3000"
```

### 2. Database Migration

After setting up your DATABASE_URL, run the Prisma migration to create all necessary tables:

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

This will create the following tables:
- `users` - User accounts
- `sessions` - Active user sessions
- `accounts` - Authentication provider accounts
- `verifications` - Email verification tokens
- `profiles` - Job seeker profiles
- `employer_profiles` - Employer/organization profiles
- And all other job-related tables

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Features Implemented

### Authentication Flow

1. **Public Access**: All job listings and search functionality are accessible to visitors without authentication

2. **Protected Actions**: 
   - **Job Application**: When a visitor clicks "Apply", they're prompted to login/register
   - **Job Posting**: When clicking "Post Job", authentication is required first

3. **User Registration**:
   - Email
   - Password
   - Name
   - Phone Number (optional)
   - Default role: SEEKER

4. **Login**:
   - Email and password
   - Session-based authentication
   - 7-day session expiry

### User Profiles

#### Job Seekers
Minimal required information to apply for jobs:
- Name
- Email
- Phone Number

Optional profile fields:
- Bio
- Experience years
- Skills
- Location
- Education
- Preferred roles
- Dietary preferences (vegetarian)
- Lifestyle (non-smoker)
- Spiritual practice level

#### Employers
Required information to post jobs:
- Organization name
- Organization type (Temple, Ashram, NGO, School, Business)
- Location

Additional profile fields:
- Mission statement
- Website
- Facilities (vegetarian-only, accommodation, food)

### API Routes

#### Authentication
- `POST /api/auth/sign-in` - Email/password login
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Get current session

#### User Management
- `POST /api/user/update` - Update basic user info
- `GET /api/user/profile` - Get user profile
- `POST /api/user/profile/seeker` - Update job seeker profile
- `POST /api/user/profile/employer` - Update employer profile

### Components

#### AuthModal
- Tabbed interface for Login/Register
- Email and password authentication
- Phone number field (optional during registration)
- Form validation

#### Navbar
- Shows "Login" button for unauthenticated users
- Shows user menu with profile and logout for authenticated users
- Responsive design

#### Profile Page (`/profile`)
- Three tabs: Basic Info, Job Seeker Profile, Employer Profile
- Real-time updates
- Form validation

### Authentication Guards

1. **Job Application**: Users must be logged in to apply for jobs
2. **Job Posting**: Users must be logged in to post jobs
3. **Profile Page**: Only accessible to authenticated users

## Database Schema

### User Model
```prisma
model User {
  id              String    @id @default(uuid())
  name            String
  email           String    @unique
  emailVerified   Boolean   @default(false)
  role            Role      @default(SEEKER)
  phone           String?
  // ... relations
}
```

### Better Auth Tables
- **Session**: Stores active user sessions
- **Account**: Stores authentication credentials (passwords are hashed)
- **Verification**: Email verification tokens (if enabled)

## Security Features

1. **Password Hashing**: Using bcrypt through Better Auth
2. **Session Management**: Secure session tokens
3. **CSRF Protection**: Built into Better Auth
4. **Email Validation**: During registration
5. **Secure Cookies**: HTTP-only session cookies

## Usage

### For Job Seekers
1. Visit the site and browse jobs (no login required)
2. Click "Apply" on any job
3. Register/login when prompted
4. Complete your profile (optional, but recommended)
5. Apply for jobs

### For Employers
1. Click "Post Job" button
2. Register/login when prompted
3. Complete employer profile (required for job posting)
4. Post job listings
5. Receive applications

## Next Steps (Optional Enhancements)

1. **Email Verification**: Enable `requireEmailVerification: true` in auth config
2. **Password Reset**: Implement forgot password flow
3. **Social Login**: Add OAuth providers (Google, Facebook, etc.)
4. **Two-Factor Authentication**: Add 2FA support
5. **Role-Based Permissions**: Add admin roles and permissions

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL is correct
- Run `npx prisma migrate reset` to reset database

### Authentication Not Working
- Check NEXT_PUBLIC_APP_URL matches your development URL
- Clear browser cookies and try again
- Check browser console for errors

### Profile Updates Not Saving
- Check browser network tab for API errors
- Verify Prisma Client is generated: `npx prisma generate`
- Check database connection

## Support

For issues or questions:
1. Check the Better Auth documentation: https://www.better-auth.com
2. Check Prisma documentation: https://www.prisma.io/docs
3. Review the code comments in `/src/lib/auth.ts` and `/src/lib/auth-client.ts`
