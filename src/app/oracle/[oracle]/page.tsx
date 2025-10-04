import { Metadata } from "next";
import Client from "./client";

export const metadata: Metadata = {
  title: "Oracle Explorer | Monracle - Api to Oracle in Seconds!",
  description: "Ankara Monracle Hackathon",
};

export default function Page() {
  return <Client />
}