import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ oracle: string }> }
) {
  const { oracle: oracleAddress } = await context.params;

  console.log(process.env.MASTER_WALLET_PRIVATE_KEY);

  return NextResponse.json({
    success: true,
    oracleAddress: oracleAddress,
    message: `Oracle details for ${oracleAddress}`
  });
}
