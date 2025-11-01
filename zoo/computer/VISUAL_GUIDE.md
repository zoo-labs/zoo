# Visual Guide - Ecommerce Features

## 🎨 Purchase Method Visual Indicators

### DGX Spark ($4,000) - Stripe Purchase

```
┌─────────────────────────────────────────────┐
│  [Most Popular] [💳 Buy Now]                │
│                                              │
│  DGX Spark                                   │
│  Perfect for startups and researchers...    │
│                                              │
│  $4,000  One-Time Setup                     │
│                                              │
│  ┌───────────────────────────────────────┐  │
│  │ 💳 Pay with Credit Card (Stripe)     │  │
│  └───────────────────────────────────────┘  │
│                                              │
│  ✓ Dedicated DGX Instance                   │
│  ✓ 100 Hours Compute Included               │
│  ✓ 2 TB NVMe Storage                        │
│  ✓ Pre-configured AI Stack                  │
│  ✓ Community & Docs Support                 │
│                                              │
│  [ Add to Cart ] ← Click here!              │
└─────────────────────────────────────────────┘
```

### Enterprise Solutions - Sales Call Required

```
┌─────────────────────────────────────────────┐
│  GPU On-Demand / Enterprise & Resale        │
│  Flexible access to raw H100 and H200...   │
│                                              │
│  Usage-Based / Custom                       │
│                                              │
│  ┌───────────────────────────────────────┐  │
│  │ 💬 Contact Sales Required             │  │
│  └───────────────────────────────────────┘  │
│                                              │
│  ✓ Access to H100 & H200 GPUs               │
│  ✓ Scale from 1 to 100s of GPUs            │
│  ✓ Custom Networking & Security             │
│  ✓ 24/7 Dedicated Support SLA               │
│                                              │
│  [ Contact Sales ] ← Opens Hanzo.AI         │
└─────────────────────────────────────────────┘
```

## 🛒 Header Navigation

```
┌────────────────────────────────────────────────────────────────┐
│  [Hanzo.Computer Logo]    Features  Hardware  Pricing          │
│                                                                 │
│                           👤   🛒(2)   [Contact Sales]          │
│                         Account Cart                            │
└────────────────────────────────────────────────────────────────┘
                                    ↑
                        Live item count badge
                        (Primary orange on black)
```

## 🛍️ Shopping Cart Page

```
┌────────────────────────────────────────────────────────────────┐
│  Shopping Cart                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ ✅ Ready to Purchase                                     │  │
│  │ Pay securely with credit card via Stripe                │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  DGX Spark                                    $4,000    │  │
│  │  Perfect for startups and researchers...               │  │
│  │  [−] 1 [+]  Remove                                     │  │
│  │                                                          │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ 💬 Requires Sales Consultation                          │  │
│  │ Enterprise solutions need custom configuration          │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  GPU On-Demand                          Custom Quote    │  │
│  │  Flexible access to raw H100 and...                    │  │
│  │  Remove                                                 │  │
│  │                                                          │  │
│  │  [ Schedule Sales Call ] → Hanzo.AI                    │  │
│  │                                                          │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ╔═════════════════════════╗                                   │
│  ║ Order Summary           ║                                   │
│  ╠═════════════════════════╣                                   │
│  ║ DGX Spark × 1  $4,000  ║                                   │
│  ║ ─────────────────────── ║                                   │
│  ║ Total      $4,000      ║                                   │
│  ║                         ║                                   │
│  ║ [Proceed to Checkout]  ║                                   │
│  ║                         ║                                   │
│  ║ 🔒 Secure via Stripe   ║                                   │
│  ╚═════════════════════════╝                                   │
└────────────────────────────────────────────────────────────────┘
```

## 💳 Checkout Page

```
┌────────────────────────────────────────────────────────────────┐
│  Secure Checkout                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Contact Information                                      │  │
│  │ Email *        [your@email.com         ]                │  │
│  │ Full Name *    [John Doe               ]                │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Billing Address                                          │  │
│  │ Address        [123 Main St            ]                │  │
│  │ City           [San Francisco          ]                │  │
│  │ State  [CA]    ZIP [94105]                              │  │
│  │ Country        [United States ▼]                        │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Payment Information                                      │  │
│  │                                                          │  │
│  │ Card Details * ┌─────────────────────────────────────┐ │  │
│  │                │ 💳 Stripe Secure Input              │ │  │
│  │                │ [4242 4242 4242 4242] [MM/YY] [CVC]│ │  │
│  │                └─────────────────────────────────────┘ │  │
│  │                                                          │  │
│  │ [ 🔒 Pay $4,000 ]                                       │  │
│  │                                                          │  │
│  │ Your payment is encrypted and secure.                   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ╔═════════════════════════╗                                   │
│  ║ Order Summary           ║                                   │
│  ╠═════════════════════════╣                                   │
│  ║ DGX Spark                                                   │
│  ║ Qty: 1        $4,000   ║                                   │
│  ║                         ║                                   │
│  ║ Subtotal      $4,000   ║                                   │
│  ║ Tax    Calculated...   ║                                   │
│  ║ ─────────────────────── ║                                   │
│  ║ Total         $4,000   ║                                   │
│  ║                         ║                                   │
│  ║ ℹ️  Instance provisioned ║                                   │
│  ║    within 24-48 hours  ║                                   │
│  ╚═════════════════════════╝                                   │
└────────────────────────────────────────────────────────────────┘
```

