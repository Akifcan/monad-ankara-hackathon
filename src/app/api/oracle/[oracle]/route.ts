import { NextResponse } from "next/server";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import OracleArtifact from "../../../../../contracts/artifacts/contracts/Oracle.sol/Oracle.json";

const MONAD_TESTNET_RPC = process.env.MONAD_RPC_URL;
const PRIVATE_KEY = process.env.MASTER_WALLET_PRIVATE_KEY;

export async function GET(
  _req: Request,
  context: { params: Promise<{ oracle: string }> }
) {
  try {
    const { oracle: oracleAddress } = await context.params;

    if (!PRIVATE_KEY) {
      return NextResponse.json(
        { success: false, error: "Private key not configured" },
        { status: 500 }
      );
    }

    // Create provider and wallet
    const provider = new JsonRpcProvider(MONAD_TESTNET_RPC);
    const wallet = new Wallet(PRIVATE_KEY, provider);

    // Create contract instance
    const contract = new Contract(oracleAddress, OracleArtifact.abi, wallet);

    // Get API URL from contract
    const apiUrl = await contract.apiUrl();

    return NextResponse.json({
      success: true,
      oracleAddress: oracleAddress,
      apiUrl: apiUrl,
      message: `Oracle API URL retrieved successfully`
    });
  } catch (error) {
    console.error("Error fetching oracle data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch oracle data" },
      { status: 500 }
    );
  }
}
