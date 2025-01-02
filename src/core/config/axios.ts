import axios from "axios";
import Env from "@/env";

const prefixs = ["/api"];
const { proxy_enabled, api_host } = Env;

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    if (!proxy_enabled && prefixs.some(prefix => !!config.url && config.url.slice(0, prefix.length) === prefix)) {
      config.url = `${api_host}${config.url}`;
    }
    config.headers["X-Powered-By"] = "SaneSong Ltd";
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
