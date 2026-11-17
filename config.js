/*
 * Cirrus — Tebex storefront theme
 * -------------------------------------------------------------
 * This is the only file you need to edit.
 * Tip: open your store with ?customize at the end of the URL
 * (e.g. https://store.example.com/?customize) to change colours,
 * texts and sections live, then press "Export config.js".
 */
window.CIRRUS_CONFIG = {
  // Your Tebex PUBLIC token (Tebex panel -> Integrations -> API Keys -> "Public Token").
  // Keep "demo" to preview the theme with sample data.
  // NEVER put your Private Key here.
  token: "demo",

  // Leave empty to use the name / logo from your Tebex project.
  storeName: "",
  logo: "",
  favicon: "",

  theme: {
    preset: "aurora",      // aurora | ember | emerald | ocean | crimson | gold | mono
    accent: "",            // optional custom accent colour, e.g. "#7c5cff" (overrides the preset)
    accent2: "",           // optional second gradient colour
    mode: "dark",          // dark | light
    allowToggle: true,     // show the light/dark switch to visitors
    radius: "rounded",     // sharp | rounded | round
    background: "glow",    // glow | grid | dots | none
    font: "system",        // system | inter | rounded | mono  (no external requests)
    cardStyle: "glass"     // glass | solid | outline
  },

  // Game server shown in the top bar and hero. Click = copy IP.
  server: {
    ip: "play.cirrusmc.net",
    game: "minecraft",     // minecraft (shows live player count) | other
    showPlayers: true
  },

  discord: {
    invite: "https://discord.gg/yourserver",
    // Optional: your Discord server ID (enable "Server Widget" in Discord) to show online members.
    serverId: ""
  },

  announcement: {
    text: "Winter Sale — 25% off everything with code FROST25",
    link: "",
    dismissible: true
  },

  hero: {
    badge: "Season 4 is live",
    title: "Support the server.\nLook amazing doing it.",
    subtitle: "Ranks, crates and cosmetics delivered instantly in-game. Every purchase keeps the lights on.",
    primaryButton: "Browse store",
    secondaryButton: "Join Discord",
    image: ""              // optional image on the right (URL). Empty = animated card stack.
  },

  // Home page sections, in this order. Remove a line to hide a section.
  home: ["hero", "stats", "featured", "categories", "community", "steps", "faq"],

  // Packages shown in "Featured". Use package IDs. Empty = the most discounted / first packages.
  featured: [],
  featuredTitle: "Most popular",

  stats: [
    { value: "48k+", label: "Players joined" },
    { value: "99.9%", label: "Uptime" },
    { value: "< 1 min", label: "Delivery time" },
    { value: "24/7", label: "Support" }
  ],

  steps: [
    { title: "Pick a package", text: "Choose a rank, key or cosmetic you like." },
    { title: "Enter your username", text: "We deliver straight to your account." },
    { title: "Pay securely", text: "Checkout is handled by Tebex — card, PayPal and more." },
    { title: "Enjoy in-game", text: "Delivery is automatic, usually within a minute." }
  ],

  faq: [
    { q: "How long does delivery take?", a: "Most purchases are delivered automatically within a minute. If you are offline, you will receive them the next time you join." },
    { q: "Can I buy something for a friend?", a: "Yes. Open a package and use the gift option, then enter your friend's username." },
    { q: "Which payment methods do you accept?", a: "Checkout is processed by Tebex and supports cards, PayPal, Paysafecard and many local methods." },
    { q: "I did not receive my purchase", a: "Open a ticket on our Discord with your transaction ID and we will sort it out quickly." }
  ],

  footer: {
    about: "Not affiliated with Mojang AB or Microsoft.",
    columns: [
      { title: "Server", links: [{ label: "Website", url: "#" }, { label: "Vote", url: "#" }, { label: "Rules", url: "#" }] },
      { title: "Help", links: [{ label: "Discord", url: "https://discord.gg/yourserver" }, { label: "Terms", url: "#" }, { label: "Refunds", url: "#" }] }
    ],
    social: { discord: "https://discord.gg/yourserver", youtube: "", x: "", tiktok: "", instagram: "" },
    copyright: ""
  },

  checkout: {
    mode: "popup"          // popup (Tebex.js overlay, stays on your site) | redirect
  },

  // Change any interface text, e.g. { "add": "Buy now" }. See TEXT in assets/cirrus.js for all keys.
  texts: {},

  // A small "Store theme: Cirrus" link in the footer. Set to false to hide it — you are free to.
  credit: true,

  // Show the live customizer to everyone (for demos). Normally false; use ?customize instead.
  customizer: true
};
