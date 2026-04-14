# SkillForge Context

## Project Snapshot
- Project: `SkillForge`
- Repo: `https://github.com/Vinaystwt/skillforge`
- Track: `OKX Build X Hackathon -> Skills Arena`
- Goal: build a premium, on-chain skill registry and agent-ready skill gateway on `X Layer mainnet`, using `Onchain OS`, `Agentic Wallet`, and `x402`-style monetized invocation flows.
- Primary users:
  - AI agent builders who need reusable onchain skills
  - solo developers publishing paid skill endpoints
  - hackathon judges evaluating product completeness, X Layer fit, and agent interaction quality

## Why This Exists
Agent ecosystems keep rebuilding the same execution primitives. SkillForge turns reusable skill endpoints into a marketplace and onchain registry on X Layer, with discoverability, provenance, ratings, invocation trails, and paid access for agents and humans.

Core narrative:
- Registry onchain
- Execution offchain through OKX/Onchain OS-backed skills
- Invocation monetization via x402-compatible payment flow
- Frontend polished enough for human judges
- Agent demo loop proving the system behaves like infrastructure rather than a static demo

## Judging Alignment
- Onchain OS / Uniswap integration: real OKX skill-backed execution, market/risk/trade data, paid invocation
- X Layer integration: contracts on X Layer mainnet, agentic wallet on X Layer, payment denominated on X Layer
- AI interactive experience: invocation flow, live activity feed, agent demo, composable skills
- Product completeness: public repo, README, deploy scripts, frontend, backend, contracts, demo surface

## Locked Build Scope
### In scope
- `SkillRegistry.sol` on X Layer
- API gateway for discovery + invocation
- 5 seeded skills backed by OKX capabilities
- x402-compatible challenge/paid invoke flow at API edge
- polished frontend with marketplace, skill detail, publish flow, dashboard, and demo
- deploy scripts, env handling, docs

### Out of scope
- protocol token
- large custom payment router contract
- unnecessary DAO/governance features
- overbuilt creator economics beyond hackathon MVP

## Wallets And Funds
### Deployer wallet
- Address: `0x94c188F8280cA706949CC030F69e42B5544514ac`
- Network: `X Layer mainnet`
- Purpose: deploy and admin transactions
- Funding target: `0.05 OKB`

### Agentic wallet
- Address: `0x89740dfdc33b07242d1276ad453e00eb56c25884`
- Account ID: `7e119b2b-a546-4f27-93e9-29f92a97f8a0`
- Purpose: project identity, demos, payment routing, skill invocation actor

## Funding Log
- Received `0.13 OKB` on Agentic Wallet
- Swapped `0.118 OKB -> 10.104445 USDT`
- Remaining native balance: `0.012 OKB`
- Swap tx hash: `0x0d6da5ea1cc77c0e6943d730d7392e9a99d04ac599ab8d850214f94b4837c2ba`

## Secrets Handling
- Never store secrets in tracked files.
- Keep deployer private key, Agentic Wallet credentials, OKX API credentials, and any seed phrases in local `.env` only.
- Ensure `.env*` remains ignored except `.env.example`.

## Frontend Direction
- Avoid generic AI dashboard patterns.
- Tone: premium, infrastructure-grade, cinematic, credible.
- Visual approach:
  - dark mineral palette with warm metallic accents
  - expressive typography
  - asymmetrical layout and high spacing rhythm
  - motion used for reveal, status feedback, and live-feed energy
- Required UX:
  - judges understand the product in under 10 seconds
  - developers can browse and publish skills easily
  - demo page makes agent activity and payment flow obvious

## Architecture Plan
### Packages
- `apps/web`: Next.js frontend
- `apps/api`: Express/Fastify API and skill gateway
- `packages/contracts`: Hardhat contracts and deploy scripts
- `packages/shared`: shared schemas, types, seed data, formatting helpers

### System design
1. creators register skill metadata on X Layer
2. API reads registry data and exposes discovery endpoints
3. invoke endpoints gate access and dispatch to OKX/Onchain OS-backed adapters
4. results, receipts, and activity logs feed the UI
5. frontend presents discovery, publishing, invocation, and live demo flows

## Seed Skills
1. `market-price-snapshot`
2. `wallet-balance-check`
3. `contract-risk-scan`
4. `swap-route-quote`
5. `safe-swap-execute`

## Build Status
### Completed
- hackathon requirements reviewed
- project scope locked
- GitHub repo created
- Agentic Wallet created and funded
- monorepo scaffold completed
- shared package completed
- SkillRegistry contract implemented
- SkillRegistry deployed to X Layer mainnet
- 5 seed skills registered onchain
- API gateway implemented
- x402-compatible challenge middleware implemented
- frontend implemented
- workspace build passing
- contract tests passing
- live registry read path verified
- OKX-backed quote invocation verified

### Pending
- explorer source verification
- live hosting deployment
- final demo video capture
- submission form packaging

## Live Deployment Log
### SkillRegistry
- Contract: `0x1850d2a31CB8669Ba757159B638DE19Af532ba5e`
- Network: `X Layer mainnet`
- Deployer: `0x94c188F8280cA706949CC030F69e42B5544514ac`

### Seed Registration Transactions
- `market-price-snapshot`: `0xaf92994289936f55ed4e3263ae94011cb384b877e250650e9cd99eac5f49bc82`
- `wallet-balance-check`: `0x6b4310f5bb668ac6a55a2d191bc405a5d94ff4b21a1d887750348e7469fd9b31`
- `contract-risk-scan`: `0x6f839db28c1c18432fe1007d06925084546a693e6f74365f09109372489aa670`
- `swap-route-quote`: `0x04496049d2aaaf50abc5b63eb19450603ae38821f6e044229d552abf41a98f6c`
- `safe-swap-execute`: `0xc41c216fd80d6fe53807269f8398229cdf7c9d2d631af16046921e7417845bae`

## Verification Log
- `pnpm build`: passed
- `pnpm test`: passed
- direct service verification:
  - marketplace payload returned 5 skills
  - featured skills returned 3 entries
  - `swap-route-quote` invocation succeeded through OKX integration

## Important Runtime Notes
- API returns `HTTP 402` with `PAYMENT-REQUIRED` when payment header is absent.
- Local port-binding could not be exercised inside the sandbox because listening on `0.0.0.0:3001` is restricted here. Route and service verification was done by direct module execution instead.
- Frontend uses API fetch with local seeded fallbacks, so the UI remains usable before the API is online.

## Operational Rules
- branch: `master`
- commits: use `commit-tree` only
- verify author after every commit
- do not report back mid-build unless blocked

## Recovery Instructions For A New Session
If a new Codex session starts:
1. read this file first
2. inspect current git status
3. review the most recent section updates in this file
4. continue from `Build Status`
5. never expose secrets or rewrite commit history using normal `git commit`
