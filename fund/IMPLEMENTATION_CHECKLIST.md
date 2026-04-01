# Zoo Fund Feature Implementation Checklist

## Quick Reference Guide for Development

---

## HIGH PRIORITY (Weeks 1-2)

### Feature 1: Project Cards Component
- [ ] Create `/zoo/app/components/ProjectCard.tsx`
- [ ] Props: title, category, description, fundingAmount, impactMetric, image
- [ ] Styling: rounded corners, subtle shadows, hover effects
- [ ] Responsive: stack on mobile, grid on desktop
- [ ] Link to project detail pages
- [ ] Test on mobile viewport (375px, 768px, 1200px)
- [ ] Add to Storybook for QA

**Estimated Time**: 2 days  
**Dependencies**: None  
**Files**: 
- Create: `/zoo/app/components/ProjectCard.tsx`
- Modify: `/zoo/app/components/index.ts`

---

### Feature 2: Project Grid/List View
- [ ] Create `/zoo/app/components/ProjectGrid.tsx`
- [ ] Accept array of projects
- [ ] Responsive grid (2-4 columns based on viewport)
- [ ] Gap/spacing matching Molecule (16-24px)
- [ ] Support for "Featured" vs "Regular" projects
- [ ] Support for category grouping

**Estimated Time**: 1 day  
**Dependencies**: ProjectCard component

---

### Feature 3: Category Navigation
- [ ] Create category filter component
- [ ] Categories:
  - [ ] Poaching Prevention
  - [ ] Habitat Restoration
  - [ ] Species Recovery
  - [ ] Community Engagement
  - [ ] Research & Science
  - [ ] Technology Innovation
- [ ] Visual design (emoji icons + label)
- [ ] Click to filter projects
- [ ] Show project count per category

**Estimated Time**: 2 days  
**Dependencies**: ProjectCard, ProjectGrid  
**Reference**: Molecule domain category cards

---

### Feature 4: Basic Search & Filter
- [ ] Create search input component
- [ ] Implement filter logic for:
  - [ ] Full-text search (name, description)
  - [ ] Category filter
  - [ ] Status filter (active, completed, planned)
- [ ] No external library (use React hooks)
- [ ] Real-time filtering as user types
- [ ] Show result count
- [ ] Empty state when no results

**Estimated Time**: 2 days  
**Dependencies**: ProjectCard, ProjectGrid  
**Tech**: React useState, Array.filter()

---

### Feature 5: Enhanced Metrics Dashboard
- [ ] Review existing implementation
- [ ] Add metrics:
  - [ ] Total funding deployed
  - [ ] Projects funded count
  - [ ] Active community members
  - [ ] Acres/habitats protected
  - [ ] Species protected count
- [ ] Display as 4-item grid (mobile stacks)
- [ ] Large numbers (24px+), small labels
- [ ] Color-coded background per metric
- [ ] No interactive elements (display only)

**Estimated Time**: 1 day  
**Dependencies**: None  
**Reference**: VitaDAO dashboard

---

### Feature 6: Featured Projects Section
- [ ] Create featured projects section
- [ ] Display 2-3 projects above main grid
- [ ] Larger cards (1.5x normal size)
- [ ] Full descriptions visible
- [ ] High-quality imagery
- [ ] Prominent CTAs
- [ ] Query featured projects from API/CMS

**Estimated Time**: 1 day  
**Dependencies**: ProjectCard component  
**Files**: `/zoo/app/components/FeaturedProjects.tsx`

---

## MEDIUM PRIORITY (Weeks 3-4)

### Feature 7: Per-Project Impact Tracking
- [ ] Create ImpactMetrics component
- [ ] Metrics per project:
  - [ ] Acres protected/restored
  - [ ] Species population trend
  - [ ] Community members engaged
  - [ ] Carbon offset
  - [ ] Funding progress (raised/goal)
- [ ] Visualizations:
  - [ ] Progress bar for funding
  - [ ] Percentage change for species pop.
  - [ ] Simple gauge for acres
- [ ] Add to project detail page
- [ ] Update mechanism (manual or automated)

**Estimated Time**: 5 days  
**Dependencies**: Chart library (Recharts or Chart.js)  
**Files**: `/zoo/app/components/ImpactMetrics.tsx`

---

### Feature 8: Project Timeline/Milestones
- [ ] Create ProjectTimeline component
- [ ] Display milestones in chronological order
- [ ] Completed milestones: checkmark + green
- [ ] Upcoming milestones: circle + gray
- [ ] Milestone date, title, description
- [ ] Optional: Expand/collapse per milestone
- [ ] Add to project detail page

**Estimated Time**: 3 days  
**Dependencies**: Recharts or custom CSS  
**Files**: `/zoo/app/components/ProjectTimeline.tsx`

---

### Feature 9: Application Form System
- [ ] Choose form platform:
  - [ ] Typeform (easiest, hosted)
  - [ ] Airtable (matches VitaDAO pattern)
  - [ ] Custom React form
