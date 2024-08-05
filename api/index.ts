import axios from "axios";

const API_URL = __DEV__
  ? process.env.EXPO_PUBLIC_SANDBOX_COINMARKET_URL!
  : process.env.EXPO_PUBLIC_COINMARKET_URL!;

const API_KEY = process.env.EXPO_PUBLIC_COINMARKET_API_KEY!;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "X-CMC_PRO_API_KEY": API_KEY,
  },
});

export const getCryptoListing = (limit?: number) =>
  api.get(`/v1/cryptocurrency/listings/latest?convert=INR`);

export const getCryptoInfo = (ids: string) =>
  api.get(`/v2/cryptocurrency/info?id=${ids}`);

export const getCoinChartData = (ids: string) =>
  api.get(`/v2/cryptocurrency/info?id=${ids}`);
