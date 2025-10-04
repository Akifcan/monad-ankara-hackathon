"use client";

import { useEffect, useState } from "react";
import OracleArtifact from "@/assets/Oracle.json";
import { BrowserProvider, Contract } from "ethers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DEMO_CONTRACT = "0x47ca3400379Bf50e115996ab2EcBDda52dBF8952";

interface MatchData {
  id: number;
  score1: number;
  score2: number;
}

export default function Demo2() {
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOracleData = async () => {
    setIsLoading(true);
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask to view oracle details");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(DEMO_CONTRACT, OracleArtifact.abi, provider);

      const [, , , lastUpdateTime] = await contract.getOracleInfo();
      const data = await contract.getCurrentData();
      const scores = JSON.parse(data) as MatchData;

      setMatchData(scores);
      setLastUpdate(
        new Date(Number(lastUpdateTime) * 1000).toLocaleString()
      );
    } catch (error) {
      console.error("Error fetching oracle data:", error);
      alert("Failed to fetch oracle data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleOracleData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 p-4 py-12">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Match Scoreboard</h1>
            <p className="text-neutral-600">Live match results from oracle</p>
          </div>
          <Button onClick={handleOracleData} disabled={isLoading}>
            {isLoading ? "Refreshing..." : "🔄 Refresh Data"}
          </Button>
        </div>

        {/* Last Update Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Last Update</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600">
              {lastUpdate || "No data loaded yet"}
            </p>
          </CardContent>
        </Card>

        {/* Scoreboard */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#836EF9] to-purple-600 text-white">
            <CardTitle className="text-center text-2xl">El Clásico</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {matchData ? (
              <div className="flex items-center justify-center gap-8">
                {/* Real Madrid */}
                <div className="flex-1 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-white p-4 shadow-lg flex items-center justify-center">
                      <span className="text-4xl">⚪</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800">Real Madrid</h3>
                  <div className="mt-4 text-6xl font-bold text-[#836EF9]">
                    {matchData.score1}
                  </div>
                </div>

                {/* VS Separator */}
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-neutral-400">VS</span>
                  <div className="mt-2 h-px w-16 bg-neutral-300"></div>
                </div>

                {/* Barcelona */}
                <div className="flex-1 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-[#A50044] p-4 shadow-lg flex items-center justify-center">
                      <span className="text-4xl">🔴</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800">Barcelona</h3>
                  <div className="mt-4 text-6xl font-bold text-[#836EF9]">
                    {matchData.score2}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-500">No match data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Match Details */}
        {matchData && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Match Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Match ID:</span> {matchData.id}</p>
                <p><span className="font-medium">Final Score:</span> {matchData.score1} - {matchData.score2}</p>
                <p>
                  <span className="font-medium">Result:</span>{" "}
                  {matchData.score1 > matchData.score2
                    ? "Real Madrid wins"
                    : matchData.score2 > matchData.score1
                    ? "Barcelona wins"
                    : "Draw"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}