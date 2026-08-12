import mockWorks from '@/mock/works.json';
import mockExperience from '@/mock/experience.json';

/**
 * Local fallback data that mimics the API response shape,
 * used when the API is not configured or unreachable.
 */
export const MOCK_WORKS_RESPONSE = {
  myportfolio_portfolio: mockWorks,
};

export const MOCK_EXPERIENCE_RESPONSE = {
  myportfolio_experience: mockExperience,
};

/**
 * Local screenshots for the showcase projects, keyed by project title.
 * These always win over API/Firebase images so the home showcase looks great
 * regardless of the data source.
 */
const LOCAL_SCREENSHOTS: Record<string, string[]> = {
  'ML Ops Telkomsel': ['/img/mlops-login.png', '/img/mlops-dashboard.png'],
  'Qlola Cash Management': ['/img/qlola-login.png', '/img/qlola-dashboard.png'],
  'IFG Life Corporate Website': ['/img/ifg-login.png', '/img/ifg-dashboard.png'],
};

/**
 * Resolve the two screenshots for a project:
 * 1. Local screenshots (by title) take priority,
 * 2. otherwise use the API `images` array,
 * 3. otherwise fall back to the single `image`.
 */
export const resolveProjectImages = (item: any): string[] => {
  const local = LOCAL_SCREENSHOTS[item?.title];
  if (local) return local;
  if (Array.isArray(item?.images) && item.images.length >= 2) {
    return item.images.slice(0, 2);
  }
  const single = item?.image || '';
  return [single, single];
};
