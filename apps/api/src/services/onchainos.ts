import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { env, okxEnv } from "../config.js";

const execFileAsync = promisify(execFile);

export async function runOnchainOs(args: string[]) {
  const { stdout, stderr } = await execFileAsync(env.ONCHAINOS_BIN, args, {
    env: {
      ...process.env,
      ...okxEnv
    }
  });

  const output = stdout || stderr;
  return JSON.parse(output);
}

export async function quoteSwap(amount: string) {
  return runOnchainOs(["swap", "quote", "--from", "okb", "--to", "usdt", "--readable-amount", amount, "--chain", "xlayer"]);
}

export async function scanToken(tokenAddress: string) {
  return runOnchainOs(["security", "token-scan", "--tokens", `196:${tokenAddress.toLowerCase()}`]);
}

export async function fetchWalletBalance(chain = "xlayer") {
  return runOnchainOs(["wallet", "balance", "--chain", chain, "--force"]);
}

export async function fetchWalletAddresses() {
  return runOnchainOs(["wallet", "addresses"]);
}

export async function executeSafeSwap(amount: string, walletAddress: string) {
  return runOnchainOs([
    "swap",
    "execute",
    "--from",
    "okb",
    "--to",
    "usdt",
    "--readable-amount",
    amount,
    "--chain",
    "xlayer",
    "--wallet",
    walletAddress.toLowerCase()
  ]);
}

