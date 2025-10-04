interface Verification {
  txHash: string;
  data: string;
}

interface OracleData {
  createdBy: string;
  apiUrl: string;
  updateInterval: string;
  dynamicData: string;
  lastUpdateTime: bigint;
  isValidated: boolean;
  verifications: Verification[];
}

