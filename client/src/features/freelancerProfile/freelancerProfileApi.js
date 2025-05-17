import axiosClient from '../../utils/axiosClient';

export const freelancerProgileApi = {
  updateProfile: (clientData) => axiosClient.post('/freelancer/edit-profile', clientData),
  getProfile: () => axiosClient.get('/freelancer/get-profile'),
 
};