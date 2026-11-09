In which file are the <html> and <body> tags?
    You can see the html and body tags when you right click and press on "View Source" in the browser on the localhost page

Which file renders the page at /?
    app/page.tsx

Which folder is for images and other static files, and how do you reference them?
    public/ - reference them by calling the file name as the server already knows where to look

What is tsconfig.json doing in your project?
    Manages typescript configurations

What does @/* mean in tsconfig.json? Write an import that uses it.
    I replaces long import paths by removing the need to write multiple paths to exit folders, instead just using an @ sign instead of ../
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