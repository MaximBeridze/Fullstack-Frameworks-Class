**Lab 1**

In which file are the <html> and <body> tags?

    You can see the html and body tags when you right click and press on "View Source" in the browser on the localhost page

Which file renders the page at /?

    app/page.tsx

Which folder is for images and other static files, and how do you reference them?

    public/ - reference them by calling the file name as the server already knows where to look

What is tsconfig.json doing in your project?

    Manages typescript configurations

What does @/* mean in tsconfig.json? Write an import that uses it.

    It replaces long import paths by removing the need to write multiple paths to exit folders, instead just using an @ sign instead of ../
    "paths": {
      "@/*": ["./*"]
    }

What does app/layout.tsx import from next/font/google, and what does Next.js do with it at build time?

    it imports Geist and Geist-mono - at build time Next.js downloads both fonts and bundles them as self-hosted static assets.

What’s the difference between layout.tsx and page.tsx?

    layout.tsx defines shared UI, like a navbar, and renders the current page through children; page.tsx defines the content for a specific route, such as app/page.tsx for /

Where would you put a navbar that appears on every page?

    At the top of the page

What is globals.css for, and where is it imported?

    globals.css defines styles that apply across the app, and the root layout, app/layout.tsx, loads it with import "./globals.css".

What is AGENTS.md, and does your app need it to run?

    Its a markdown file with instructions for AI agents to run. The project doesn't need it to function.

------------------------------------------------

**Lab 2**

In the page source, are the movie titles present for `/movies`? For `/movies-client`? Why?

    /movies: yes. The server waits for getMovies() and includes the titles in the HTML it sends. /movies-client: no. Its initial HTML says “Loading movies…” because the browser only fetches /movies.json after useEffect runs.

Without the `force-dynamic` line of Part E, you run `npm run build` again tomorrow, then `npm start`, without changing anything else. What does the "Rendered at" timestamp of `/movies` show, and why?

    It shows the time /movies was rendered during tomorrow’s build. Next.js generates the HTML during npm run build, and npm start serves that same HTML, so refreshing doesn’t change the timestamp.

Part E made every request to `/movies` about one second slower. Give one situation where `force-dynamic` is still the right choice, and explain why.

    I’d use force-dynamic for a ticket booking page that needs to show current seat availability. Rendering on each request lets the server check availability at that moment.

A classmate sees `[movies] rendered 6 movies` in the browser console and says: "So this code runs in the browser." What do you answer, and how can you prove it?

    The browser console is showing a copy of the server log in development. To prove it, you have to run the dynamic version in production, disable browser JavaScript, and reload /movies: the titles should still appear, and [movies] rendered 6 movies prints in the server terminal.

Which version would you choose for a public movie catalogue that changes once a week, and why?

    I’d choose static /movies and rebuild when the catalogue changes. Everyone sees the same list, the titles are already in the HTML, and visitors don’t have to wait for a fresh query on every visit.

------------------------

**Lab 3**

`NavLink` uses `usePathname`, a hook that only works in Client Components. Yet the page source of `/movies/2` already contains `aria-current="true"` on the Movies link. How is this possible?

    Next.js renders Client Components into the initial HTML too. When it prerenders /movies/2, NavLink sees that the path starts with /movies/ and marks Movies as the active section. The browser can then update the link as you navigate.

Why does `generateStaticParams` return `String(movie.id)` and not `movie.id`? And why does `/movies/42` give a 404 in Part C without running the code of the page?

    URL parameters are strings, but the IDs in our JSON are numbers. String(movie.id) gives Next.js the format it expects. Since dynamicParams is false and 42 wasn’t in the build’s list, Next.js returns a 404 without running the movie detail page.

In Part D, why is the note kept between `/movies` and `/movies/2`, and lost when you go through `/about`?

    /movies and /movies/2 share the same Movies layout. When I navigate between them using the app links, only the page inside the layout changes, so the input keeps its text. Going to /about leaves the Movies layout; returning creates a fresh input

In Part E, step 4, where is the real message of the error, and why does Next.js not send it to the browser?

    Movie database unavailable is in the server terminal. The browser gets a generic message and an error identifier so server details aren’t exposed. The identifier can help match the browser error to the server log.

Under `npm run dev`, "Loading the movies..." appears when you open `/movies/2`. Under `npm start` it does not, but it still appears on `/movies`. Why?

    In dev, /movies/2 runs the simulated query when I open it, so there’s a wait. In production, the detail page is already built, so that query has already happened. The /movies list still uses force-dynamic, so it runs the query on each request and can still show the loading message.

------------------------

**Lab 4, part 2**

### Part E: Rendering predictions

| Page | Fetch option | Expected build output |
|---|---|---|
| /movies | `next: { revalidate: 10 }` | ○ Static with a 10s revalidation interval (ISR): generated during the build, then eligible for background regeneration after 10 seconds when requested. |
| /movies/[id] | `cache: "force-cache"` | ● SSG for each movie returned by `generateStaticParams`: detail pages are generated during the build and use cached API responses. |

These predictions assume the Part E changes are applied: remove `force-dynamic` from the list page, and use `force-cache` in the detail page's data requests.
