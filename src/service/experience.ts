import axiosInstance from '@/configs/axios-instance';

const ExperienceService = () => {
  const getExperience = async () => {
    try {
      const res = await axiosInstance.get('/experiences');
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return {
    getExperience,
  };
};

export default ExperienceService;
