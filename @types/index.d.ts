export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

interface CoinQuote {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: null | number;
  last_updated: string;
}

export interface Currency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  infinite_supply: null;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: null;
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  quote: {
    [key: string]: CoinQuote;
  };
}

export interface CMCStatus {
  timestamp: string;
  error_code: number;
  error_message: null;
  elapsed: number;
  credit_count: number;
  notice: null;
}

interface Contractaddress {
  contract_address: string;
  platform: Platform2;
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
  slug: string;
}

interface Platform {
  id: string;
  name: string;
  slug: string;
  symbol: string;
  token_address: string;
  coin?: Coin;
}

export interface CryptoInfo {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  notice: string;
  tags: string[];
  "tag-names": string[];
  "tag-groups": string[];
  urls: Urls;
  platform: Platform | null;
  date_added: string;
  twitter_username: string;
  is_hidden: number;
  date_launched: string;
  contract_address: Contractaddress[] | [];
  self_reported_circulating_supply: null;
  self_reported_tags: null;
  self_reported_market_cap: null;
  infinite_supply: boolean;
}

interface Urls {
  website: string[];
  twitter: any[];
  message_board: string[];
  chat: any[];
  facebook: any[];
  explorer: string[];
  reddit: string[];
  technical_doc: string[];
  source_code: string[];
  announcement: any[];
}
