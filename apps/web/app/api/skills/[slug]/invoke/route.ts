import { NextResponse } from "next/server";
import { z } from "zod";
import { getSkill, invokeServerSkill } from "../../../../../lib/server/catalog";
import { buildChallenge, verifyDemoPayment } from "../../../../../lib/server/okx";

const invokeSchema = z.object({
  walletAddress: z.string().optional(),
  tokenAddress: z.string().optional(),
  contractAddress: z.string().optional(),
  amount: z.string().optional(),
  note: z.string().optional(),
  extra: z.record(z.union([z.string(), z.number(), z.boolean()])).optional()
});

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);

  if (!skill) {
    return NextResponse.json({ message: "Skill not found" }, { status: 404 });
  }

  const header = request.headers.get("payment-signature");
  if (skill.invokeMode === "x402" && !verifyDemoPayment(header, skill.priceAtomic, skill.slug)) {
    return new NextResponse(JSON.stringify({}), {
      status: 402,
      headers: {
        "Content-Type": "application/json",
        "PAYMENT-REQUIRED": buildChallenge(skill.priceAtomic, skill.slug)
      }
    });
  }

  const body = await request.json().catch(() => ({}));
  const payload = invokeSchema.parse(body ?? {});
  const result = await invokeServerSkill(skill, payload);

  return NextResponse.json(result);
}

