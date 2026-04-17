# SkillForge — Demo Video Production Guide

## Part 0: Pre-Execution Checklist

Open these tabs in your browser **before** you hit record. Arrange them left-to-right in this exact order so you can Alt-Tab smoothly:

### Required Browser Tabs (5 tabs)

| # | Tab | URL | Purpose |
|---|-----|-----|---------|
| 1 | **SkillForge Live** | `https://web-six-iota-44.vercel.app` | Primary demo surface — homepage with all 5 skills, activity feed, stats |
| 2 | **Demo Page** | `https://web-six-iota-44.vercel.app/demo` | Guided judge flow — shows the flagship Safe Swap Execute pipeline with live proof hash |
| 3 | **Skill Detail: Safe Swap Execute** | `https://web-six-iota-44.vercel.app/skill/safe-swap-execute` | Deep dive into the flagship skill — shows InvokePanel, creator stats, endpoint details |
| 4 | **Skill Detail: Swap Route Quote** | `https://web-six-iota-44.vercel.app/skill/swap-route-quote` | Secondary skill to demonstrate invocation + x402 payment challenge flow live |
| 5 | **OKLink Explorer — Contract** | `https://www.oklink.com/xlayer/address/0x1850d2a31CB8669Ba757159B638DE19Af532ba5e#code` | On-chain verification — shows deployed SkillRegistry contract with verified source code |

### Optional Bonus Tab (if you want to show wallet state)

| # | Tab | URL | Purpose |
|---|-----|-----|---------|
| 6 | **OKLink Explorer — Agentic Wallet** | `https://www.oklink.com/xlayer/address/0x89740dfdc33b07242d1276ad453e00eb56c25884` | Shows the Agentic Wallet address with its USDT and OKB balances on X Layer |

### Pre-Recording Checks

- [ ] All 5 tabs loaded and responsive
- [ ] Screen resolution set to at least 1920×1080
- [ ] Browser zoom at 100% (Cmd+0)
- [ ] Notifications silenced (Do Not Disturb on)
- [ ] Recording software set to capture full screen or browser window only
- [ ] Microphone tested — clear, no background noise
- [ ] Mouse cursor visible in recording
- [ ] Practice one full run-through without recording to time yourself (target: 3–5 minutes)
- [ ] Bookmark all tabs in a "SkillForge Demo" folder for one-click open

---

## Part 1: Complete Video Script

**Target duration:** 3–4 minutes
**Tone:** Confident, technical, infrastructure-grade — not a tutorial, a demonstration of a working system
**Format:** Screen recording with voiceover, showing browser tabs

---

### SECTION 1 — Opening (0:00 – 0:25)

**Tab:** Tab 1 — SkillForge Homepage (`/`)

**What's on screen:** The full homepage — hero section, stats, activity feed, skill grid

**What you say:**

> "This is SkillForge — a paid execution layer for reusable AI agent skills, deployed on X Layer mainnet."
>
> "Instead of agents rebuilding the same primitives — pricing, risk checks, swap routes, execution wrappers — SkillForge turns them into onchain-discoverable, callable, and monetizable infrastructure."

**What you do on screen:**
- Let the page sit for 3 seconds so judges see the full layout
- Slowly scroll down to show the hero stats (Skills: 5, Invocations, Revenue)
- Point out the activity feed on the right side with the "executed" and "paid" tags

---

### SECTION 2 — The Registry is On-Chain (0:25 – 0:55)

**Tab:** Tab 5 — OKLink Explorer (contract page)

**What you do on screen:**
- Alt-Tab to the OKLink tab
- Show the contract address `0x1850d2a31CB8669Ba757159B638DE19Af532ba5e`
- Click on the **Code** tab if not already selected
- Scroll through the verified Solidity source code briefly

**What you say:**

> "Every skill in SkillForge is registered onchain. This is the SkillRegistry contract on X Layer mainnet — verified and publicly readable."
>
> "Creators register their skills here with metadata — the endpoint, pricing, category, and description. The contract is the source of truth for skill discovery."

**What you do on screen:**
- Highlight the contract address in the URL bar or page header
- Scroll through ~10 lines of the verified code to show it's real, not just a deployment

**Transition:** Alt-Tab back to Tab 1 (Homepage)

---

