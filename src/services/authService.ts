// import { axiosClient } from "./axiosClient";

export const authService = {
  login: async (username: string) => {
    // example: mock
    return { id: "1", name: username };
    // real: return (await axiosClient.post('/auth/login', { username })).data;
  },
  logout: async () => {
    return true;
  }
};