- [ ] Form fields:
  - [ ] Project name
  - [ ] Organization
  - [ ] Team member names
  - [ ] Conservation focus area
  - [ ] Funding request amount
  - [ ] Project description
  - [ ] Expected impact
  - [ ] Timeline
- [ ] Success message / confirmation
- [ ] Email notification integration

**Estimated Time**: 3-4 days (depending on platform)  
**Reference**: VitaDAO Airtable approach

---

### Feature 10: Governance Section Enhancement
- [ ] Link to governance dashboard
- [ ] Display current proposals (if applicable)
- [ ] Show voting status
- [ ] Explain how to join DAO
- [ ] Treasury tracker link
- [ ] Governance forum link
- [ ] Create governance page

**Estimated Time**: 2-3 days  
**Dependencies**: Snapshot.org or similar API  
**Files**: `/zoo/app/pages/governance.tsx`

---

## LOW PRIORITY (Nice-to-Have)

### Feature 11: Blog/News Feed
- [ ] Choose CMS:
  - [ ] Notion API (simple)
  - [ ] Contentful (powerful)
  - [ ] Custom Markdown
- [ ] Create blog post template
- [ ] Display recent posts on homepage
- [ ] Full blog page with archive
- [ ] Author attribution
- [ ] Publication dates
- [ ] Social sharing buttons

**Estimated Time**: 2-3 days  
**Files**: 
- `/zoo/app/pages/blog.tsx`
- `/zoo/app/pages/blog/[slug].tsx`
- `/zoo/app/components/BlogCard.tsx`

---

### Feature 12: Team Member Profiles
- [ ] Create TeamMember component
- [ ] Display on project pages
- [ ] Fields:
  - [ ] Name
  - [ ] Photo
  - [ ] Title/Role
  - [ ] Bio (100-150 words)
  - [ ] Social links (LinkedIn, Twitter, etc.)
- [ ] Grid layout (2-3 columns)
- [ ] Hover effect (expand bio)

**Estimated Time**: 2 days  
**Files**: 
- `/zoo/app/components/TeamMember.tsx`
- `/zoo/app/components/TeamGrid.tsx`

---

### Feature 13: Partner Logos Section
- [ ] Create partner section on homepage
- [ ] Grid of 12+ partner logos
- [ ] Partner categories (if needed):
  - [ ] Conservation organizations
  - [ ] Grant funders
  - [ ] Technology partners
  - [ ] Research institutions
- [ ] Logo images in SVG format
- [ ] Links to partner websites
- [ ] Responsive grid (2-4 columns)

**Estimated Time**: 1 day  
**Files**: `/zoo/app/components/PartnerLogos.tsx`

---

### Feature 14: Twitter Feed Integration
- [ ] Embed Twitter timeline
- [ ] Filter by:
  - [ ] Account: @ZooFund or project accounts
  - [ ] Hashtag: #ZooFund #WildlifeConservation
- [ ] Display 5-10 recent tweets
- [ ] Link to full Twitter feed
- [ ] Alternative: Use Twitter API for custom widget

**Estimated Time**: 1 day  
**Tech**: Twitter Embed or react-twitter-embed library

---

### Feature 15: Newsletter Popup/Form
- [ ] Create email signup form
- [ ] Display on:
  - [ ] Homepage (below fold)
  - [ ] Projects page (sidebar)
  - [ ] Exit intent (optional)
- [ ] Integration with email service:
  - [ ] ConvertKit
  - [ ] Mailchimp
  - [ ] Substack
- [ ] Success message
- [ ] Privacy/consent checkbox

**Estimated Time**: 1 day  
**Files**: `/zoo/app/components/NewsletterSignup.tsx`

---

## Testing Checklist

### High Priority Features Testing
- [ ] ProjectCard renders correctly
- [ ] ProjectCard responsive on mobile/tablet/desktop
- [ ] ProjectCard links navigate correctly
- [ ] ProjectGrid responsive grid layout
- [ ] CategoryNav filters correctly
- [ ] Search filters projects in real-time
- [ ] Search handles empty results gracefully
- [ ] MetricsDashboard displays all metrics
- [ ] MetricsDashboard responsive

### Medium Priority Testing
- [ ] ImpactMetrics chart renders
- [ ] ProjectTimeline milestones display in order
- [ ] Form submission successful
- [ ] Governance data loads correctly
- [ ] Treasury tracker links work

### Integration Testing
- [ ] All components work together on projects page
- [ ] No console errors
- [ ] No layout shifts when loading
- [ ] Mobile experience smooth
- [ ] Desktop experience matches design

### Performance Testing
- [ ] Project list loads within 2 seconds
- [ ] Filtering < 100ms response time
- [ ] No memory leaks
- [ ] Mobile scroll smooth (60 fps)

---

## Design References

### Color Palette (Suggested for Zoo Fund)
```css
Primary Green: #2D8659 (conservation)
Light Green: #E8F5E9
Dark Green: #1B5E37
Accent Gold: #D4AF37 (achievement)
Neutral Gray: #F5F5F5
Text Dark: #2C3E50
```

