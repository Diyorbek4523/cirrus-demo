/* Cirrus demo data — only used while config.token === "demo".
 * Shapes follow the Tebex Headless API (https://headless.tebex.io).
 * Delete this file (and its <script> tag) when your store is live, if you like. */
(function () {
  /* Item artwork: 3D renders made for Cirrus (assets/demo/*.webp, 512 x 512, transparent). */
  function icon(name) { return "assets/demo/" + name + ".webp"; }

  var id = 6000;
  function pkg(catId, catName, name, price, opts) {
    opts = opts || {};
    id += 1;
    var discount = opts.discount || 0;
    var total = Math.round(price * (1 - discount / 100) * 100) / 100;
    return {
      id: id,
      ident: "demo_" + catId + "_" + id,
      name: name,
      description: opts.desc || "<p>Instantly delivered in-game after purchase.</p>",
      image: icon(opts.icon || "duke"),
      type: opts.type || "single",
      category: { id: catId, name: catName },
      base_price: price,
      sales_tax: 0,
      total_price: total,
      currency: "USD",
      discount: Math.round((price - total) * 100) / 100,
      disable_quantity: !!opts.noQty,
      disable_gifting: false,
      expiration_date: opts.expires || null,
      media: [],
      order: 0,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      created_at: "2026-10-01T10:00:00Z",
      updated_at: "2026-11-01T10:00:00Z",
      __popular: !!opts.popular
    };
  }

  var rankDesc = function (perks) {
    return "<p>A permanent rank with exclusive perks:</p><ul>" + perks.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul><p>Upgrades are pro-rated — you only pay the difference.</p>";
  };

  var categories = [
    { id: 101, name: "Ranks", slug: "ranks", description: "Permanent ranks with perks on every game mode.", display_type: "grid", order: 1, packages: [] },
    { id: 102, name: "Crate Keys", slug: "keys", description: "Open crates at spawn for rare loot.", display_type: "grid", order: 2, packages: [] },
    { id: 103, name: "Cosmetics", slug: "cosmetics", description: "Trails, pets and chat colours. Pure style, zero pay-to-win.", display_type: "grid", order: 3, packages: [] },
    { id: 104, name: "Bundles", slug: "bundles", description: "Best value — everything in one box.", display_type: "list", order: 4, packages: [] },
    { id: 105, name: "Unbans", slug: "unbans", description: "One more chance. Make it count.", display_type: "list", order: 5, packages: [] }
  ];

  var P = {
    101: [
      pkg(101, "Ranks", "Knight", 9.99, { icon: "knight", desc: rankDesc(["Coloured name in chat", "/kit knight every 24h", "2 extra homes", "Access to /hat"]) }),
      pkg(101, "Ranks", "Lord", 19.99, { icon: "lord", popular: true, discount: 25, desc: rankDesc(["Everything in Knight", "/fly in the lobby", "5 extra homes", "Priority queue"]) }),
      pkg(101, "Ranks", "Duke", 34.99, { icon: "duke", discount: 25, desc: rankDesc(["Everything in Lord", "/nick and /feed", "Private vault", "Exclusive particle trail"]) }),
      pkg(101, "Ranks", "Monarch", 59.99, { icon: "monarch", desc: rankDesc(["Everything in Duke", "Custom join message", "10 extra homes", "Monthly Legendary key"]) })
    ],
    102: [
      pkg(102, "Crate Keys", "Vote Key x5", 2.99, { icon: "key-vote" }),
      pkg(102, "Crate Keys", "Rare Key x3", 4.99, { icon: "key-rare", popular: true }),
      pkg(102, "Crate Keys", "Mythic Key", 7.49, { icon: "key-mythic", discount: 25 }),
      pkg(102, "Crate Keys", "Legendary Key", 9.99, { icon: "chest" })
    ],
    103: [
      pkg(103, "Cosmetics", "Aurora Trail", 3.99, { icon: "trail" }),
      pkg(103, "Cosmetics", "Pet Phoenix", 6.99, { icon: "phoenix", popular: true }),
      pkg(103, "Cosmetics", "Rainbow Chat", 2.49, { icon: "chat" }),
      pkg(103, "Cosmetics", "Alchemist Hat", 4.49, { icon: "hat", discount: 25 })
    ],
    104: [
      pkg(104, "Bundles", "Starter Bundle", 14.99, { icon: "bundle-starter", desc: "<p>Knight rank, 5 Rare keys and the Aurora trail.</p>" }),
      pkg(104, "Bundles", "Royal Bundle", 49.99, { icon: "bundle-royal", discount: 25, popular: true, desc: "<p>Duke rank, 3 Mythic keys, Pet Phoenix and Rainbow Chat.</p>" })
    ],
    105: [
      pkg(105, "Unbans", "Unban", 19.99, { icon: "unban", noQty: true, desc: "<p>Removes one ban. Not valid for cheating or chargebacks.</p>" }),
      pkg(105, "Unbans", "Unmute", 7.99, { icon: "unmute", noQty: true, desc: "<p>Removes one active mute.</p>" })
    ]
  };
  categories.forEach(function (c) { c.packages = P[c.id]; });

  window.CIRRUS_DEMO = {
    webstore: {
      id: 1, name: "CirrusMC", description: "A demo Minecraft store", webstore_url: "#", currency: "USD", lang: "en",
      logo: null, platform_type: "Minecraft: Java Edition", platform_type_id: "minecraft", created_at: "2026-01-01",
      supports_usernames: true, supports_gifting: true
    },
    categories: categories,
    pages: [
      { id: 1, title: "Terms", slug: "terms", content: "<h2>Terms of sale</h2><p>All purchases are final once delivered. Chargebacks result in a permanent ban.</p><p>This is a demo page loaded from your Tebex custom pages.</p>", hidden: false, disabled: false, private: false }
    ],
    sidebar: [
      { id: 1, type: "community_goal", start_time: "2026-11-01", end_time: null, data: { header: "Server goal: new minigame", bar_style: "striped", bar_animated: true, percentage: 72, total_payments: 720, target: 1000, times_achieved: 2 } },
      { id: 2, type: "top_customer", start_time: "2026-11-01", end_time: null, data: { header: "Top supporter this month", username: "Notch_Fan", username_id: "1", total: 184.5 } },
      { id: 3, type: "recent_payments", start_time: "2026-11-01", end_time: null, data: { header: "Recent supporters", payments: [
        { username: "Steve_42", username_id: "2", package: { name: "Lord" }, created_at: new Date(Date.now() - 4 * 60000).toISOString(), price: 14.99, currency: "USD" },
        { username: "AlexBuilds", username_id: "3", package: { name: "Mythic Key" }, created_at: new Date(Date.now() - 19 * 60000).toISOString(), price: 5.62, currency: "USD" },
        { username: "xXEnderXx", username_id: "4", package: { name: "Royal Bundle" }, created_at: new Date(Date.now() - 52 * 60000).toISOString(), price: 37.49, currency: "USD" },
        { username: "PixelPia", username_id: "5", package: { name: "Pet Phoenix" }, created_at: new Date(Date.now() - 3 * 3600000).toISOString(), price: 6.99, currency: "USD" },
        { username: "Creeper_Kid", username_id: "6", package: { name: "Rare Key x3" }, created_at: new Date(Date.now() - 5 * 3600000).toISOString(), price: 4.99, currency: "USD" }
      ] } }
    ],
    players: { online: 1287, max: 5000 }
  };
})();
