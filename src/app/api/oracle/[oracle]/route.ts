import { NextResponse } from "next/server";
import { JsonRpcProvider, Wallet, Contract } from "ethers";
import OracleArtifact from "@/assets/Oracle.json";
import axios from "axios";

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

    const provider = new JsonRpcProvider(MONAD_TESTNET_RPC);
    const wallet = new Wallet(PRIVATE_KEY, provider);
    const contract = new Contract(oracleAddress, OracleArtifact.abi, wallet);
    const apiUrl = await contract.apiUrl();

    // Fetch data from API
    const apiResponse = await axios.get(apiUrl);
    const data = JSON.stringify(apiResponse.data);

    // Update contract with new data
    const tx = await contract.updateData(data);
    await tx.wait();

    return NextResponse.json({
      success: true,
      oracleAddress,
      apiUrl,
      data,
      transactionHash: tx.hash,
      message: "Oracle data updated successfully"
    });
  } catch (error) {
    console.error("Error fetching oracle data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch oracle data" },
      { status: 500 }
    );
  }
}
