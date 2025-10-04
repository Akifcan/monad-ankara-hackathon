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


interface LocationData {
  id: number;
  lat: number;
  long: number;
  lastLocationDescription: string;
}

interface WalletConnectProps {
  onWalletChange: (address: string | null) => void;
}


interface Coordinate {
  id: number;
  lat: number;
  long: number;
  lastLocationDescription: string;
}

interface MapProps {
  coords?: Coordinate[];
}

