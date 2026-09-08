import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

function getApiUrl() {
  // Se estiver rodando no navegador
  if (Platform.OS === "web") {
    return "http://localhost:3000";
  }

  // Pega o IP do computador que está executando o Expo
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.expoGoConfig?.debuggerHost;

  const ip = hostUri?.split(":")[0];

  if (ip) {
    return `http://${ip}:3000`;
  }

  // Fallback
  return "http://localhost:3000";
}

const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;