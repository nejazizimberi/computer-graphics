# Week 3 Class Exercise - Three.js

This folder contains a small Three.js example demonstrating:

- A plane acting as the floor
- Three different geometries with unique materials and colors (box, sphere, torus knot)
- At least two light sources (ambient, directional, plus an extra point light)

Files:

- `index.html` — minimal HTML shell
- `main.js` — module that builds the scene using Three.js from CDN
- `package.json` — contains a convenience `start` script using `http-server`

How to run (requires Node.js for the convenience script):

1. Open a terminal in this folder.
2. Install the dev dependency (optional):

```powershell
npm install
```

3. Start the local server:

```powershell
npm start
```

4. Open http://localhost:8080 in your browser.

Or simply open `index.html` directly in a modern browser that supports ES modules (recommended to use a local server to avoid CORS issues).
