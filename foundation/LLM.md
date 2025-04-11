# Zoo Foundation Project Documentation

## Project Overview
This is the "foundation" module of the Zoo Labs project, which appears to be a Next.js web application with a focus on animal conservation and education.

## Project Structure
- Next.js frontend application (v15.1)
- React v19.0
- TailwindCSS v4.0 for styling
- Uses various UI components from Radix UI
- Contains 3D model viewers (likely for animal models)

## Key Technologies
- **Frontend Framework**: Next.js 15.1
- **UI Library**: React 19.0
- **Styling**: TailwindCSS 4.0 with custom configuration
- **UI Components**: Radix UI
- **3D Rendering**: @google/model-viewer
- **Payment Processing**: Stripe integration

## Configuration Notes
- TailwindCSS v4.0 requires using @tailwindcss/postcss package as a PostCSS plugin (not directly using tailwindcss)
- The project uses a custom Tailwind configuration with extended theme settings
- PostCSS is used for processing CSS

## Important Issues Resolved
- **2025-04-10**: Fixed build error related to TailwindCSS v4 configuration. TailwindCSS v4 moved the PostCSS plugin to a separate package (@tailwindcss/postcss). Updated postcss.config.js to reference the correct package.
- **2025-04-10**: Upgraded Next.js from version 14.2.28 to 15.1.0. Updated the configuration for compatibility with React 19 in Pages Router. Updated TypeScript definitions to match React 19.

## Development Workflow
- Use `pnpm` for package management (based on pnpm-lock.yaml presence)
- Standard Next.js commands for development:
  - `pnpm dev` - Start development server
  - `pnpm build` - Build for production
  - `pnpm start` - Start production server
  - `pnpm lint` - Run linting
  - `pnpm test` - Run tests

## Project Insights
- Appears to be a conservation-focused application with 3D animal models
- Has features for donations/campaigns
- Contains user authentication (signin/signup pages)
- Includes interactive experiences
