import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.nasa.gov/",
  timeout: 5000,
  params: {
    api_key: "NBD5sDlSioyAga4sMCvf3Ia0sRZdygqo5KtmwCaH",
  },
});
