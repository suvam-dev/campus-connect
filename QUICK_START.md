# 🚀 Quick Start Guide - Creating New Pages

## 30-Second Template

```tsx
"use client";
import { PageLayout } from '@/components/layouts';
import { PageHeader, FilterBar, CardGrid } from '@/components/shared';

export default function NewPage() {
  const [data, setData] = useState(ITEMS);
  
  return (
    <PageLayout>
      <PageHeader title="Page Title" description="Short description" />
      <FilterBar placeholder="Search..." onSearch={handleSearch} />
      <CardGrid cols="3" gap="lg">
        {data.map(item => <Card key={item.id} {...item} />)}
      </CardGrid>
    </PageLayout>
  );
}
```

---

## Component Cheat Sheet

### PageLayout - Outer Wrapper
```tsx
<PageLayout className="optional-class">
  {/* Your content here - auto includes header & footer */}
</PageLayout>
```

### PageHeader - Title Section
```tsx
<PageHeader 
  title="Main Title"
  description="Optional subtitle text"
  action={<button>Optional Button</button>}
/>
```

### CardGrid - Responsive Grid
```tsx
{/* Mobile: 1 | Tablet: 2 | Desktop: 3 | XL: 4 */}
<CardGrid cols="auto" gap="lg">
  {items.map(item => <Card key={item.id} {...item} />)}
</CardGrid>

{/* Or: cols="1", "2", "3", "4" for fixed columns */}
```

### ListLayout - Sidebar + Content
```tsx
<ListLayout
  sidebar={
    <div className="space-y-4">
      {/* Filters, search, sidebar menu */}
    </div>
  }
>
  {/* Main content area */}
</ListLayout>
```

### FilterBar - Search + Multi-filters
```tsx
<FilterBar
  placeholder="Search events..."
  filters={[
    { id: 'technical', label: 'Technical' },
    { id: 'cultural', label: 'Cultural' },
  ]}
  onSearch={(query) => setFiltered(filter(query))}
  onFilterChange={(selected) => setFiltered(filterByCategory(selected))}
/>
```

---

## Styling Patterns

### Standard Card
```tsx
<div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
  Content
</div>
```

### Card with Image
```tsx
<div className="rounded-lg border border-slate-200 bg-white overflow-hidden group hover:shadow-lg transition-all">
  <img src="..." className="group-hover:scale-105 transition-transform" />
  <div className="p-6">Content</div>
</div>
```

### Badge
```tsx
<span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white">
  Technical
</span>
```

### Button
```tsx
<button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm">
  Button Text
</button>
```

---

## Responsive Breakpoints

```tsx
{/* Mobile first */}
<div className="text-sm">              {/* Default: 320px+ */}
  <div className="md:text-base">       {/* Tablet: 768px+ */}
    <div className="lg:grid-cols-3">   {/* Desktop: 1024px+ */}
      <div className="xl:p-8">         {/* XL: 1280px+ */}
      </div>
    </div>
  </div>
</div>
```

---

## Color Quick Reference

### Primary Actions
```tsx
// Dark background, white text
className="bg-slate-900 text-white hover:bg-slate-800"

// Light background
className="bg-slate-100 text-slate-900 hover:bg-slate-200"
```

### Category Colors
```tsx
Technical   → bg-blue-500
Cultural    → bg-purple-500
Workshop    → bg-orange-500
Placement   → bg-purple-600
Academic    → bg-blue-600
General     → bg-green-600
```

### Text
```tsx
Primary     → text-slate-900
Secondary   → text-slate-600
Muted       → text-slate-500
Borders     → border-slate-200
```

---

## File Organization

```
src/
├── components/
│   ├── layouts/      ← PageLayout goes here
│   ├── shared/       ← PageHeader, CardGrid, ListLayout, FilterBar
│   ├── Header.tsx    ← Navigation (shared)
│   ├── Footer.tsx    ← Footer (shared)
│   └── ui/           ← Existing shadcn/ui components
├── app/
│   ├── page.tsx      ← Home page
│   ├── events/page.tsx
│   ├── notices/page.tsx
│   ├── profile/page.tsx
│   └── bookmarks/page.tsx
└── lib/
    └── utils.ts      ← Utilities (cn function, etc)
```

---

## Common Tasks

### Add Search
```tsx
const [query, setQuery] = useState('');
const filtered = data.filter(item =>
  item.title.toLowerCase().includes(query.toLowerCase())
);

<FilterBar onSearch={setQuery} />
```

### Add Filters
```tsx
const [selected, setSelected] = useState([]);
const filtered = data.filter(item =>
  selected.length === 0 || selected.includes(item.category)
);

<FilterBar
  filters={[
    { id: 'tech', label: 'Technical' },
    { id: 'cultural', label: 'Cultural' },
  ]}
  onFilterChange={setSelected}
/>
```

### Responsive Grid
```tsx
{/* Automatically responsive */}
<CardGrid cols="3" gap="lg">
  {items.map(item => <Card />)}
</CardGrid>
```

### Empty State
```tsx
{data.length > 0 ? (
  <CardGrid cols="3">{/* cards */}</CardGrid>
) : (
  <div className="text-center py-12">
    <p className="text-slate-600">No items found</p>
  </div>
)}
```

---

## Pro Tips

1. **Always use "use client"** for interactivity
2. **Use responsive classes** (md:, lg:, xl:)
3. **Leverage group class** for hover effects
4. **Use line-clamp-N** for text truncation
5. **Keep imports consistent** - use index.ts exports
6. **Test on mobile** - design mobile-first
7. **Use existing patterns** - consistency matters
8. **Reuse components** - build, don't copy-paste

---

## Available Components to Import

```tsx
// Layouts
import { PageLayout } from '@/components/layouts';

// Shared components
import { 
  PageHeader, 
  CardGrid, 
  ListLayout, 
  FilterBar 
} from '@/components/shared';

// UI components (shadcn)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Icons (lucide-react)
import { Search, Bell, Menu, Calendar, MapPin, Trash2 } from 'lucide-react';

// Utilities
import { cn } from '@/lib/utils';
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Page not responsive | Use CardGrid instead of custom grid |
| Cards look different | Use consistent card pattern with border & shadow |
| Header not showing | Wrap in PageLayout |
| Footer not showing | Use PageLayout (auto-included) |
| Not responsive on mobile | Check you're using Tailwind responsive classes (md:, lg:) |
| Icon not showing | Use lucide-react icons (not material symbols) |
| Text color wrong | Check if using text-slate-900 or text-slate-600 |
| Spacing inconsistent | Use gap-3, gap-4, gap-6 from CardGrid |

---

## Performance Checklist

- [ ] Using PageLayout wrapper ✅
- [ ] Using CardGrid or ListLayout ✅
- [ ] Images have alt text ✅
- [ ] No unused imports ✅
- [ ] Consistent styling ✅
- [ ] Mobile-first responsive ✅
- [ ] Proper semantic HTML ✅
- [ ] ARIA labels on buttons ✅
- [ ] TypeScript strict mode ✅
- [ ] No console errors ✅

---

## Running & Testing

```bash
# Start dev server
npm run dev

# Check build
npm run build

# Lint code
npm run lint

# Test on phone
# Use: http://[your-ip]:3000 on mobile
```

---

## Need Help?

📚 **Full Docs**: See COMPONENT_ARCHITECTURE.md  
🔍 **See Examples**: Look at /events, /notices, /profile pages  
❓ **Troubleshoot**: See BEFORE_AFTER.md for design patterns  

---

**Remember**: Keep it simple, use components, stay consistent! 🎨
