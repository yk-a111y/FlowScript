interface IBlockData {
  category: Record<string, string>;
  detail: Record<string, unknown>;
}

interface IBlockPropsData {
  label: string;
  description: string;
  active: boolean;
  inGroup: boolean;
  disableBlock: boolean;
  customUserAgent: boolean;
  userAgent: string;
  tabZoom: number;
  updatePreTab: boolean;
  waitTabLoaded: boolean;
  url: string;
}

export type { IBlockData, IBlockPropsData };
