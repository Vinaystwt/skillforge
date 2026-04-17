import { NextResponse } from "next/server";
import { getMarketplacePayload } from "../../../lib/server/catalog";

export async function GET() {
  return NextResponse.json(await getMarketplacePayload());
}

