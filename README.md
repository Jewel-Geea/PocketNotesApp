# Pocket Notes

![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

A WhatsApp-style note-taking app: create color-coded "pockets" (groups), then keep a
timestamped message thread inside each one. Fully responsive — switches between a
two-pane desktop layout and a single-pane mobile layout based on screen width.

## What this demonstrates
- Component composition and lifted state across `MainComponent` → `LeftMainComponent` /
  `ChatInterface` / `RightMainComponent`
- Persisting UI state (pockets, selected pocket, per-pocket chat history) to
  `localStorage` so state survives a refresh
- Responsive layout driven by a `resize` event listener rather than CSS alone
- A controlled modal form (`Modal` / `ShowModal`) for creating a new pocket with a
  generated abbreviation and a color picker

## Setup

```bash
cd note-taking-app
npm install
npm run dev
```

## License
MIT — see [LICENSE](LICENSE)
