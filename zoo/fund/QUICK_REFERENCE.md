# Zoo Fund Implementation - Quick Reference Card

## Priorities at a Glance

### HIGH PRIORITY (2 Weeks, ~11 Days)
```
Week 1                          Week 2
┌──────────────────────┐        ┌──────────────────────┐
│ Mon: Project Cards   │        │ Mon: Category Nav    │
│ Tue: Project Cards   │        │ Tue: Search Logic    │
│ Wed: Project Grid    │        │ Wed: Search UI       │
│ Thu: Category Nav    │        │ Thu: Metrics         │
│ Fri: Category Nav    │        │ Fri: Featured Proj   │
└──────────────────────┘        └──────────────────────┘

Total: 6 features, 11 days work
Outcome: Functional project discovery
```

### MEDIUM PRIORITY (2 Weeks, ~12 Days)
```
Impact Metrics (5d) → Project Timeline (3d) → 
Application Form (3-4d) → Governance (2-3d)
```

### LOW PRIORITY (Ongoing)
```
Blog Feed (2d) → Team Profiles (2d) → 
Partners (1d) → Twitter (1d)
```

---

## Component Checklist

### HIGH Priority Components (11 days)

- [ ] **ProjectCard.tsx** (2 days)
  ```
  Props: title, category, description, fundingAmount, image
  Size: 300px wide, responsive
  States: hover, active, disabled
  ```

- [ ] **ProjectGrid.tsx** (1 day)
  ```
  Layout: 4 cols → 3 → 1 (responsive)
  Features: loading, empty state, pagination
  ```

- [ ] **CategoryNav.tsx** (2 days)
  ```
  Items: 6 categories with emojis
  Behavior: click to filter
  Display: count + market cap
  ```

- [ ] **ProjectSearch.tsx** (2 days)
  ```
  Input: full-text search
  Filters: category, status, funding range
  Debounce: 300ms
  ```

- [ ] **MetricsDashboard.tsx** (1 day)
  ```
  Cards: 4 large stat cards
  Metrics: funding, projects, community, acres
  Layout: responsive grid
  ```

- [ ] **FeaturedProjects.tsx** (1 day)
  ```
  Size: 1.5x regular cards
  Carousel: 3 visible, auto-rotate
  Content: image, description, team
  ```

---

## File Structure Template

```
/components
├── ProjectCard.tsx ← START HERE
├── ProjectGrid.tsx
├── ProjectSearch.tsx
├── CategoryNav.tsx
├── MetricsDashboard.tsx
├── FeaturedProjects.tsx
├── ImpactMetrics.tsx (later)
├── ProjectTimeline.tsx (later)
└── index.ts

/pages
├── projects.tsx (update)
├── projects/[id].tsx (create)
└── governance.tsx (create)

/lib
├── projectFilter.ts
├── projectData.ts
└── types.ts
```

---

## Color Tokens

```css
/* Main Theme */
--color-primary-green: #2D8659
--color-light-green: #E8F5E9
--color-dark-green: #1B5E37
--color-accent-gold: #D4AF37
--color-neutral-gray: #F5F5F5
--color-text-dark: #2C3E50

/* Category Colors */
--category-poaching: #E74C3C
--category-habitat: #27AE60
--category-species: #3498DB
--category-community: #F39C12
--category-research: #9B59B6
--category-technology: #34495E

/* Status Colors */
--status-success: #27AE60
--status-pending: #F39C12
--status-error: #E74C3C
```

---

## Responsive Grid Sizes

```
Desktop (1200px+)     Tablet (768px)      Mobile (<768px)
┌─┬─┬─┬─┐           ┌──┬──┬──┐          ┌────┐
│1│2│3│4│           │1 │2 │3 │          │ 1  │
├─┼─┼─┼─┤           ├──┼──┼──┤          ├────┤
│5│6│7│8│           │4 │5 │6 │          │ 2  │
└─┴─┴─┴─┘           └──┴──┴──┘          └────┘
  4 columns           3 columns          1 column
  20px gap            20px gap           16px gap
```

