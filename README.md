# Your Stats for Spotify 🎧📊

**Your Stats for Spotify** is a personal project currently under development. It’s designed to give my network (and eventually the general public) an easy and accessible way to visualize their Spotify statistics — including top artists, songs, and genres.

> ⚠️ This project is not yet deployed in production.  
> The request for extended quota access was submitted to Spotify **before the May 15th, 2025 policy changes**, and I’m currently waiting for the review team’s decision.

## ✨ Purpose

This tool is meant to share insights in a clean and accessible way — no need to register or go through complicated setups. The intention is **not commercial**; I do not plan to monetize this project in any way.

The goal is purely educational, community-focused, and part of my portfolio as a developer.

---

## 🛠️ Tech Stack

- **Back-end:** NestJS (TypeScript)
- **Authentication:** OAuth2 with session-based token storage using `sessions.id` in Redis (for security)
- **Front-end (in progress):** Next.js following best practices and full responsiveness

---

## 🔐 Spotify API Scopes Used

- `user-read-private` – To access basic user info like country and account type
- `user-read-email` – To retrieve the user’s email for future personalization
- `user-top-read` – To fetch the user’s top artists and tracks

> Additional scopes may be added later, depending on feature implementation.

---

## 🚧 Project Status

- ✅ Back-end is fully functional with tested endpoints via Postman
- ⚙️ Front-end is being built (design and implementation ongoing)
- 📩 Awaiting extended quota approval from Spotify

---

## 📬 Contact

Want to try it once it’s live?  
Feel free to message me on LinkedIn or open an issue on GitHub.

🔗 [My LinkedIn](https://www.linkedin.com/in/thiagoperinfelipedacruz/)

---
