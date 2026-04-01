# Zoo Fund Feature Specifications

## Detailed UI/UX Specifications from Bio.xyz Analysis

---

## 1. Project Card Component

### Visual Structure
```
┌─────────────────────────────────────┐
│                                     │
│     [Project Image 16:9 ratio]     │  ← 300x169px minimum
│                                     │
├─────────────────────────────────────┤
│                                     │
│  [CATEGORY BADGE]                   │  ← Color-coded, uppercase
│  Project Name (h4)                  │  ← 18px bold
│  This is a 2-3 sentence             │  ← 14px regular
│  description of the project that    │     max 150 chars
│  shows what it does.                │
│                                     │
│  $ 125,000 allocated                │  ← 16px bold, green
│                                     │
│                     [View Project→] │  ← CTA button with icon
└─────────────────────────────────────┘
```

### States
- **Default**: white background, light shadow
- **Hover**: shadow grows, slight elevation (translate Y -2px)
- **Active**: border color changes to primary green
- **Disabled**: opacity 0.5, cursor not-allowed

### Responsive Behavior
- Desktop: 300px width, 4 columns on 1200px viewport
- Tablet: 250px width, 3 columns on 768px viewport
- Mobile: full width - 20px padding, 1 column on <375px

### Category Badge Specifications
```
Poaching Prevention    → #E74C3C (Red)
Habitat Restoration   → #27AE60 (Green)
Species Recovery      → #3498DB (Blue)
Community Engagement  → #F39C12 (Orange)
Research & Science    → #9B59B6 (Purple)
Technology Innovation → #34495E (Gray)
```

---

## 2. Project Grid Layout

### Grid Configuration
```
Desktop (1200px+)
┌─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │
├─────┼─────┼─────┼─────┤
│  5  │  6  │  7  │  8  │
└─────┴─────┴─────┴─────┘

Tablet (768px - 1199px)
┌─────────┬─────────┬─────────┐
│    1    │    2    │    3    │
├─────────┼─────────┼─────────┤
│    4    │    5    │    6    │
└─────────┴─────────┴─────────┘

Mobile (< 768px)
┌─────────────────┐
│        1        │
├─────────────────┤
│        2        │
├─────────────────┤
│        3        │
└─────────────────┘
```

### Spacing
- Column gap: 20px
- Row gap: 24px
- Container padding: 32px left/right

### Loading State
- Show 6-8 skeleton cards while fetching
- Skeleton: gray background, shimmer animation
- Duration: 2-3 seconds

### Empty State
```
╔═══════════════════════════════════╗
║     🌍 No projects found          ║
║                                   ║
║  Try adjusting your filters or   ║
║  search terms.                    ║
║                                   ║
║     [Clear Filters] [Reset]      ║
╚═══════════════════════════════════╝
```

---

## 3. Category Navigation Component

### Layout (Based on Molecule Domain Cards)
```
┌──────────────┬──────────────┬──────────────┐
│  🚫 Poaching │  🌳 Habitat  │  🦁 Species  │
│ Prevention   │ Restoration  │  Recovery    │
│              │              │              │
│  18 projects │  24 projects │  32 projects │
│              │              │              │
│ $ 2.5M Cap   │ $ 4.2M Cap   │ $ 5.1M Cap   │
│ +12% 24h     │ +8% 24h      │ -2% 24h      │
└──────────────┴──────────────┴──────────────┘

┌──────────────┬──────────────┬──────────────┐
│ 👥 Community │ 🔬 Research  │ 💻 Technology│
│ Engagement   │ & Science    │  Innovation  │
│              │              │              │
│  9 projects  │  15 projects │  7 projects  │
│              │              │              │
│ $ 1.2M Cap   │ $ 3.5M Cap   │ $ 0.8M Cap   │
│ +5% 24h      │ +15% 24h     │ +3% 24h      │
└──────────────┴──────────────┴──────────────┘
```

