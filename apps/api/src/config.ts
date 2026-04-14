import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: "../../.env" });
dotenv.config();

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3001),
  APP_URL: z.string().default("http://localhost:3000"),
  ONCHAINOS_BIN: z.string().default("/Users/vinaysharma/.local/bin/onchainos"),
  OKX_API_KEY: z.string().min(1).optional(),
  OKX_SECRET_KEY: z.string().min(1).optional(),
  OKX_PASSPHRASE: z.string().min(1).optional(),
  NEXT_PUBLIC_REGISTRY_ADDRESS: z.string().optional(),
  X_LAYER_RPC: z.string().default("https://rpc.xlayer.tech"),
  X402_PAY_TO: z.string().default("0x89740dfdc33b07242d1276ad453e00eb56c25884"),
  X402_NETWORK: z.string().default("eip155:196"),
  X402_ASSET: z.string().default("0x779ded0c9e1022225f8e0630b35a9b54be713736"),
  X402_AMOUNT_USDT: z.string().default("100000")
});

export const env = envSchema.parse(process.env);

export const okxEnv = {
  OKX_API_KEY: env.OKX_API_KEY ?? "",
  OKX_SECRET_KEY: env.OKX_SECRET_KEY ?? "",
  OKX_PASSPHRASE: env.OKX_PASSPHRASE ?? ""
};

