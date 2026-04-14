import { Router } from "express";
import { z } from "zod";
import { invokeSkill, resolveSkill } from "../services/catalog.js";
import { buildPaymentRequired, hasPaymentHeader } from "../services/x402.js";

export const skillsRouter = Router();

const invokeSchema = z.object({
  walletAddress: z.string().optional(),
  tokenAddress: z.string().optional(),
  contractAddress: z.string().optional(),
  amount: z.string().optional(),
  note: z.string().optional(),
  extra: z.record(z.union([z.string(), z.number(), z.boolean()])).optional()
});

skillsRouter.post("/:slug/invoke", async (req, res, next) => {
  try {
    const skill = await resolveSkill(req.params.slug);

    if (!skill) {
      res.status(404).json({ message: "Skill not found" });
      return;
    }

    if (skill.invokeMode === "x402" && !hasPaymentHeader(req.headers)) {
      res.setHeader("PAYMENT-REQUIRED", buildPaymentRequired(skill));
      res.status(402).json({});
      return;
    }

    const payload = invokeSchema.parse(req.body ?? {});
    const result = await invokeSkill(skill, payload);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