### Card Specifications
- **Width**: Responsive 3 columns on desktop, 2 on tablet, 1 on mobile
- **Height**: 140px fixed
- **Padding**: 16px
- **Content**:
  - Emoji icon (32px)
  - Category name (h4, 18px)
  - Project count (14px, gray)
  - Market cap (14px bold)
  - 24h change with color (red/green)
- **Hover**: Shadow increases, background color lightens
- **Click**: Navigate to filtered project list

### Performance Data Display
- Green color: #27AE60 for positive changes
- Red color: #E74C3C for negative changes
- Show percentage as +12% or -2% with icon (↑/↓)

---

## 4. Search & Filter Component

### Layout
```
┌─────────────────────────────────────────────────────┐
│ 🔍 [Search projects by name or description...   ] │
└─────────────────────────────────────────────────────┘

Filter by:
[All Categories ▼]  [All Statuses ▼]  [Show More ▼]

Results: 24 projects found
[X] Active Filter: "Species Recovery"
```

### Search Input Specifications
- **Placeholder**: "Search projects by name or description..."
- **Icon**: Magnifying glass (left side, 20px)
- **Clear button**: X icon (right side, visible when typing)
- **Debounce**: 300ms before filtering
- **Min characters**: 2 characters before searching
- **Case insensitive**: Yes

### Dropdown Filters
```
Category ▼
├─ All Categories
├─ Poaching Prevention (5)
├─ Habitat Restoration (8)
├─ Species Recovery (12)
├─ Community Engagement (3)
├─ Research & Science (7)
└─ Technology Innovation (4)

Status ▼
├─ All Statuses
├─ Active (20)
├─ Completed (8)
└─ Planned (4)

Funding Range ▼
├─ All Amounts
├─ $0 - $50K (6)
├─ $50K - $250K (12)
├─ $250K - $1M (8)
└─ $1M+ (6)
```

### Results Display
```
Showing 24 of 32 projects

🔍 Filters Applied:
[Active] [X] [Habitat Restoration] [X] [Clear All]

[Project Card 1] [Project Card 2] ...
```

### No Results State
```
╔═══════════════════════════════════╗
║   No projects match your filters  ║
║                                   ║
║  Try:                             ║
║  • Removing some filters          ║
║  • Using different keywords       ║
║  • Browsing all categories        ║
║                                   ║
║        [Clear Filters]            ║
╚═══════════════════════════════════╝
```

---

## 5. Metrics Dashboard

### Layout (4-Column Grid)
```
┌────────────────┬────────────────┬────────────────┬────────────────┐
│                │                │                │                │
│  $ 12.5M       │       47       │      15,000+   │     125,000    │
│  Funding       │    Projects    │   Community    │   Acres        │
│  Deployed      │    Funded      │   Members      │   Protected    │
│                │                │                │                │
└────────────────┴────────────────┴────────────────┴────────────────┘
```

### Card Specifications
- **Width**: Responsive (25% on desktop, 50% on tablet, 100% on mobile)
- **Height**: 120px fixed
- **Padding**: 24px
- **Background**: Gradient or solid color (alternating)
- **Number styling**: 48px, bold, primary color
- **Label styling**: 14px, gray, normal weight
- **Animation**: Subtle entrance animation (fade in from bottom)

