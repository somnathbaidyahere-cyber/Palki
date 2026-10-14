# Palki: event venue website

Single-page site built with Next.js (App Router), JavaScript and Tailwind CSS.

## Run

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Where to edit

| What | Where |
|---|---|
| Phone, email, **address (drives the map)**, features, rooms, gallery, testimonials | `src/data/site.js` |
| Colours and fonts | `tailwind.config.js`, `src/app/layout.js` |
| Photos | replace files in `public/images/` (keep the names, or update `site.js`) |
| Testimonial videos | add `testimonial-1.mp4` to `-3.mp4` in `public/videos/` |
| Where booking enquiries go | `src/app/api/booking/route.js` (currently logs to the server console) |

## Structure

    src/
      app/            layout, page (composes sections), globals.css, api/booking
      components/     one file per page section + BookingForm and VideoCard
        ui/           Ornament, SectionHeading, FeatureIcon
      data/site.js    all content in one place
