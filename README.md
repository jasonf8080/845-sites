# 845 Sites

This project is a static marketing website for 845 Sites. It is designed to be pushed to GitHub and deployed on Netlify without any backend, database, or auth service.

## Included

- Landing page with hero, service sections, process steps, and call-to-action blocks
- Simple login page with a plain HTML form
- No backend or auth provider setup required

## Local development

```bash
npm install
npm run dev
```

## Netlify deployment

1. Push this repo to GitHub.
2. In Netlify, import the repo.
3. Set the build command to:

```bash
npm run build
```

4. Set the publish directory to:

```bash
dist
```

5. Deploy.

## Notes

- There are no environment variables required for the current static setup.
- The login page is intentionally a front-end placeholder and not connected to any backend.
- This app is kept intentionally simple so it can run as a clean static site on Netlify without extra configuration.
