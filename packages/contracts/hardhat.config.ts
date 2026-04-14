import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config({ path: "../../.env" });
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const X_LAYER_RPC = process.env.X_LAYER_RPC ?? "https://rpc.xlayer.tech";

const accounts = PRIVATE_KEY ? [PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    xlayer: {
      url: X_LAYER_RPC,
      chainId: 196,
      accounts
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  etherscan: {
    apiKey: {
      xlayer: "placeholder"
    },
    customChains: [
      {
        network: "xlayer",
        chainId: 196,
        urls: {
          apiURL: "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER_TESTNET",
          browserURL: "https://www.oklink.com/xlayer"
        }
      }
    ]
  }
};

export default config;
