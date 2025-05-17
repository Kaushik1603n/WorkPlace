import axiosClient from '../../utils/axiosClient';

export const marketPlaceApi = {
  getJobs: (searchQuery) => axiosClient.get(`/jobs/get-jobs?search=${encodeURIComponent(searchQuery)}`),
 
};