### SECTION 3 — Skill Discovery & Architecture (0:55 – 1:30)

**Tab:** Tab 1 — SkillForge Homepage

**What you do on screen:**
- Scroll through the featured skills grid
- Hover over 2–3 skill cards to show the hover animation (lift + arrow reveal)
- Show the remaining skills section below

**What you say:**

> "Right now there are five skills registered. Each one is a composable primitive."
>
> "Market Price Snapshot pulls live OKX DEX data. Wallet Balance Check reads on-chain balances. Contract Risk Scan runs security analysis. Swap Route Quote gets optimal execution paths. And Safe Swap Execute chains risk screening with guarded swap execution."
>
> "Every skill has a price in USDT, an invocation count, and a creator rating. The architecture is simple: registry onchain, execution offchain, payments at the API edge."

**What you do on screen:**
- Hover over "Safe Swap Execute" card — let the animation play
- Click on "Safe Swap Execute" to navigate to its detail page

---

### SECTION 4 — Deep Dive: Flagship Skill (1:30 – 2:10)

**Tab:** Tab 3 — Safe Swap Execute detail page

**What's on screen:** Skill detail page — name, description, tags, stats, InvokePanel, endpoint card, creator stats

**What you do on screen:**
- Show the left panel: category badge, skill name, description, tags
- Show the 3 stat boxes: Price ($0.25), Invocations, Backing (OKX)
- Scroll to the InvokePanel on the right — show the form fields (Amount, Contract address)
- Show the endpoint card below it: `/skills/safe-swap-execute/invoke`
- Show the creator stats card

**What you say:**

> "This is the flagship skill — Safe Swap Execute. It's a composite skill that chains token risk screening with swap execution."
>
> "Before any swap runs, it scans the destination asset for honeypot risk, bundler flags, and sniper activity. Only if the risk check passes does it proceed to execution."
>
> "The invocation costs $0.25 in USDT and is backed by OKX DEX market APIs. Every call is routed through the OKX Onchain OS tooling."
>
> "This is where the x402 payment protocol comes in."

---

### SECTION 5 — The x402 Payment Challenge (2:10 – 2:50)

**Tab:** Tab 4 — Swap Route Quote detail page

**What you do on screen:**
- Navigate to the Swap Route Quote skill page (click "Marketplace" in the header, then click Swap Route Quote, or use your bookmarked Tab 4)
- Scroll down to the InvokePanel
- Fill in Amount: `100` (or any reasonable number)
- Click **"Request invoke"**

**What happens:**
- The API returns HTTP 402 — the panel shows "Payment required"
- A payment challenge appears showing the amount, network, and pay-to address
- A **"Confirm demo payment"** button appears

**What you say:**

> "When an agent calls this endpoint without payment, the API returns a 402 Payment Required response with an x402 challenge header."
>
> "The caller resolves the challenge and resubmits with a payment proof. In production this would be a verified on-chain settlement. For this demo, we confirm the payment and replay the invocation."

**What you do on screen:**
- Click **"Confirm demo payment"**
- Show the successful response — the swap route quote data comes back as JSON
- Let the result sit for 2 seconds so the judge sees the full JSON response

**Transition:** Alt-Tab to Tab 2 (Demo page)

---

### SECTION 6 — The Guided Demo Flow (2:50 – 3:30)

**Tab:** Tab 2 — Demo page

**What's on screen:** The guided judge flow — 4 steps on the left, step indicators, live proof hash, activity feed

**What you do on screen:**
- Point to the 4 numbered steps on the left panel
- Point to the "Live proof" box showing the transaction hash
- Show the activity feed items below

**What you say:**

> "This is the guided demo flow. It walks through the complete SkillForge pipeline in one view."
>
> "Step one: fetch a live market snapshot for OKB from the OKX DEX. Step two: run a token risk scan on the destination asset. Step three: route an x402-paid invocation through SkillForge. And step four: execute the guarded swap and surface the on-chain transaction hash."
>
> "This hash — `0x0d6da5...` — is the actual mainnet swap transaction routed by the Agentic Wallet on X Layer."

**What you do on screen:**
- Hover over the transaction hash so it's highlighted
- Scroll down to show the InvokePanel at the bottom
- Optionally click "Request invoke" on the demo page InvokePanel to show it works end-to-end

