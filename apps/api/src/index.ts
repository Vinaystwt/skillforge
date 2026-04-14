import cors from "cors";
import express from "express";
import { env } from "./config.js";
import { marketplaceRouter } from "./routes/marketplace.js";
import { skillsRouter } from "./routes/skills.js";

const app = express();

app.use(cors({ origin: env.APP_URL }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "skillforge-api"
  });
});

app.use("/marketplace", marketplaceRouter);
app.use("/skills", skillsRouter);

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({
    message: error.message || "Internal server error"
  });
});

app.listen(env.API_PORT, () => {
  console.log(`SkillForge API listening on http://localhost:${env.API_PORT}`);
});
