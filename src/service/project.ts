import axiosInstance from '@/configs/axios-instance';
import { CONST } from '@/utils/const';
import { MOCK_WORKS_RESPONSE } from './mock';

const ProjectServices = () => {
  const getProjects = async (limit?: number) => {
    const mockData = () => {
      const data = limit
        ? MOCK_WORKS_RESPONSE.myportfolio_portfolio.slice(0, limit)
        : MOCK_WORKS_RESPONSE.myportfolio_portfolio;
      return { myportfolio_portfolio: data };
    };

    // Fallback: without an API URL, use mock data directly
    if (!CONST.BASEURL) return mockData();

    try {
      const res = await axiosInstance.get('/projects', {
        params: {
          limit: limit || 10,
        },
      });
      return res.data;
    } catch (error) {
      console.warn('[getProjects] API failed, falling back to mock data:', error);
      return mockData();
    }
  };
  return {
    getProjects,
  };
};

export default ProjectServices;
