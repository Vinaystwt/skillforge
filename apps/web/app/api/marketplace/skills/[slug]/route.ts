import { NextResponse } from "next/server";
import { getSkill } from "../../../../../lib/server/catalog";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);

  if (!skill) {
    return NextResponse.json({ message: "Skill not found" }, { status: 404 });
  }

  return NextResponse.json(skill);
}

