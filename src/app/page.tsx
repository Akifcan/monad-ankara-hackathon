"use client";
import { useState } from "react";
import { OracleForm } from "@/components/OracleForm";
import { OracleInfo } from "@/components/OracleInfo";
import { WalletConnect } from "@/components/WalletConnect";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-neutral-50 p-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        <img src="/logo.svg" alt="Monoracle Logo" width={300} height={300} />
        <WalletConnect onWalletChange={setWalletAddress} />
        {walletAddress && <OracleForm />}
        <OracleInfo />
        <img src="/logo.svg" alt="Monoracle Logo" width={300} height={300} />
        <p>Made with ❤️ by <b>Overblock</b></p>
      </div>
    </div>
  );
}