---

### SECTION 7 — Closing (3:30 – 3:50)

**Tab:** Tab 1 — SkillForge Homepage (navigate back)

**What you do on screen:**
- Return to the homepage
- Let it sit — show the full layout one more time

**What you say:**

> "SkillForge is registry onchain, execution offchain, and payments at the edge. Five composable skills on X Layer mainnet, backed by OKX Onchain OS, with an Agentic Wallet as the project identity."
>
> "Built for the OKX Build X Hackathon — Skills Arena."

**What you do on screen:**
- Hold on the homepage for 3 seconds
- Stop recording

---

## Part 2: Quick-Reference Cue Card

Print this or keep it on a second screen while recording:

```
┌──────────────────────────────────────────────────────┐
│  SKILLFORGE DEMO — CUE CARD                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│  0:00  TAB 1 — Homepage                              │
│        "This is SkillForge..."                       │
│        Scroll → stats → activity feed                │
│                                                      │
│  0:25  TAB 5 — OKLink Contract                       │
│        "Every skill is registered onchain..."        │
│        Show address → Code tab → scroll source       │
│                                                      │
│  0:55  TAB 1 — Homepage (back)                       │
│        "Five composable primitives..."               │
│        Hover cards → click Safe Swap Execute         │
│                                                      │
│  1:30  TAB 3 — Safe Swap Execute detail              │
│        "Flagship skill — composite, guarded..."      │
│        Show panels → InvokePanel → endpoint card     │
│                                                      │
│  2:10  TAB 4 — Swap Route Quote                      │
│        "x402 payment challenge..."                   │
│        Fill amount → Request invoke                  │
│        → 402 appears → Confirm demo payment          │
│        → JSON result shows                           │
│                                                      │
│  2:50  TAB 2 — Demo page                             │
│        "Guided demo flow..."                         │
│        4 steps → Live proof hash → activity feed     │
│                                                      │
│  3:30  TAB 1 — Homepage (back)                       │
│        "Registry onchain, execution offchain..."     │
│        Hold 3s → STOP                                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Part 3: Contingency Notes

### If the x402 invoke fails or hangs
- The InvokePanel has a timeout. If it errors, say:
  > "The payment challenge is working — in a live session this would resolve to a verified settlement. Let me show the demo flow instead."
- Immediately Alt-Tab to Tab 2 (Demo page) and continue from Section 6

### If the OKLink contract page doesn't load
- Skip Section 2 and mention verbally:
  > "The SkillRegistry is deployed and verified on X Layer mainnet at address 0x1850...5e — I'll show the on-chain proof after the demo."
- Continue to Section 3

### If the live site is slow
- The frontend has fallback seeded data. Pages will still render with skill information even if the API layer is delayed
- Wait 2 seconds between tab switches for Next.js hydration

### If you need to show the Agentic Wallet balance
- Open Tab 6 (OKLink wallet address)
- Show the USDT balance (~10.10) and OKB balance (~0.012)
- Say: "This is the Agentic Wallet — 0x8974...884 — holding the USDT budget for demo executions and OKB for gas on X Layer"

---

## Part 4: Recording Settings Recommendation

| Setting | Value |
|---------|-------|
| Resolution | 1920×1080 minimum |
| Frame rate | 30fps (60fps if you want smooth hover animations) |
| Audio | 48kHz, mono, —3dB peak |
| Format | MP4 (H.264) |
| Cursor | Visible, slightly enlarged if possible |
| Browser | Chrome or Arc, full-screen or centered window |
| Zoom | 100% — do not zoom in, judges need full context |
| Duration target | 3:30 – 4:00 |

---

## Part 5: What This Demo Proves to Judges

| Judging Bucket | What the Video Demonstrates |
|----------------|---------------------------|
| **Onchain OS / Uniswap integration** | OKX DEX APIs powering route quotes, risk scans, and swap execution through the Onchain OS tooling |
| **X Layer integration** | Mainnet contract deployed and verified, mainnet transactions visible in activity feed, Agentic Wallet on X Layer |
| **AI interactive experience** | Agent-friendly skill invocation with x402 payment challenge flow — machines can call these endpoints programmatically |
| **Product completeness** | Full stack: contract → API → payment layer → frontend → demo flow → explorer verification |
