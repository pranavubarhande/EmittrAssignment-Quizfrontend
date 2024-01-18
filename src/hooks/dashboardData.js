import { useQuery } from 'react-query';
import { getTestHistory, getTestLeaderBoard, getTestSummary, getalltests } from '../services/testService';
//hook to fetch all the data required by dashboard page
export const fetchData = async (userId) => {
  const testsummary = await getTestSummary(userId);
  const alltests = await getalltests();
  const testhistory = await getTestHistory(userId);
  return {testsummary, alltests, testhistory};
};