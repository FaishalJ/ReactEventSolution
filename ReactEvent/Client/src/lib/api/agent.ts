import axios from "axios";
import { viteEnv } from "../utils";
import { store } from "../stores/store";

function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

const agent = axios.create({
  baseURL: viteEnv.url,
});
agent.interceptors.request.use((config) => {
  store.uiStore.isBusy();
  return config;
});

agent.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.error("API Error:", error);
    return Promise.reject(error);
  } finally {
    store.uiStore.isIdle();
  }
});

export default agent;
