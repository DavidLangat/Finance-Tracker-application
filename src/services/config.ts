import { API_URL, ENV } from "react-native-dotenv";

export const config = {
  apiUrl: API_URL ?? "https://example.com/api",
  env: ENV ?? "development",
};


