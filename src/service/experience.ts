import axiosInstance from '@/configs/axios-instance';
import { CONST } from '@/utils/const';
import { MOCK_EXPERIENCE_RESPONSE } from './mock';

const ExperienceService = () => {
  const getExperience = async () => {
    // Fallback: without an API URL, use mock data directly
    if (!CONST.BASEURL) return MOCK_EXPERIENCE_RESPONSE;

    try {
      const res = await axiosInstance.get('/experiences');
      return res.data;
    } catch (error) {
      console.warn('[getExperience] API failed, falling back to mock data:', error);
      return MOCK_EXPERIENCE_RESPONSE;
    }
  };
  return {
    getExperience,
  };
};

export default ExperienceService;
