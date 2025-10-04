"use client";

import { useState } from "react";
import { BrowserProvider, ContractFactory } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OracleArtifact from "../../contracts/artifacts/contracts/Oracle.sol/Oracle.json";

export function OracleForm() {
  const [url, setUrl] = useState("");
  const [interval, setInterval] = useState("");
  const [errors, setErrors] = useState({ url: "" });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);

  const validateUrl = (value: string) => {
    if (!value) {
      return "URL is required";
    }
    try {
      new URL(value);
      return "";
    } catch {
      return "Please enter a valid URL";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlError = validateUrl(url);

    if (urlError) {
      setErrors({ url: urlError });
      return;
    }

    if (!interval) {
      alert("Please select an update interval");
      return;
    }

    setErrors({ url: "" });

    try {
      setIsDeploying(true);

      // Get provider and signer
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create contract factory
      const factory = new ContractFactory(
        OracleArtifact.abi,
        OracleArtifact.bytecode,
        signer
      );

      // Deploy contract
      console.log("Deploying Oracle contract...");
      const contract = await factory.deploy(url, interval);

      console.log("Waiting for deployment...");
      await contract.waitForDeployment();

      const address = await contract.getAddress();
      console.log("Oracle deployed at:", address);

      setDeployedAddress(address);

      await fetch(`/api/oracle/${address}`)

      // Reset form
      setUrl("");
      setInterval("");
    } catch (error) {
      console.error("Deployment failed:", error);
      alert("Failed to deploy oracle. Please check console for details.");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>No-Code Oracle Form</CardTitle>
        <CardDescription>
          Create an oracle by providing an API URL and update interval
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="api-url">API URL</Label>
            <Input
              id="api-url"
              type="text"
              placeholder="Enter your API URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={errors.url ? "border-red-500" : ""}
              disabled={isDeploying}
            />
            {errors.url && (
              <p className="text-sm text-red-500">{errors.url}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interval">Update Interval</Label>
            <Select value={interval} onValueChange={setInterval} disabled={isDeploying}>
              <SelectTrigger id="interval">
                <SelectValue placeholder="Select an interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10s">Every 10 seconds</SelectItem>
                <SelectItem value="1m">Every 1 minute</SelectItem>
                <SelectItem value="10m">Every 10 minutes</SelectItem>
                <SelectItem value="1d">Every 1 day</SelectItem>
                <SelectItem value="5d">Every 5 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isDeploying}>
            {isDeploying ? "Deploying Oracle..." : "Create Oracle"}
          </Button>

          {deployedAddress && (
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-sm font-medium text-green-900">
                ✅ Oracle deployed successfully!
              </p>
              <p className="mt-1 font-mono text-xs text-green-700 break-all">
                {deployedAddress}
              </p>
              <a
                href={`/oracle/${deployedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800 underline"
              >
                View on <b>Monoracle</b> Explorer
              </a>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