### Color Scheme Per Metric
- Funding: Green gradient (#27AE60 to #2ECC71)
- Projects: Blue gradient (#3498DB to #2980B9)
- Community: Orange gradient (#F39C12 to #E67E22)
- Acres: Purple gradient (#9B59B6 to #8E44AD)

### Update Frequency
- Real-time or daily refresh
- Show "Last updated: 2 hours ago"
- Timestamp in footer of section

---

## 6. Featured Projects Section

### Layout (Above Main Grid)
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              Featured Wildlife Conservatio Projects      │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │              │  │              │  │              │  │
│  │   Project 1  │  │   Project 2  │  │   Project 3  │  │
│  │  (Large Card)│  │  (Large Card)│  │  (Large Card)│  │
│  │              │  │              │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│            [← Prev]           [Next →]                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Featured Card Size
- **Width**: 1.5x regular card width
- **Desktop**: 3 cards visible, 450px each
- **Tablet**: 2 cards visible, 375px each
- **Mobile**: 1 card visible, full width - 40px

### Featured Card Content
```
┌─────────────────────────────────────┐
│                                     │
│   [Featured Project Image]          │  ← 16:9 ratio, larger
│   (Large, 450x254px)                │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  [FEATURED] [CATEGORY BADGE]        │  ← Additional badges
│                                     │
│  Project Name                       │  ← h3 (24px)
│                                     │
│  This is a longer description      │  ← Full paragraph
│  that shows more detail about       │     (200 chars)
│  the project goals and impact       │
│  expected.                          │
│                                     │
│  $ 500,000 in funding               │  ← Larger amount display
│  Lead by: Dr. Jane Smith            │  ← Team member
│                                     │
│         [View Full Project →]       │  ← Prominent CTA
│                                     │
└─────────────────────────────────────┘
```

### Carousel Controls
- Auto-rotate every 5 seconds (optional)
- Manual prev/next buttons with arrows
- Dot indicators showing current slide
- Smooth CSS transitions (300ms)

---

## 7. Impact Metrics Display (Per Project)

### Layout on Project Detail Page
```
┌─────────────────────────────────────────────────────┐
│                  Impact Metrics                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Acres Protected                                    │
│  ████████████░░░░░░░░  1,250 / 2,000 acres        │
│  62.5%                                              │
│                                                     │
│  Species Population Increase                        │
│  ████████░░░░░░░░░░░░░  +15% vs. baseline          │
│  ♦ Endangered species count: +48 individuals       │
│                                                     │
│  Community Engagement                              │
│  ████████████████░░░░░░  1,247 members engaged     │
│  78.3%                                              │
│                                                     │
│  Carbon Offset                                      │
│  ████████████████░░░░░░  12,500 kg CO2 equivalent  │
│                                                     │
│  Funding Progress                                   │
│  ███████████░░░░░░░░░░░░  $875K raised of $1.2M   │
│  72.9%                                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Progress Bar Specifications
- **Height**: 12px
- **Border radius**: 6px
- **Filled color**: Primary green (#27AE60)
- **Unfilled color**: Light gray (#E8E8E8)
- **Animation**: Smooth fill over 2 seconds on page load
- **Label positioning**: Right of bar with percentage

### Metric Card Layout
- Display in 2-column grid on desktop
- Single column on mobile
- Gap: 20px between cards
- Background: Light gray (#F9F9F9)
- Padding: 16px
- Border radius: 8px

---

## 8. Project Timeline/Milestones

### Layout
```
                    Timeline & Milestones
                              
    Q4 2024              Q1 2025              Q2 2025              Q4 2025
        │                   │                   │                    │
        ✓                   ◆                   ◆                    ◆
    Initial Survey      Ground Prep         Tree Planting        Monitoring
    Completed           In Progress         Planned              Planned
    Oct 2024            Dec 2024 - Jan 2025  Feb - Apr 2025      May 2025 onward
        
    ▪ 500 acres surveyed    ▪ Infrastructure   ▪ 100K trees        ▪ Biodiversity
    ▪ Baseline species        being built       ▪ Community          monitoring
      count established       ▪ Water system      volunteer          ▪ Population
    ▪ Report published         installed          recruitment        tracking

                                                                    40% Complete
```

### Milestone Card Design
```
┌─────────────────────────────────┐
│ ✓ Completed Milestone           │  ← Checkmark icon, green background
├─────────────────────────────────┤
│ Habitat Assessment Survey       │  ← Bold title
│ Q4 2024 (Completed Oct 2024)   │  ← Date info
│                                 │
│ Conducted comprehensive field   │  ← Description (50-100 words)
│ survey of 500-acre restoration  │
│ area. Identified key species    │
│ and ecosystem health metrics.   │
│                                 │
│ Outcomes:                       │  ← Bullet points
│ • 12 endangered species found   │
│ • Soil quality good             │
│ • Water sources identified      │
└─────────────────────────────────┘
```

### Timeline Line Specifications
- **Line color**: Light gray (#CCCCCC)
- **Completed section**: Green (#27AE60)
- **Circle icon**: 20px diameter
  - Completed: Green checkmark circle
  - In progress: Blue circle with 50% fill
  - Planned: Gray circle outline
- **Mobile view**: Switch to vertical timeline

---

## 9. Navigation & Information Architecture

### Header Navigation
```
┌──────────────────────────────────────────────────────┐
│ [Zoo Fund Logo] Home Explore Governance Apply Blog   │
│                                      Search  [Connect]│
└──────────────────────────────────────────────────────┘
```

### Main Menu Items
- **Home**: Return to landing
- **Explore**: Projects discovery page
- **Governance**: DAO proposals & voting
- **Apply**: Project funding application
- **Blog**: News & updates
- **Governance**: Snapshot/voting link
- **Connect Wallet**: Web3 interaction

### Breadcrumb Navigation (on project detail pages)
```
Home / Projects / Habitat Restoration / Project Name
```

### Footer Links Organization
```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ About Zoo Fund  │ Community       │ Governance      │ Resources       │
│                 │                 │                 │                 │
│ • Mission       │ • Discord       │ • Proposals     │ • How to apply  │
│ • Team          │ • Twitter       │ • Forum         │ • FAQ           │
│ • Blog          │ • Instagram     │ • Treasury      │ • Press kit     │
│ • FAQ           │ • LinkedIn      │ • Voting guide  │ • Privacy       │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

---

## 10. Component Interaction Flows

### Project Discovery Flow
```
User visits website
         ↓
   Sees Metrics & Featured Projects
         ↓
   Clicks "Explore Projects" or category card
         ↓
   Lands on projects page
         ↓
   ┌─────────────────────────────┐
   │ User can:                   │
   │ 1. Search by name/keyword   │
   │ 2. Filter by category       │
   │ 3. Filter by status         │
   │ 4. Filter by funding range  │
   └─────────────────────────────┘
         ↓
   Clicks project card
         ↓
   ┌────────────────────────────────┐
   │ Project Detail Page shows:     │
   │ • Full description             │
   │ • Team members                 │
   │ • Impact metrics               │
   │ • Milestones/timeline          │
   │ • Funding progress             │
   │ • Links (website, social, etc) │
   │ CTA: "Support This Project"    │
   └────────────────────────────────┘
```

### Project Application Flow
```
User clicks "Apply for Funding"
         ↓
   Lands on application form
         ↓
   Fills in:
   • Project name
   • Organization
   • Team members
   • Conservation focus
   • Funding request
   • Project description
   • Expected impact
   • Timeline
         ↓
   Submits form
         ↓
   Confirmation page + email
         ↓
   Application visible in user dashboard
         ↓
   Voting community reviews
         ↓
   Vote results -> Funding or next round
```

### Community Engagement Flow
```
User discovers project
         ↓
   Joins Discord for discussion
         ↓
   ┌──────────────────────────────┐
   │ In Discord, user can:        │
   │ • Ask questions              │
   │ • See project updates        │
   │ • Vote on governance matters │
   │ • Volunteer for tasks        │
   │ • Connect with team/community│
   └──────────────────────────────┘
```

---

## 11. Responsive Design Breakpoints

### Mobile (320px - 767px)
- Single column layouts
- Full-width cards
- Hamburger menu
- Touch-friendly buttons (44px minimum height)
- Stack all sections vertically
- Simplified metrics (2 per row)

### Tablet (768px - 1199px)
- 2-3 column layouts
- Cards: 70% of container width
- Side navigation possible
- Grid layouts activated
- 4 metric cards in 2x2 grid

### Desktop (1200px+)
- Full 3-4 column layouts
- Cards: fixed width + responsive gap
- Full navigation visible
- All features enabled
- 4 metric cards in single row

### Extra Large (1920px+)
- Maximum container width: 1400px (centered)
- 4-5 column layouts possible
- Larger typography for readability

---

## 12. Accessibility Specifications

### Color Contrast
- All text: minimum 4.5:1 contrast ratio
- Button text: minimum 4.5:1
- Links: underline in addition to color
- Status indicators: not color-only (add icons)

### Interactive Elements
- All buttons: minimum 44px height (touch target)
- Focus indicators: visible outline (2px, primary color)
- Link focus: underline + background color
- Form inputs: visible labels + error messages

### Keyboard Navigation
- Tab order: logical (left-to-right, top-to-bottom)
- Skip to content link
- Modal dialogs: proper focus trapping
- Escape key closes modals/dropdowns

### Screen Reader Support
- Semantic HTML (buttons, lists, headings)
- ARIA labels on icons
- Form labels associated with inputs
- Image alt text for all project images

### Motion & Animation
- Reduced motion: respect `prefers-reduced-motion`
- Animations < 500ms duration
- No auto-playing content
- Clear loading states

---

## 13. Performance Specifications

### Load Times
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

### Image Optimization
- Project cards: ~50KB per image (WebP format)
- Responsive images (srcset for 1x, 2x, 3x)
- Lazy loading for below-fold images
- Thumbnail size: 300x169px (mobile), 450x254px (featured)

### Bundle Size
- JavaScript: < 200KB (gzipped)
- CSS: < 50KB (gzipped)
- Images: optimized with compression
- No render-blocking resources

### Caching
- Static assets: 30-day cache
- API responses: 5-minute cache
- Images: long-term cache (1 year)

---

## 14. Data Requirements & API Endpoints

### GET /api/projects
```json
{
  "data": [
    {
      "id": "proj_001",
      "title": "Amazon Rainforest Restoration",
      "category": "Habitat Restoration",
      "description": "Restoring 5,000 acres...",
      "fundingAmount": 500000,
      "image": "url_to_image",
      "featured": true,
      "status": "Active",
      "impactMetrics": {
        "acresProtected": 1250,
        "speciesCount": 48,
        "communityMembers": 1247,
        "carbonOffset": 12500
      }
    }
  ],
  "pagination": {
    "total": 47,
    "page": 1,
    "perPage": 20
  }
}
```

### GET /api/projects/[id]
```json
{
  "data": {
    "id": "proj_001",
    "title": "Amazon Rainforest Restoration",
    "fullDescription": "...",
    "team": [
      {
        "name": "Dr. Jane Smith",
        "title": "Project Lead",
        "bio": "...",
        "image": "url"
      }
    ],
    "milestones": [
      {
        "date": "2024-10-30",
        "title": "Survey Completed",
        "status": "completed"
      }
    ]
  }
}
```

---

## 15. Testing Specifications

### Unit Tests
- Component rendering (Jest + React Testing Library)
- Filter logic (array operations)
- Search debouncing
- State management
- Props validation

### Integration Tests
- Project grid + filters
- Search + category filter combined
- Form submission + validation
- API data fetching

### E2E Tests (Cypress)
- User discovers project via search
- User filters by category
- User opens project detail
- User applies for funding
- User navigates back to list

### Visual Regression
- Project cards at different widths
- Metrics dashboard responsive states
- Category nav on mobile/tablet/desktop
- All interactive states (hover, focus, active)

---

**Document Version**: 1.0  
**Last Updated**: 2025-10-30  
**Specification Status**: Complete and Ready for Development
