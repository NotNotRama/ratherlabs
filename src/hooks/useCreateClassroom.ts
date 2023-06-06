import { Classroom } from '@/types';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export function useCreateClassroom() {
  const queryClient = useQueryClient();

  return useMutation(
    async (newClassroom: Classroom) => {
      const response = await axios.post('/api/createClassroom', newClassroom);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('classrooms');
      },
    }
  );
}
