import axiosInstance from '@/configs/axios-instance';

const ProjectServices = () => {
  const getProjects = async (limit?: number) => {
    try {
      const res = await axiosInstance.get('/projects', {
        params: {
          limit: limit || 10,
        },
      });
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return {
    getProjects,
  };
};

export default ProjectServices;
