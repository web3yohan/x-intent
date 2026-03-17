# X/Twitter Intent Generator

A brutalist, zero-friction Web3 utility to instantly generate X (Twitter) intent links. Drop a post or profile URL, and the tool auto-extracts the user handle and post ID using Regex to generate all engagement intents simultaneously.

Built with vanilla HTML, CSS, and JS. Zero dependencies. No API keys required.

## Why use Intent Links?
Friction kills conversion. If you drop a standard link to a post in a newsletter, Telegram, or Discord, users have to click it, let the post load, and manually hit "Like" or "Repost". 

An intent link bypasses this. Clicking it deep-links directly into the X app (or web) and instantly pops up the confirmation screen for the specific action.

## Features
* **Zero-Click Extraction:** Just paste the URL. Regex handles the parsing of the username and 19-digit Post ID automatically.
* **Full Intent Suite:** Generates `Follow`, `Like`, `Reply`, `Retweet`, and `Quote` intents in real-time.
* **API-Free:** Uses official, open X Web Intents. Safe, secure, and doesn't require users to connect their accounts to a third party.
* **"Vibe Code" UI:** Strict dark-mode, minimal styling, monospace typography, and one-click copy feedback.

## Setup
No `npm install` or build steps required. 
1. Clone the repo.
2. Open `index.html` in your browser.
3. Host instantly on GitHub Pages, Vercel, or Netlify.

## FAQs

**Do I need an X Developer account?**
No. Web intents are public URL schemas provided by X. No API keys or authentication required from the host.

**Does it work on Mobile?**
Yes. Intent links are specifically designed to trigger deep links into the native iOS/Android X app, providing the smoothest UX possible.

**How does the Quote intent work?**
X doesn't have a dedicated `/quote` endpoint. This tool constructs a standard tweet intent and appends the target post URL as an encoded parameter, which natively renders as a Quote Tweet draft.

