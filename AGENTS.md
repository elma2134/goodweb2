# GoodWeb2 Agent Guide

**Pet Grooming Booking Website** — A React + TypeScript SPA for booking and managing pet grooming appointments, with admin dashboard and Google Sheets integration.

## Project Type
- React 18 + TypeScript + Vite
- Tailwind CSS v4 with custom theme system
- Radix UI components (shadcn pattern)
- Google Sheets as database (via Google Apps Script)

## Quick Start
```bash
npm run dev       # Start Vite dev server on http://localhost:5173
npm run build     # Production build
```

See [README.md](README.md) for full setup instructions.

## Architecture & Key Files

### Application Structure
- **src/app/App.tsx** — Main component (monolithic; consider extracting features as app grows)
- **src/app/components/Dashboard.tsx** — Admin booking management UI
- **src/app/components/LoginPage.tsx** — Admin authentication
- **src/app/components/BookingTable.tsx** — Booking list with filters
- **src/app/services/googleSheets.ts** — Google Sheets connector (fetch-based API calls)
- **src/app/components/ui/** — 30+ Radix UI pre-built components (shadcn pattern)

### Data Model
**BookingData** (from Google Sheets):
```typescript
{ id, ownerName, petName, petType, service, dateTime, phone, status }
```
Google Sheets Web App is the source of truth; `googleSheets.ts` handles CRUD operations.

### Styling Architecture
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (required in build)
- **CSS custom properties** in `src/styles/theme.css` (OKLCH color space)
- Light/dark mode toggle: `.dark` class on root element
- Color palette: `primary` (black #030213), `secondary`, `accent`, `destructive`, `chart` colors
- Font chain: `index.css` → `fonts.css` → `tailwind.css` → `theme.css`

### Build Configuration
**vite.config.ts** includes:
- Custom plugin `figmaAssetResolver()` for `figma:asset/` imports (do not remove)
- React + Tailwind plugins (both required, even if unused)
- Path alias: `@` → `./src`
- Raw asset imports: SVG, CSV only

## Key Patterns & Conventions

### State Management
- useState only (no context API or Redux)
- Monolithic state in App.tsx for global UI state
- Props-driven component architecture

### Components
- Import UI components from `./ui/` directory
- Use Lucide icons for consistency (`lucide-react`)
- Feature components (Dashboard, LoginPage) import from UI components
- Props-based styling; Tailwind classes for custom layouts

### API Integration
- Fetch-based (no Axios)
- Google Sheets Web App endpoint (CORS-enabled)
- See `src/app/services/googleSheets.ts` for data flow
- Methods: `getBookings()`, `updateBookingStatus()`, `deleteBooking()`

### Language & Content
- Thai language strings throughout (booking form, menu labels, services, testimonials)
- Keep Thai text in component logic for now; consider extracting to i18n if scaling

### Icons
Use `lucide-react` library (already included). Common: `Scissors`, `Sparkles`, `Heart`, `Calendar`, `Star`, `MapPin`, `Phone`, `Clock`, `CheckCircle2`, `Shield`.

## Development Tips

### Adding New UI Components
1. Component lives in `src/app/components/ui/`
2. Import Radix UI base, wrap with styling
3. Export from the component file
4. Example pattern in `src/app/components/ui/button.tsx`, `dialog.tsx`

### Adding Features
- Consider breaking App.tsx into smaller feature modules if adding routes
- Use `React Router v7` if needed (already in dependencies)
- Follow props-driven approach for new components

### Styling New Components
- Use Tailwind utility classes directly
- Reference theme colors: `text-primary`, `bg-secondary`, `border-accent`
- Dark mode: prefix with `dark:` (e.g., `dark:bg-slate-900`)

### Debugging Google Sheets Integration
- Check Web App deployment URL in `googleSheets.ts`
- Verify CORS settings in Google Apps Script
- Use browser DevTools Network tab to inspect POST/GET calls
- Ensure booking data format matches `BookingData` interface

## Potential Pitfalls

- ⚠️ **App.tsx is large** — Extract features to separate components as app grows
- ⚠️ **No error handling for Google Sheets API** — Add try/catch and user feedback
- ⚠️ **Tailwind & React plugins required** — Do not remove from vite.config.ts
- ⚠️ **figmaAssetResolver plugin** — Custom resolver for Figma exports; keep in place

## Related Documentation
- [README.md](README.md) — Build and installation instructions
- [vite.config.ts](vite.config.ts) — Build configuration
- [src/styles/](src/styles/) — Tailwind and theme setup
- [package.json](package.json) — Dependencies and scripts
