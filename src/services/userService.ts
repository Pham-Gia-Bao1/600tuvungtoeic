// import { axiosClient } from "./axiosClient";

export const userService = {
  async me() {
    // return (await axiosClient.get('/me')).data;
    return { id: "1", name: "Demo" };
  }
};
