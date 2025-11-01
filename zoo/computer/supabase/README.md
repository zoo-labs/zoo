# Supabase Setup for Hanzo.Computer

This directory contains the database schema and setup instructions for the Hanzo.Computer leasing platform.

## Database Information

**Project ID**: `fefkbezinxawrutwjdkq`  
**Region**: us-east-1  
**Database URL**: `postgresql://postgres:[PASSWORD]@db.fefkbezinxawrutwjdkq.supabase.co:5432/postgres`  
**Supabase URL**: `https://fefkbezinxawrutwjdkq.supabase.co`

## Setup Instructions

### 1. Initialize Database

1. Go to Supabase SQL Editor: https://supabase.com/dashboard/project/fefkbezinxawrutwjdkq/sql
2. Run the `schema.sql` file to create all tables and policies
3. Verify tables are created in Table Editor

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Get your Supabase API keys:
1. Go to Project Settings → API
2. Copy the Project URL (already in .env.example)
3. Copy the `anon` public key to `VITE_SUPABASE_ANON_KEY`

### 3. Test Database Connection

```bash
npm run dev
```

Try submitting an RFQ or cluster request to verify the connection.

## Database Schema

### Core Tables

- **users**: User profiles (extends Supabase auth)
- **rfqs**: Request for Quote submissions
- **cluster_requests**: GPU cluster inquiries
- **quotes**: Admin-generated quotes
- **orders**: Accepted quotes or direct purchases
- **subscriptions**: Recurring GPU leasing subscriptions
- **invoices**: Generated invoices (Stripe or manual)
- **gpu_reservations**: Provisioned GPU instances
- **usage_records**: GPU usage tracking
- **admin_actions**: Audit log for admin operations

### Row Level Security (RLS)

All tables have RLS policies:
- **Customers** can create RFQs/cluster requests and view their own data
- **Admins** can view and manage all data
- Anonymous users can submit RFQs (unauthenticated)

## Admin Setup

To create an admin user:

1. Sign up via the app (creates a customer user)
2. In Supabase SQL Editor, run:

```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

## API Functions

Helper functions in `src/lib/supabase.ts`:

**Customer Functions**:
- `submitRFQ()` - Submit request for quote
- `submitClusterRequest()` - Submit cluster inquiry
- `getUserRFQs()` - Get user's RFQs
- `getUserQuotes()` - Get user's quotes
- `getUserOrders()` - Get user's orders
- `getUserSubscriptions()` - Get user's subscriptions

**Admin Functions**:
- `getAllRFQs()` - Get all RFQs (with optional status filter)
- `getAllClusterRequests()` - Get all cluster requests
- `updateRFQStatus()` - Update RFQ status
- `updateClusterRequestStatus()` - Update cluster request status

## Integration with Forms

Both RFQ and Clusters pages use Supabase for data persistence:

**Request Quote** (`/request-quote`):
- Submits to `rfqs` table via `submitRFQ()`

**Clusters** (`/clusters`):
- Submits to `cluster_requests` table via `submitClusterRequest()`

## Next Steps

1. ✅ Database schema created
2. ✅ RLS policies configured
3. ⏳ Create admin dashboard to view RFQs/cluster requests
4. ⏳ Build quote generation workflow
5. ⏳ Integrate Stripe for payments
6. ⏳ Build customer dashboard

## Troubleshooting

**Connection errors**:
- Verify Supabase URL and anon key in `.env.local`
- Check project is not paused in Supabase dashboard

**RLS errors**:
- Verify policies are enabled: `SELECT * FROM pg_policies WHERE tablename = 'rfqs';`
- Test with authenticated vs. unauthenticated requests

**Missing tables**:
- Re-run `schema.sql` in SQL Editor
- Check for SQL errors in execution logs
