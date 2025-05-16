import axiosClient from '../../utils/axiosClient';

export const clientProgileApi = {
  updateProfile: (clientData) => axiosClient.post('/client/edit-profile', clientData),
  getProfile: () => axiosClient.get('/client/get-profile'),
 
};