## 📊 Account Dashboard

```
┌────────────────────────────────────────────────────────────────┐
│  My Account                                                     │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐       │
│  │ 🛒 Total Orders│ │ ✅ Active     │ │ 💰 Total Spent│       │
│  │      2         │ │    Instances  │ │    $8,000     │       │
│  │                │ │      2        │ │               │       │
│  └───────────────┘ └───────────────┘ └───────────────┘       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Order History                          [+ New Order]    │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  Order #ORD-1234567890        [✅ Completed]            │  │
│  │  January 15, 2025, 10:30 AM            $4,000          │  │
│  │  ─────────────────────────────────────────────────────  │  │
│  │  DGX Spark × 1                         $4,000          │  │
│  │                                                          │  │
│  │  [Access Your Instance →]                               │  │
│  │                                                          │  │
│  ├─────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  Order #ORD-0987654321        [⏰ Pending]              │  │
│  │  January 14, 2025, 2:15 PM             $4,000          │  │
│  │  ─────────────────────────────────────────────────────  │  │
│  │  DGX Spark × 1                         $4,000          │  │
│  │                                                          │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────┐ ┌───────────────────────────┐  │
│  │ 💬 Need Help?             │ │ 🏢 Enterprise Solutions   │  │
│  │ Our support team is here │ │ Need custom SuperPODs or  │  │
│  │ to assist you with any   │ │ managed services? Talk to │  │
│  │ questions or issues.     │ │ our enterprise team.      │  │
│  │                           │ │                           │  │
│  │ [Contact Support →]      │ │ [Schedule Call →]         │  │
│  └───────────────────────────┘ └───────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

## 🎯 User Journey Flow

```
Homepage (/)
    │
    ├─→ Browse Pricing Section
    │       │
    │       ├─→ DGX Spark: Click "Add to Cart"
    │       │       │
    │       │       └─→ Success feedback
    │       │               │
    │       │               └─→ Auto-redirect to Cart (/cart)
    │       │
    │       └─→ Enterprise: Click "Contact Sales"
    │               │
    │               └─→ Opens Hanzo.AI in new tab
    │
    ├─→ Cart (/cart)
    │       │
    │       ├─→ Review items
    │       ├─→ Update quantities
    │       ├─→ Remove items
    │       │
    │       └─→ Click "Proceed to Checkout"
    │               │
    │               └─→ Checkout (/checkout)
    │                       │
    │                       ├─→ Fill billing info
    │                       ├─→ Enter card details
    │                       ├─→ Click "Pay $4,000"
    │                       │
    │                       └─→ Success!
    │                               │
    │                               └─→ Account (/account)
    │                                       │
    │                                       ├─→ See success message
    │                                       ├─→ View order history
    │                                       └─→ Track instances
    │
    └─→ Account Icon (Header)
            │
            └─→ Direct to Account (/account)
```

## 🔔 Notification States

### Success (Order Placed)
```
┌─────────────────────────────────────────────────────────────┐
│ ✅ Order Placed Successfully!                               │
│ Thank you for your purchase. Your DGX Spark instance will  │
│ be provisioned within 24-48 hours. We'll send you an      │
│ email with access details.                                 │
└─────────────────────────────────────────────────────────────┘
```

### Cart Item Added
```
┌─────────────────────────────┐
│ Button changes:              │
│                              │
│ Before: [Add to Cart]       │
│                              │
│ After:  [✅ Added to Cart!] │
│         (Green background)   │
└─────────────────────────────┘
```

### Processing Payment
```
┌─────────────────────────────┐
│ [⏳ Processing...]          │
│ (Animated spinner)           │
└─────────────────────────────┘
```

## 📱 Mobile Responsive

### Header (Mobile)
```
┌───────────────────────┐
│ [☰] [Logo]  👤 🛒(2) │
│                       │
│ [Menu expanded:]      │
│ • Features            │
│ • Hardware            │
│ • Pricing             │
│ [Contact Sales]       │
└───────────────────────┘
```

### Cart (Mobile)
```
┌─────────────────────┐
│ Shopping Cart       │
├─────────────────────┤
│ ✅ Ready to Purchase│
│                     │
│ DGX Spark          │
│ $4,000             │
│ [−] 1 [+]          │
│ Remove             │
│                     │
│ ─────────────────── │
│                     │
│ Order Summary      │
│ Total: $4,000      │
│                     │
│ [Proceed to        │
│  Checkout]         │
└─────────────────────┘
```

## 🎨 Color Reference

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary (Buy Now) | Orange | `#FF6B35` | Stripe purchases, CTAs |
| Secondary (Sales) | Cyan | `#00D9FF` | Sales consultation |
| Success | Green | `#10B981` | Success states |
| Background | Dark | `#0A0A0A` | Main background |
| Card | Dark Gray | `#1A1A1A` | Components |
| Border | Darker Gray | `#2A2A2A` | Separators |
| Text | White | `#FFFFFF` | Headings |
| Text Secondary | Light Gray | `#9CA3AF` | Body text |

---

**Note**: This is a visual representation. Actual implementation uses React components with Tailwind CSS for styling.
