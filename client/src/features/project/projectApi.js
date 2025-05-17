import axiosClient from "../../utils/axiosClient";

export const createProjectApi = {
  createJob: (clientData) =>
    axiosClient.post("/client/new-project", clientData),
};
