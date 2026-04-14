import { Router } from "express";
import { getMarketplacePayload, listSkills, resolveSkill } from "../services/catalog.js";

export const marketplaceRouter = Router();

marketplaceRouter.get("/", async (_req, res, next) => {
  try {
    res.json(await getMarketplacePayload());
  } catch (error) {
    next(error);
  }
});

marketplaceRouter.get("/skills", async (_req, res, next) => {
  try {
    res.json(await listSkills());
  } catch (error) {
    next(error);
  }
});

marketplaceRouter.get("/skills/:slug", async (req, res, next) => {
  try {
    const skill = await resolveSkill(req.params.slug);
    if (!skill) {
      res.status(404).json({ message: "Skill not found" });
      return;
    }

    res.json(skill);
  } catch (error) {
    next(error);
  }
});

