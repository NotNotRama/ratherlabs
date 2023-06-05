import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

interface Classroom {
  name: string;
  capacity: number;
}

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