### Typography
```css
H1: 48px, bold, line-height 1.2
H2: 36px, bold
H3: 24px, bold
H4: 18px, bold (project titles)
Body: 16px, regular
Small: 14px, regular
```

### Spacing
```css
Card padding: 24px
Grid gap: 20px
Section margin: 80px vertical
Button padding: 12px 24px
Border radius: 8px
Shadows: 0 2px 8px rgba(0,0,0,0.1)
```

---

## API/Data Requirements

### Project Data Structure
```typescript
interface Project {
  id: string;
  title: string;
  category: 'Poaching' | 'Habitat' | 'Species' | 'Community' | 'Research' | 'Tech';
  description: string;
  longDescription?: string;
  fundingAmount: number;
  fundingCurrency: 'USD' | 'ETH';
  fundingGoal?: number;
  image?: string;
  featured?: boolean;
  status: 'Active' | 'Completed' | 'Planned';
  impactMetrics?: {
    acresProtected?: number;
    speciesCount?: number;
    communityMembers?: number;
    carbonOffset?: number;
  };
  milestones?: Milestone[];
  team?: TeamMember[];
  links?: {
    website?: string;
    twitter?: string;
    discord?: string;
  };
}

interface Milestone {
  date: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TeamMember {
  name: string;
  title: string;
  image?: string;
  bio?: string;
  links?: {
    twitter?: string;
    linkedin?: string;
  };
}
```

---

## Dependencies to Add

### High Priority
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "next": "^14.x"
}
```

### Medium Priority
```json
{
  "recharts": "^2.x",
  "react-hook-form": "^7.x"
}
```

### Low Priority
```json
{
  "react-twitter-embed": "^2.x",
  "mailchimp-marketing": "^3.x"
}
```

---

## File Structure After Implementation

```
/zoo/app
├── /components
│   ├── ProjectCard.tsx ✓ (HIGH)
│   ├── ProjectGrid.tsx ✓ (HIGH)
│   ├── ProjectSearch.tsx ✓ (HIGH)
│   ├── CategoryNav.tsx ✓ (HIGH)
│   ├── MetricsDashboard.tsx ✓ (HIGH)
│   ├── FeaturedProjects.tsx ✓ (HIGH)
│   ├── ImpactMetrics.tsx (MEDIUM)
│   ├── ProjectTimeline.tsx (MEDIUM)
│   ├── TeamMember.tsx (LOW)
│   ├── TeamGrid.tsx (LOW)
│   ├── BlogCard.tsx (LOW)
│   ├── PartnerLogos.tsx (LOW)
│   ├── NewsletterSignup.tsx (LOW)
│   └── index.ts
├── /pages
│   ├── projects.tsx (modify)
│   ├── projects/[id].tsx (new)
│   ├── governance.tsx (new)
│   ├── apply.tsx (new)
│   └── blog
│       ├── index.tsx (new)
│       └── [slug].tsx (new)
├── /lib
│   ├── projectFilter.ts (MEDIUM)
│   ├── impactCalculations.ts (MEDIUM)
│   └── projectData.ts (data fetching)
└── /styles
    └── projects.module.css (or Tailwind)
```

---

## Version Control Workflow

### Branch Strategy
```bash
# HIGH priority features
git checkout -b feature/project-cards
git checkout -b feature/project-search
git checkout -b feature/category-nav

# MEDIUM priority features
git checkout -b feature/impact-metrics
git checkout -b feature/governance-section

# LOW priority features
git checkout -b feature/blog-feed
git checkout -b feature/team-profiles
```

### Commit Messages
```
feat(projects): add ProjectCard component with hover effects
feat(projects): implement project search and filtering
feat(projects): add category navigation
feat(projects): enhance metrics dashboard
```

---

## Success Metrics

### Feature Adoption
- [ ] 50+ projects in database within 3 months
- [ ] 10+ featured projects
- [ ] 100+ Discord members
- [ ] 50+ email subscribers

### User Engagement
- [ ] Avg. session duration > 2 minutes
- [ ] Projects page: > 80% bounce rate reduction
- [ ] Search: used in > 30% of visits
- [ ] Filter: category used in > 40% of visits

### Performance
- [ ] Lighthouse score > 80
- [ ] Time to interactive < 2 seconds
- [ ] Cumulative Layout Shift < 0.1
- [ ] Mobile usability score > 90

---

## Next Steps After Implementation

1. Launch projects page with HIGH priority features
2. Gather user feedback via Discord/surveys
3. Implement MEDIUM priority features based on feedback
4. Monitor analytics for LOW priority feature requests
5. Plan seasonal updates (new projects, impact reports)
6. Consider Wildlife impact dashboard (expansion feature)

---

**Document Status**: Ready for Development  
**Last Updated**: 2025-10-30  
**Implementation Lead**: [Assign Developer]