---

## Component Anatomy

### ProjectCard
```
Image (300x169px)
├─ Category badge (top-left, color-coded)
├─ Project name (h4)
├─ Description (2-3 lines)
├─ Funding amount (large, bold)
└─ View Project button (CTA)
```

### CategoryNav Cards
```
🚫 Poaching Prevention
├─ 18 projects
├─ $2.5M market cap
└─ +12% 24h change (green)
```

### MetricsDashboard
```
┌──────────┬──────────┬──────────┬──────────┐
│ $12.5M   │   47     │ 15,000+  │ 125,000  │
│ Funding  │ Projects │ Community│  Acres   │
│ Deployed │ Funded   │ Members  │Protected │
└──────────┴──────────┴──────────┴──────────┘
```

---

## API Endpoints Needed

### GET /api/projects
```json
Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- category: string (filter)
- status: string (filter)
- search: string (full-text)

Returns:
{
  data: Project[],
  pagination: { total, page, perPage }
}
```

### GET /api/projects/[id]
```json
Returns:
{
  data: {
    id, title, description,
    funding, team[], milestones[],
    impactMetrics: { acres, species, ... }
  }
}
```

---

## Testing Essentials

### Unit Tests (Jest)
```javascript
// ProjectCard.tsx
✓ Renders with required props
✓ Links navigate correctly
✓ Responsive at breakpoints

// ProjectSearch.tsx
✓ Filters in real-time
✓ Debounces correctly
✓ Handles empty results
```

### Integration Tests
```javascript
// Projects Page
✓ Grid + Search work together
✓ Filters + Categories combined
✓ Navigation to detail page
```

### E2E Tests (Cypress)
```javascript
// User Journey
✓ User searches for "habitat"
✓ User filters by category
✓ User opens project
✓ User scrolls timeline
✓ User shares project (if available)
```

---

## Performance Targets

```
Metric                  Target      Tool
──────────────────────────────────────────
FCP (First Paint)      <1.5s       Lighthouse
LCP (Largest Paint)    <2.5s       Lighthouse
CLS (Layout Shift)     <0.1        Lighthouse
TTI (Interactive)      <3.5s       Lighthouse
Accessibility          >80         Lighthouse

Image size             <50KB       ImageOptim
JS bundle              <200KB gz   Webpack
CSS bundle             <50KB gz    Webpack
```

---

## Design Tokens Quick Ref

### Typography
```
H1: 48px bold
H2: 36px bold
H3: 24px bold
H4: 18px bold (use for project titles)
Body: 16px regular
Small: 14px regular
```

### Spacing Scale
```
4px   → fine details
8px   → small gaps
12px  → button padding
16px  → small component padding
20px  → grid gaps
24px  → card padding
32px  → section padding
80px  → section margin
```

### Border Radius
```
0px   → sharp corners
4px   → slight rounding
8px   → moderate (default for cards)
12px  → more rounded
24px  → buttons
50%   → circles
```

---

## Deployment Checklist

### Pre-Launch
- [ ] All HIGH priority features complete
- [ ] Responsive design tested (mobile/tablet/desktop)
- [ ] Lighthouse score >80
- [ ] Accessibility audit passed
- [ ] 404/error pages configured
- [ ] Analytics tracking added
- [ ] SEO meta tags set
- [ ] Social preview images created

### Launch Day
- [ ] Monitor error logs
- [ ] Check mobile experience
- [ ] Verify all links working
- [ ] Confirm newsletter signup
- [ ] Test social sharing
- [ ] Discord notifications sent
- [ ] Twitter announcement posted

### Post-Launch (Week 1)
- [ ] Gather user feedback
- [ ] Monitor analytics
- [ ] Fix reported bugs
- [ ] Optimize performance
- [ ] Plan MEDIUM priority sprint

---

## Common Issues & Solutions

