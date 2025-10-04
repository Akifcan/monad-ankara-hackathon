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
        <WalletConnect onWalletChange={setWalletAddress} />

        {walletAddress && <OracleForm />}

        <OracleInfo />
      </div>
    </div>
  );
}
