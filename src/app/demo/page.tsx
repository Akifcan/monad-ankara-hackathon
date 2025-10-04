"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import OracleArtifact from "@/assets/Oracle.json";
import { BrowserProvider, Contract } from "ethers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DEMO_CONTRACT = "0xdC736F48f1Db0223261b7079AFB6877365d511Cd";

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full flex items-center justify-center bg-neutral-100 rounded-lg">
      Loading map...
    </div>
  ),
});

export default function Demo() {
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [coords, setCoords] = useState<LocationData[]>([]);
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

      const parsedCoords = JSON.parse(data) as LocationData[];

      setCoords(parsedCoords);
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
            <h1 className="text-3xl font-bold">Oracle Demo</h1>
            <p className="text-neutral-600">Real-time location data visualization</p>
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

        {/* Map */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Location Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
                <Map coords={coords} />
            </div>
          </CardContent>
        </Card>

        {/* Coordinates List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Locations ({coords.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {coords.length === 0 ? (
              <p className="text-sm text-neutral-500">No locations available</p>
            ) : (
              <div className="space-y-3">
                {coords.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 p-3"
                  >
                    <div>
                      <p className="font-medium">{location.lastLocationDescription}</p>
                      <p className="text-sm text-neutral-500">
                        ID: {location.id} | Lat: {location.lat} | Long: {location.long}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}