### Issue: Search too slow
**Solution**: Debounce input (300ms), use React.useMemo for filter logic

### Issue: Cards not responsive
**Solution**: Use CSS Grid with `auto-fit` and `minmax(300px, 1fr)`

### Issue: Images loading slow
**Solution**: Use Next.js Image component, lazy load, WebP format

### Issue: Layout shifts
**Solution**: Set fixed aspect ratio for images (16:9 = 56.25% padding-bottom)

### Issue: Mobile menu hidden
**Solution**: Ensure z-index stack: navigation > modal > content

---

## Quick Wins for MVP

Priority features that deliver immediate impact:

1. **Project Cards** - Foundation for everything else
2. **Category Nav** - Makes browsing intuitive
3. **Search** - Major UX improvement vs. VitaDAO
4. **Metrics** - Builds credibility
5. **Featured Projects** - Highlights key conservation efforts

These 5 features alone will make Zoo Fund significantly better than VitaDAO.

---

## Standards & Conventions

### Component Props Naming
```typescript
interface ComponentProps {
  // Required
  title: string;
  // Optional with defaults
  category?: 'Poaching' | 'Habitat' | 'Species';
  // Event handlers
  onViewProject?: (id: string) => void;
  // Styling overrides
  className?: string;
}
```

### Styling Approach
```
Primary: TailwindCSS utility classes
Secondary: CSS Modules for complex layouts
Avoid: Inline styles
Pattern: Responsive-first (mobile-up)
```

### Git Commit Format
```
feat(projects): add ProjectCard component
fix(search): debounce filter input
style(cards): improve hover animation
docs(readme): update feature list
test(grid): add responsive layout tests
```

---

## Key Metrics to Track

### Usage Analytics
```
Google Analytics 4:
✓ Projects page sessions
✓ Search query analysis
✓ Filter usage by type
✓ Project detail views
✓ Time on page
✓ Bounce rate by feature
```

### Performance Metrics
```
Web Vitals:
✓ Core Web Vitals score
✓ Page load time
✓ JavaScript execution time
✓ Image loading time
✓ Mobile vs. desktop performance
```

### Business Metrics
```
Conversions:
✓ Projects submitted
✓ Discord invites joined
✓ Newsletter signups
✓ Governance participation
✓ Community growth rate
```

---

## Resource Links

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

### Design Inspiration
- [Molecule.xyz](https://molecule.xyz) - Category cards
- [VitaDAO](https://vitadao.com) - Card layouts
- [Radix UI](https://radix-ui.com) - Components

### Performance
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web.dev](https://web.dev/performance)
- [WebPageTest](https://webpagetest.org)

---

## Timeline Visualization

```
Oct 30    Nov 6     Nov 13    Nov 20    Nov 27
  |---------|---------|---------|---------|
  Analysis  HIGH      MED       LAUNCH    Content
  Complete  Priority  Priority  Phase 1   Strategy
            Dev       Dev       Ready
            Week 1-2  Week 3-4  Phase 2   Phase 3
```

---

## Success = ?

### Minimum (MVP)
✓ Projects searchable by name/category  
✓ Impact metrics displayed per project  
✓ Featured projects highlighted  
✓ Discord link prominent  

### Good
✓ All above plus...  
✓ Timeline/milestones visible  
✓ Team member profiles shown  
✓ Governance voting accessible  

### Excellent
✓ All above plus...  
✓ Real-time impact updates  
✓ Community contribution tracking  
✓ Quarterly impact reports  
✓ Donor dashboard  

---

## Remember

```
"Perfect is the enemy of good"

Ship HIGH priority features quickly.
Gather feedback from users.
Iterate based on real usage.
Optimize based on metrics.
Plan next phase based on learnings.
```

---

**Document Version**: 1.0  
**Last Updated**: 2025-10-30  
**Print Friendly**: Yes (fits on 2-3 pages)  
**Share With**: Entire team at kickoff
