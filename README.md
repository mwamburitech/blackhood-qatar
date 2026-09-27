# Blackhood Qatar

React, TypeScript and Vite workforce website. Includes the website and shared API client; internal workspace files and design previews are excluded.

## Development
Use Node.js 22+ and pnpm 10.

    pnpm install --no-frozen-lockfile
    PORT=3000 BASE_PATH=/ pnpm --filter @workspace/blackhood-qatar dev

## Build

    pnpm build

Output: artifacts/blackhood-qatar/dist/public/

## cPanel hosting
Build first, then upload the contents of dist/public to the domain document root (usually public_html). Back up any existing website first. Do not upload node_modules or source files into the public document root. These instructions assume hosting at the domain root, not a subfolder.

Create a .htaccess file in the document root for direct page links:

    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule ^ index.html [L]
    </IfModule>

The contact form is browser-only and does not send email. Role enquiry links open an email app. International role categories are enquiries, not verified vacancies.
