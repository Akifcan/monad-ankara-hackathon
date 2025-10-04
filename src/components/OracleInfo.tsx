import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function OracleInfo() {
  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          What is a No-Code Oracle Platform?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">The Simple Explanation</h3>
          <p className="text-neutral-600 leading-relaxed">
            A no-code oracle platform lets you connect real-world data to
            blockchain smart contracts <strong>without writing any code</strong>. Think
            of it as a bridge that automatically fetches information from the
            internet and delivers it to your blockchain application.
          </p>
        </div>

        <div className="rounded-lg border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <h3 className="text-lg font-bold text-purple-900">
              Built on Monad - The Parallel Execution Blockchain
            </h3>
          </div>
          <p className="text-purple-900 leading-relaxed">
            This platform is built on <strong className="text-purple-700">Monad</strong>,
            a next-generation blockchain that can <strong className="text-purple-700 underline decoration-2">
            execute transactions in parallel</strong>. Unlike traditional blockchains
            that process one transaction at a time, Monad can handle{" "}
            <strong className="text-purple-700">thousands of oracle updates simultaneously</strong>,
            making your data feeds blazing fast and cost-effective.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">
            What is an Oracle in Blockchain?
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            Blockchains are isolated systems that can&apos;t access external data on
            their own. An oracle is like a messenger that brings outside
            information (weather, prices, sports scores, etc.) into the
            blockchain so smart contracts can use it.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">How It Works: Step-by-Step</h3>
          <ol className="space-y-3 text-neutral-600">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                1
              </span>
              <div>
                <strong>Choose Your Data Source:</strong> You provide a URL to
                any API (like a weather service, stock prices, or sports
                results).
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                2
              </span>
              <div>
                <strong>Set Update Frequency:</strong> Decide how often the
                oracle should check for new data (every 10 seconds, daily,
                etc.).
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                3
              </span>
              <div>
                <strong>Automatic Data Fetching:</strong> The platform
                automatically retrieves data from your chosen URL at the
                specified intervals.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-semibold text-white">
                4
              </span>
              <div>
                <strong>Data Delivery (Parallel Execution on Monad):</strong>{" "}
                <span className="inline-block rounded bg-purple-100 px-2 py-0.5 text-sm font-semibold text-purple-700">
                  ⚡ PARALLEL PROCESSING
                </span>{" "}
                The oracle sends this data to the blockchain. Thanks to{" "}
                <strong className="text-purple-700">Monad&apos;s parallel execution</strong>,
                multiple oracle updates are processed <strong className="underline">at the same time</strong>,
                dramatically increasing speed and reducing costs.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                5
              </span>
              <div>
                <strong>Smart Contract Usage:</strong> Your smart contract can
                now use this real-world data to make decisions and execute
                actions.
              </div>
            </li>
          </ol>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Real-World Example</h3>
          <div className="rounded-lg bg-neutral-50 p-4">
            <p className="text-neutral-600 leading-relaxed">
              <strong>Scenario:</strong> You want to create a betting contract
              for weather predictions.
            </p>
            <ul className="mt-3 space-y-2 text-neutral-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-neutral-400">•</span>
                <span>
                  You provide a weather API URL (like{" "}
                  <code className="rounded bg-neutral-200 px-1 py-0.5 text-sm">
                    api.weather.com/today
                  </code>
                  )
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-neutral-400">•</span>
                <span>Set it to update every day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-neutral-400">•</span>
                <span>
                  The oracle fetches the temperature daily and sends it to your
                  smart contract
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-neutral-400">•</span>
                <span>
                  Your contract automatically pays out winners based on actual
                  weather data
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border-2 border-purple-400 bg-purple-100 p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl">🚀</span>
              <h4 className="font-bold text-purple-900">
                Why Monad&apos;s Parallel Execution Matters for Oracles
              </h4>
            </div>
            <ul className="space-y-2 text-sm text-purple-900">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-600">▸</span>
                <span>
                  <strong className="text-purple-700">10,000+ TPS:</strong> Process thousands of oracle
                  updates per second <span className="inline-block rounded bg-purple-200 px-1.5 py-0.5 text-xs font-bold">SIMULTANEOUSLY</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-600">▸</span>
                <span>
                  <strong className="text-purple-700">Lower Gas Fees:</strong> Parallel execution means
                  more efficient resource usage and cheaper transactions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-600">▸</span>
                <span>
                  <strong className="text-purple-700">Real-Time Updates:</strong> No waiting in line -
                  your oracle data is processed <span className="font-bold underline">the moment it arrives</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-600">▸</span>
                <span>
                  <strong className="text-purple-700">Multiple Oracles:</strong> Run dozens of oracle
                  feeds without network congestion - they all execute{" "}
                  <span className="inline-block rounded bg-purple-200 px-1.5 py-0.5 text-xs font-bold">IN PARALLEL</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-900">
              💡 <strong>Key Benefit:</strong> No coding knowledge required! Just
              paste a URL, choose an update interval, and your oracle is ready to
              connect real-world data to blockchain.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
