# **FOSSEE Workshop Booking - UI/UX Redesign**

This repository contains the UI/UX redesign for the FOSSEE Workshop Booking platform, created as part of the Python Screening Task.

## Live Demo
[Insert GitHub Pages Link Here]

## Technical Setup Instructions

The redesigned frontend is built using a modern React stack with Vite.

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:5173`.

## Reasoning & Design Decisions

### What design principles guided your improvements?
The redesign was guided by the "Academic Dark Mode" aesthetic, prioritizing an ultra-modern, premium look suited for a technical institution like IIT Bombay.
- **Visual Hierarchy & Contrast:** Implemented deep slate backgrounds with high-contrast bright text to reduce eye strain, while using vibrant accent colors (blue, purple) to draw attention to call-to-action buttons and key statistics.
- **Glassmorphism:** Used subtle translucent panels (backdrop-filter) for the navbar and hero section to convey a modern feel without sacrificing readability.
- **Card-Based Layout:** Adopted a modular card system for workshops to clearly separate information pieces, making them scannable and easy to digest.
- **Micro-interactions:** Hover effects and subtle animations on buttons and cards make the interface feel responsive and alive.

### How did you ensure responsiveness across devices?
A "Mobile-First" approach was adopted from the beginning using flexible CSS methodologies:
- **CSS Grid & Flexbox:** Used `grid-template-columns` with media queries to dynamically reflow the layout from 4 columns on large screens to 1 or 2 columns on mobile devices. Width constraints were handled with `max-width` and `clamp()`.
- **Responsive Navigation:** The desktop navigation collapses into a mobile-friendly hamburger menu, ensuring the navbar isn't cluttered on smaller viewports.
- **Fluid Typography:** Employed scalable typography units (e.g., `clamp()`) for headings, ensuring text sizes independently adjust to the screen resolution.

### What trade-offs did you make between the design and performance?
- **Vanilla CSS vs. Frameworks:** I chose to implement the entire design system using Vanilla CSS rather than relying on heavy component libraries (like Material UI or Bootstrap) or utility-first frameworks (like Tailwind). This trade-off required more manual styling work but resulted in an extremely lightweight CSS bundle and maximal creative control over the specific "Dribbble-like" aesthetic.
- **Images and Blur Filters:** Applying `backdrop-filter: blur()` and using high-quality background images (like the IIT Bombay campus) adds some rendering overhead, especially on budget mobile devices. However, this was essential to achieve the premium feel. The CSS was optimized to limit these filters only to necessary components.

### What was the most challenging part of the task and how did you approach it?
The most challenging part of the redesign was modernizing the complex data presentations (like the dashboard and workshop statuses) without overwhelming the user or losing information.
**Approach:** I addressed this by separating dense information into grouped logical chunks. For example, in the Dashboard, instead of a massive, unreadable table, I introduced high-level summary "Stat Cards" at the top for immediate context. The table below was refined with badges, icons, and muted secondary text to establish a clear hierarchy, ensuring it remained clean even when displaying multiple column parameters.

## Before and After

(Screenshots of the redesign will be placed here)
