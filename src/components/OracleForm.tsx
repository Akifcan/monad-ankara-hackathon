"use client";

import { useState } from "react";
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

export function OracleForm() {
  const [url, setUrl] = useState("");
  const [interval, setInterval] = useState("");
  const [errors, setErrors] = useState({ url: "" });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const urlError = validateUrl(url);

    if (urlError) {
      setErrors({ url: urlError });
      return;
    }

    setErrors({ url: "" });
    console.log({
      url,
      interval,
    });
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
            />
            {errors.url && (
              <p className="text-sm text-red-500">{errors.url}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interval">Update Interval</Label>
            <Select value={interval} onValueChange={setInterval}>
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

          <Button type="submit" className="w-full">
            Create Oracle
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
