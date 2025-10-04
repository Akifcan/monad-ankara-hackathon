import { OracleForm } from "@/components/OracleForm";
import { OracleInfo } from "@/components/OracleInfo";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 p-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
        <OracleForm />
        <OracleInfo />
      </div>
    </div>
  );
}
