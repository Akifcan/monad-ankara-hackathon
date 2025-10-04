"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BrowserProvider, Contract } from "ethers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OracleArtifact from "@/assets/Oracle.json";

export default function Client() {
  const params = useParams();
  const oracleAddress = params.oracle as string;

  const [oracleData, setOracleData] = useState<OracleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOracleData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (typeof window.ethereum === "undefined") {
          setError("Please install MetaMask to view oracle details");
          return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const contract = new Contract(oracleAddress, OracleArtifact.abi, provider);

        // Get oracle info
        const [creator, url, interval, lastUpdate] = await contract.getOracleInfo();

        // Get dynamic data
        const data = await contract.getCurrentData();

        // Get validation status
        const validated = await contract.isValidated();

        // Get verifications
        const verificationsRaw = await contract.getVerifications();
        const verifications = verificationsRaw.map((v: any) => ({
          txHash: v.txHash,
          data: v.data,
        }));

        setOracleData({
          createdBy: creator,
          apiUrl: url,
          updateInterval: interval,
          dynamicData: data,
          lastUpdateTime: lastUpdate,
          isValidated: validated,
          verifications: verifications,
        });
      } catch (err) {
        console.error("Error fetching oracle data:", err);
        setError("Failed to fetch oracle data. Please check the contract address.");
      } finally {
        setLoading(false);
      }
    };

    if (oracleAddress) {
      fetchOracleData();
    }
  }, [oracleAddress]);

  const formatTimestamp = (timestamp: bigint) => {
    if (timestamp === 0n) return "Never";
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 p-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-neutral-600">Loading oracle data...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 p-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-red-600">{error}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4 py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <img src="/logo.svg" alt="Monoracle Logo" width={300} height={300} />
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle>Oracle Details</CardTitle>
            <CardDescription className="font-mono text-xs break-all">
              <a
                href={`https://testnet.monadscan.com/address/${oracleAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                 <b className="text-black">View on Monad Explorer</b> {oracleAddress}
              </a>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Oracle Info */}
        {oracleData && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contract Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-500">Created By</p>
                  <a
                    href={`https://testnet.monadscan.com/address/${oracleData.createdBy}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm font-medium break-all text-blue-600 hover:text-blue-800"
                  >
                    <b className="text-black">View on Monad Explorer</b> {oracleData.createdBy}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">API URL</p>
                  <a
                    href={oracleData.apiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium break-all text-blue-600 hover:text-blue-800"
                  >
                    <b className="text-black">View on Monad Explorer</b> {oracleData.apiUrl}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">Update Interval</p>
                  <p className="text-sm font-medium">{oracleData.updateInterval}</p>
                </div>

                <div>
                  <p className="text-sm text-neutral-500">Last Update Time</p>
                  <p className="text-sm font-medium">
                    {formatTimestamp(oracleData.lastUpdateTime)}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-neutral-100 p-4">
                  <pre className="text-sm overflow-x-auto">
                    {oracleData.dynamicData || "No data available yet"}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification History</CardTitle>
                <p className="text-sm text-neutral-500">
                  {oracleData.verifications.length} verification{oracleData.verifications.length !== 1 ? 's' : ''}
                </p>
              </CardHeader>
              <CardContent>
                {oracleData.verifications.length === 0 ? (
                  <p className="text-sm text-neutral-500">No verifications yet</p>
                ) : (
                  <div className="space-y-4">
                    {oracleData.verifications.map((verification, index) => (
                      <div key={index} className="rounded-lg border border-neutral-200 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-neutral-500">
                            Verification #{index + 1}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-neutral-500">TX Hash</p>
                            <a
                              href={`https://testnet.monadscan.com/address/${oracleAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs break-all text-blue-600 hover:text-blue-800 underline"
                            >
                              {verification.txHash}
                            </a>
                          </div>
                          <div>
                            <p className="text-xs text-neutral-500">Data</p>
                            <div className="rounded bg-neutral-50 p-2">
                              <pre className="text-xs overflow-x-auto">
                                {verification.data}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <a
                href={`https://testnet.monadscan.com/address/${oracleAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View on Monad Explorer
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </a>
            </div>
          </>
        )}

        <img src="/logo.svg" alt="Monoracle Logo" width={300} height={300} />
      </div>
    </div>
  );
}