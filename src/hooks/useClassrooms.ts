import axios from 'axios';
import { useQuery } from 'react-query';

export async function getClassrooms() {
  const { data } = await axios.get('/api/classrooms');
  return data;
}

export function useClassrooms() {
  return useQuery({
    queryKey: ['classrooms'],
    queryFn: getClassrooms,
    staleTime: Infinity,
  });
}
