export type IconName =
  | "camera"
  | "shoppingBag"
  | "megaphone"
  | "code"
  | "sparkles"
  | "layers"
  | "zap"
  | "palette"
  | "chart"
  | "workflow"
  | "shield";

export type UseCaseSlug =
  | "photography"
  | "ecommerce"
  | "marketing"
  | "platforms";

type CTA = { label: string; href: string };
type Stat = { label: string; value: string; detail: string };
type Feature = {
  title: string;
  description: string;
  icon: IconName;
  bullets: string[];
};
type Demo = {
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  metric: string;
  tags: string[];
};
type WorkflowStep = {
  title: string;
  description: string;
  duration: string;
};
type ResourceLink = { label: string; href: string };

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type UseCaseContent = {
  slug: UseCaseSlug;
  pageTitle: string;
  metaDescription: string;
  hero: {
    icon: IconName;
    badge: string;
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    heroImage: string;
    heroImageAlt: string;
    primaryCta: CTA;
    secondaryCta: CTA;
    supportText: string;
    toolset: string[];
  };
  stats: Stat[];
  features: Feature[];
  demos: Demo[];
  workflowIntro: string;
  workflow: WorkflowStep[];
  testimonial: Testimonial;
  resources: ResourceLink[];
};

export const useCaseContent: Record<UseCaseSlug, UseCaseContent> = {
  photography: {
    slug: "photography",
    pageTitle: "Photography Use Case",
    metaDescription:
      "Restore, retouch, and stylize shoots with AI presets built for photographers.",
    hero: {
      icon: "camera",
      badge: "Photographers & Studios",
      eyebrow: "Creative workflows",
      title: "Bring every shoot",
      highlight: "back to life",
      description:
        "Fix lighting, restore vintage collections, and deliver polished sets in minutes instead of evenings spent masking layers by hand.",
      heroImage:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1400&auto=format&fit=crop",
      heroImageAlt: "Photographer editing images on laptop",
      primaryCta: { label: "Upload RAW set", href: "/transformations/add/restore" },
      secondaryCta: { label: "View photographer playbook", href: "/docs/photography" },
      supportText: "HDR merge, portrait repair, and batch exports included in every plan.",
      toolset: ["RAW cleanup", "Skin tone balance", "Film emulation", "Noise & grain control"],
    },
    stats: [
      {
        label: "Time saved per shoot",
        value: "3.2 hrs",
        detail: "Average retouching hours replaced",
      },
      {
        label: "Client approval rate",
        value: "96%",
        detail: "Deliver finals clients sign off on",
      },
      {
        label: "Batch uploads",
        value: "500+",
        detail: "High-res frames processed simultaneously",
      },
      {
        label: "Preset library",
        value: "120",
        detail: "Portrait, editorial, and lifestyle looks",
      },
    ],
    features: [
      {
        title: "Portrait repair autopilot",
        description: "AI retouching trained on natural skin textures.",
        icon: "sparkles",
        bullets: [
          "Micro-contrast skin smoothing",
          "Lens correction & chromatic fix",
          "One-click makeup consistency",
        ],
      },
      {
        title: "RAW aware colorist",
        description: "Match any brand palette or film stock.",
        icon: "palette",
        bullets: [
          "Preset layering with masks",
          "Creative LUT export",
          "Capture One & Lightroom ready",
        ],
      },
      {
        title: "Studio delivery hub",
        description: "Share contact sheets and approvals instantly.",
        icon: "layers",
        bullets: [
          "Side-by-side before/after",
          "Client commenting links",
          "Watermark-safe previews",
        ],
      },
    ],
    demos: [
      {
        title: "Editorial skin retouch",
        description: "Recover skin detail while keeping pores intact.",
        beforeImage: "/assets/images/sub-compare-image-enhnace-before.jpeg",
        afterImage: "/assets/images/sub-compare-image-enhnace-after.jpeg",
        beforeLabel: "RAW capture",
        afterLabel: "Retouched",
        metric: "Saved 48 manual brush strokes",
        tags: ["Retouch", "Portrait"],
      },
      {
        title: "Location cleanup",
        description: "Erase tourists, gear, and clutter in one pass.",
        beforeImage: "/assets/images/sub-compare-image-remove-before.jpeg",
        afterImage: "/assets/images/sub-compare-image-remove-after.jpeg",
        beforeLabel: "Original",
        afterLabel: "Clean frame",
        metric: "2.4s remove time",
        tags: ["Cleanup", "Outdoor"],
      },
      {
        title: "Color faded slide",
        description: "Restore archival collections with natural tones.",
        beforeImage: "/assets/images/sub-compare-image-bg-remove-before.jpeg",
        afterImage: "/assets/images/sub-compare-image-bg-remove-after.jpeg",
        beforeLabel: "Scan",
        afterLabel: "Restored",
        metric: "Auto dust + tone fix",
        tags: ["Archive", "Studio"],
      },
    ],
    workflowIntro:
      "Upload RAWs, choose a preset, and export client-ready galleries in under ten minutes.",
    workflow: [
      {
        title: "Sync your shoot",
        description: "Drag-and-drop a folder of RAW files or import from Capture One.",
        duration: "1 min",
      },
      {
        title: "Apply AI looks",
        description: "Stack repair, grading, and skin workflows with reusable recipes.",
        duration: "5 min",
      },
      {
        title: "Deliver & iterate",
        description: "Share approvals, gather notes, and push finals to your DAM.",
        duration: "3 min",
      },
    ],
    testimonial: {
      quote:
        "We retired three retouching plug-ins and still deliver more looks per shoot.",
      author: "Mira Cole",
      role: "Lead Photographer, Prism Studio",
    },
    resources: [
      { label: "Portrait retouch template", href: "/docs/templates/portrait" },
      { label: "Film emulation LUT pack", href: "/downloads/film-pack" },
      { label: "Studio onboarding worksheet", href: "/resources/studios" },
    ],
  },
  ecommerce: {
    slug: "ecommerce",
    pageTitle: "E-commerce Use Case",
    metaDescription:
      "Create consistent, on-brand product imagery with automated background and lighting control.",
    hero: {
      icon: "shoppingBag",
      badge: "E-commerce teams",
      eyebrow: "Conversion-ready",
      title: "Ship perfectly",
      highlight: "merchandised listings",
      description:
        "Replace studio re-shoots with AI powered batch gradients, drop shadows, and size guides that auto-update across marketplaces.",
      heroImage:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&auto=format&fit=crop",
      heroImageAlt: "Product photography setup",
      primaryCta: { label: "Generate product set", href: "/transformations/add/removeBackground" },
      secondaryCta: { label: "Download playbook", href: "/docs/ecommerce" },
      supportText: "Amazon, Shopify, Etsy, and Walmart templates included.",
      toolset: ["360º spin", "Shadow lab", "Variant generator", "Channel-ready exports"],
    },
    stats: [
      {
        label: "Listings refreshed",
        value: "12k / mo",
        detail: "Average catalog volume",
      },
      {
        label: "Per SKU cost",
        value: "$0.09",
        detail: "Compared to $4 studio edits",
      },
      {
        label: "Marketplace compliance",
        value: "100%",
        detail: "Meets Amazon & Target spec",
      },
      {
        label: "Style variations",
        value: "36",
        detail: "Auto-generated scene options",
      },
    ],
    features: [
      {
        title: "Background lab",
        description: "Swap in gradients, textures, and seasonal looks.",
        icon: "layers",
        bullets: [
          "One-click shadow realism",
          "Brand palette presets",
          "Smart reflections",
        ],
      },
      {
        title: "Batch variant builder",
        description: "Create colorways and bundles instantly.",
        icon: "zap",
        bullets: ["CSV upload", "Smart masking", "Bulk download"],
      },
      {
        title: "Spec guardian",
        description: "Never miss a marketplace guideline again.",
        icon: "shield",
        bullets: ["Auto center & crop", "File naming macros", "Instant QA reports"],
      },
    ],
    demos: [
      {
        title: "Lifestyle backdrop",
        description: "Drop shoes into seasonal sets without a re-shoot.",
        beforeImage:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop",
        afterImage:
          "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=900&auto=format&fit=crop",
        beforeLabel: "Studio",
        afterLabel: "Lifestyle",
        metric: "Created 6 hero shots",
        tags: ["Background", "Lifestyle"],
      },
      {
        title: "Shadow + reflection",
        description: "Consistent drop shadow library for marketplace uploads.",
        beforeImage:
          "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=900&auto=format&fit=crop",
        afterImage:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop",
        beforeLabel: "Flat",
        afterLabel: "Merchandised",
        metric: "0 rejected listings",
        tags: ["Compliance", "Shadows"],
      },
      {
        title: "Colorway generator",
        description: "Produce every SKU in brand-approved colors.",
        beforeImage:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&auto=format&fit=crop",
        afterImage:
          "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=900&auto=format&fit=crop",
        beforeLabel: "Original",
        afterLabel: "Variant",
        metric: "7 variants in 90s",
        tags: ["Variants", "Color"],
      },
    ],
    workflowIntro:
      "Create marketplace-ready imagery with drag-and-drop templates your entire team can use.",
    workflow: [
      {
        title: "Upload master asset",
        description: "Drag your hero PNG or PSD into Artify.",
        duration: "30s",
      },
      {
        title: "Choose preset",
        description: "Pick a brand-approved background, angle, and lighting recipe.",
        duration: "2 min",
      },
      {
        title: "Export per channel",
        description: "Generate optimized crops for PDP, ads, print, and marketplaces.",
        duration: "1 min",
      },
    ],
    testimonial: {
      quote:
        "Our merchandising backlog disappeared in a week – the team simply uploads and ships.",
      author: "Jonas Weber",
      role: "Director of Creative Ops, Fable Commerce",
    },
    resources: [
      { label: "Marketplace compliance checklist", href: "/resources/marketplaces" },
      { label: "Variant generator spreadsheet", href: "/downloads/variant-sheet" },
      { label: "Shadow & reflection presets", href: "/downloads/shadow-pack" },
    ],
  },
  marketing: {
    slug: "marketing",
    pageTitle: "Marketing Teams Use Case",
    metaDescription:
      "Concept, test, and launch creative variations with AI-powered brand controls.",
    hero: {
      icon: "megaphone",
      badge: "Marketing & agencies",
      eyebrow: "Campaign studio",
      title: "Ship campaign",
      highlight: "creative at scale",
      description:
        "Prototype headlines, visuals, and placements before the photoshoot. Sync assets with your ad accounts once approved.",
      heroImage:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1400&auto=format&fit=crop",
      heroImageAlt: "Marketing team collaborating",
      primaryCta: { label: "Launch creative room", href: "/transformations" },
      secondaryCta: { label: "See agency toolkit", href: "/docs/marketing" },
      supportText: "Supports Meta, TikTok, Google, and OOH formats.",
      toolset: ["Concept boards", "Auto-resize", "Brand guardrails", "Stakeholder reviews"],
    },
    stats: [
      { label: "Concepts per week", value: "48", detail: "Average deliverables shipped" },
      { label: "Variant testing", value: "6x", detail: "More multivariate options" },
      { label: "Brand compliance", value: "99.4%", detail: "Detected before handoff" },
      { label: "Approval speed", value: "3 hrs", detail: "Down from 3 days" },
    ],
    features: [
      {
        title: "Creative workshop",
        description: "Move from mood board to ready-to-ship visuals in one space.",
        icon: "sparkles",
        bullets: ["Canvas templates", "Drag assets", "Realtime comments"],
      },
      {
        title: "Brand guardrails",
        description: "Keep typography, palettes, and logos on-lock.",
        icon: "shield",
        bullets: ["Hex + font locks", "Safe zones", "Auto QA"],
      },
      {
        title: "Media-ready handoff",
        description: "Push final creatives straight to your ad stack.",
        icon: "chart",
        bullets: ["Meta/TikTok push", "UTM builder", "Performance tags"],
      },
    ],
    demos: [
      {
        title: "OOH billboard refresh",
        description: "Swap art direction per city while staying on-brand.",
        beforeImage:
          "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=900&auto=format&fit=crop",
        afterImage:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop",
        beforeLabel: "Original",
        afterLabel: "Localized",
        metric: "+23% lift in recall",
        tags: ["OOH", "Localization"],
      },
      {
        title: "Social carousel",
        description: "Auto-generate ten hooks from one asset drop.",
        beforeImage:
          "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=900&auto=format&fit=crop",
        afterImage:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop",
        beforeLabel: "Concept",
        afterLabel: "Ready creative",
        metric: "10 variations exported",
        tags: ["Social", "Carousel"],
      },
      {
        title: "Product launch kit",
        description: "Generate hero, detail, and testimonial cards instantly.",
        beforeImage:
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&auto=format&fit=crop",
        afterImage:
          "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=900&auto=format&fit=crop",
        beforeLabel: "Brief",
        afterLabel: "Launch set",
        metric: "Ready in 6 minutes",
        tags: ["Product", "Launch"],
      },
    ],
    workflowIntro:
      "Campaign managers move from creative brief to assets, approvals, and exports in the same canvas.",
    workflow: [
      {
        title: "Ingest brief",
        description: "Paste your doc or record audio—Artify summarizes deliverables.",
        duration: "1 min",
      },
      {
        title: "Ideate & adapt",
        description: "Generate visual & copy pairings, then adapt to every placement.",
        duration: "7 min",
      },
      {
        title: "Launch & learn",
        description: "Push approved assets to ad platforms and monitor tags.",
        duration: "2 min",
      },
    ],
    testimonial: {
      quote:
        "Our creative pods ideate twice as many campaigns because approvals stay inside Artify.",
      author: "Noor El-Sayed",
      role: "Group Creative Director, Daylight",
    },
    resources: [
      { label: "Agency onboarding kit", href: "/resources/agency" },
      { label: "Creative automation checklist", href: "/downloads/creative-checklist" },
      { label: "Performance reporting template", href: "/downloads/performance-template" },
    ],
  },
  platforms: {
    slug: "platforms",
    pageTitle: "Developers & Platforms Use Case",
    metaDescription:
      "Embed Artify AI into your product with white-label components and APIs.",
    hero: {
      icon: "code",
      badge: "Developers & platforms",
      eyebrow: "API-first",
      title: "Add visual",
      highlight: "superpowers to your app",
      description:
        "Drop Artify widgets into your product or call the API directly. Handle auth, credit tracking, and storage with a single SDK.",
      heroImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop",
      heroImageAlt: "Developer dashboard",
      primaryCta: { label: "Get API key", href: "/api" },
      secondaryCta: { label: "View changelog", href: "/changelog" },
      supportText: "SDKs for React, Vue, Swift, Kotlin, and REST.",
      toolset: ["Embeddable widgets", "Signed uploads", "Usage metering", "Webhook events"],
    },
    stats: [
      { label: "Average integration", value: "6 hrs", detail: "From first call to production" },
      { label: "Uptime", value: "99.99%", detail: "Multi-region failover" },
      { label: "Requests / day", value: "38M", detail: "Global workloads handled" },
      { label: "SDK installs", value: "8", detail: "Frameworks maintained" },
    ],
    features: [
      {
        title: "White-label widgets",
        description: "Ship transformation UIs without rebuilding from scratch.",
        icon: "layers",
        bullets: ["Theme tokens", "i18n ready", "Accessibility built-in"],
      },
      {
        title: "Granular controls",
        description: "Configure credits, limits, and guardrails per tenant.",
        icon: "workflow",
        bullets: ["Role-based access", "Usage policies", "Alert webhooks"],
      },
      {
        title: "Observability",
        description: "Monitor pipelines with structured logs and traces.",
        icon: "chart",
        bullets: ["Live dashboards", "SLA monitors", "Custom webhooks"],
      },
    ],
    demos: [
      {
        title: "Embedded editor",
        description: "Add Artify UI inside your product with two lines of code.",
        beforeImage:
          "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=900&auto=format&fit=crop",
        afterImage:
          "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=900&auto=format&fit=crop",
        beforeLabel: "Before API",
        afterLabel: "With Artify",
        metric: "6 hr implementation",
        tags: ["SDK", "Widget"],
      },
      {
        title: "Serverless pipeline",
        description: "Trigger background removal for every customer upload.",
        beforeImage:
          "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&auto=format&fit=crop",
        afterImage:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop",
        beforeLabel: "Original",
        afterLabel: "API output",
        metric: "98ms avg latency",
        tags: ["API", "Automation"],
      },
      {
        title: "Usage metering dashboard",
        description: "Provide your customers with transparent credit reports.",
        beforeImage:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop",
        afterImage:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop",
        beforeLabel: "Raw data",
        afterLabel: "Insights",
        metric: "<5 min setup",
        tags: ["Metering", "Dashboard"],
      },
    ],
    workflowIntro:
      "Authenticate, embed, and monitor with production-ready SDKs and docs.",
    workflow: [
      {
        title: "Create workspace",
        description: "Provision API keys and select the features you want to expose.",
        duration: "2 min",
      },
      {
        title: "Embed or call",
        description: "Use our React components or hit the REST endpoints directly.",
        duration: "4 min",
      },
      {
        title: "Monitor + monetize",
        description: "Track usage per tenant and send events to your billing stack.",
        duration: "5 min",
      },
    ],
    testimonial: {
      quote:
        "We embedded Artify in our SaaS editor without touching the legacy pipeline.",
      author: "Monica Reyes",
      role: "VP Product, CanvasCloud",
    },
    resources: [
      { label: "API quickstart", href: "/docs/api/quickstart" },
      { label: "Embed SDK reference", href: "/docs/sdk/embed" },
      { label: "Security & compliance", href: "/security" },
    ],
  },
};
